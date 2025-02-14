import { API_KEY, SERVER_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

export const POST = async ({ locals, request }) => {
    const { user } = await request.json();
    const res = await fetch(`${SERVER_URL}/Users/SetUserRoles`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
        },
        body: JSON.stringify({ ...user, organizationId: locals.user.orgId }),
    });
    if (!res.ok) {
        throw new Error('Something went wrong');;
    }
    const data = await res.json();
    return json(data);

}