import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Bundle, Feature } from "$lib/types/organizations.types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);

    const isBankuityAdmin = locals?.user?.orgId === "0";
    const orgId = (params as { org_id: string }).org_id;

    if (!isBankuityAdmin) {
        if (!orgId) {
            throw redirect(302, `/manage-organizations/${locals.user.orgId}/details`);
        }
        throw error(403, 'Forbidden');
    }
    
    const bundleResponse = await apiRequest<Bundle[]>(`/Organization/GetBundles`, "GET", locals.user.authToken);
    const featuresResponse = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);

    return {
        features: featuresResponse.data || [],
        bundles: bundleResponse?.data || [],
    };
};
