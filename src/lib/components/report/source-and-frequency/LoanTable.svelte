<script lang="ts">
  import type { LoanSource } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertDateToDay } from "$lib/utils/date-utils";
  import { loanTableHeaders } from "../../../../routes/report/[id]/utils";

  let { loanData }: { loanData: LoanSource[]} = $props();

</script>

<div class="overflow-auto" id="loanTable">
  <table class="w-full text-sm leading-relaxed min-w-1285px">
    <thead class="bg-naro-600">
      <tr>
        {#each loanTableHeaders as header (header)}
          <th
            class="px-6 py-4 text-left text-white whitespace-nowrap font-normal"
          >
            <div class="flex">{header?.title}</div>
          </th>
        {/each}
      </tr>
    </thead>
    <tbody class="text-base align-top">
      {#if loanData?.length > 0}
        {#each loanData as item (item)}
          <tr class="hover:bg-naro-100 hover:shadow-inset">
            <td class="px-6 py-4 text-black">
              <b class="font-medium"
                >{convertToUSD(item["monthlyPayment"])
                  ? convertToUSD(item["monthlyPayment"])
                  : "N/A"}</b
              >
            </td>
            <td class="px-6 py-4 text-black">
              <b class="font-medium">
                {item["lenderName"] ? item["lenderName"] : "N/A"}</b
              >
            </td>
            <td class="px-6 py-4 text-black">
              {#if item["amountObserved"] === 0}
                <b class="font-medium">N/A</b>
                <br />
                <span class="text-sm opacity-85">Not Identified</span>
              {:else}
                <b class="font-medium">
                  {convertToUSD(item["amountObserved"])
                    ? convertToUSD(item["amountObserved"])
                    : "N/A"}
                </b> <br />
                <span class="text-sm opacity-85">Actual amount may vary.</span>
              {/if}
            </td>
            <td class="px-6 py-4 text-black">
              <span class="font-sm 2xl:font-medium flex items-center">
                <span class="">
                  <b class="font-medium">
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
                  </b>
                </span>
              </span>
            </td>
            <td class="px-6 py-4 text-black">
              <b class="font-medium"
                >{item["latestTransaction"]
                  ? convertDateToDay(item["latestTransaction"])
                  : "N/A"}</b
              >
            </td>
          </tr>
        {/each}
      {:else}
        <tr>
          <td class="px-6 py-3 text-naro-600"
            >No records found
          </td></tr
        >
      {/if}
    </tbody>
  </table>
</div>
