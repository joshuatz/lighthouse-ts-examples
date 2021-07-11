// This provides typing for all the preset / pre-built configs shipped with LH
declare module 'lighthouse/lighthouse-core/config/*.js' {
	const config: LH.Config.Json;
	export = config;
}

// I'm only providing types for this because it is used as part of the main `lighthouse()` fn
declare module 'lighthouse/lighthouse-core/gather/connections/connection' {
	class Connection {
		constructor();
		// Not implemented, will throw currently
		connect(): Promise<void>;
		disconnect(): Promise<void>;
		wsEndpoint(): Promise<void>;

		sendCommand<C extends keyof LH.CrdpCommands>(
			method: C,
			sessionId: string | undefined,
			paramArgs: LH.CrdpCommands[C]['paramsType']
		): Promise<LH.CrdpCommands[C]['returnType']>;
		on(eventName: 'protocolevent', cb: (arg0: LH.Protocol.RawEventMessage) => void): void;
		off(eventName: 'protocolevent', cb: (arg0: LH.Protocol.RawEventMessage) => void): void;
		protected sendRawMessage(message: string): void;
		protected handleRawMessage(message: string): void;
		emitProtocolEvent(eventMessage: LH.Protocol.RawEventMessage): void;
		protected dispose(): void;
	}
	export = Connection;
}

declare module 'lighthouse' {
	import Connection = require('lighthouse/lighthouse-core/gather/connections/connection');
	/**
	 * Run Lighthouse.
	 * @param url The URL to test. Optional if running in auditMode.
	 * @param flags Optional settings for the Lighthouse run. If present,
	 *   they will override any settings in the config.
	 * @param configJSON Configuration for the Lighthouse run. If
	 *   not present, the default config is used.
	 * @param userConnection
	 */
	function lighthouse(
		url?: string,
		flags?: LH.Flags,
		configJSON?: LH.Config.Json,
		userConnection?: Connection
	): Promise<LH.RunnerResult>; // Technically supposed to be LH.RunnerResult | undefined
	export = lighthouse;
}
