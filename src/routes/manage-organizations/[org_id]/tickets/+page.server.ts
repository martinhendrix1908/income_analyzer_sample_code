import type { PageServerLoad } from "../../$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { Ticket } from "$lib/types/organizations.types";
import type { Actions } from "@sveltejs/kit";
import type { ApiResponse } from "$lib/types/types";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    // const queryParams = {
    //     orgId: (params as { org_id: string }).org_id
    // }
    // const res = await apiRequest<ApiResponse<Ticket[]>>(`/Organization/GetTickets`, "GET", locals.user.authToken, { params: queryParams });

    return {
        tickets: data //res.data,
    };
};

export const actions: Actions = {
    setTicket: async ({ locals, request, url }) => {
        checkUserLogin(locals, url);
        const formData = await request.formData();
        const data = await apiRequest<ApiResponse<null>>(`/Organization/SetTicket`, "POST", locals.user.authToken, { body: JSON.stringify(formData.get("ticket")) });
        return data;
    }
} satisfies Actions;

const data: Ticket[] = [
    {
        "id": "#er3r2dsf",
        "subject": "Billing Issue",
        "status": 0,
        "priority": 2,
        "created": "2025-01-01",
        "updated": "",
        "createdBy": "John Doe",
        "updatedBy": "Jane Doe"
    },
    {
        "id": "#ikja93oil",
        "subject": "Technical Support",
        "status": 3,
        "priority": 3,
        "created": "2025-01-02",
        "updated": "",
        "createdBy": "John Doe",
        "updatedBy": "Jane Doe"
    }
]