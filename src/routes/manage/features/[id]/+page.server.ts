import type { PageServerLoad } from "./$types";
import type { Feature } from "$lib/types/organizations.types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);

    const featureResponse = await apiRequest<Feature>(`/Organization/GetFeature?featureId=${params.id}`, "GET", locals.user.authToken);

    return {
        feature: featureResponse?.data || null,
    };
};

