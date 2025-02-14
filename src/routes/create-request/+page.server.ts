import { error, fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { formDataToJSONString } from "$lib/utils/common-utils";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ locals, url }) => {
  checkUserLogin(locals, url);
  const res = await fetch(
    `${SERVER_URL}/IBVService/GetIBVProviders`,
    {
      method: "GET",
      headers: {
        authorization: "bearer " + locals?.user?.authToken,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY

      },
    }
  );
  const providerInfo: any = await res.json();

  if (!providerInfo?.length) {
    throw error(404, { message: 'Not been able to get IBV Providers.' })
  }
  return { providerInfo };
};

export const actions: Actions = {
  create_request: async ({ request, locals }) => {
    const formData = await request.formData();
    formData.set("cusPhone", (formData.get("cusPhone") as string).replace(/\D/g, ''));

    const res = await fetch(
      `${SERVER_URL}/IBVService/CreateIBVRequest`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${locals.user.authToken}`,
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": API_KEY,
        },
        body: formDataToJSONString(formData),
      }
    );
    const data = await res.json();
    if (data.status) {
      return data;
    } else {
      return fail(400, data);
    }
  },

} satisfies Actions;