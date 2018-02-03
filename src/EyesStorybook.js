'use strict';

const {EyesBase, RectangleSize, EyesSimpleScreenshot, NullRegionProvider} = require('eyes.sdk.core');
const VERSION = require('../package.json').version;

class EyesStorybook extends EyesBase {

    /**
     * Initializes an Eyes instance.
     *
     * @param {String} [serverUrl] The Eyes server URL.
     * @param {PromiseFactory} [promiseFactory] If not specified will be created using `Promise` object
     **/
    constructor(serverUrl, promiseFactory) {
        super(serverUrl || EyesBase.getDefaultServerUrl(), false, promiseFactory);

        this._title = undefined;
        this._screenshot = undefined;
        this._screenshotUrl = undefined;
        this._inferred = "";

        this._globalFlow = Promise.resolve();
    }

    /** @override */
    getBaseAgentId() {
        return 'eyes.storybook/' + VERSION;
    }

    /**
     * Starts a test.
     *
     * @param {String} appName The application being tested.
     * @param {String} testName The test's name.
     * @param {RectangleSize|{width: number, height: number}} [viewportSize] The client's viewport size (i.e., the visible part of the document's body) or {@code null} to allow any viewport size.
     * @return {Promise}
     */
    open(appName, testName, viewportSize) {
        return super.openBase(appName, testName, viewportSize);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Perform visual validation for the current image.
     *
     * @param {MutableImage} screenshot The image png bytes or ImageProvider.
     * @param {string} [title] An optional tag to be associated with the validation checkpoint.
     * @return {Promise}
     */
    checkImage(screenshot, title) {
        const that = this;
        return this._globalFlow = this._globalFlow.then(() => {
            that._title = title || '';
            that._screenshot = new EyesSimpleScreenshot(screenshot);
            that._screenshotUrl = null;

            const regionProvider = new NullRegionProvider(that.getPromiseFactory());

            that._logger.verbose(`checkImage(screenshot, "${title}")`);
            return super.checkWindowBase(regionProvider, title, false);
        });
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} imageLocation The image URL
     * @param {String} [title] An optional tag to be associated with the validation checkpoint.
     * @return {Promise}
     */
    checkUrl(imageLocation, title) {
        const that = this;
        return this._globalFlow = this._globalFlow.then(() => {
            that._title = title || '';
            that._screenshot = null;
            that._screenshotUrl = imageLocation;

            const regionProvider = new NullRegionProvider(that.getPromiseFactory());

            that._logger.verbose(`checkUrl(${imageLocation}, "${title}")`);
            return super.checkWindowBase(regionProvider, title, false);
        });
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * Ends the currently running test.
     *
     * @param {Boolean} throwEx If true, then the returned promise will 'reject' for failed/aborted tests.
     * @return {Promise.<TestResults>} A promise which resolves/rejects (depending on the value of 'throwEx') to the test results.
     */
    close(throwEx = true) {
        return this._globalFlow = this._globalFlow.then(() => {
            return super.close(throwEx);
        });
    };

    //noinspection JSUnusedGlobalSymbols
    /**
     * Adds a mouse trigger.
     *
     * @param {MouseTrigger.MouseAction} action  Mouse action.
     * @param {Region} control The control on which the trigger is activated (context relative coordinates).
     * @param {Location} cursor  The cursor's position relative to the control.
     */
    addMouseTrigger(action, control, cursor) {
        super.addMouseTriggerBase(action, control, cursor);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Adds a keyboard trigger.
     *
     * @param {Region} control The control's context-relative region.
     * @param {String} text The trigger's text.
     */
    addTextTrigger(control, text) {
        super.addTextTriggerBase(control, text);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the AUT session id.
     *
     * @return {Promise<?String>}
     */
    getAUTSessionId() {
        return this.getPromiseFactory().resolve(undefined);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the viewport size.
     *
     * @return {Promise<RectangleSize>}
     */
    getViewportSize() {
        if (this._screenshot) {
            return this.getPromiseFactory().resolve(this._screenshot.getSize());
        }

        return this.getPromiseFactory().resolve(this._viewportSizeHandler.get());
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Set the viewport size.
     *
     * @param {RectangleSize} viewportSize The required viewport size.
     * @return {Promise<void>}
     */
    setViewportSize(viewportSize) {
        this._viewportSizeHandler.set(new RectangleSize(viewportSize));
        return this.getPromiseFactory().resolve();
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the inferred environment.
     *
     * @protected
     * @return {Promise<String>} A promise which resolves to the inferred environment string.
     */
    getInferredEnvironment() {
        return this.getPromiseFactory().resolve(this._inferred);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Sets the inferred environment for the test.
     *
     * @param {String} inferred The inferred environment string.
     */
    setInferredEnvironment(inferred) {
        this._inferred = inferred;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the screenshot.
     *
     * @return {Promise<EyesSimpleScreenshot>} The screenshot.
     */
    getScreenshot() {
        return this.getPromiseFactory().resolve(this._screenshot);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the screenshot URL.
     *
     * @return {Promise<String>} The screenshot URL.
     */
    getScreenshotUrl() {
        return this.getPromiseFactory().resolve(this._screenshotUrl);
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Get the title.
     *
     * @protected
     * @return {Promise<String>} The current title of of the AUT.
     */
    getTitle() {
        return this.getPromiseFactory().resolve(this._title);
    }
}

module.exports = EyesStorybook;