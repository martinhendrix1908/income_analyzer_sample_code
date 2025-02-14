import { fail, type Actions } from "@sveltejs/kit";
import { API_KEY, SERVER_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import type { ApiResponse } from "$lib/types/types";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals }) => {
    checkUserLogin(locals, url);
    const tab = url.searchParams.get('tab');
    const res = await fetch(`${SERVER_URL}/Organization/GetGlobalPermissions?tab=${tab}`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    if (!res.ok) {
        throw new Error('Unable to fetch roles');
    }
    const jsonRes = await res.json();
    return {
        roles: jsonRes?.data?.roleList || [],
        permissions: jsonRes?.data?.claimList || []
    };
}


export const actions: Actions = {
    setGlobalPermissions: async ({ locals, request, url }) => {
        checkUserLogin(locals, url);
        let permissions = (await request.formData()).get("permissions")
        let res: Response = await fetch(`${SERVER_URL}/Organization/SetGlobalPermissions`, {
            method: "POST",
            headers: {
                authorization: `bearer ${locals.user.authToken}`,
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": API_KEY,
            },
            body: permissions,
        })
        if (!res.ok) {
            return fail(400, { message: "Unable to update Permissions" });
        }
        const data: ApiResponse<any> = await res.json();
        return data;
    }
} satisfies Actions;
