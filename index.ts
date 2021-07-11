// Main lighthouse runner / fn
import lighthouse from 'lighthouse';
// Required for launching chrome instance
import chromeLauncher = require('chrome-launcher');

// This is a preset / pre-built configuration file
import DesktopConfig from 'lighthouse/lighthouse-core/config/desktop-config.js';

// So we can save report to local filesystem
import { writeFile } from 'fs/promises';

async function presetConfig() {
	const chrome = await chromeLauncher.launch();

	const results = await lighthouse(
		'https://example.com',
		{
			port: chrome.port,
			output: 'html'
		},
		DesktopConfig
	);

	await writeFile('./lh-desktop-report.html', results.report);
	await chrome.kill();
}

async function extendPreset() {
	const chrome = await chromeLauncher.launch();

	const results = await lighthouse(
		'https://example.com',
		{
			port: chrome.port,
			output: 'html'
		},
		{
			...DesktopConfig,
			categories: {
				// We have to spread preset here too, or else this object will replace *all* in preset
				...DesktopConfig.categories,
				'installable-check': {
					title: 'Installable Check',
					auditRefs: [{ id: 'installable-manifest', weight: 1, group: 'pwa-installable' }]
				}
			}
		}
	);

	await writeFile('./lh-extended_preset-report.html', results.report);
	await chrome.kill();
}

async function useLocalPreset() {
	const chrome = await chromeLauncher.launch();

	const { myCustomLHConfig } = await import('./lh-config-ts');

	const results = await lighthouse(
		'https://example.com',
		{
			port: chrome.port,
			output: 'html'
		},
		myCustomLHConfig
	);

	await writeFile('./lh-local_preset-report.html', results.report);
	await chrome.kill();
}

async function adHocConfig() {
	const chrome = await chromeLauncher.launch();

	const results = await lighthouse(
		'https://example.com',
		{
			port: chrome.port,
			output: ['html', 'json']
		},
		{
			extends: 'lighthouse:default',
			settings: {
				onlyCategories: ['performance']
			}
		}
	);

	await writeFile('./lh-ad_hoc-report.html', results.report[0]);
	await writeFile('./lh-ad_hoc-report.json', results.report[1]);
	await chrome.kill();
}

export async function runAll() {
	const runners = [presetConfig, extendPreset, useLocalPreset, adHocConfig];
	// Not optimized - I'm running in serial instead of parallel as an easy workaround to avoid port conflicts and that sort of thing. Should be rewritten outside of a demo
	for (const runner of runners) {
		await runner();
	}
}
