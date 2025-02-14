import type { PageServerLoad } from "./$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { Bundle, Feature } from "$lib/types/organizations.types";
import type { SubscriptionDetailsConfiguration } from "$lib/types/types";
export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const id = (params as any).org_id;
    const subscriptionData = await apiRequest<SubscriptionDetailsConfiguration>(`/Organization/GetSubscriptionSettings?orgId=${id}`, "GET", locals.user.authToken);
    const bundleData = await apiRequest<Bundle[]>(`/Organization/GetBundles`, "GET", locals.user.authToken);
    const featureData = await apiRequest<Feature[]>(`/Organization/GetFeatures`, "GET", locals.user.authToken);

    if (!subscriptionData.succeeded) {
        throw new Error('Unable to fetch organization records');
    }
    return {
        subscriptionDetails: subscriptionData?.data,
        featureList: featureData?.data || [],
        bundleList: bundleData?.data || []
    };
}
