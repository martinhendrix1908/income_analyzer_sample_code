<script lang="ts">
  import { page } from "$app/state";
  import type {
    Account,
    Overview,
    Series,
    MonthlyBreakdown,
    IncomeSourceProp,
    ProcessingResult,
  } from "$lib/types/report.types";
  import UpTriangleDotIcon from "$lib/icons/UpTriangleDotIcon.svelte";
  import DownTriangleDotIcon from "$lib/icons/DownTriangleDotIcon.svelte";
  import EqualsToIcon from "$lib/icons/EqualsToIcon.svelte";
  import { findEndMonthAndYear } from "$lib/utils/month-year-utils";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import IncomeTrendChart from "$lib/components/report/income-trends/IncomeTrendChart.svelte";
  import IncomeTrendCalendar from "$lib/components/report/income-trends/IncomeTrendCalendar.svelte";
  import { getSourceNameById } from "../../../../routes/report/[id]/utils";

  let {
    accountGuid,
    incomeSources,
  }: {
    accountGuid: string;
    incomeSources: IncomeSourceProp[];
  } = $props();

  let processingResult = $derived<ProcessingResult>(
    page?.data?.IAResponse?.processingResult
  );
  let accountData = $derived.by(
    () =>
      processingResult?.productProcessingResult.accounts.find(
        (item) => item.accountGuid === accountGuid
      ) || ({} as Account)
  );

  let overview = $state<Overview>();
  let series = $state<Series[]>();
  let navMonth = $state<number>(0);
  let navYear = $state<number>(new Date().getFullYear());
  let yearDropdown = $state<number[]>([]);
  let activeEvent = $state<string>("");
  let activeMonth = $state<number>(0);
  let clickIndex = $state<number>(0);
  let incomeBreakdown = $derived(accountData?.incomeBreakdown);
  const monthlyBreakdown = $derived(incomeBreakdown?.monthlyBreakdown || []);
  let chartDatas = $derived<MonthlyBreakdown[]>(
    monthlyBreakdown as MonthlyBreakdown[]
  );

  $effect(() => {
    const data = monthlyBreakdown?.filter(
      (item: any) => item.month === navMonth + 1 && item.year === navYear
    );
    if (data?.length) {
      overview = data[0]?.overview;
      series = data[0]?.series;
    }
  });

  const getMonthDropdown = (start: string | number, end: string | number) => {
    //get the months according to highest and lowest monthly income
    const startYear = +start;
    const endYear = +end;
    const monthsBetween = [];
    for (let year = startYear; year <= endYear; year++) {
      monthsBetween.push(year);
    }
    return monthsBetween;
  };
  $effect(() => {
    if (monthlyBreakdown && monthlyBreakdown?.length > 0) {
      monthlyBreakdown.forEach((element) => {
        element.incomeEvents.forEach((item) => {
          if (item.type === "4") {
            item.type = "3";
          }
        });
      });
    }

    const startDate = new Date(accountData?.transactionsRange?.start || "");
    const endDate = new Date(accountData?.transactionsRange?.end || "");
    //do immediately after component loading
    yearDropdown = getMonthDropdown(
      startDate?.getFullYear(),
      endDate?.getFullYear()
    );
    const navMonthAndYearEnd = findEndMonthAndYear(monthlyBreakdown || []);
    navMonth = navMonthAndYearEnd?.month;
    navYear = navMonthAndYearEnd?.year;
  });
</script>

{#if overview && series}
  <div>
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4"
    >
      <div class="pr-2 md:border-r-4 border-parrot mr-2">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Income Trends
        </h3>
      </div>

      <div
        class="flex flex-col md:flex-row md:items-center mb-4 md:mb-0 mr-auto"
      >
        <span class="text-sm"
          >Click on a month in the chart or navigate using calendar to view
          detailed monthly income data and activity.</span
        >
      </div>
      <div></div>
    </div>

    <div class="w-full bg-naro-600 p-8 rounded-md flex flex-col gap-10">
      <div class="chartCard w-full flex flex-wrap lg:flex-nowrap gap-10">
        <!-- {#key chartDatas} -->
        <IncomeTrendChart
          bind:navMonth
          bind:navYear
          bind:activeEvent
          bind:activeMonth
          {clickIndex}
          chartDatas={chartDatas as MonthlyBreakdown[]}
          {yearDropdown}
          {incomeSources}
        />
        <div class="w-full lg:w-2/4 bg-naro-600">
          <IncomeTrendCalendar
            bind:navMonth
            bind:navYear
            {accountData}
            {yearDropdown}
            {chartDatas}
            {activeEvent}
            {activeMonth}
            {incomeSources}
          />
        </div>
        <!-- {/key} -->
      </div>
      {#if page?.data?.user?.panelConfig?.topPanelMode !== "V2"}
        <div
          class="flex gap-2 lg:gap-6 text-white justify-start xl:justify-between flex-wrap gap-x-8"
        >
          <div class="xl:min-w-200px min-w-240px">
            <span class="text-naro-100 text-sm leading-5 font-medium">
              Total Income:
            </span>
            <div class="flex">
              <h3 class="font-medium leading-10 mr-2">
                {overview?.totalIncome
                  ? convertToUSD(overview?.totalIncome)
                  : "N/A"}
              </h3>
              <span
                class="text-sm leading-5 text-naro-100 flex items-center gap-x-1"
              >
                {overview?.totalIncomeDelta
                  ? convertToUSD(overview?.totalIncomeDelta)
                  : "$0.00"}

                {#if overview?.totalIncomeDelta && overview?.totalIncomeDelta > 0}
                  <UpTriangleDotIcon fillColor={"#2C9F45"} />
                {/if}
                {#if overview?.totalIncomeDelta && overview?.totalIncomeDelta < 0}
                  <DownTriangleDotIcon fillColor={"#BE0027"} />
                {/if}
                {#if overview?.totalIncomeDelta == 0}
                  <EqualsToIcon fillColor={"#CF8D2E"} />
                {/if}
              </span>
            </div>
          </div>
          <div class="xl:min-w-200px min-w-240px">
            <span class="text-naro-100 text-sm leading-5 font-medium">
              Total Income Transactions:
            </span>
            <h3 class="font-medium leading-10 mr-2">
              {overview?.totalTransactions
                ? overview?.totalTransactions
                : "N/A"}
            </h3>
          </div>
          <div class="xl:min-w-200px min-w-240px">
            <span class="text-naro-100 text-sm leading-5 font-medium"
              >Primary Income Source:
            </span>
            <h3
              class="font-medium leading-10 mr-2 md:truncate sm:max-w-[200px]"
              title={getSourceNameById(overview?.primarySource, incomeSources)
                ? getSourceNameById(overview?.primarySource, incomeSources)
                : "N/A"}
            >
              {getSourceNameById(overview?.primarySource, incomeSources)
                ? getSourceNameById(overview?.primarySource, incomeSources)
                : "N/A"}
            </h3>
          </div>
          <div class="xl:min-w-200px min-w-240px">
            <span class="text-naro-100 text-sm leading-5 font-medium">
              Total Spending:
            </span>
            <h3 class="font-medium leading-10 mr-2">
              {overview?.totalSpending
                ? convertToUSD(overview?.totalSpending)
                : "N/A"}
            </h3>
          </div>
          <div class="xl:min-w-200px min-w-240px">
            <span class="text-naro-100 text-sm leading-5 font-medium">
              Net Income (Income-Expenses):
            </span>
            <div class="flex">
              <h3 class="font-medium leading-10 mr-2">
                {overview?.cashFlow ? convertToUSD(overview?.cashFlow) : "N/A"}
              </h3>
              <span
                class="text-sm leading-5 text-naro-100 flex items-center gap-x-1"
              >
                {overview?.cashFlowDelta
                  ? convertToUSD(overview?.cashFlowDelta)
                  : "$0.00"}

                {#if overview?.cashFlowDelta && overview?.cashFlowDelta > 0}
                  <UpTriangleDotIcon fillColor={"#2C9F45"} />
                {/if}
                {#if overview?.cashFlowDelta && overview?.cashFlowDelta < 0}
                  <DownTriangleDotIcon fillColor={"#BE0027"} />
                {/if}
                {#if overview?.cashFlowDelta == 0}
                  <EqualsToIcon fillColor={"#CF8D2E"} />
                {/if}
              </span>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
