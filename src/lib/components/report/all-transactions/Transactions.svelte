<script lang="ts">
  import SortIcon from "$lib/icons/SortIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertDate } from "$lib/utils/date-utils";
  import type {
    Account,
    IncomeSourceProp,
    ProductProcessingResult,
    Transaction,
    TransactionDropDownNames,
    TransactionDropDowns,
  } from "$lib/types/report.types";
  import {
    convertIncomeType,
    getMonthYear,
    getSourceNameById,
    transactionTotalClassName,
  } from "../../../../routes/report/[id]/utils";
  import { splitValuesToAnArray } from "$lib/utils/common-utils";
  import FilterSection from "$lib/components/report/all-transactions/FilterSection.svelte";
  import { page } from "$app/state";

  let {
    accountGuid,
    incomeSources,
  }: {
    accountGuid: string;
    incomeSources: IncomeSourceProp[];
  } = $props();
  let productProcessingResult: ProductProcessingResult = $derived(
    page?.data?.IAResponse?.processingResult?.productProcessingResult
  );
  let accountData: Account = $derived.by(
    () =>
      productProcessingResult?.accounts.find(
        (item) => item.accountGuid === accountGuid
      ) || ({} as Account)
  );
  let allTransaction = $state<Transaction[]>([]);
  let filteredData = $state<Transaction[]>([]);
  let sortBy = $state("date");
  let sortDirection = $state(-1);
  let resetAllFilters = $state(false);
  let tableRef = $state<HTMLDivElement | null>(null);
  let totalAmount = $state(0);

  const headers = $state([
    { label: "Transaction Date", sortKey: "date", isSortable: true },
    { label: "Transaction Day", sortKey: "day", isSortable: false },
    { label: "Category", sortKey: "incomeType", isSortable: true },
    { label: "Description", sortKey: "description", isSortable: false },
    { label: "Amount", sortKey: "amount", isSortable: true },
  ]);
  let allNames = $state<TransactionDropDownNames>({
    transactionTypeName: "All",
    monthName: "All",
    depositDayName: "All",
    depositTypeName: "All",
    incomeTypeName: "All",
    incomeSourceName: "All",
  });
  let allDropDown = $state<TransactionDropDowns>({
    transactionDropdown: false,
    monthDropdown: false,
    depositDayDropdown: false,
    depositTypeDropdown: false,
    incomeTypeDropdown: false,
    incomeSourceDropdown: false,
  });

  const processTransactions = (transactions: Transaction[]) => {
    return transactions.map((item: any) => {
      const processedItem = { ...item };
      if (processedItem.incomeType === "4" || processedItem.incomeType === 4) {
        processedItem.incomeType = "3";
      }
      if (processedItem.transactionType === "DEBIT") {
        processedItem.amount *= -1;
      }
      processedItem.sourceName = getSourceNameById(
        processedItem.sourceID,
        incomeSources
      );
      return processedItem;
    });
  };

  const toggleSort = (
    column: any,
    updateSort: boolean = false,
    data: Transaction[]
  ) => {
    if (!updateSort) {
      sortDirection = sortBy === column ? sortDirection * -1 : 1;
    }

    sortBy = column;

    const getValue = (item: any) => {
      if (column === "incomeType") {
        const convertedValue = convertIncomeType(item[column]);
        if (convertedValue === "Other") {
          return item["ibvCategory"];
        } else {
          return convertedValue;
        }
      } else {
        return item[column];
      }
    };

    const isNumeric = (value: any) =>
      typeof value === "number" || (!isNaN(value) && !isNaN(parseFloat(value)));

    filteredData = [...data].sort((a, b) => {
      const aValue = getValue(a);
      const bValue = getValue(b);

      if (isNumeric(aValue) && isNumeric(bValue)) {
        return sortDirection * (parseFloat(aValue) - parseFloat(bValue));
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection * aValue.localeCompare(bValue);
      } else {
        return sortDirection * (aValue > bValue ? 1 : -1);
      }
    });
    if (tableRef) {
      tableRef.scrollTop = 0;
    }
  };

  const resetFilters = () => {
    allNames = {
      transactionTypeName: "All",
      monthName: "All",
      depositDayName: "All",
      depositTypeName: "All",
      incomeTypeName: "All",
      incomeSourceName: "All",
    };
    resetAllFilters = !resetAllFilters;
  };

  // filter data  according to the selected filters
  const updateDataOnFilter = () => {
    const filters = {
      transactionType: splitValuesToAnArray(allNames.transactionTypeName),
      month: splitValuesToAnArray(allNames.monthName),
      depositDay: splitValuesToAnArray(allNames.depositDayName),
      depositType: splitValuesToAnArray(allNames.depositTypeName),
      incomeType: splitValuesToAnArray(allNames.incomeTypeName),
      incomeSource: splitValuesToAnArray(allNames.incomeSourceName),
    };

    const filteredTransactions = [
      ...allTransaction.filter((item: any) =>
        Object.entries(filters).every(
          ([key, values]) =>
            values.includes("All") ||
            values.includes("") ||
            values.includes("Select") ||
            values.some((itemName: any) => {
              switch (key) {
                case "transactionType":
                  return item.transactionType.includes(itemName);
                case "month":
                  return getMonthYear(item.date) === itemName;
                case "depositDay":
                  return item.day.includes(itemName);
                case "depositType":
                  return item.depositType
                    .toLowerCase()
                    .includes(itemName.toLowerCase());
                case "incomeType":
                  if (itemName === "Transfers/Deposits") {
                    return item.incomeType.includes(3);
                  }
                  return item.incomeType.includes(
                    convertIncomeType(itemName, true)
                  );
                case "incomeSource":
                  return item.sourceID.includes(itemName);
                default:
                  return false;
              }
            })
        )
      ),
    ];
    toggleSort(sortBy, true, filteredTransactions);
  };

  const hideAllDropdowns = () => {
    allDropDown.transactionDropdown = false;
    allDropDown.monthDropdown = false;
    allDropDown.depositDayDropdown = false;
    allDropDown.depositTypeDropdown = false;
    allDropDown.incomeTypeDropdown = false;
    allDropDown.incomeSourceDropdown = false;
  };

  const calculateTotal = (data: Transaction[]) => {
    return data.reduce((sum, current) => sum + current.amount, 0);
  };

  $effect(() => {
    totalAmount = calculateTotal(filteredData);
  });

  $effect(() => {
    if (accountData.transactions) {
      allTransaction = processTransactions(accountData.transactions);
    }
  });

  $effect(() => {
    updateDataOnFilter();
  });
</script>

<div role="tooltip" tabIndex={-1} onmouseleave={hideAllDropdowns}>
  <div
    class="flex flex-col xl:flex-row xl:justify-between xl:items-center mb-6 md:mb-4 whitespace-nowrap"
  >
    <div class="flex justify-between items-center mb-2 xl:mb-0">
      <div class="pr-2 md:border-r-4 border-[#98c43d] mr-2">
        <h3 class="text-black font-medium opacity-85">All Transactions</h3>
      </div>
      <div class="flex flex-col md:flex-row md:items-center md:mr-auto">
        <div class="flex justify-between md:justify-start items-center">
          <a
            href="#!"
            onclick={resetFilters}
            class="text-canva-100 underline underline-offset-1">Reset Filters</a
          >
        </div>
      </div>
    </div>
    <div class="flex flex-wrap lg:flex-row md:items-center gap-y-2 lg:gap-4">
      {#key allTransaction}
        {#key resetAllFilters}
          <FilterSection
            bind:allNames
            {allTransaction}
            {incomeSources}
            bind:allDropDown
          />
        {/key}
      {/key}
    </div>
  </div>

  <div
    class="bg-white shadow-4xl shadow-b-0 rounded-md rounded-b-none relative overflow-auto"
  >
    <div
      class="bg-white shadow-b-4xl rounded-md rounded-b-none w-full overflow-hidden min-w-[1023px]"
    >
      <div
        class="w-full overflow-auto max-h-[500px] min-w-[1023px] xl:min-w-table-scroll-width overflow-x-hidden scrollbar-hide"
        bind:this={tableRef}
      >
        <div class="w-full text-sm leading-relaxed min-w-[1023px]">
          <div class="bg-naro-600 leading-loose sticky top-0 left-0">
            <div class="flex items-center">
              {#each headers as header (header)}
                {#if header?.isSortable}
                  <div
                    class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <button
                      class="flex cursor-pointer gap-1 justify-start items-center w-full"
                      onclick={() =>
                        toggleSort(header?.sortKey, false, filteredData)}
                    >
                      {header?.label}
                      <SortIcon
                        fillColor1={sortBy === header?.sortKey &&
                        sortDirection === 1
                          ? "#9C9C9C"
                          : "white"}
                        fillColor2={sortBy === header?.sortKey &&
                        sortDirection !== 1
                          ? "#9C9C9C"
                          : "white"}
                      />
                    </button>
                  </div>
                {:else}
                  <div
                    class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <div class="flex cursor-pointer">{header?.label}</div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
          <div class="divide-y divide-naro-200">
            {#if filteredData?.length > 0}
              {#each filteredData as item (item)}
                <div
                  class="flex justify-evenly duration-100 hover:bg-naro-100 hover:font-semibold"
                >
                  <div
                    class="w-1/5 px-4 py-2 text-naro-600 flex items-center gap-1"
                  >
                    <p>
                      {item["date"] ? convertDate(item["date"]) : "N/A"}
                    </p>
                  </div>
                  <div class="w-1/5 px-4 py-2 text-naro-600">
                    {item["day"]}
                  </div>
                  <div class="w-1/5 px-4 py-2 text-naro-600">
                    {#if item["transactionType"] === "DEBIT" && item["incomeType"] === "0"}
                      {item["ibvCategory"]}
                    {:else}
                      {convertIncomeType(item["incomeType"])}
                    {/if}
                  </div>
                  <div
                    class="w-1/5 px-4 py-2 text-naro-600 max-w-1/5 truncate"
                    title={item["description"]}
                  >
                    {item["description"]}
                  </div>
                  <div
                    class={`w-1/5 py-2 px-4 text-right ${
                      item["transactionType"] === "CREDIT"
                        ? "text-[#2c9f45]"
                        : item["transactionType"] === "DEBIT"
                          ? "text-red"
                          : "text-naro-600"
                    }`}
                  >
                    {convertToUSD(item["amount"]) ?? "N/A"}
                  </div>
                </div>
              {/each}
            {:else}
              <div>
                <div class="px-6 py-3 text-naro-600">No records found</div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="bg-white shadow-4xl shadow-t-0 rounded-b-md relative overflow-hidden"
  >
    <div class="bg-white shadow-b-4xl rounded-b-md w-full overflow-hidden">
      <div class="flex flex-row p-2 justify-end gap-2 border-t overflow-auto">
        <div class="px-[10px] py-3 text-naro-600 font-semibold">Total:</div>
        <div class="ps-8 py-3 text-naro-600">
          <span class={transactionTotalClassName(totalAmount, allNames)}
            >{convertToUSD(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
