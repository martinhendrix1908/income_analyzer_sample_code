import type { PageServerLoad } from "./$types";
import type { Feature } from "$lib/types/organizations.types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals }) => {
    checkUserLogin(locals, url);

    const response = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);

    return {
        features: response?.data || [],
    };
};
