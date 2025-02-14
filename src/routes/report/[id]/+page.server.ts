import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../../$types";
import { API_KEY, SERVER_URL } from "$env/static/private";
import type { IncomeAnalyzerData } from "$lib/types/report.types";
import { checkUserLogin } from "$lib/utils/api-utils";

export const load: PageServerLoad = async ({ url, params, locals }) => {
  checkUserLogin(locals, url);
  const id: string = (params as { id: string }).id;
  let accountData: IncomeAnalyzerData;

  const fetchData = async () => {
    const res = await fetch(
      `${SERVER_URL}/TransDetails/GetProcessingResults?rid=${id}&product=Incomes`,
      {
        method: "POST",
        headers: {
          authorization: `bearer ${locals.user.authToken}`,
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": API_KEY,
        },
      }
    );

    const responseData = await res.json();
    if (!responseData?.requestId || !responseData?.processingResult) {
      throw error(404, { message: "Request Not Found." });
    }
    return responseData;
  };


  accountData = await fetchData();

  //------------This part is to add application data to the page if it doesn't exist for test--------
  // if (!accountData?.application) {
  //   const data = accountData?.processingResult?.productProcessingResult;
  //   const currentRequestIdData: ApplicationData = { ...getApplicationDifferenceData(accountData) };
  //   const saveResponse = await fetch(
  //     `${SERVER_URL}/Applications/SaveApplication?requestCode=${data?.id}&applicationId=0`,
  //     {
  //       method: "POST",
  //       headers: {
  //         authorization: `bearer ${locals.user.authToken}`,
  //         "Content-Type": "application/json",
  //         "Ocp-Apim-Subscription-Key": API_KEY,
  //       },
  //       body: JSON.stringify(currentRequestIdData),
  //     }
  //   );
  //   if (saveResponse.status === 200) {
  //     accountData = await fetchData();
  //   } else {
  //     throw error(saveResponse.status, { message: saveResponse.statusText });
  //   }
  // }

  const panelConfig = locals?.user?.panelConfig;
  if (
    accountData?.processingResult?.status === "Created" ||
    accountData?.processingResult?.status === "Pending" ||
    accountData?.processingResult?.status === "Processing"
  ) {
    throw error(404, {
      message: "Processing",
    });
  }
  if (accountData?.processingResult?.status === "NotFound") {
    throw error(404, {
      message: "NotFound" + " $@$ " + accountData?.processingResult?.message,
    });
  }
  if (!accountData?.processingResult?.productProcessingResult?.accounts) {
    throw error(404, "Account Data Not Found. Please Refresh");
  }
  return { IAResponse: accountData, panelConfig };

};

export const actions: Actions = {
  ibvServiceRefreshConnect: async ({ request, locals, url }) => {
    checkUserLogin(locals, url);

    const data = await request.formData();
    const requestId = data.get("requestId") as string;

    if (!requestId) return fail(400, { missingRequestId: true });
    const refreshConnect = await fetch(
      `${SERVER_URL}/IBVService/RefreshConnect?rid=${requestId}&forceRefresh=false`,
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${locals.user.authToken}`,
          "Ocp-Apim-Subscription-Key": API_KEY,
        },
        credentials: "include",
      }
    );

    if (!refreshConnect.ok) {
      throw new Error(`HTTP error! Status: ${refreshConnect.status}`);
    }

    const refreshConnectResponse = await refreshConnect.json();
    if (refreshConnectResponse.succeeded) {
      redirect(302, `/report/${refreshConnectResponse.requestId}`);
    } else {
      let errorMessage: string = '';
      let errorTitle: string = '';
      switch (refreshConnectResponse?.errorCode) {
        case 0:
          errorTitle = "Success";
          errorMessage = "Your request has been successfully processed. Everything is working as expected.";
          break;
        case 1:
          errorTitle = "Account on Cool Down";
          errorMessage = "Your account is currently on cooldown. Please wait a moment before trying again.";
          break;
        case 2:
          errorTitle = "Account Disconnected";
          errorMessage = "The account has been disconnected. Please create new request.";
          break;
        case 3:
        default:
          errorTitle = "Unable to Refresh";
          errorMessage = "We're having trouble retrieving new data at the moment. Please try again later.";
          break;
      }
      return fail(400, {
        errorCode: refreshConnectResponse.requestCode,
        errorUploading: true,
        errorMessage: errorMessage,
        errorTitle: errorTitle
      });
    }

  },
} satisfies Actions;
