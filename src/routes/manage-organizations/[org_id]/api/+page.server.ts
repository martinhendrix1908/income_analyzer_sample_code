import type { PageServerLoad } from "./$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { Bundle, Feature } from "$lib/types/organizations.types";
import type { ApiSettingsConfiguration } from "$lib/types/types";
export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const id = (params as any).org_id;

    const apiSettings= await apiRequest<ApiSettingsConfiguration>(`/Organization/GetAPISettings?orgId=${id}`, "GET", locals.user.authToken);
    const bundleData = await apiRequest<Bundle[]>(`/Organization/GetBundles`, "GET", locals.user.authToken);
    const featureData = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);

    return {
        apiSettings: apiSettings.data,
        featureList: featureData.data,
        bundleList: bundleData.data
    };
}
