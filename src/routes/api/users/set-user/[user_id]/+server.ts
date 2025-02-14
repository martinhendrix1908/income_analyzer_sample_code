import { API_KEY, SERVER_URL } from '$env/static/private';
import { formatNumberOnly } from '$lib/utils/number-format.js';
import { json } from '@sveltejs/kit';
import { formDataToQueryString } from '$lib/utils/common-utils';

export const POST = async ({ locals, request }) => {
    const formData = await request.formData();
    formData.set("mobile", formatNumberOnly(formData.get("mobile") as string));
    const res = await fetch(`${SERVER_URL}/Users/SetUser${formDataToQueryString(formData)}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
        body: formData
    });
    if (!res.ok) return json({ message: "Failed to update user" }, { status: res.status });
    const data = await res.json();
    return json(data);
}