import { fail, type Actions } from "@sveltejs/kit";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { formDataToJSONString } from "$lib/utils/common-utils";
import type { PageServerLoad } from "../$types";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, }) => {
    checkUserLogin(locals, url);
    let res = await fetch(`${SERVER_URL}/Users/GetUser?userId=${locals.user.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    })
    if (!res.ok) throw new Error('Unable to fetch user');
    let data = await res.json();
    return { userData: data.data };
}

export const actions: Actions = {
    updateUserPassword: async ({ request, locals }) => {
        const formData = await request.formData();
        formData.set("userId", locals.user.id);
        const res = await fetch(`${SERVER_URL}/Users/ChangeUserPassword`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${locals.user.authToken}`,
                "Ocp-Apim-Subscription-Key": API_KEY,
                "Content-Type": "application/json",
            },
            body: formDataToJSONString(formData),
        });
        if (!res.ok) return fail(res.status, { message: "Unable to change user password." });
        const data = await res.json();
        return data;
    },
};