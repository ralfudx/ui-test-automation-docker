"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_1 = require("@simonsmith/cypress-image-snapshot/plugin");
const cypress_1 = require("cypress");
const users_1 = __importDefault(require("./cypress/test_data/users"));
const spikerz_1 = __importDefault(require("./cypress/test_data/spikerz"));
exports.default = (0, cypress_1.defineConfig)({
    e2e: {
        async setupNodeEvents(on, config) {
            var _a;
            (0, plugin_1.addMatchImageSnapshotPlugin)(on);
            on('task', {
                async getGoogleToken() {
                    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            client_id: config.env.GOOGLE_CLIENT_ID,
                            client_secret: config.env.GOOGLE_CLIENT_SECRET,
                            refresh_token: config.env.GOOGLE_REFRESH_TOKEN,
                            grant_type: 'refresh_token',
                        }),
                    });
                    if (!tokenResponse.ok) {
                        throw new Error(`Token request failed: ${tokenResponse.statusText}`);
                    }
                    return (await tokenResponse.json());
                },
            });
            on('before:browser:launch', (browser, launchOptions) => {
                if (browser.name === 'chrome' && browser.isHeadless) {
                    // fullPage screenshot size is 1400x1200 on non-retina screens
                    // and 2800x2400 on retina screens
                    launchOptions.args.push('--window-size=1400,1200');
                    // force screen to be non-retina (1400x1200 size)
                    launchOptions.args.push('--force-device-scale-factor=1');
                }
                return launchOptions;
            });
            config.baseUrl = 'https://demo.spikerz.com/';
            (_a = config.env).TEST_ENV ?? (_a.TEST_ENV = 'dev'); //we can use a switch statement here to toggle between envs
            const dataENV = config.env.TEST_ENV === 'local'
                ? 'dev'
                : config.env.TEST_ENV; // use dev data for testing locally
            config.env.users = users_1.default[dataENV];
            config.env.spikerz = spikerz_1.default[dataENV];
            return config;
        },
        chromeWebSecurity: false,
        experimentalModifyObstructiveThirdPartyCode: true,
        defaultCommandTimeout: 15000,
        pageLoadTimeout: 90000,
        experimentalWebKitSupport: true,
    },
});
