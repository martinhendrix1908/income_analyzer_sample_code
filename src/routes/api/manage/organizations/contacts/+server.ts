import type { Contacts } from "$lib/types/organizations.types";
import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    let usersType = url.searchParams.get("usersType");
    let orgId = url.searchParams.get("orgId");
    let type = url.searchParams.get("type");
    
    if (usersType === "support") {
        const response = await apiRequest<Contacts[]>(`/Organization/GetSupportUsers?orgId=${orgId}&type=${type}`, "GET", locals.user.authToken);
        if (response?.succeeded) {
            return json(response?.data || []);
        }
    } else if (usersType === "available") {
        const response = await apiRequest<Contacts[]>(`/Organization/GetAvailableUsers?orgId=${orgId}&type=${type}`, "GET", locals.user.authToken);
        if (response?.succeeded) {
            return json(response?.data || []);
        }
    }
    return json({ succeeded: false, message: "Failed to get the contacts." }, { status: 500 });
}

export const POST: RequestHandler = async ({ locals, request }) => {
    let data: Partial<any> = await request.json();

    const response = await apiRequest<Contacts>(`/Organization/SetSupportUser`, "POST", locals.user.authToken, { body: JSON.stringify(data) });
    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Failed to update support users." }, { status: 500 });
};

export const DELETE: RequestHandler = async ({ locals, url }) => {

    let data = {
        userId: url.searchParams.get("userId"),
        organizationId: url.searchParams.get("organizationId")
    }

    const response = await apiRequest(`/Organization/RemoveSupportUser`, "POST", locals.user.authToken, { body: JSON.stringify(data) });
    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Failed to remove support user." }, { status: 500 });
};