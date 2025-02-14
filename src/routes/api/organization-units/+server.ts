import { json, type RequestHandler } from "@sveltejs/kit";
import { objectToQueryString } from "$lib/utils/common-utils";
import { apiRequest } from "$lib/utils/api-utils";
import type { IOrganizationGroup, IOrganizationUnit } from "$lib/types/types";

export const POST: RequestHandler = async ({ locals, request, params }) => {
    const { sortBy, sortOrder, currentPage, ouType, searchValue, orgUnitId } = await request.json();
    let queryObj = {
        pageNo: currentPage ?? 1,
        sortBy,
        sortOrder,
        filters: searchValue,
        ouType: ouType ?? "group",
        orgUnitId
    }

    const response = await apiRequest<IOrganizationGroup[] | IOrganizationUnit[]>(`/Users/GetOrganizationUnits?${objectToQueryString(queryObj)}`, "GET", locals.user.authToken);
    if (response?.succeeded) {
        return json(response?.data ?? []);
    }
    return json({ succeeded: false, message: "Failed to fetch organization units" }, { status: 500 });
}