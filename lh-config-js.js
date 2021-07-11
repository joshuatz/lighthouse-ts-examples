/**
 * @file This file shows an example of a LightHouse config file, which exports a Lighthouse config object. Since this file is pure JS and the default export is the LH config, it cane be used directly with the CLI
 * @see https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/configuration.md
 */

// @ts-check
/// <reference path="./node_modules/lighthouse/types/config.d.ts" />

/** @type {LH.Config.Json} */
const myCustomLHConfig = {
	extends: 'lighthouse:default',
	settings: {
		onlyCategories: ['pwa']
	}
};

module.exports = myCustomLHConfig;
