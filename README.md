# Lighthouse TypeScript Example
> Quickly thrown-together example of using the Lighthouse package with TypeScript.

## Details
For more details, see [my post](https://joshuatz.com/posts/2021/using-lighthouse-cli-nodejs/?utm_source=repo&utm_medium=readme)

## Files of Interest
- [`ambients.d.ts`](./ambients.d.ts)
	- Shows how to provide typings (via *ambient declarations*) for the `lighthouse` package, where they are missing
- [`lh-config-ts.ts`](./lh-config-ts.ts)
	- A Lighthouse config file, fully-typed, written in TypeScript
- [`lh-config-js.js`](./lh-config-js.js)
	- A Lighthouse config file, written in JavaScript, but with type-checking provided via JSDoc annotations
- [`index.ts`](./index.ts)
	- Shows a few different basic ways to use the `lighthouse` package in a custom NodeJS script, with TypeScript

## Ambient Types
To pull in the ambient Lighthouse types, there are a few options.

For this demo, I've added the files to [the `tsconfig.json` file](./tsconfig.json), under `include`:

```json
{
  "include": ["./node_modules/lighthouse/types/**/*.d.ts"]
}
```

However, another option is to use triple-slash directives, like so:

```ts
/// <reference path="./node_modules/lighthouse/types/externs.d.ts" />
/// <reference path="./node_modules/lighthouse/types/config.d.ts" />
/// <reference path="./node_modules/lighthouse/types/lhr.d.ts" />
/// <reference path="./node_modules/lighthouse/types/protocol.d.ts" />
```