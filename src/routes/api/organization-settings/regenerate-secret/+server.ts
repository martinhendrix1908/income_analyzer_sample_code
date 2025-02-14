import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, request }) => {

    const data = await request.json();
    const response = await apiRequest(`/Organization/RegenerateSecret?organizationId=${data.organizationId}`, "POST", locals.user.authToken);
    if (response?.succeeded) {
        return json(response);
    }
    return json({ succeeded: false, message: "Unable to generate secret" }, { status: 500 });
};
