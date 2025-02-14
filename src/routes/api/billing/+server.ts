import type { BillingResponse } from "$lib/types/billing.types";
import { apiRequest } from "$lib/utils/api-utils";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals }) => {
    const month = url.searchParams.get('month') ?? "12";
    const year = url.searchParams.get("year") ?? "0";
    try {
        const response = await apiRequest<BillingResponse>(`/Billing/Dashboard?month=${month}&year=${year}`, "GET", locals.user.authToken);
        if (!response.succeeded) {
            return error(500, { message: response.message });
        }
        return json(response.data);
    } catch (e) {
        console.error(e);
        return error(500, { message: "Unable to fetch billing data" });
    }
};
