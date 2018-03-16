## Eyes.Storybook

Applitools Eyes SDK For Storybook

[![npm](https://img.shields.io/npm/v/@applitools/eyes.storybook.svg?style=for-the-badge)](https://www.npmjs.com/package/@applitools/eyes.storybook)

### Installation

Add your Applitools API key to your environment variables as `APPLITOOLS_API_KEY`

Install eyes.storybook as a local dev dependency in your tested project:

    npm install --save-dev @applitools/eyes.storybook

Open your package.json, and add a script:

    "eyes-storybook": "eyes-storybook"

### Usage

When your project is setup, you can run a test with the following command:

```
$ npm run eyes-storybook
```

### Advanced configuration

To change browser, viewport sizes, use the renderer, etc., you can use a configuration file. 

Create configuration file called `applitools.config.js` in your project directory (the name can be changed using argument `--conf`, e.g. `npm run eyes-storybook -- --conf myconfig.js`, or update your package.json).

All available options are listed below:

```js
module.exports = {
    /* Server configuration */

    // `serverUrl` is the Eyes server URL that will be used during matching screenshots
    serverUrl: null, // default address stored in eyes.sdk.core

    // `proxy` defines the proxy server that will be used for requests to Applitools services
    // Should be a string in following format 'http://username:password@hostname:port/'
    proxy: null, // default is not set

    // `apiKey` is the Applitools API Key which can be found in the Admin Panel on website
    apiKey: process.env.APPLITOOLS_API_KEY,  // as default used value from environment variable


    /* App and test configuration */

    // `appName` is your application name that will be shown in test results
    appName: null, // as default used your package name from package.json

    // `viewportSize` is the required browser's viewport size or a list of sizes. It can be
    // an array of objects or a single object, e.g. {width: 800, height: 600}
    viewportSize: [
        {width: 750, height: 600}, // by default used the viewport sizes
        {width: 1366, height: 768}
    ],

    // `maxConcurrency` is a number of parallel browsers or connections to renderer server
    maxConcurrency: 0, // default is 0, which means not limited connections to renderer server
                       // or 10 for headless browsers (should be set 1 for non-headless browser)


    /* Storybook configuration */

    // `storybookApp` is used to modify config according to your app. Usually, we don't need
    // the value, but you can force it by use one of values [react, vue, react-native, angular, polymer]
    storybookApp: null, // default is extracted from dependencies of your package.json 

    // `storybookVersion` is related to `storybookApp` and handled in the similar way, defines
    // which version of Storybook are you using, possible values [2, 3]
    storybookVersion: null, // default is extracted from dependencies of your package.json

    // `storybookConfigDir` defines directory where to load Storybook configurations from.
    // The value will be passed to Storybook via `--config-dir` argument
    storybookConfigDir: process.env.SBCONFIG_CONFIG_DIR || './.storybook', // Storybook default

    // `storybookStaticDir` defines directory where to load static files from, comma-separated list.
    // The value will be passed to Storybook via `--static-dir` argument
    storybookStaticDir: process.env.SBCONFIG_STATIC_DIR, // Storybook default


    /* Only for Renderer mode */

    // `useRenderer` defines a mode in which to work. Renderer mode creates a Storybook build
    // and send it to a service which creates a screenshots of each story (in a cloud).
    // Browser mode starts a browsers locally and makes screenshots locally, after that
    // send only images for validation
    useRenderer: false, // default mode is Browser mode, but Renderer mode is faster

    // `skipStorybookBuild` defines whether or not will be run `build-storybook` command.
    skipStorybookBuild: false, // make sure it is set to `false` if you made changes in your app

    // `storybookOutputDir` defines directory where to store built files.
    // The value will be passed to Storybook via `--output-dir` argument
    storybookOutputDir: process.env.SBCONFIG_OUTPUT_DIR || './storybook-static', // Storybook default


    /* Only for Browser mode */

    // `storybookAddress` defines an address to an external Storybook server. Define this value
    // only in case if you don't want that starting Storybook was part of our process.
    // The value should be like 'http://localhost:9001/'
    storybookAddress: null, // by default we will start Storybook server in the process

    // `storybookPort` defines port on which we will start Storybook server. The value
    // is not related to `storybookAddress` and will be ignored if you specify both values
    storybookPort: process.env.SBCONFIG_PORT || 9001, // Storybook default

    // `storybookHost` defines host on which we will start Storybook server. The value
    // is similar to `storybookPort`, can't be used with `storybookAddress`
    storybookHost: process.env.SBCONFIG_HOSTNAME || 'localhost', // Storybook default

    // `seleniumAddress` defines address to selenium server. You can use the next url as 
    // an example: 'http://localhost:4444/wd/hub'
    seleniumAddress: null, // by default we start build-in selenium server

    // `capabilities` defines capabilities that will be passed to WebDriver. You can add
    // options or change browser (make sure that you have required WebDriver in your PATH)
    capabilities: { // by default we use chrome in headless mode
        browserName: 'chrome',
        chromeOptions: { // you can add other options there, like '--force-device-scale-factor=2'
            'args': ['--headless', '--disable-gpu']
        }
    },


    /* Logging  */

    // `showLogs` defines whether or not you want to see logs. There are three possible values:
    // false - means no logs, only test results
    // true - some logs, about what happening in the current moment
    // 'verbose' - all available logs, report about each operation
    showLogs: true, // default is enabled, which is suitable for most cases

    // `showEyesSdkLogs` defines whether or not you want to see logs from eyes.sdk.core.
    // Can be useful if you want to see information about connections to the services.
    // Same as with `showLogs`, there possible three values [false, true, 'verbose']
    showEyesSdkLogs: false, // default is disabled, usually the logs is not interesting

    // `showStorybookOutput` defines whether or not you want to see Storybook output.
    // If Storybook server can't be started, or started with errors, set this option to true
    showStorybookOutput: false, // default is disabled
};
```

You can use content above as template for your `applitools.config.js`

### CLI Options

There is no required options, but some can be used to simplify working experience.

Below you can see output of the `--help` option.

```
Usage: eyes-storybook [options]

Options:
  --help, -h      Show help                                            [boolean]
  --version, -v   Show the version number                              [boolean]
  --conf, -c      Path to configuration file   [default: "applitools.config.js"]
  --renderer, -r  Use renderer mode                                    [boolean]
  --verbose       Display more logs                                    [boolean]
  --debug         Display all possible logs and debug information      [boolean]
```

### Run storybook server separately

If you would like to run storybook server out of the eyes-storybook execution, you should specify `storybookAddress` option in your `applitools.config.js` file and add the following line to the end of `.storybook/config.js`:

**Storybook v2:**

    if (typeof window === 'object') window.__storybook_stories__ = require('@kadira/storybook').getStorybook();

**Storybook v3** (for Vue, Angular and others, just replace @storybook/react according to yours):

    if (typeof window === 'object') window.__storybook_stories__ = require('@storybook/react').getStorybook();

---


Please check the applitools website for more instructions:

- https://applitools.com/resources/tutorial

