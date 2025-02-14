import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user?.role === 'Admin') {
    throw redirect(302, "/dashboard");
  }
  else if (locals.user?.role === 'Agent') {
    throw redirect(302, '/dashboard')
  }
  else {
    throw redirect(302, '/login')
  }
}