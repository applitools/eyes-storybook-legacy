# Changelog

## [Unreleased](https://github.com/applitools/eyes.storybook/compare/v1.7.0...HEAD)
### Features
- Added output of logs from internal `build-storybook` execution
- Added prefix to logs from `build-storybook` or `start-storybook` when they display to general log channel
- Updated dependencies

## [1.7.0](https://github.com/applitools/eyes.storybook/compare/v1.6.1...v1.7.0) - 2018-06-11
### Features
- `chromedriver` dependency is not mandatory for Browser (local) mode, if you already have WebDriver in your PATH, you can skip this dependency
- In VisualGrid (remote) mode, you can set multiple browsers in `capabilities`.`browserName` property. Tests will be preformed on all of them
- Added `eyes-setup` script which allows automatically update Storybook's config (It adds code which exports Storybook to `window` object)
- Added new options `--config-dir`, `--static-dir`, `--output-dir`, `--host`, `--port`, to have similar options like Storybook has

### Bug Fixes
- Close WebDriver when all tests completed in Browser (local) mode

### BREAKING CHANGES
- Changed default value of `viewportSize` property. Now only one size (800x600) will be used
- Replaced next aliases from options `-h` is now belongs to `--host` instead of `--help`, `-c` belongs to `--config-dir` instead of `--conf`

## [1.6.1](https://github.com/applitools/eyes.storybook/compare/v1.6.0...v1.6.1) - 2018-06-05
### Bug Fixes
- Fixed en error which occurred on big bulk requests, because of empty objects in `/render-status` response
- Increased timeouts between `/render-status` requests

## [1.6.0](https://github.com/applitools/eyes.storybook/compare/v1.5.0...v1.6.0) - 2018-05-24
### BREAKING CHANGES
- Renamed `useVisualGrid` config property to `useSelenium` (inverted). Default mode not changed
- Renamed `storybookAddress` and `seleniumAddress` config properties to `storybookUrl` and `seleniumUrl` accordingly
- `Browser mode` is renamed to `Selenium mode`. Renamed Browser classes to Selenium, Rendering to VisualGrid
- `selenium-webdriver` and `chromedriver` modules were removed from dependencies. If you would like to use Selenium mode, you need to install them manually
- Use bulk `/render` and `/render-status` requests to VisualGrid, no concurrency limit (if for some reason you want to use old one, add `--legacy` option)

### Features
- Renamed several variables which contained reference to Storybook 3 (because they are used in Storybook 4 too)
- Progress bar updated, added display of number of processed stories
- Added ability to save results as TAP (Test Anything Protocol) file, you can do that by using `tapFilePath` config property
- Added ability to change platform and browser for VisualGrid testing. To do that use `capabilities`.`platform` and `capabilities`.`browserName` properties similar to Selenium config. Currently supported values are `chrome` and `firefox` for `browserName`, `platform` values will be added later
- Get default batch name from `APPLITOOLS_BATCH_NAME` env variable
- RenderRequest updated, now include render height too (previously only width was used)
- Updated dependencies

## [1.5.0](https://github.com/applitools/eyes.storybook/compare/v1.4.1...v1.5.0) - 2018-04-02
### BREAKING CHANGES
- Changed `--verbose` and `--debug` options' aliases to `-d` and `--dd` accordingly
- Renamed `useRenderer` config property to `useVisualGrid`. Changed default value to `true`
- Set `skipStorybookBuild` config property to `true` by default
- Added `--exitcode` option to use non-zero exit code when tests failed (previously this behaviour was active by default)
- Disabled printing logs by default

### Features
- Updated README file, now includes detailed descriptions
- Added CHANGELOG file
- Added log message which indicates when no config loaded
- Added `--build` option, to force storybook build 
- Added `--info` option, to display base logs
- Added `--local` option, to force use Browser mode
- If log output is disabled, added spinner which indicates processes

## [1.4.1](https://github.com/applitools/eyes.storybook/compare/v1.4.0...v1.4.1) - 2018-02-27
### Bug Fixes
- Increased request timeouts to wait while storybook/angular rebuild webpack
- Fixed extracting stories from builds where exists vendor.bundle.js and preview.bundle.js files 

### Features
- Added ability to set proxy server for external connections
- Added `--renderer` option which force to use render service

## [1.4.0](https://github.com/applitools/eyes.storybook/compare/v1.3.0...v1.4.0) - 2018-02-25
### Features
- User checkSingleWindow method, to reduce number of requests to eyes server

## [1.3.0](https://github.com/applitools/eyes.storybook/compare/v1.2.1...v1.3.0) - 2018-02-24
### Bug Fixes
- Added wait between get storybook bundle requests

### Features
- Added skipStorybookBuild config option
- Changed method to get stories from build to async

## [1.2.1](https://github.com/applitools/eyes.storybook/compare/v1.2.0...v1.2.1) - 2018-02-23
### BREAKING CHANGES
- Renamed `maxBrowsersCount` to `maxConcurrency`, and changed default

### Bug Fixes
- Fixed config validation

### Features
- Created DOM and resources before processing stories
- Removed url from RGridDom, use same DOM for each story

## [1.2.0](https://github.com/applitools/eyes.storybook/compare/v1.1.0...v1.2.0) - 2018-02-21
### Bug Fixes
- Fixed work with node 6
- Improved waiting for storybook server while it is starting

### Features
- Updated log messages
- Added support of React Native, Angular and Polymer
- License changed to Apache 2

## [1.1.0](https://github.com/applitools/eyes.storybook/compare/v1.0.2...v1.1.0) - 2018-02-12
### BREAKING CHANGES
- Package renamed to @applitools/eyes.storybook
- Exit code when tests failed changed to non-zero

### Bug Fixes
- Added reject promise if Storybook port already in use
- Improved work with storybook server

### Features
- Added `serverUrl` to configuration
- Added config options to control logging: `showLogs`, `showEyesSdkLogs`, `showStorybookOutput`
- Added ability to set unlimited number of parallel executions
- Added ability to use Rendering service for remote webpage rendering

## [1.0.2](https://github.com/applitools/eyes.storybook/compare/v1.0.1...v1.0.2) - 2017-12-13
### Features
- Added build-in chromedriver, global installation is not required anymore
- Improved compatibility with Storybook v3 and Storybook Addons

## [1.0.1](https://github.com/applitools/eyes.storybook/compare/v1.0.0...v1.0.1) - 2017-11-16
### Features
- Added output of viewportSize to the story's name

## [1.0.0](https://github.com/applitools/eyes.storybook/compare/v0.0.1...v1.0.0) - 2017-10-06
### Bug Fixes
- The status for new tests changed from `failed` to `new`
- Child process changed to not detached (will be closed on exit)
- Fixed link to package in README
- Fixed issue with default configuration path
- Fixed handling stories when viewportSize is null
- Fixed missing promise error
- Close browsers when they do not need anymore
- Updated permissions for bin/eyes-storybook.js

### Features
- Added ability to work with multiple browsers in parallel
- Config `seleniumAddress` is no longer required, standalone Selenium server will be used instead
- Added default value for viewport size
- All the tests, now use common Batch (better visualisation in admin panel)
- Updated Eyes SDK version

## 0.0.1 - 2017-08-08
First closed beta version with basic abilities
