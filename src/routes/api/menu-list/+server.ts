import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {

    const response = await apiRequest(`/Auth/GetMainMenu`, "GET", locals.user.authToken);
    
    if (response?.succeeded) {
        return json(response?.data || []);
    }
    return json({ succeeded: false, message: "Failed to get menu items" }, { status: 500 });
}