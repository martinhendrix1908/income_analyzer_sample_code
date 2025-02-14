import type { Feature } from "$lib/types/organizations.types";
import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    let sortBy = url.searchParams.get("sortBy");
    let sortOrder = url.searchParams.get("sortOrder");
    const response = await apiRequest<Feature[]>(`/Organization/GetFeatures?sortBy=${sortBy}&sortOrder=${sortOrder}`, "GET", locals.user.authToken);
    if (response?.succeeded) {
        return json(response?.data || []);
    }
    return json({ succeeded: false, message: "Failed to get the features" }, { status: 500 });
}

export const POST: RequestHandler = async ({ locals, request }) => {
    const data = await request.json();
    const _data = {
        featureId: data.featureId,
        featureName: data.featureName,
        basePrice: data.basePrice,
        description: data.description,
        platformFee: data.platformFee,
        tiers: data.tiers,
    }

    const response = await apiRequest<Feature>(`/Organization/SetFeature`, "POST", locals.user.authToken, { body: JSON.stringify(_data) });
    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Failed to update the feature" }, { status: 500 });
};
