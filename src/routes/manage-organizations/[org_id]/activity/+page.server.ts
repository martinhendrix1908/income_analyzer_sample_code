import type { PageServerLoad } from "./$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const id = (params as any).org_id;
    const response= await apiRequest<any>(`/Organization/GetActivityLogs?orgId=${id}`, "GET", locals.user.authToken);
    return {
        activities: response?.data,
    };
}
