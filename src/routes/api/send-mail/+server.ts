import { apiRequest } from "$lib/utils/api-utils";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ url, request }) => {
    const { email, mailType } = await request.json();
    const data = {
        email: email,
        templateName: mailType,
        parameters: {
            CallbackUrl: url.origin + "/set-password",
        }
    }
    const response = await apiRequest(`/Auth/SendEmail`, "POST", "", { body: JSON.stringify(data) });
    if (response.succeeded) {
        return json({
            success: true,
            message: response.message || "Email sent successfully"
        })
    } else {
        return json({ success: false, message: response.message || "Failed to send email" }, { status: 500 });
    }
};
