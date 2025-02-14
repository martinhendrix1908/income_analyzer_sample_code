import type { IAdminDetails } from "$lib/types/organizations.types";
import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    let org_id = url.searchParams.get("id");
    let sortBy = url.searchParams.get("sortBy");
    let sortOrder = url.searchParams.get("sortOrder");

    const response = await apiRequest<IAdminDetails[]>(`/Organization/GetAdmins?organizationId=${org_id}&sortBy=${sortBy}&sortOrder=${sortOrder}`, "GET", locals.user.authToken);

    if (response?.succeeded) {
        return json(response?.data || []);
    }
    return json({ succeeded: false, message: "Failed to get the admins." }, { status: 500 });
}

export const POST: RequestHandler = async ({ locals, request }) => {
    let data: Partial<IAdminDetails> = await request.json();

    if (data.userId == "0") {
        data = {
            userId: "",
            organizationId: data.organizationId,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            emailId: data.emailId,
            mobile: data.mobile,
            isActive: data.isActive,
            clientType: data.clientType,
        }
    }
    const response = await apiRequest<IAdminDetails>(`/Organization/SetAdmin`, "POST", locals.user.authToken, { body: JSON.stringify(data) });
    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Failed to update the admin." }, { status: 500 });
};