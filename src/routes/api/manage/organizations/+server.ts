import type { IOrganizationDetails } from "$lib/types/organizations.types";
import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    let sortBy = url.searchParams.get("sortBy");
    let sortOrder = url.searchParams.get("sortOrder");

    const response = await apiRequest<IOrganizationDetails[]>(`/Organization/GetOrganizations?sortBy=${sortBy}&sortOrder=${sortOrder}`, "GET", locals.user.authToken);

    if (response?.succeeded) {
        return json(response?.data || []);
    }
    return json({ succeeded: false, message: "Failed to get the organizations." }, { status: 500 });
}

export const POST: RequestHandler = async ({ locals, request }) => {
    let data: Partial<IOrganizationDetails> = await request.json();

    if (data.organizationId == 0) {
        data = {
            organizationId: 0,
            organizationName: data.organizationName,
            bundleId: data.bundleId,
            featureIds: data.featureIds,
            isActive: data.isActive,
        }
    }
    const response = await apiRequest<IOrganizationDetails>(`/Organization/SetOrganization`, "POST", locals.user.authToken, { body: JSON.stringify(data) });

    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Failed to update organization." }, { status: 500 });
};