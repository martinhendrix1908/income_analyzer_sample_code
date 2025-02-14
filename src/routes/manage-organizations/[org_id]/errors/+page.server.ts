import type { PageServerLoad } from "./$types";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);

    return {};
};