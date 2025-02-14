<script lang="ts">
  import { convertDate, dateMonthDifference } from "$lib/utils/date-utils";
  import IncomeTable from "$lib/components/report/source-and-frequency/IncomeTable.svelte";
  import type {
    Account,
    IncomeSource,
    ProcessingResult,
  } from "$lib/types/report.types";
  import LoanTable from "$lib/components/report/source-and-frequency/LoanTable.svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";

  let { accountGuid }: { accountGuid: string } = $props();
  let activeTab = $state("Income");
  let processingResult = $derived<ProcessingResult>(
    page?.data?.IAResponse?.processingResult
  );
  let accountData = $derived.by(() =>
    processingResult?.productProcessingResult.accounts.find(
      (item) => item.accountGuid === accountGuid
    )
  );
  // let summaryData: Account["summary"] = $derived(
  //   accountData?.summary as Account["summary"]
  // );
  let activeSourceOn = $state(true);
  const loanData = $derived(accountData?.loanSources || []);

  let incomeData = $derived.by<IncomeSource[]>(() => {
    {
      if (activeSourceOn) {
        return (
          accountData?.incomeSources?.filter(
            (item) => item.activeScore === 3
          ) || []
        );
      } else {
        return accountData?.incomeSources || [];
      }
    }
  });
  $effect(() => {
    activeTab = page.url.searchParams.get("secondaryTab") || "Income";
  });
</script>

<div id="summaryTable">
  <div
    class="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6 xl:mb-4"
  >
    <div class="flex flex-col md:flex-row md:justify-between md:items-center">
      <div class="pr-2 md:border-r-4 border-parrot mr-2">
        <h3 class="text-black font-medium opacity-85">Sources and Frequency</h3>
      </div>

      <div
        class="mr-auto flex gap-x-1 sm:gap-x-2 order-2 max-w-full overflow-auto whitespace-nowrap flex-col sm:flex-row text-sm md:text-base"
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
    {#if activeTab === "Income"}
      <div
        class="flex items-center justify-center order-2 lg:order-3 lg:gap-2 mb-0"
      >
        <span
          class="font-sans font-normal leading-6 tracking-normal text-left text-sm w-full"
          >Show Active Income sources only</span
        >

        <div class="relative overflow-hidden rounded-full min-w-64px">
          <label
            for="checkbox-switch"
            class="flex items-center text-xs p-1 gap-2 leading-loose text-center text-naro-600 overflow-hidden"
          >
            <input
              type="checkbox"
              bind:checked={activeSourceOn}
              id="checkbox-switch"
              class="absolute -top-5 -left-5 peer/draft overflow-hidden"
            />
            <span
              class="absolute top-0 left-0 w-full h-full bg-naro-900 rounded-full peer-checked/draft:bg-parrot transition"
            ></span>
            <span
              class="inline-block w-6 font-medium rounded-full relative bg-naro-600 shadow-5xl animate-move3 peer-checked/draft:animate-move"
              >&nbsp;</span
            >
            <span
              class="inline-block w-6 font-medium rounded-full relative transition animate-move4 peer-checked/draft:animate-move1"
              >{activeSourceOn ? "ON" : "OFF"}</span
            >
          </label>
        </div>
      </div>
    {/if}
  </div>
  <div class="bg-white shadow-4xl rounded-md overflow-hidden">
    <div
      class=" bg-naro-600 px-6 font-medium text-left text-white whitespace-nowrap"
    >
      <div class="flex flex-wrap border-b border-naro-100 gap-6 pt-6 pb-2">
        <button
          onclick={() => goto("?secondaryTab=Income", { noScroll: true })}
          class={activeTab === "Income"
            ? "text-naro-600 p-2 bg-naro-100  h-[40px]  rounded"
            : "text-naro-300 p-2 -mb-1px"}>Income Sources</button
        >
        <button
          onclick={() => goto("?secondaryTab=Loan", { noScroll: true })}
          class={activeTab === "Loan"
            ? "text-naro-600 p-2 bg-naro-100  h-[40px] rounded"
            : "text-naro-300 p-2 -mb-1px"}>Loans</button
        >
        {#if activeTab === "Income"}
          <span
            class="ml-auto flex flex-wrap items-center gap-1 text-sm font-normal w-full sm:w-auto pb-4 sm:pb-0"
            >Frequency:
            <span class="rounded-sm px-1 py-2 bg-[#09814A] ml-1"></span>
            <span class="text-naro-300">More</span>
            <span class="rounded-sm px-1 py-2 bg-[#F5FFF4] ml-1"></span>
            <span class="text-naro-300">Less</span>
            <span class="rounded-sm px-1 py-2 bg-red ml-1"></span>
            <span class="text-naro-300">Missing</span>
          </span>
        {/if}
      </div>
    </div>
    {#if activeTab === "Income"}
      <IncomeTable {incomeData} />
    {:else if activeTab === "Loan"}
      <LoanTable {loanData} />
    {:else}
      Loading....
    {/if}
  </div>
</div>
