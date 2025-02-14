import type { PageServerLoad } from "../../$types";
import { apiRequest, checkUserLogin } from "$lib/utils/api-utils";
import type { ThirdPartyIntegration } from "$lib/types/organizations.types";
import type { Actions } from "@sveltejs/kit";
import type { ApiResponse } from "$lib/types/types";

export const load: PageServerLoad = async ({ url, locals, params }) => {
    checkUserLogin(locals, url);
    // const queryParams = {
    //     orgId: (params as { org_id: string }).org_id
    // }
    // const res = await apiRequest<ApiResponse<ThirdPartyIntegration[]>>(`/Organization/GetThirdPartyIntegrations`, "GET", locals.user.authToken, { params: queryParams });

    return {
        thirdPartyData: data //res.data,
    };
};

export const actions: Actions = {
    setThirdPartyIntegration: async ({ locals, request, url }) => {
        checkUserLogin(locals, url);
        const formData = await request.formData();
        console.log(formData.get("data"));
        const data = await apiRequest<ApiResponse<null>>(`/Organization/SetThirdPartyIntegration`, "POST", locals.user.authToken, { body: JSON.stringify(formData.get("data")) });
        return data;
    }
} satisfies Actions;

const data: ThirdPartyIntegration[] = [
    {
        id: "8921jdl",
        name: "Google",
        isActive: true,
        api: "****************1265",
        type: "Google",
        created: "2021-01-01T00:00:00.000Z",
        updated: "2021-01-01T00:00:00.000Z",
        createdBy: "John Doe",
        updatedBy: "John Doe",
    },
    {
        id: "8921jdl2",
        name: "Facebook",
        isActive: true,
        api: "****************4632",
        type: "Facebook",
        created: "2021-01-01T00:00:00.000Z",
        updated: "2021-01-01T00:00:00.000Z",
        createdBy: "John Doe",
        updatedBy: "John Doe",
    }
]