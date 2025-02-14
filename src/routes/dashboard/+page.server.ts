import { API_KEY, SERVER_URL } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { FilterProp, GetRequestIdsResponse } from "$lib/types/types";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, locals }) => {
  checkUserLogin(locals, url);

  const res = await fetch(`${SERVER_URL}/TransDetails/GetRequestIds`, {
    method: "POST",
    headers: {
      authorization: `bearer ${locals.user.authToken}`,
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": API_KEY,
    },
    body: JSON.stringify({
      filter: {
        filterExp: {
          operation: "AND",
          elements: [
            {
              fieldName: "AppUserId",
              fieldValue: locals?.user?.id || "",
              mode: "exactMatch",
            },
          ],
        },
      },
      pageNumber: 1,
      pageSize: 20,
      sortFieldName: "SubscribedOn",
      orderByDescending: true,
    }),
  });
  const data: GetRequestIdsResponse = await res.json();
  return data;
};

export const actions: Actions = {
  getFilteredRequestIdsWithPagination: async ({ locals, request }) => {
    if (!locals?.user?.authToken) throw redirect(302, "/login");

    const data = await request.formData();
    const clientId = data.get("clientId") as string;
    const sortBy = data.get("sortBy") as string;
    const sortDirection = data.get("sortDirection") as string;
    const searchValue = data.get("searchValue") as string;

    if (
      typeof clientId !== "string" ||
      typeof sortBy !== "string" ||
      typeof sortDirection !== "string" ||
      !sortBy ||
      !sortDirection
    ) return fail(400, { invalid: true });

    const sortOrder: boolean = parseInt(sortDirection) ? parseInt(sortDirection) < 0 : false;
    let filter: FilterProp = {};
    if (searchValue) {
      filter = {
        filterBExp: {
          operation: "AND",
          expressions: [
            {
              operation: "OR",
              elements: [
                {
                  fieldName: "CustomerName",
                  fieldValue: "%" + searchValue?.trim() + "%" || "%",
                  mode: "likeMatch",
                },
                {
                  fieldName: "RequestCode",
                  fieldValue: "%" + searchValue?.trim() + "%" || "%",
                  mode: "likeMatch",
                },
              ],
            },
          ],
        },
      };
    }

    if (clientId) {
      filter = filter || {};
      filter.filterExp = {
        operation: "AND",
        elements: [
          {
            fieldName: "AppUserId",
            fieldValue: clientId,
            mode: "exactMatch",
          },
        ],
      }
    };

    let res: Response = await fetch(`${SERVER_URL}/TransDetails/GetRequestIds`, {
      method: "POST",
      headers: {
        authorization: `bearer ${locals.user.authToken}`,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
      body: JSON.stringify({
        filter,
        pageNumber: 1,
        pageSize: 20,
        sortFieldName: sortBy,
        orderByDescending: sortOrder,
      }),
    })

    const requestIds: GetRequestIdsResponse = await res.json();
    return requestIds;

  }
} satisfies Actions;
