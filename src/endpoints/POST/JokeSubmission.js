const { unused } = require("svcorelib");

// const tr = require("../../translate");
const SubmissionEndpoint = require("../../classes/SubmissionEndpoint");
const Endpoint = require("../../classes/Endpoint");
const resolveIp = require("../../resolveIP");
const jokeSubmission = require("../../jokeSubmission");

// const settings = require("../../../settings");


/** @typedef {import("http").IncomingMessage} IncomingMessage */
/** @typedef {import("http").ServerResponse} ServerResponse */

/**
 * Accepts a joke object to be submitted to the API
 */
class JokeSubmission extends SubmissionEndpoint
{
    /**
     * Accepts a joke object to be submitted to the API
     */
    constructor()
    {
        /** @type {Endpoint.EndpointMeta} */
        const meta = {
            docsURL: "https://jokeapi.dev/#submit-endpoint",
            usage: {
                method: "POST",
                supportedParams: [
                    "lang"
                ]
            }
        };

        super("submit", meta);
    }

    /**
     * This method is run each time a client requests this endpoint
     * @param {IncomingMessage} req The HTTP server request
     * @param {ServerResponse} res The HTTP server response
     * @param {string[]} url URL path array gotten from the URL parser module
     * @param {object} params URL query params gotten from the URL parser module
     * @param {string} format The file format to respond with
     * @param {string} data The raw data, as a string
     */
    async call(req, res, url, params, format, data)
    {
        unused(url, data);

        const lang = Endpoint.getLang(params);
        const ip = resolveIp(req);

        const dryRun = (params && params["dry-run"] === true);

        /** @type {import("../../analytics").AnalyticsSubmission} */
        const analyticsObject = {
            type: "JokeSubmission",
            data: {
                ipAddress: ip,
                urlParameters: params,
                urlPath: url,
                submission: data.toString()
            }
        };

        return jokeSubmission(res, data, format, ip, analyticsObject, dryRun, lang);
    }
}

module.exports = JokeSubmission;


// #MARKER legacy submission code

// let submissionsRateLimited = await rlSubm.get(ip);

// if(!isEmpty(parsedURL.pathArray) && parsedURL.pathArray[0] == "submit" && !(submissionsRateLimited && submissionsRateLimited._remainingPoints <= 0 && !headerAuth.isAuthorized))
// {
//     let data = "";
//     req.on("data", chunk => {
//         data += chunk;

//         let payloadLength = byteLength(data);
//         if(payloadLength > settings.httpServer.maxPayloadSize)
//             return respondWithError(res, 107, 413, fileFormat, tr(lang, "payloadTooLarge", payloadLength, settings.httpServer.maxPayloadSize), lang);

//         if(!isEmpty(data))
//             clearTimeout(dataInterval);

//         let dryRun = (parsedURL.queryParams && parsedURL.queryParams["dry-run"] == true) || false;

//         if(lists.isWhitelisted(ip))
//             return jokeSubmission(res, data, fileFormat, ip, analyticsObject, dryRun);

//         if(!dryRun)
//         {
//             rlSubm.consume(ip, 1).then(() => {
//                 return jokeSubmission(res, data, fileFormat, ip, analyticsObject, dryRun);
//             }).catch(rlRes => {
//                 if(rlRes.remainingPoints <= 0)
//                     return respondWithError(res, 101, 429, fileFormat, tr(lang, "rateLimited", settings.httpServer.rateLimiting, settings.httpServer.timeFrame), lang);
//             });
//         }
//         else
//         {
//             rl.consume(ip, 1).then(rlRes => {
//                 if(rlRes)
//                     setRateLimitedHeaders(res, rlRes);

//                 return jokeSubmission(res, data, fileFormat, ip, analyticsObject, dryRun);
//             }).catch(rlRes => {
//                 if(rlRes)
//                     setRateLimitedHeaders(res, rlRes);

//                 if(rlRes.remainingPoints <= 0)
//                     return respondWithError(res, 101, 429, fileFormat, tr(lang, "rateLimited", settings.httpServer.rateLimiting, settings.httpServer.timeFrame), lang);
//             });
//         }
//     });
// }
