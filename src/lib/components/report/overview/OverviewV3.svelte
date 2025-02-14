<script lang="ts">
  import { convertDate, dateMonthDifference } from "$lib/utils/date-utils";
  import type { ProcessingResult } from "$lib/types/report.types";
  import InfoIcon from "$lib/icons/InfoIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import LendingGuide from "$lib/components/report/overview/LendingGuide.svelte";

  let {
    accountGuid,
  }: {
    accountGuid: string;
  } = $props();
  let processingResult = $derived<ProcessingResult>(
    page?.data?.IAResponse?.processingResult
  );
  let accountData = $derived.by(() =>
    processingResult?.productProcessingResult.accounts.find(
      (item) => item.accountGuid === accountGuid
    )
  );

  let hovered = $state(false);

  const minLoanAmount = $derived(
    accountData?.lendingGuide?.minLoanAmount || "0"
  );
  const maxLoanAmount = $derived(
    accountData?.lendingGuide?.maxLoanAmount || "0"
  );
  const maxDebitAmount = $derived(
    accountData?.lendingGuide?.maxDebitAmount || "0"
  );
  const minDebitAmount = $derived(
    accountData?.lendingGuide?.minDebitAmount || "0"
  );
  const repeatOpportunity = $derived(
    accountData?.lendingGuide?.repeatOpportunity || "None"
  );
  const debitDate = $derived(accountData?.lendingGuide?.debitDate || "None");
  const debitFrequency = $derived(
    accountData?.lendingGuide?.debitFrequency || "None"
  );
  const paymentNearHoliday = $derived(
    accountData?.lendingGuide?.paymentNearHoliday || "None"
  );

  const getIncomeSources = () => {
    const totalSources =
      accountData?.incomeSources.filter(
        (item) =>
          item.activeScore === 3 &&
          (item.incomeType.includes("Payroll") ||
            item.incomeType.includes("Benefit"))
      ).length ?? 0;

    if (totalSources <= 1) return totalSources + " source";

    return totalSources + " sources";
  };

  const scrollToTable = () => {
    const tableRef = document.getElementById("summaryTable");
    if (tableRef) {
      tableRef.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      goto("?secondaryTab=Income", { noScroll: true });
    }, 500);
  };

  let balanceType = $derived.by(() => {
    if (accountData?.availableBalance != null) {
      return "available";
    } else if (accountData?.currentBalance != null) {
      return "current";
    } else {
      return "available"; // Default to "available"
    }
  });

  let balance = $derived.by(() => {
    if (balanceType === "available") {
      return accountData?.availableBalance ?? 0; // Fallback to 0 if null/undefined
    } else if (balanceType === "current") {
      return accountData?.currentBalance || 0;
    }
  });

</script>

<div>
  <div
    class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-4"
  >
    <div class="pr-2 lg:border-r-4 border-parrot order-1">
      <h3 class="text-black font-medium opacity-85">Overview</h3>
    </div>
    <div
      class="lg:ml-2 mr-auto flex gap-x-1 md:gap-x-2 order-3 lg:order-2 max-w-full overflow-auto whitespace-wrap flex-col sm:flex-row text-sm md:text-base"
    >
      <span class="text-sm"
        >Transactions from
        <b>{convertDate(accountData?.transactionsRange?.start)}</b> to
        <b>{convertDate(accountData?.transactionsRange?.end)}</b>
      </span>

      <span class="italic text-sm">
        {dateMonthDifference(
          accountData?.transactionsRange?.start,
          accountData?.transactionsRange?.end
        )}
      </span>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-2 lg:gap-6">
    <div class="col-span-12 lg:col-span-4">
      <div
        class="bg-white shadow-4xl p-6 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full flex flex-col justify-between"
      >
        <span class="text-sm font-medium">
          {balanceType === "available"
            ? "Available balance"
            : "Current balance"}
        </span>
        <div class="flex items-center my-4">
          <h2 class="font-medium mr-2 text-naro-600">
            {balance ? convertToUSD(balance) : "$0"}
          </h2>
          {#if processingResult?.productProcessingResult?.metadata?.asOfDate}
            <sub class="font-normal text-sm text-naro-300"
              >as of {convertDate(
                processingResult?.productProcessingResult?.metadata?.asOfDate
              )
                ? convertDate(
                    processingResult?.productProcessingResult?.metadata
                      ?.asOfDate
                  )
                : "N/A"}</sub
            >
          {/if}
        </div>

        <div class="flex py-2 text-sm">
          Average Monthly Balance:<span class="text-naro-600 font-medium ml-1"
            >{convertToUSD(accountData?.allTime?.avgMonthlyBalance)}</span
          >
        </div>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <div
        class="bg-white shadow-4xl p-6 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full flex flex-col justify-between"
      >
        <div class="flex items-center">
          <span class="text-sm font-medium flex whitespace-nowrap"
            >Active Monthly Income</span
          >
          <div class="flex text-xs">
            <i
              role="tooltip"
              tabIndex={-1}
              class="ml-2 cursor-pointer relative"
              onmouseenter={() => (hovered = true)}
              onmouseleave={() => (hovered = false)}
            >
              <InfoIcon />
              {#if hovered}
                <div
                  class="absolute text-black bottom-6 bg-white min-w-240px sm:min-w-350px shadow-3xl -left-20 sm:-left-10 text-sm font-normal not-italic p-2 rounded z-20"
                >
                  "Active Monthly Income" is a calculation of the money that the
                  applicant typically has in their account that can be used to
                  determine how much an applicant can borrow.
                </div>
              {/if}
            </i>
          </div>
        </div>
        <div class="flex items-center my-4">
          <h2 class="font-medium mr-2 text-naro-600">
            {accountData?.monthlyIncome?.activeMonthlyIncome
              ? convertToUSD(accountData?.monthlyIncome?.activeMonthlyIncome)
              : "$0.00"}
          </h2>
        </div>
        <div class="pb-2 border-black-gray text-sm">
          <div class="flex flex-wrap whitespace-nowrap mb-1">
            Recurring Monthly Income:
            <span class="text-naro-600 font-medium mx-1">
              {accountData?.monthlyIncome?.recurringMonthlyIncome
                ? convertToUSD(
                    accountData?.monthlyIncome?.recurringMonthlyIncome
                  )
                : "$0.00"}
            </span>
            {#if accountData?.monthlyIncome?.recurringMonthlyIncome !== 0}
              <span
                >from&nbsp;
                <a
                  href="?secondaryTab=Income"
                  id="scrollToTable"
                  class="text-canva-100 underline underline-offset-1"
                  onclick={(e) => {
                    e.preventDefault();
                    scrollToTable();
                  }}>{getIncomeSources()}</a
                ></span
              >
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-4">
      <LendingGuide
        bgColor={"bg-naro-600"}
        textColor={"text-white"}
        titleTextColor={"text-parrot"}
        {minLoanAmount}
        {maxLoanAmount}
        {minDebitAmount}
        {maxDebitAmount}
        {debitDate}
        {debitFrequency}
        {repeatOpportunity}
        {paymentNearHoliday}
      />
    </div>
  </div>
</div>
