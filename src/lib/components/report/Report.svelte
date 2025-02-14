<script lang="ts">
  import "@fortawesome/fontawesome-free/css/all.css";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import type {
    Account,
    ProcessingResult,
    ProductProcessingResult,
    IncomeSourceProp,
    IncomeAnalyzerData,
    RefreshResponse,
    ApplicationData,
    AccountDetails,
  } from "$lib/types/report.types";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import ActionNavigationBar from "$lib/components/report/top-banner/ActionNavigationBar.svelte";
  import HistoricalReport from "$lib/components/report/report-history/HistoricalReport.svelte";
  import InfoPanel from "$lib/components/report/InfoPanel.svelte";
  import RefreshPage from "$lib/components/report/RefreshPage.svelte";
  import RiskAssessment from "$lib/components/report/RiskAssessment.svelte";
  import SourceAndFrequency from "$lib/components/report/source-and-frequency/SourceAndFrequency.svelte";
  import Transactions from "$lib/components/report/all-transactions/Transactions.svelte";
  import Topbar from "$lib/components/report/top-banner/Topbar.svelte";
  import IncomeTrends from "$lib/components/report/income-trends/IncomeTrends.svelte";
  import OverviewV3 from "$lib/components/report/overview/OverviewV3.svelte";
  import {
    createDifferenceArray,
    getApplicationDifferenceData,
  } from "../../../routes/report/[id]/utils";
  let accountGuid: string = $state("");
  let activeTab: string = $state("Overview");
  let refresh: boolean = $state(false);
  let errorUploading: boolean = $state(false);
  let errorTitleForRefreshPopUp: string = $state("");
  let errorMessageForRefreshPopUp: string = $state("");
  let iaResponse: IncomeAnalyzerData = $derived(
    page?.data?.IAResponse as IncomeAnalyzerData
  );
  let processingResult = $derived<ProcessingResult>(
    iaResponse?.processingResult
  );
  let productProcessingResult: ProductProcessingResult = $derived(
    processingResult.productProcessingResult
  );

  let showOnboardingResponse = $derived.by(() => {
    const showOnboarding =
      page.data.user?.panelConfig?.UsePostOnboardingService ?? true;
    return productProcessingResult?.posResponse && showOnboarding;
  });
  let accountData = $derived.by(() => {
    return productProcessingResult.accounts.find(
      (item) => item.accountGuid === accountGuid
    );
  });
  let discrepancyDetails: AccountDetails[] | [] = $derived.by(() => {
    const bankuityData = getApplicationDifferenceData(iaResponse, accountGuid);
    const detailsArr = createDifferenceArray(
      iaResponse?.application as ApplicationData,
      bankuityData
    );
    return detailsArr;
  });

  let incomeSources = $derived.by(() => {
    let incomeData = accountData?.incomeSources || [];
    let loanData = accountData?.loanSources || [];
    let allIncomeSources: IncomeSourceProp[] = [];
    if (!incomeData.length && !loanData?.length) {
      return [];
    }
    incomeData?.forEach((element) => {
      const existIncoemSource = allIncomeSources?.some(
        (item) => item.sourceID === element.sourceID
      );
      if (!existIncoemSource) {
        allIncomeSources.push({
          sourceID: element.sourceID,
          sourceName: element.incomeSource,
          incomeType: element.incomeType,
          type: element.incomeType,
        });
      }
    });

    loanData?.forEach((element) => {
      const existLoan = allIncomeSources?.some(
        (item) => item.sourceID === element.sourceID
      );
      if (!existLoan) {
        allIncomeSources.push({
          sourceID: element.sourceID,
          sourceName: element.lenderName,
          incomeType: element.loanType,
          type: "Loan",
        });
      }
    });
    return (
      allIncomeSources.sort((a, b) =>
        a.sourceName.localeCompare(b.sourceName)
      ) || ([] as IncomeSourceProp[])
    );
  });

  const getSelectedAccountGuid = (accounts: Account[]) => {
    if (accounts.length === 1) {
      accountGuid = accounts[0]?.accountGuid ?? "";
      return;
    }
    const primaryIncomeAccount = accounts?.find(
      (item) => item.primaryIncomeAccount
    );
    if (primaryIncomeAccount) {
      accountGuid = primaryIncomeAccount?.accountGuid ?? "";
    } else {
      const accountWithHighestIncome = accounts.reduce(
        (maxIncomeAccount: Account, currentAccount: Account) => {
          const currentHighestIncome =
            currentAccount?.incomeBreakdown?.highestMonthlyIncome || 0;
          const maxIncome =
            maxIncomeAccount?.incomeBreakdown?.highestMonthlyIncome || 0;

          return currentHighestIncome > maxIncome
            ? currentAccount
            : maxIncomeAccount;
        },
        {} as Account
      );
      if (accountWithHighestIncome) {
        accountGuid = accountWithHighestIncome?.accountGuid ?? "";
      } else {
        accountGuid = accounts[0]?.accountGuid ?? "";
      }
    }
  };

  const refreshPage = async (response: RefreshResponse | undefined) => {
    refresh = true;
    if (response?.type === "failure") {
      errorUploading = true;
      errorTitleForRefreshPopUp =
        response?.data?.errorTitle || "Unable to Refresh.";
      errorMessageForRefreshPopUp =
        response?.data?.errorMessage ||
        "Something went wrong. Please try again later.";
    }
  };

  onMount(() => {
    if (iaResponse?.requestId && productProcessingResult?.id) {
      window._mfq = window._mfq || [];
      window._mfq.push([
        "setVariable",
        `RequestCode_${productProcessingResult?.id}`,
        "Set",
      ]);
      window._mfq.push([
        "setVariable",
        `RequestID_${iaResponse?.requestId}`,
        "Set",
      ]);
    }
  });

  onMount(() => {
    if (productProcessingResult) {
      const accounts = productProcessingResult?.accounts;
      if (accounts?.length > 0) {
        getSelectedAccountGuid(accounts);
      }
    }
  });

  $effect(() => {
    activeTab = page.url.searchParams.get("tab") || "Overview";
  });
</script>

{#key accountGuid}
  <main class="border-t-2 border-white" id="allDiv">
    <Topbar {refreshPage} {discrepancyDetails} bind:accountGuid />
    <ActionNavigationBar bind:accountGuid {activeTab} />
    <SectionWrapper>
      {#if processingResult?.status === "Error"}
        <InfoPanel
          title="Analysis Unavailable:"
          body={processingResult.statusDescription ||
            "Report generation requires transaction data. For analysis, please select another account with activity."}
        />
      {:else}
        {#if activeTab === "History"}
          <HistoricalReport {accountGuid} isVisible={true} />
        {:else if refresh}
          <RefreshPage
            bind:refresh
            {errorUploading}
            {errorMessageForRefreshPopUp}
            {errorTitleForRefreshPopUp}
          />
        {:else if ["CREDIT_CARD", "LOAN"].includes(accountData.banking?.accountType || "")}
          <InfoPanel
            title="Analysis Unavailable:"
            body="Credit card or Loan accounts are not supported, showing transactions only. Please select checking or savings account for analysis."
          />
        {:else}
          <RiskAssessment {accountGuid} />
          <OverviewV3 {accountGuid} />
          <IncomeTrends {accountGuid} {incomeSources} />
          <SourceAndFrequency {accountGuid} />
          <Transactions {accountGuid} {incomeSources} />
        {/if}
      {/if}
    </SectionWrapper>
  </main>
{/key}
