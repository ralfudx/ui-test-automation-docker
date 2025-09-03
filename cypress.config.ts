import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import { defineConfig } from 'cypress';
import spikerz from './cypress/test_data/spikerz';
import dotenv from "dotenv";

// Load .env values into process.env
dotenv.config();

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  id_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type: string;
}

function validateGoogleEnvVars() {
  const requiredVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'];
  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required Google OAuth environment variables: ${missing.join(", ")}\n` +
      `Please add them to your .env file or CI/CD secrets.`
    );
  }
}

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on);

      on('task', {
        async getGoogleToken(): Promise<GoogleTokenResponse> {
          // Validate Google env variables before making the request
          validateGoogleEnvVars();
          const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
              grant_type: 'refresh_token',
            }),
          });
      
          if (!tokenResponse.ok) {
            throw new Error(`Token request failed: ${tokenResponse.statusText}`);
          }
      
          return (await tokenResponse.json()) as GoogleTokenResponse;
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

      config.env.TEST_ENV ??= 'dev'; //we can use a switch statement here to toggle between envs

      const dataENV =
        config.env.TEST_ENV === 'local'
          ? 'dev'
          : (config.env.TEST_ENV as DataENV); // use dev data for testing locally
      config.env.spikerz = spikerz[dataENV];
      return config;
    },

    env: {
      USER_USERNAME: process.env.USER_USERNAME,
      USER_PASSWORD: process.env.USER_PASSWORD,
    },

    retries: {
      runMode: 2,     // Retries in CI (after failure)
      openMode: 1,    // Retries locally
    },

    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 90000,
    experimentalWebKitSupport: true,
  },
});
