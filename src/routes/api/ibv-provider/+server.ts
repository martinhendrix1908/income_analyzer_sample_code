import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const providerName = url.searchParams.get('providerName');
    const unitId = url.searchParams.get("unitId");
    try {
        if (providerName && unitId) {
            const response = await apiRequest(`/IBVService/GetIBVProviderSettings?unitId=${unitId}&providerName=${providerName}`, "GET", locals.user.authToken);
            return json(response);
        }
        const response = await apiRequest(`/IBVService/GetIBVProviders`, "GET", locals.user.authToken);
        return json(response);
    } catch (e) {
        return json({ message: "Unable to fetch IBVProviders" }, { status: 500 });
    }
};