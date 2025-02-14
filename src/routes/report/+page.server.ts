import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { checkUserLogin } from "$lib/utils/api-utils";


export const load: PageServerLoad = async ({ url, locals }) => {
  checkUserLogin(locals, url);
  throw error(404, 'Not Found');
}