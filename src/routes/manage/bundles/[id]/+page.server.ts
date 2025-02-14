import type { PageServerLoad } from "./$types";
import type { Bundle, Feature } from "$lib/types/organizations.types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);

    const bundleResponse = await apiRequest<Bundle>(`/Organization/GetBundle?bundleId=${params.id}`, "GET", locals.user.authToken);
    const featureResponse = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);

    return {
        bundle: bundleResponse?.data || null,
        features: featureResponse?.data || [],
    };
};
