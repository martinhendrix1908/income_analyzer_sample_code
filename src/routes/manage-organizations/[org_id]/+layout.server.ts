import { error } from "@sveltejs/kit";
import type { IOrganizationDetails } from "$lib/types/organizations.types";
import type { PageServerLoad } from "../$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    if (locals?.user?.orgId !== "0" && (params as { org_id: string }).org_id !== locals.user.orgId) {
        throw error(403, 'Forbidden');
    }
    const org_id: string = (params as { org_id: string }).org_id;

    const orgResponse= await apiRequest<IOrganizationDetails>(`/Organization/GetOrganization?organizationId=${org_id}`, "GET", locals.user.authToken);

    if (!orgResponse?.succeeded) {
        throw new Error('Unable to fetch organization.');
    }
    return {
        orgDetails: orgResponse?.data || null,
        organizationStructure: JSON.parse(orgResponse?.data?.orgStructure ?? "{}")
    };
}
