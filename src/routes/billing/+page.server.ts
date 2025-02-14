import type { PageServerLoad } from "../$types";
import { checkUserLogin } from "$lib/utils/api-utils";
export const load: PageServerLoad = async ({ url, locals }) => {
    checkUserLogin(locals, url);
    return {};
};

