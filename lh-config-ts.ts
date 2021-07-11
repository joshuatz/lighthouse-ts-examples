/**
 * @file This file shows an example of a LightHouse config file, which exports a Lighthouse config object. WARNING: Since this file is written in TypeScript, it needs to be transpiled to JS before it can be used with the CLI. But, it could be imported and used within TS as-is.
 * @see https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/configuration.md
 */

export const myCustomLHConfig: LH.Config.Json = {
	extends: 'lighthouse:default',
	settings: {
		onlyCategories: ['pwa']
	}
};

export default myCustomLHConfig;
