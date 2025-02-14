
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { formDataToJSONString } from "$lib/utils/common-utils";
import { checkUserLogin } from "$lib/utils/api-utils";
export const load: PageServerLoad = async ({ url, locals }) => {
    checkUserLogin(locals, url);
};

export const actions: Actions = {
    createUserRole: async ({ locals, request }) => {
        const formData = await request.formData();
        const res = await fetch(`${SERVER_URL}/Users/SetOrganizationRole`, {
            headers: {
                authorization: `bearer ${locals.user.authToken}`,
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": API_KEY,
            },
            body: formDataToJSONString(formData),
            method: "POST"
        });
        if (!res.ok) {
            return fail(400, { message: "Unable to update role" });
        }
        const resData = await res.json();
        return resData;
    }
}