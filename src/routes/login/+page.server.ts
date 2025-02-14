import { fail, redirect, type Actions, type Cookies } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import type { LoginCred, LoginResponse, TimestampProp } from "$lib/types/login.types";

export const load: PageServerLoad = async ({ cookies, locals, url }) => {
  const loginCred = cookies.getAll().find((cookie) => cookie.name === "loginCred")?.value;
  const returnURL = url.searchParams.get("returnURL") ?? "/dashboard";

  // route user based on role
  if (locals?.user?.role === "Admin") throw redirect(302, returnURL);
  if (locals?.user?.role === "Client") throw redirect(302, returnURL);
  if (locals?.user?.role === "Agent") throw redirect(302, returnURL);

  //if logged in, redirect to dashboard
  if (locals?.user?.authToken) throw redirect(302, returnURL);

  return { loginCred }
};

export const actions: Actions = {
  login: async ({ cookies, request, locals }) => {
    const data = await request.formData();
    const userId = data.get("userId");
    const password = data.get("password");
    const remember = data.get("remember");
    let returnURL = data.get("returnURL");

    if (
      typeof userId !== "string" ||
      typeof password !== "string" ||
      typeof returnURL !== "string" ||
      !userId ||
      !password ||
      !returnURL
    ) {
      return fail(400, { invalid: true });
    }
    const res = await fetch(`${SERVER_URL}/Auth/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY
      },
      body: JSON.stringify({ Email: userId, Psw: password }),
    });
    const user: LoginResponse = await res.json();
    if (!user.token) {
      return fail(400, { credentials: true });
    }

    if (returnURL === "/") {
      returnURL = user?.redirectLink || "/dashboard";
    }

    const loginCred: LoginCred = {
      userId: userId,
      password: encodePassword(password, 3),
      remember: remember,
    }
    user.clientUIConfiguration = {
      ...user?.clientUIConfiguration,
      UsePostOnboardingService: user?.productOptions?.Incomes?.UsePostOnboardingService ?? true
    }
    setCookies(locals, cookies, user, loginCred)
    throw redirect(302, returnURL);
  },
  refreshToken: async ({ cookies, request, locals }) => {
    const res = await fetch(`${SERVER_URL}/Auth/RefreshToken`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${locals.user.authToken}`,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY
      },
    });

    let user: LoginResponse = await res.json();
    if (!user.token) {
      return fail(400, { credentials: true });
    }
    const storedPage = request.headers.get('referer');

    user = {
      ...user,
      clientUIConfiguration: {
        ...locals?.user?.panelConfig
      },
      userName: locals?.user?.name,
      lastLogindate: locals?.user?.last_login,
    }
    setCookies(locals, cookies, user);

    if (locals?.user && storedPage) {
      throw redirect(302, storedPage);
    } else {
      throw redirect(302, '/')
    }
  },
  send_reset_password_link: async ({ url, request }) => {
    const req = await request.formData();
    const email = req.get("email");
    const mailType = req.get("mailType");

    const data = {
      email: email,
      templateName: mailType,
      parameters: {
        CallbackUrl: url.origin + "/set-password",
      }
    }

    const response = await fetch(`${SERVER_URL}/Auth/SendEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (res.succeeded) {
      return {
        success: true,
        message: "Email sent successfully"
      }
    } else {
      return fail(400, res);
    }
  },
  logout: ({ cookies }) => {
    const cookieList = cookies.getAll();
    // eat the cookies
    if (cookieList.length) {
      if (cookieList.length === 1 && cookieList[0].name === 'loginCred') {
        return;
      } else {
        cookieList?.forEach(item => {
          if (item?.name !== "loginCred") {
            cookies.delete(item?.name, {
              path: '/',
              secure: false,
              expires: new Date(0),
            })
          }
        })
      }
    }

    throw redirect(302, '/login')
  },
};

const setCookies = (locals: App.Locals, cookies: Cookies, user: LoginResponse, loginCred?: LoginCred) => {
  const user_data = parse_jwt(user.token);
  const expireIn = new Date(user_data?.exp * 1000);
  const currentSessionStart: Date = new Date();
  const sessionUpTime: Date = locals?.user?.timeStamps?.sessionUpTime ? locals?.user?.timeStamps?.sessionUpTime : new Date();
  const timeStamps: TimestampProp = {
    expires: expireIn,
    sessionUpTime: sessionUpTime,
    sessionStartTime: currentSessionStart,
  };

  if (loginCred) {
    if (loginCred?.remember) {
      cookies.set("loginCred", JSON.stringify(loginCred), {
        path: "/",
        httpOnly: false,
        sameSite: "strict",
        secure: false, // Safari needs secure set to `false` for cookies to work
      });
    } else {
      cookies.delete('loginCred', {
        path: '/',
        secure: false,
        expires: new Date(0),
      })
    }
  }
  cookies.set("timeStamps", encodeURIComponent(JSON.stringify(timeStamps)), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // Safari needs secure set to `false` for cookies to work
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0
    // same as expire time of token
  });

  cookies.set("session", user.token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // Safari needs secure set to `false` for cookies to work
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0
    // same as expire time of token
  });
  cookies.set("orgId", user_data['http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid'], {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // Safari needs secure set to `false` for cookies to work
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0
    // same as expire time of token
  });

  cookies.set('name', user?.userName || user_data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'], {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0

  })

  cookies.set('email', user_data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'], {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0

  })

  cookies.set('id', user_data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'], {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0

  })

  cookies.set('role', user_data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'], {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0

  })

  cookies.set("lastLogindate", user?.lastLogindate, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // Safari needs secure set to `false` for cookies to work
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0
    // same as expire time of token
  });

  cookies.set("panelConfig", user?.clientUIConfiguration ? encodeURIComponent(JSON.stringify(user?.clientUIConfiguration)) : encodeURIComponent(JSON.stringify(locals.user?.panelConfig)), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: false, // Safari needs secure set to `false` for cookies to work
    maxAge: user_data?.exp ? Math.floor((user_data.exp * 1000 - Date.now()) / 1000) : 0
    // same as expire time of token
  });
}
function parse_jwt(token: string) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let json_payload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(json_payload);
}

function encodePassword(password: string, shift: number): string {
  return password.split('').map((char: string) => {
    const charCode: number = char.charCodeAt(0);
    const encodedCharCode: number = charCode + shift;
    return String.fromCharCode(encodedCharCode);
  }).join('');
}