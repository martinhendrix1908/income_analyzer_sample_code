import type { PageServerLoad } from "../$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { checkUserLogin } from "$lib/utils/api-utils";
export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    const id = (params as any).id;
    const res = await fetch(`${SERVER_URL}/Users/GetOrganizationSettings?orgUnitId=${id}&ouType=${url.searchParams.get("type")}`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    const bundleRes = await fetch(`${SERVER_URL}/Organization/GetBundles`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    const featureRes = await fetch(`${SERVER_URL}/Organization/GetFeatures`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    if (!bundleRes.ok || !featureRes.ok) throw new Error('Unable to fetch features or bundles');
    const bundleData = await bundleRes.json();
    const featureData = await featureRes.json();
    if (!res.ok) {
        throw new Error('Unable to fetch organization recordsss');
    }
    let resData = await res.json();
    if (!resData.succeeded) {
        throw new Error('Unable to fetch organization records');
    }
    return {
        claims: resData.data.configurations,
        unitList: resData.data.unitList,
        featureList: featureData.data,
        bundleList: bundleData.data
    };
}
