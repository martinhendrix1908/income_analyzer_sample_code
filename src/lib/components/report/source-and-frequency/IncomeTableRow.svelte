<script lang="ts">
  import HelpIcon from "$lib/icons/HelpIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertDateToDay } from "$lib/utils/date-utils";
  import { getMonth, getName, getOrdinalSuffix } from "../../../../routes/report/[id]/utils";
let {
    item,
    rowIndex,
    indexOfLine=$bindable(),
    tooltipVisible=$bindable(),
    showHideTooltip,
    showTooltip,
    getClassName
 }: { 
    item: any;
    rowIndex:number;
    indexOfLine:number|undefined;
    tooltipVisible:boolean;
    showHideTooltip: (index: number) => void;
    showTooltip: (event: MouseEvent, date: string) => void;
    getClassName: (data: string, frequency: string, shades: any, missingPayDay: any[]) => string;
    
 } = $props();

</script>

<tr class="hover:bg-naro-100 hover:shadow-inset">
    <td class="px-6 py-4 text-black font-sm"
      ><span class="font-medium">
        {convertToUSD(item["totalAmount"])}</span
      >
      <br /><span class="text-sm opacity-85"
        >{item["numOfPay"]} Transactions
      </span>
    </td>
    <td class="px-6 py-4 text-black"
      ><span class="font-medium inline-block">
        {convertToUSD(item["estimatedMonthlyIncome"])}</span
      >
    </td>
    <td class="px-6 py-4 text-black font-medium">
      {#if item["incomeType"] === "Benefit"}
        Retirement & Benefits
      {:else}
        {item["incomeType"]}
      {/if}
    </td>
    <td class="px-6 py-4 text-black font-md"
      ><span class="font-medium">{item["incomeSource"]}</span>
      <br /><span class="text-sm opacity-85"
        >{item["depositMethod"] === "Direct Deposit"
          ? "Direct Deposit"
          : ""}
      </span>
    </td>
    <td class="px-6 py-4 text-naro-600">
      <span class="font-sm 2xl:font-medium flex items-center">
        <span class="font-medium">
          {#if item["frequency"] === "I"}
            Inconsistent
          {:else if item["frequency"] === "W"}
            Weekly
          {:else if item["frequency"] === "B"}
            Bi-Weekly
          {:else if item["frequency"] === "M"}
            Monthly
          {:else if item["frequency"] === "S"}
            Semi-Monthly
          {:else}
            Inconsistent
          {/if}
        </span>
        <button
          class="ml-2 cursor-pointer relative hidden"
          onmouseenter={() => showHideTooltip(rowIndex)}
          onmouseleave={() => (indexOfLine = 100)}
        >
          <HelpIcon />
          {#if indexOfLine === rowIndex}
            <div
              class="absolute text-black bottom-6 bg-white min-w-350px shadow-3xl -right-4 text-sm font-normal not-italic p-2 rounded z-20"
            >
              Payroll transactions from multiple sources have been
              identified.
            </div>
          {/if}
        </button>
      </span>
      {#if item["frequency"] == "I" || (item["sameDayFreq"] && item["sameDayFreq"] === 0) || !item["sameDayFreq"]}
        <span class="text-sm opacity-85">No Pattern Identified</span
        ><br />
      {:else}
        <span class="text-sm opacity-85 whitespace-nowrap"
          >{item["sameDayFreq"]}% occurred on
          {getOrdinalSuffix(item?.regularPayDay)}
        </span>
      {/if}
    </td>
    <td class="px-6 py-4 text-naro-600">
      <div class="max-w-264px overflow-hidden max-h-56px">
        <div
          class="max-w-264px overflow-x-auto overflow-y-hidden pb-1 {item?.sortedDates &&
          item?.sortedDates?.length >= 7
            ? 'scrollableDiv'
            : ''}"
        >
          <div class="flex gap-2 text-sm">
            {#if item.groupedDates}
              {#each item.groupedDates as arr, index}
                <div class="flex flex-col">
                  <div
                    class="text-xs text-center w-full border-[#9C9C9C] border-l border-r flex items-center leading-4 mb-1"
                  >
                    <hr class="w-full m-0 border-[#9C9C9C]" />
                    <span class="px-0.5"
                      >{getMonth(arr[0].split("-")[1])}</span
                    >
                    <hr class="w-full m-0 border-[#9C9C9C]" />
                  </div>
                  <div class="flex gap-1">
                    {#each arr as data (data)}
                      <div class="relative">
                        <button
                          onmouseenter={(event) => {
                            showTooltip(event, data);
                          }}
                          onmouseleave={() =>
                            (tooltipVisible = false)}
                          class={getClassName(
                            data,
                            item["frequency"],
                            item["shades"] as any,
                            item["missingPayDay"]
                          )
                            ? getClassName(
                                data,
                                item["frequency"],
                                item["shades"] as any,
                                item["missingPayDay"]
                              )
                            : "bg-naro-100 px-1 leading-loose rounded min-w-35px"}
                        >
                          {#if item["missingPayDay"].includes(data)}
                            N/A
                          {:else}
                            {getName(data, item["frequency"])
                              ? getName(data, item["frequency"])
                              : convertDateToDay(data).split(",")[0]}
                          {/if}
                        </button>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </td>
  </tr>

  <style>
    .scrollableDiv {
      display: flex;
      flex-direction: row-reverse;
      /* flex-direction: row; */
      /* direction: rtl; */
    }
  </style>