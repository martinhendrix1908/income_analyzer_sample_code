import { API_KEY, SERVER_URL } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals, url }) => {
    let routingNumber = url.searchParams.get("routingNumber");

    const res = await fetch(
        `${SERVER_URL}/IBVService/GetBankName?routingNumber=${routingNumber}`,
        {
            method: "GET",
            headers: {
                authorization: `bearer ${locals.user.authToken}`,
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": API_KEY,
            },
        }
    );

    if (res.ok) {
        const resData = await res.json();
        return json(resData);
    }
    return json({ message: "Failed to get bundles" }, { status: 500 });
}
