import type { PageServerLoad } from "../$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const userId = (params as any).user_id;
    const res = await fetch(`${SERVER_URL}/Users/GetUserRoles?userId=${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    })

    if (!res.ok) throw new Error('Unable to fetch user');
    const userRoles = await res.json();
    if (!userRoles.succeeded) {
        throw new Error('Unable to fetch user');
    }
    return {
        userData: userRoles.data
    }
}