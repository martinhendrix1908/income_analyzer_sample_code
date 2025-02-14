<script lang="ts">
  import { convertDateTime } from "$lib/utils/date-utils";
  import type {
    Account,
    AccountData,
    AccountDetails,
    AllAccounts,
    IncomeAnalyzerData,
    RefreshResponse,
  } from "$lib/types/report.types";
  import { page } from "$app/state";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";
  import LeftArrowHead from "$lib/icons/LeftArrowHead.svelte";
  import NoticeIcon from "$lib/icons/NoticeIcon.svelte";
  import { enhance } from "$app/forms";
  import ApplicationDiscrepanciesModal from "$lib/components/report/ApplicationDiscrepanciesModal.svelte";
  import DataAlertIcon from "$lib/icons/DataAlertIcon.svelte";
  import { onMount } from "svelte";
  import {
    createDifferenceArray,
    generateDetails,
    getApplicationDifferenceData,
  } from "../../../../routes/report/[id]/utils";
  import type { DetailsTopBanner } from "$lib/types/report.types";
  import DetailsComponent from "$lib/components/report/top-banner/DetailsComponent.svelte";
  import HistoryAccountDropdown from "$lib/components/report/top-banner/HistoryAccountDropdown.svelte";
  let {
    accountGuid = $bindable(),
    refreshPage,
    discrepancyDetails,
  }: {
    accountGuid: string;
    refreshPage: (result: RefreshResponse | undefined) => void;
    discrepancyDetails: AccountDetails[];
  } = $props();

  let showAccountDetailsPopup = $state(false);
  let applicationDiscrepancyByRequestId: AccountData[] | [] = $state([]);
  let activeAccount: AccountData | undefined = $state(undefined);
  let numDiscrepancies: number | undefined = $state(undefined);
  let enableDropdown: boolean = $state(false);
  let refreshBtnVisibility: boolean = $state(true);
  let iaResponse = $derived<IncomeAnalyzerData>(
    page?.data?.IAResponse as IncomeAnalyzerData
  );

  let productProcessingResult = $derived(
    iaResponse?.processingResult?.productProcessingResult
  );
  const activeReport = $derived(
    iaResponse?.historicalReports.find(
      (item) => item?.requestId === iaResponse?.requestId
    )
  );
  let accountData = $derived.by(() =>
    productProcessingResult?.accounts.find(
      (item) => item.accountGuid === accountGuid
    )
  );

  let options = $derived(
    productProcessingResult?.accounts?.map((item) => ({
      value: item?.accountGuid,
      label: item?.banking?.accountType,
      secondaryLabel: item?.banking?.accountNumber,
    }))
  );

  const toggleApplicationDiscrepanciesModal = () => {
    showAccountDetailsPopup = !showAccountDetailsPopup;
  };

  onMount(() => {
    numDiscrepancies = discrepancyDetails.filter((item) => !item.match).length;
    let mockDiscrepancyData: AllAccounts = {
      [iaResponse.requestId]: [],
    };
    productProcessingResult.accounts.forEach((item, index) => {
      const bankuityData = getApplicationDifferenceData(
        iaResponse,
        item?.accountGuid
      );
      const details = createDifferenceArray(
        iaResponse?.application,
        bankuityData
      );
      mockDiscrepancyData[iaResponse.requestId].push({
        requestCode: productProcessingResult.metadata.requestCode ?? "",
        accountGuid: item?.accountGuid ?? "",
        accountNumber: item?.banking?.accountNumber ?? "",
        accountType: item?.banking?.accountType ?? "",
        details: details,
      });
    });
    applicationDiscrepancyByRequestId =
      mockDiscrepancyData[iaResponse.requestId];
    activeAccount = applicationDiscrepancyByRequestId.find(
      (item) => item.accountGuid === accountData?.accountGuid
    );
  });

  let historicalReportsCount = $derived.by(() => {
    if (!iaResponse?.historicalReports.length) {
      return 0;
    }
    const filteredReports = iaResponse?.historicalReports
      .filter((report) => report?.requestId)
      .map((report) => {
        const matchedAccount = report?.additionalInfo?.accounts?.find(
          (account) => account?.accountGuid === accountData?.accountGuid
        );
        return matchedAccount;
      })
      .filter((report) => report !== undefined);
    return filteredReports.length;
  });

  let details = $derived.by(() =>
    generateDetails(accountData as Account, productProcessingResult)
  );
  let personalDetails = $derived<DetailsTopBanner>(details._personalDetails);
  let bankingDetails = $derived<DetailsTopBanner>(details._bankingDetails);

</script>

{#key page.url.searchParams.get("tab")}
  <section
    role="button"
    tabindex={0}
    class="bg-naro-600 py-12 cursor-default"
    onmouseleave={() => (enableDropdown = false)}
  >
    <div class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto">
      {#if page.url.searchParams.get("tab") === "History"}
        <div class="flex flex-wrap justify-between">
          <a
            href={page.url.pathname}
            class="flex items-center text-[#98C43D] rounded text-sm gap-1 pb-2"
          >
            <LeftArrowHead fillColor="#98C43D" />
            <span class="pt-0.5">Back</span>
          </a>
          <HistoryAccountDropdown
            {options}
            bind:value={accountGuid}
            disabled={productProcessingResult?.accounts.length === 1}
            placeholder="Switch Account"
          />
        </div>
      {:else if iaResponse?.requestId === iaResponse?.ibvStatusInfo?.lastRequestId}
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-11 2xl:grid-cols-12 gap-x-2 gap-y-6"
        >
          <div
            class="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-5 2xl:col-span-6 flex flex-col text-naro-300"
          >
            <div class="flex flex-wrap flex-row gap-2">
              <div class="mb-0 flex items-center gap-2">
                <span
                  class="text-[#98c43d] font-semibold underline underline-offset-1"
                >
                  {productProcessingResult?.id ?? "N/A"}
                </span>
                <span class="hidden font-semibold text-base text-white">/</span>
                <span
                  class="text-[#98c43d] font-semibold underline underline-offset-1 hidden"
                >
                  {productProcessingResult?.metadata?.requestCode ?? "N/A"}
                </span>
                <span class="font-semibold text-base text-white">/</span>
                <span
                  class="text-[#98c43d] font-semibold underline underline-offset-1"
                >
                  {accountData?.banking?.accountNumber
                    ? "XX" + accountData?.banking?.accountNumber
                    : "N/A"}
                </span>
              </div>

              {#if iaResponse?.application && numDiscrepancies}
                <button
                  class="flex items-center text-sm text-[#FF8400] font-medium text-nowrap"
                  onclick={toggleApplicationDiscrepanciesModal}
                >
                  <DataAlertIcon fillColor="currentColor" />
                  <span>
                    {numDiscrepancies}
                    {#if numDiscrepancies > 1 || numDiscrepancies == 0}
                      Application Changes Detected
                    {:else}
                      Application Change Detected
                    {/if}
                  </span>
                </button>
                {#if showAccountDetailsPopup}
                  <ApplicationDiscrepanciesModal
                    {toggleApplicationDiscrepanciesModal}
                    {applicationDiscrepancyByRequestId}
                    {activeAccount}
                    accountGuid={accountData?.accountGuid}
                  />
                {/if}
              {/if}
            </div>
            <div
              class="font-normal text-sm md:mr-6 my-2 flex flex-wrap gap-1 whitespace-nowrap"
            >
              Report Date:
              <span class="flex text-[#EEEEEE] whitespace-normal gap-2">
                {convertDateTime(
                  productProcessingResult?.metadata?.snapshotDate
                )}
              </span>
              {#if refreshBtnVisibility}
                {#if page?.data?.user?.panelConfig?.ShowRefreshButton}
                  {#if iaResponse?.ibvStatusInfo?.requestCodeStatus === "Cool Down" || iaResponse?.ibvStatusInfo?.requestCodeStatus === "Connected"}
                    <form
                      method="POST"
                      action="?/ibvServiceRefreshConnect"
                      use:enhance={() => {
                        return async ({ result, update }) => {
                          refreshPage(result as RefreshResponse);
                          update();
                        };
                      }}
                    >
                      <input
                        name="requestId"
                        id="requestId"
                        type="hidden"
                        value={iaResponse?.requestId}
                      />
                      <button
                        type="submit"
                        onclick={() => refreshPage(undefined)}
                        class={`mr-2 flex gap-0.5  ${
                          iaResponse?.ibvStatusInfo?.requestCodeStatus ===
                          "Cool Down"
                            ? "opacity-50 cursor-not-allowed"
                            : "text-[#2F80ED]"
                        }`}
                        disabled={iaResponse?.ibvStatusInfo
                          ?.requestCodeStatus === "Cool Down"}
                      >
                        <RefreshIcon />
                        <span class="font-sm">Refresh</span>
                      </button>
                    </form>
                  {:else}
                    <div class="mr-2 flex gap-0.5 text-[#CF8D2E]">
                      <NoticeIcon fillColor="#CF8D2E" />
                      <span class="font-sm">Disconnected</span>
                    </div>
                  {/if}
                {/if}
              {/if}
            </div>
            {#if page?.data?.user?.panelConfig?.ShowHistoricalReport && historicalReportsCount >= 2}
              <div
                class="font-normal text-sm md:mr-6 mb-5 flex flex-wrap gap-1 whitespace-nowrap"
              >
                Historical Reports:
                <span class="flex text-[#EEEEEE] whitespace-normal gap-2">
                  {historicalReportsCount - 1}
                </span>
                <a
                  href={page.url.pathname + "?tab=History"}
                  class="text-[#2F80ED]"
                >
                  View
                </a>
              </div>
            {/if}

            <span class="text-naro-300 inline-block w-full mt-auto"
              >Name(s) on Account:</span
            >
            <h3 class="font-medium text-white">
              {(productProcessingResult?.customerInfo?.names ?? 0 > 0)
                ? productProcessingResult?.customerInfo?.names
                : "N/A"}
            </h3>
          </div>
          <div
            class="col-span-2 lg:col-span-8 xl:col-span-6 flex flex-col md:flex-row lg:justify-end gap-6 md:gap-20"
          >
            <DetailsComponent data={personalDetails} />
            <DetailsComponent data={bankingDetails} />
          </div>
        </div>
      {:else}
        <div class="flex flex-wrap justify-between">
          <span
            class="font-normal text-[#FFFFFF] leading-6 text-sm ml-0 md:ml-3 flex flex-wrap items-center justify-center gap-1"
          >
            <span
              >You are viewing a past report created on {convertDateTime(
                activeReport?.snapshotDate
              )}</span
            >
            <a href={page.url.pathname + "?tab=History"} class="text-[#0A84FF]">
              View More Historical Reports
            </a>
          </span>
          <a
            href="/report/{iaResponse?.ibvStatusInfo?.lastRequestId}"
            class="text-[#98C43D] hover:text-[#222222] bg-transparent hover:bg-[#98C43D] rounded border-2 border-[#98C43D] px-6 py-3 mr-0 md:mr-3 font-medium"
          >
            Jump to Latest Report
          </a>
        </div>
      {/if}
    </div>
  </section>
{/key}
