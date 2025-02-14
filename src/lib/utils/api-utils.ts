import { redirect } from "@sveltejs/kit";
import { API_KEY, SERVER_URL } from "$env/static/private";
import { objectToQueryString } from "./common-utils";
import type { ApiResponse } from "$lib/types/types";
import { addToast } from "$lib/store/toast-store";

export function checkUserLogin(locals: App.Locals, url: URL) {
  if (!locals?.user?.authToken) {
    const returnURL = url.pathname + url.search;
    throw redirect(302, `/login?returnURL=${encodeURIComponent(returnURL)}`);
  }
}

export async function apiRequest<T>(endpoint: string,
  method: "GET" | "POST",
  token: string,
  data: any = {},
  customHeaders?: { [key: string]: string }
): Promise<ApiResponse<T>> {
  const { params, body } = data; // Destructure params and body from data if provided

  let url = `${SERVER_URL}/${endpoint}`;

  if (params) url += '?' + objectToQueryString(params); // Add query parameters if provided

  if (!method) method = "GET"; // Default to GET if method is not provided

  const headers: RequestInit["headers"] = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": API_KEY,
    ...customHeaders,
  };

  if (token !== "") headers["Authorization"] = `Bearer ${token}`;

  let options: RequestInit = { method, headers }

  if (method === "POST") {
    options = {
      ...options, body: body ?? null
    }
  }
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const res: ApiResponse<T> = await response.json();

    if (!res.succeeded) {
      addToast({
        message: res.message || "Something went wrong.",
        type: "error"
      })
    }
    return res
  } catch (error) {
    console.error("API request error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to complete API request"
    );
  }

}