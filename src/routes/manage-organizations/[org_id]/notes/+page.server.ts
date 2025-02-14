import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { formDataToJSONString } from "$lib/utils/common-utils";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { Notes } from "$lib/types/organizations.types";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const id = (params as any).org_id;
    const response = await apiRequest<Notes[]>(`/Organization/GetNotes?orgId=${id}`, "GET", locals.user.authToken);
    return {
        notes: response.data,
    }
};

export const actions: Actions = {
    setNotes: async ({ locals, request }) => {
        const formData = await request.formData();
        formData.set("content", (formData.get("content") as string)?.trim());
        const resData = await apiRequest<Notes[]>(`/Organization/SetNote`, "POST", locals.user.authToken, { body: formDataToJSONString(formData) });
        return resData;
    }
}