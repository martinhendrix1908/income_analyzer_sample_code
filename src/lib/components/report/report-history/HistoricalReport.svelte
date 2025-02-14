<script lang="ts">
  import type {
    HistoricalReport,
    IncomeAnalyzerData,
    HistoricalAccountInfo,
    ProcessingResult,
  } from "$lib/types/report.types";
  import { convertDateTime } from "$lib/utils/date-utils";
  import { getRiskAssessmentFromRiskScore } from "$lib/utils/risk-assessment-utils";
  import InfoPanel from "$lib/components/report/InfoPanel.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import LineChart from "$lib/components/report/report-history/LineChart.svelte";
  import HistoryTable from "$lib/components/report/report-history/HistoryTable.svelte";

  let {
    accountGuid,
    isVisible,
  }: {
    accountGuid: string;
    isVisible: boolean;
  } = $props();
  let apiResponse = $derived<IncomeAnalyzerData>(
    page.data?.IAResponse as IncomeAnalyzerData
  );
  let processingResult = $derived<ProcessingResult>(
    apiResponse?.processingResult
  );
  let accountData = $derived.by(() =>
    processingResult?.productProcessingResult.accounts.find(
      (item) => item.accountGuid === accountGuid
    )
  );
  let historicalReports: HistoricalReport[] = $derived(
    apiResponse?.historicalReports
  );
  let historicalReportArr: HistoricalAccountInfo[] = $state([]);

  const modifyHistoricalData = () => {
    if (!historicalReports.length) {
      return;
    }
    const modifiedArr: HistoricalAccountInfo[] = [...historicalReports]
      .filter((report) => report?.requestId) // Ensure we have reports with requestId
      .map((report) => {
        const matchedAccount =
          report?.additionalInfo?.accounts?.find(
            (account) => account?.accountGuid === accountData?.accountGuid
          ) || ({} as HistoricalAccountInfo);

        // Only return the object if accountGuid is present
        if (matchedAccount?.accountGuid) {
          return {
            accountGuid: matchedAccount.accountGuid,
            isPrimary: matchedAccount?.isPrimary ?? false,
            activeMonthlyIncome: matchedAccount?.activeMonthlyIncome ?? 0,
            // riskAssessment: matchedAccount?.riskAssessment ?? 0,
            // riskAssessmentText: matchedAccount?.riskAssessmentText ?? "",
            riskScore: matchedAccount?.riskScore ?? 0,
            // extendedScoresAccountValue:
            //   matchedAccount?.extendedScoresAccountValue ?? 0,
            minLoan: matchedAccount?.minLoan ?? 0,
            maxLoan: matchedAccount?.maxLoan ?? 0,
            availableBalance: matchedAccount?.availableBalance ?? 0,
            unitName: report?.unitName ?? "",
            requestId: report?.requestId ?? "",
            updated: report?.updated ?? "",
            refreshedBy: report?.refreshedBy ?? "",
            snapshotDate: report?.snapshotDate ?? "",
            status: report?.status ?? "Completed",
          };
        }
        return null;
      })
      .filter((report) => report !== null)
      .sort(
        (a, b) =>
          new Date(b?.snapshotDate).getTime() -
          new Date(a?.snapshotDate).getTime()
      );
    const showOnboarding =
      page.data?.user?.panelConfig?.UsePostOnboardingService ?? true;
    const data = modifiedArr.map((report) => {
      let threshold1 = processingResult?.extOptions?.riskZoneScore?.threshold1;
      let threshold2 = processingResult?.extOptions?.riskZoneScore?.threshold2;
      let riskScore = report?.riskScore;
      if (
        showOnboarding &&
        report?.requestId !== apiResponse?.historicalReports[0]?.requestId
      ) {
        threshold1 =
          processingResult?.extOptions?.postOnboardingThreshold?.threshold1;
        threshold2 =
          processingResult?.extOptions?.postOnboardingThreshold?.threshold2;
        // riskScore = productProcessingResult?.posResponse?.riskScore;
      }

      const riskAssessment = getRiskAssessmentFromRiskScore(
        riskScore,
        threshold1,
        threshold2
      );
      report.riskAssessmentData = riskAssessment;
      return report;
    });
    historicalReportArr = [...data];
  };

  $effect(() => {
    if (apiResponse?.processingResult?.status === "Error") {
      const latestReport = apiResponse?.historicalReports
        .filter((item) => item.status !== "Error")
        .sort(
          (a, b) =>
            new Date(b.snapshotDate).getTime() -
            new Date(a.snapshotDate).getTime()
        )
        .find((item) => item);
      const newRequestId = latestReport
        ? latestReport.requestId
        : apiResponse.requestId;
      setTimeout(() => {
        goto(`/report/${newRequestId}`);
      }, 100);
    }
  });

  $effect(() => {
    modifyHistoricalData();
  });
</script>

{#if isVisible}
  {#if accountData?.banking?.accountType === "CREDIT_CARD" || accountData?.banking?.accountType === "LOAN"}
    <InfoPanel
      title={"Analysis Unavailable:"}
      body={"Credit card or Loan accounts are not supported, showing transactions only. Please select checking or savings account for analysis."}
    />
  {:else}
    <div class="grid grid-cols-12 gap-2 lg:gap-6">
      <div class="col-span-12 md:col-span-6 lg:col-span-3">
        <div
          class="bg-white shadow-4xl p-5 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full"
        >
          <span class="text-sm font-medium">External Reference</span>

          <h2
            class="text-2xl font-medium text-naro-600 flex items-center py-4 border-b"
          >
            {apiResponse?.processingResult?.productProcessingResult?.id||"N/A"}
          </h2>
          <div class="flex flex-wrap py-2 text-sm">
            Connectivity Provider:<span class="text-naro-600 font-medium ml-1"
              >{accountData?.banking?.ibv || "N/A"}</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3">
        <div
          class="bg-white shadow-4xl p-5 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full"
        >
          <span class="text-sm font-medium">Connection Status</span>

          <h2
            class="text-2xl font-medium text-naro-600 flex items-center py-4 border-b"
          >
            {apiResponse?.ibvStatusInfo?.requestCodeStatus === "Cool Down" ||
            apiResponse?.ibvStatusInfo?.requestCodeStatus === "Connected"
              ? "Connected"
              : "Disconnected"}
          </h2>
          <div class="flex flex-wrap py-2 text-sm">
            Connected On:<span class="text-naro-600 font-medium ml-1">
              {convertDateTime(
                apiResponse?.processingResult?.productProcessingResult?.metadata
                  ?.lastUpdated
              ).replaceAll(" at", ",") || "N/A"}</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3">
        <div
          class="bg-white shadow-4xl p-5 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full"
        >
          <span class="text-sm font-medium">Account Type</span>

          <h2
            class="text-2xl font-medium text-naro-600 flex items-center py-4 border-b"
          >
            {accountData?.banking?.accountType.replace(/_/g, " ") || "N/A"}
          </h2>
          <div class="flex flex-wrap py-2 text-sm">
            Account No:<span class="text-naro-600 font-medium ml-1">
              XX{accountData?.banking?.accountNumber || "XX"}</span
            >
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-3">
        <div
          class="bg-white shadow-4xl p-5 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full"
        >
          <span class="text-sm font-medium">Total Refreshes</span>

          <h2
            class="text-2xl font-medium text-naro-600 flex items-center py-4 border-b"
          >
            {historicalReportArr.length - 1 || 0}
          </h2>
          <div class="flex flex-wrap py-2 text-sm">
            Latest Refresh: <span class="text-naro-600 font-medium ml-1">
              {convertDateTime(
                apiResponse?.processingResult?.productProcessingResult?.metadata
                  ?.snapshotDate
              ).replaceAll(" at", ",") || "N/A"}</span
            >
          </div>
        </div>
      </div>
    </div>
    {#key historicalReportArr}
      <LineChart {historicalReportArr} />
    {/key}
    <HistoryTable {historicalReportArr} />
  {/if}
{/if}
