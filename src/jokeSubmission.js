const jsl = require("svjsl");
const fs = require("fs-extra");
const http = require("http");

var httpServer = require("./httpServer"); // module loading order is a bit fucked, so this module has to be loaded multiple times
const parseJokes = require("./parseJokes");
const logRequest = require("./logRequest");
const convertFileFormat = require("./fileFormatConverter");
const analytics = require("./analytics");
const parseURL = require("./parseURL");
const meter = require("./meter");

const settings = require("../settings");

jsl.unused([http, analytics]);


/**
 * To be called when a joke is submitted
 * @param {http.ServerResponse} res
 * @param {String} data
 * @param {String} fileFormat
 * @param {String} ip
 * @param {(analytics.AnalyticsDocsRequest|analytics.AnalyticsSuccessfulRequest|analytics.AnalyticsRateLimited|analytics.AnalyticsError|analytics.AnalyticsSubmission)} analyticsObject
 */
const jokeSubmission = (res, data, fileFormat, ip, analyticsObject) => {
    try
    {
        if(typeof httpServer == "object" && Object.keys(httpServer).length <= 0)
            httpServer = require("./httpServer");
            
        let submittedJoke = JSON.parse(data);
        if(jsl.isEmpty(submittedJoke))
            return httpServer.respondWithError(res, 105, 400, fileFormat, "Request body is empty");
            
        let invalidChars = data.match(settings.jokes.submissions.invalidCharRegex);
        let invalidCharsStr = invalidChars ? invalidChars.map(ch => `0x${ch.charCodeAt(0).toString(16)}`).join(", ") : null;
        if(invalidCharsStr && invalidChars.length > 0)
            return httpServer.respondWithError(res, 109, 400, fileFormat, invalidCharsStr, submittedJoke.lang);
        
        if(submittedJoke.formatVersion == parseJokes.jokeFormatVersion && submittedJoke.formatVersion == settings.jokes.jokesFormatVersion)
        {
            // format version is correct, validate joke now
            let validationResult = parseJokes.validateSingle(submittedJoke);

            if(typeof validationResult === "object")
                return httpServer.respondWithError(res, 105, 400, fileFormat, `Submitted joke format is incorrect - encountered error${validationResult.length == 1 ? ": " : "s:\n"}${validationResult.join("\n")}`);
            else if(validationResult === true)
            {
                // joke is valid, find file name and then write to file

                let sanitizedIP = ip.replace(settings.httpServer.ipSanitization.regex, settings.httpServer.ipSanitization.replaceChar).substring(0, 8);
                let curUnix = new Date().getTime();
                let fileName = `${settings.jokes.jokeSubmissionPath}submission_${sanitizedIP}_0_${curUnix}.json`;

                let iter = 0;
                let findNextNum = currentNum => {
                    iter++;
                    if(iter >= settings.httpServer.rateLimiting)
                    {
                        logRequest("ratelimited", `IP: ${ip}`, analyticsObject);
                        return httpServer.respondWithError(res, 101, 429, fileFormat);
                    }

                    if(fs.existsSync(`${settings.jokes.jokeSubmissionPath}submission_${sanitizedIP}_${currentNum}_${curUnix}.json`))
                        return findNextNum(currentNum + 1);
                    else return currentNum;
                };

                if(fs.existsSync(`${settings.jokes.jokeSubmissionPath}${fileName}`))
                    fileName = `${settings.jokes.jokeSubmissionPath}submission_${sanitizedIP}_${findNextNum()}_${curUnix}.json`;

                try
                {
                    // file name was found, write to file now:
                    return writeJokeToFile(res, fileName, submittedJoke, fileFormat, ip, analyticsObject);
                }
                catch(err)
                {
                    return httpServer.respondWithError(res, 100, 500, fileFormat, `Internal error while saving joke: ${err}`);
                }
            }
        }
        else
        {
            return httpServer.respondWithError(res, 105, 400, fileFormat, `Joke format version is incorrect - expected "${parseJokes.jokeFormatVersion}" - got "${submittedJoke.formatVersion}"`);
        }
    }
    catch(err)
    {
        return httpServer.respondWithError(res, 105, 400, fileFormat, `Request body contains invalid JSON: ${err}`);
    }
}

/**
 * Writes a joke to a json file
 * @param {http.ServerResponse} res
 * @param {String} filePath
 * @param {parseJokes.SingleJoke|parseJokes.TwopartJoke} submittedJoke
 * @param {String} fileFormat
 * @param {String} ip
 * @param {(analytics.AnalyticsDocsRequest|analytics.AnalyticsSuccessfulRequest|analytics.AnalyticsRateLimited|analytics.AnalyticsError|analytics.AnalyticsSubmission)} analyticsObject
 */
const writeJokeToFile = (res, filePath, submittedJoke, fileFormat, ip, analyticsObject) => {
    if(typeof httpServer == "object" && Object.keys(httpServer).length <= 0)
        httpServer = require("./httpServer");

    let reformattedJoke = reformatJoke(submittedJoke);

    fs.writeFile(filePath, JSON.stringify(reformattedJoke, null, 4), err => {
        if(!err)
        {
            // successfully wrote to file
            let responseObj = {
                "error": false,
                "message": "Joke submission was successfully saved. It will soon be checked out by the author.",
                "submission": reformattedJoke,
                "timestamp": new Date().getTime()
            };

            meter.update("submission", 1);

            let submissionObject = analyticsObject;
            submissionObject.submission = reformattedJoke;
            logRequest("submission", ip, submissionObject);

            return httpServer.pipeString(res, convertFileFormat.auto(fileFormat, responseObj), parseURL.getMimeTypeFromFileFormatString(fileFormat), 201);
        }
        // error while writing to file
        else return httpServer.respondWithError(res, 100, 500, fileFormat, `Internal error while saving joke: ${err}`);
    });
}

/**
 * Ensures that a joke is formatted as expected
 * @param {parseJokes.SingleJoke|parseJokes.TwopartJoke} joke
 * @returns {parseJokes.SingleJoke|parseJokes.TwopartJoke}
 */
function reformatJoke(joke)
{
    if(joke.formatVersion)
        retJoke.formatVersion = joke.formatVersion;

    let retJoke = {
        ...retJoke,
        category: joke.category,
        type: joke.type
    }

    if(joke.type == "single")
    {
        retJoke.joke = joke.joke;
    }
    else if(joke.type == "twopart")
    {
        retJoke.setup = joke.setup;
        retJoke.delivery = joke.delivery;
    }

    retJoke.flags = joke.flags;

    if(joke.lang)
        retJoke.lang = joke.lang;
    
    if(joke.id)
        retJoke.id = joke.id;
    
    return retJoke;
}

module.exports = jokeSubmission;
module.exports.reformatJoke = reformatJoke;
