import type { PageServerLoad } from "./$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { Bundle, Feature } from "$lib/types/organizations.types";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const bundleRes = await apiRequest<Bundle[]>(`/Organization/GetBundles`, "GET", locals.user.authToken);
    const featuresRes = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);
    return {
        features: featuresRes.data,
        bundles: bundleRes.data,
    };
}