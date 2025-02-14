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
    if (!res.ok) {
        throw new Error('Unable to fetch organization records');
    }
    const resData = await res.json();
    if (!resData.succeeded) {
        throw new Error('Unable to fetch organization records');
    }
    return { claims: resData.data.configurations || [], unitList: resData.data.unitList };
}
