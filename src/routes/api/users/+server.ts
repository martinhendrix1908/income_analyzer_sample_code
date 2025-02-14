import { json, type RequestHandler } from "@sveltejs/kit"
import { API_KEY, SERVER_URL } from "$env/static/private";

export const GET: RequestHandler = async ({ locals, url }) => {

    const res = await fetch(`${SERVER_URL}/Users/GetUsers${url?.search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
    });
    if (res.ok) {
        const user = await res.json();
        return json(user.data);
    }
    return json({ message: "Failed to fetch users" }, { status: 500 });
}