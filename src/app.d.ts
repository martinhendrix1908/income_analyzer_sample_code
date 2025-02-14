// See https://kit.svelte.dev/docs/types#app

import type { ClientUIConfiguration } from "$lib/types/login.types";
import type { TimestampProp } from "./routes/login/+page.server";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				authToken: string,
				name: string,
				email: string,
				id: string,
				orgId: string,
				role: string,
				last_login: string,
				panelConfig: ClientUIConfiguration,
				timeStamps: TimestampProp,
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
	interface Window {
		_mfq: any[];
	}
}

export { Locals };
