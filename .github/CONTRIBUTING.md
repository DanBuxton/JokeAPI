<div style="text-align:center;" align="center">

## JokeAPI Contribution Guide
<b><sup>— for API version 3 —</sup></b>

</div>

### Table of Contents:
- Setting up JokeAPI locally on your device
  1. [Preparing the IDE](#preparing-the-ide)
  2. [Setting up JokeAPI](#setting-up-jokeapi)
  3. [Running JokeAPI](#running-jokeapi)
  4. [Development commands](#development-commands)
- [Submitting translations](#submitting-translations)
- [Code conventions](#code-conventions)

<br>

## Preparing the IDE
1. Install [Node.js](https://nodejs.org/) (LTS version recommended) and [Git](https://git-scm.com/)
2. Install [VS Code](https://code.visualstudio.com/) (strongly recommended) or any preferred IDE
3. When using VS Code, after opening the project folder you should be prompted to install a few recommended extensions.  
  These are not technically required but will make working with the code a LOT easier.

<br>

## Setting up JokeAPI
1. Install Node.js, Git and pnpm
2. Fork and clone the repository, then run `git clone https://github.com/YourUsername/JokeAPI.git`
3. Check out all submodules with `git submodule update --init --recursive`
4. Install all dependencies with `pnpm i`
5. Copy the file `.env.template` to `.env` and fill in the values

<br>

## Running JokeAPI
- Run `pnpm run dev` to start JokeAPI in development mode and automatically recompile and restart it when you make changes to the code
- Run `pnpm run start` to build JokeAPI normally and start it in production mode

<br>

## Development commands
| Command | Description |
| --- | --- |
| `pnpm run dev` | Starts JokeAPI in development mode and automatically recompiles and restarts it when you make changes to the code |
| `pnpm run start` | Builds JokeAPI normally and starts it in production mode |
| `pnpm run lint` | Builds and checks the code for any warnings or errors |
<!-- TODO: | `pnpx changeset` | Create new patch notes that will be added to the changelog automatically and trigger the automatic versioning and deployment | -->

<br><br>

## Submitting Translations:
TODO
<!--This guide will tell you how you can and should contribute to JokeAPI.  -->
<!--Not following it might cause me to reject your changes but at the very least we will both lose time.  -->
<!--So please read this guide before contributing. Thanks :)-->
<!---->
<!--## Table of Contents:-->
<!--- [Submitting or editing jokes](#submitting-or-editing-jokes)-->
<!--- [Contributing to JokeAPI's code](#submitting-code)-->
<!--- [Submitting a translation](#submitting-translations)-->
<!--- [Tips and Tricks for contributing](#other-nice-to-know-stuff)-->
<!---->
<!--<br><br><br><br>-->
<!---->
<!--## Submitting or editing jokes:-->
<!--To submit a joke manually, you can use the form on [this page.](https://v2.jokeapi.dev/#submit)  -->
<!--To submit it through code, you can make use of the ["submit" endpoint.](https://v2.jokeapi.dev/#submit-endpoint)  -->
<!--  -->
<!--If you instead want to edit a joke yourself, you can find them in the `jokes-xy.json` files in [`data/jokes/`](../data/jokes/)  -->
<!--To submit your changes, create a pull request. Also make sure to follow the [code contribution instructions.](#submitting-code)  -->
<!--  -->
<!--If you want a joke to be edited or deleted, please submit a new issue [here.](https://github.com/Sv443-Network/JokeAPI/issues/new?assignees=Sv443&labels=joke+edit&template=3_edit_a_joke.md)  -->
<!--Keep in mind, though, that I will not remove jokes based on opinions as that would defeat the API's main purpose, to provide jokes for everyone's taste.  -->
<!-- TODO: provide source of dark jokes, since this is fully transparent and open source software -->
<!---->
<!--<br><br>-->
<!---->
<!--## Submitting code:-->
<!--1. [Read the Code_of_Conduct.md file](./Code_of_Conduct.md) (TLDR: just behave in a friendly manner).-->
<!--2. [Click here](https://github.com/Sv443-Network/JokeAPI/fork) to fork the repository. Afterwards, clone or download it and locate the folder where it is contained.-->
<!--3. Make the changes you want to make to the code.-->
<!--4. Run the script `npm run all` which will run these commands:-->
<!--    - `npm run validate-jokes` to make sure all jokes are formatted correctly.-->
<!--    - `npm run validate-ids` to verify that all jokes have the correct ID.-->
<!--    - `npm run lint` to check the code for any warnings or errors.-->
<!--    - `npm run dep-graph` to generate a new dependency graph.-->
<!--    - `npm run generate-changelog` to generate a Markdown changelog out of the plaintext one.-->
<!--    - `npm run test`, which runs the unit tests for JokeAPI. If you are colorblind, you can run the command `npm run test-colorblind` (will turn green into cyan and red into magenta).-->
<!--5. Run JokeAPI locally by running the command `node JokeAPI`, request some jokes and test the areas you modified / added to make sure everything still works.-->
<!--6. Add yourself to the `contributors` object in the [`package.json`](../package.json) file :)-->
<!--     - **If it doesn't exist or is empty** please add it using the second format on [this website](https://flaviocopes.com/package-json/#contributors) -->
<!--7. Submit a pull request on your forked repository, selecting `Sv443-Network/JokeAPI` as the base repo and `master` as the base branch and selecting `YourUsername/JokeAPI` as the head repo and `YourBranch` as the compare branch-->
<!--    - If your pull request is not ready to be merged yet, you can add `[WIP]` to the beginning of the title which will tell the repo maintainer(s) and automated scripts not to merge it yet.-->
<!--8. Request a review from me (Sv443).-->
<!--9. Check if the CI script and other checks for your pull request were successful (they can be found below the comments).-->
<!--    - **If they were unsuccessful:** view the log, fix the errors, commit the code and push to the same branch. This will automatically update your pull request and re-run the checks.-->
<!--10. Once the pull request is approved and merged, you can delete the source branch and your forked repo if you want to.  -->
<!--    - **If it isn't**, please read the comments from the reviewer(s) and make the necessary changes.-->
<!--  -->
<!--<br><br>-->
<!---->
<!--## Submitting Translations:-->
<!--If you want to submit a translation, please follow these steps:  -->
<!--1. Find your language's two-character code in the file [`data/languages.json`](../data/languages.json). You'll need to specify it for every translation.-->
<!--2. Translate coded error messages in the file [`data/errorMessages.js`](../data/errorMessages.js) by following the style of the other translations.-->
<!--3. Translate the generic strings inside of the file [`data/translations.json`](../data/translations.json) by also following the style of the other translations.-->
<!--4. Add yourself to the `contributors` object in the [`package.json`](../package.json) file :)-->
<!---->
<!--<br><br>-->
<!---->
<!--## Other nice-to-know stuff:-->
<!--- I really recommend using [Visual Studio Code](https://code.visualstudio.com/) with the extension [`fabiospampinato.vscode-highlight`](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-highlight) - it will add custom styling to the syntax highlighting in the editor and make the code easier to read and work with.  -->
<!--- If you want to generate a dependency graph, you need to install [Graphviz](https://graphviz.gitlab.io/download/) and add the path to the `bin` folder to your `%PATH%` / `$PATH` environment vaiable. Then, run the command `npm run dependency-graph` and open the file [`dev/dependency-graph.html`](../dev/dependency-graph.html) in a browser.  -->
<!--- If you need to add an authorization token, you can generate one or multiple tokens with the command `npm run add-token [amount]`. If you omit the "amount" parameter, the script will generate a single token. After you run the command, the tokens will be listed in the console and you can now (after restarting JokeAPI) use it in the `Authorization` header to gain unlimited access to JokeAPI [(better explanation here).](https://jokeapi.dev/#api-tokens)  -->
<!---->
<!--<br><br>-->
<!---->
<!--## If you need any help, feel free to contact me through [Discord](https://sv443.net/discord) (fastest way to contact me) or [E-Mail](mailto:contact@sv443.net?subject=Questions%20about%20contributing%20to%20JokeAPI)-->

<br>

## Code Conventions
- JS/TS
  - Use ESLint & Prettier to format your code before committing  
    Rules: 2 spaces, double quotes, semicolons, trailing commas, etc. (see [`.eslintrc.cjs`](../.eslintrc.cjs))
  - Add the extension `.js` to file imports, even for TypeScript!
  - Use `const` for everything unless you need to reassign the variable using the `=` operator
- HTTP
  - URL parameters should always use lower-kebab-case
  - URL paths should use lower-kebab-case as well
- Git
  - Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for your commit messages:  
    - Commit prefixes: `feat:` - new feature, `fix:` - bug fix, `docs:` - changes to documentation, `ref:` - refactor, `ci:` - changes to CI, `chore:` - non-code / build process changes
    - Add an exclamation mark before the colon to indicate a breaking change, e.g. `feat!: changed foo`
    - Add an issue number in parentheses before the colon (or exclamation mark) to link the commit to an issue, e.g. `feat(#123): added foo`
  - Create feature branches for your changes and open a pull request to merge them into the `main` branch
  - Create a draft pull request if your changes are not fully ready to be merged yet, but you want to use CI or other PR features
- General
  - Add yourself to the `contributors` object in the [`package.json`](../package.json) file
