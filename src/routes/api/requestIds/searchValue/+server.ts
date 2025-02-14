import { API_KEY, SERVER_URL } from "$env/static/private";
import type { FilterProp } from "$lib/types/types";
import { json } from "@sveltejs/kit";

export async function POST({ request }:{ request: Request }) {
  const { authToken, clientId, sortBy, sortDirection, searchValue, currentPage } = await request.json();
  const sortOrder: boolean = parseInt(sortDirection)
    ? parseInt(sortDirection) < 0
    : false;
  let filter: FilterProp | null = null;

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
                fieldValue: "%" + searchValue.trim() + "%" || "%",
                mode: "likeMatch",
              },
              {
                fieldName: "RequestCode",
                fieldValue: "%" + searchValue.trim() + "%" || "%",
                mode: "likeMatch",
              },
            ],
          },
        ],
      },
    };
  }

  if (clientId !== "") {
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
    };
  }
  let res: Response;

  if (filter === null) {
    res = await fetch(`${SERVER_URL}/TransDetails/GetRequestIds`, {
      method: "POST",
      headers: {
        authorization: `bearer ${authToken}`,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
      body: JSON.stringify({
        pageNumber: currentPage ?? 1,
        pageSize: 20,
        sortFieldName: sortBy,
        orderByDescending: sortOrder,
      }),
    });
  } else {
    res = await fetch(`${SERVER_URL}/TransDetails/GetRequestIds`, {
      method: "POST",
      headers: {
        authorization: `bearer ${authToken}`,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
      body: JSON.stringify({
        filter,
        pageNumber: currentPage ?? 1,
        pageSize: 20,
        sortFieldName: sortBy,
        orderByDescending: sortOrder,
      }),
    });
  }

  const data = await res.json();
  
  return json(data);
}
