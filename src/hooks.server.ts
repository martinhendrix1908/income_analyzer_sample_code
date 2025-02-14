import { SERVER_URL } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser

  const session = event.cookies.get("session");
  const name = event.cookies.get("name");
  const email = event.cookies.get("email");
  const id = event.cookies.get("id");
  const orgId = event.cookies.get("orgId");
  const role = event.cookies.get("role");
  const last_login = event.cookies.get("lastLogindate");
  const panelConfig = event.cookies.get("panelConfig");
  const timeStampString = event.cookies.get("timeStamps");

  if (
    !session ||
    !name ||
    !email ||
    !id ||
    !orgId ||
    !role ||
    !last_login ||
    !panelConfig ||
    !timeStampString
  ) {
    return await resolve(event);
  }
  const timeStamps = JSON.parse(decodeURIComponent(timeStampString));
  const panelConfigs = JSON.parse(decodeURIComponent(panelConfig));

  event.locals.user = {
    authToken: session,
    name: name,
    email: email,
    id: id,
    orgId: orgId,
    role: role,
    last_login: last_login,
    panelConfig: panelConfigs,
    timeStamps: timeStamps,
  };
  const response = await resolve(event);

  const origin = event.url.origin;

  const image_src = "img-src 'self' data: blob: *.mouseflow.com " + SERVER_URL + "/images/users/; "

  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.mouseflow.com; " +
      "style-src 'self' 'unsafe-inline' *.mouseflow.com; " +
      "connect-src 'self' blob: *.mouseflow.com; " +
      image_src +
      "font-src 'self' data: *.mouseflow.com; " +
      "frame-src 'self' *.mouseflow.com; " +
      "media-src 'self' *.mouseflow.com;"
  );

  response.headers.set(
    "Access-Control-Allow-Origin",
    event.request.headers.get("origin") || origin
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
};
