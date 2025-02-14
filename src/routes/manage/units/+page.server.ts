import { API_KEY, SERVER_URL } from "$env/static/private";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";
import type { ApiResponse, IUnit } from "$lib/types/types";
import { formDataToJSONString } from "$lib/utils/common-utils";
import { checkUserLogin } from "$lib/utils/api-utils";
export const load: PageServerLoad = async ({ url, locals }) => {
    checkUserLogin(locals, url);

    const groupDetailsRes = await fetch(`${SERVER_URL}/Users/GetOrganizationUnit`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });

    if (!groupDetailsRes.ok) {
        throw new Error('Unable to fetch organization records');
    }
    const groupLists: ApiResponse<{ orgGroupList: IUnit[] }> = await groupDetailsRes.json();
    return {
        groupLists: groupLists.data.orgGroupList,
    };
};

export const actions: Actions = {
    updateOrganizationUnit: async ({ locals, request, url }) => {
        checkUserLogin(locals, url);
        const formData = await request.formData();
        formData.delete("isTrue");
        let res: Response = await fetch(`${SERVER_URL}/Users/SetOrganizationUnit`, {
            method: "POST",
            headers: {
                authorization: `bearer ${locals.user.authToken}`,
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": API_KEY,
            },
            body: formDataToJSONString(formData),
        })
        if (!res.ok) {
            return fail(400, { message: "Failed to update organization unit" });
        }
        const data: ApiResponse<any> = await res.json();
        return data;
    }
} satisfies Actions;
