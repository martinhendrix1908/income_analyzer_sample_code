import { API_KEY, SERVER_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";
import { objectToQueryString } from "$lib/utils/common-utils";

export const POST: RequestHandler = async ({ locals, request, }) => {
    const { sortBy, sortOrder, currentPage, searchValue } = await request.json();
    let queryObj = {
        pageNo: currentPage ?? 1,
        sortBy,
        sortOrder,
        filters: searchValue,
    }
    const res = await fetch(`${SERVER_URL}/Users/GetOrganizationRoles?${objectToQueryString(queryObj)}`, {
        headers: {
            authorization: `bearer ${locals.user.authToken}`,
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    if (res.ok) {
        const data = await res.json();
        return json(data.data ?? []);
    }
    return json({ message: "Failed to fetch users" }, { status: 500 });
}