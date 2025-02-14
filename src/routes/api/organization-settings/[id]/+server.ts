import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ url, locals, request, params }) => {
    const id: string = (params as { id: string }).id;
    const selectedUnits = url.searchParams.get('selectedUnits');
    const applyToOverridden = url.searchParams.get('applyToOverridden');
    const data = await request.json();
    const formData = {
        orgUnitId: id,
        configurations: data,
        selectedUnits: selectedUnits,
        applyToOverridden: applyToOverridden === "true"
    };

    const response = await apiRequest(`/Users/SetOrganizationSettings`, "POST", locals.user.authToken, { body: JSON.stringify(formData) });
    if (response?.succeeded) {
        return json(response);
    }

    return json({ message: "Failed to update organization settings" }, { status: 500 });
};
