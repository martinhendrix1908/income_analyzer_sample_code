import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { API_KEY, SERVER_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ url, locals }) => {
  //route user based on role
  if (url.searchParams.get("resetCode") === null) throw redirect(302, "/");
  if (locals.user?.role === "Admin") throw redirect(302, "/dashboard");
  if (locals.user?.role === "Client") throw redirect(302, "/dashboard");
  if (locals.user?.role === "Agent") throw redirect(302, "/dashboard");

};

export const actions: Actions = {
  set_password: async ({ request }) => {
    const data = await request.formData();
    const code = data.get("code");
    const password = data.get("password");

    if (
      typeof code !== "string" ||
      typeof password !== "string" ||
      !code ||
      !password
    ) {
      return fail(400, { invalid: true });
    }
    const res = await fetch(`${SERVER_URL}/Auth/ResetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY
      },
      body: JSON.stringify({ code, password }),
    });
    const response = await res.json();
    if (!response.succeeded) {
      return fail(400, response);
    }
    return { success: true, message: "Password reset successfully" };
  },
};
