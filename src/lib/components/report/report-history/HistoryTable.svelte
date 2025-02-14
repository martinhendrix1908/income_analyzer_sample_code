<script lang="ts">
  import { showLoader } from "$lib/store/loader-store";
  import type { HistoricalAccountInfo } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertDateTime } from "$lib/utils/date-utils";

  let {
    historicalReportArr,
  }: {
    historicalReportArr: HistoricalAccountInfo[];
  } = $props();

</script>

<div>
  <div
    class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4"
  >
    <div class=" flex pr-2 md:border-r-4 border-parrot mr-2 gap-2 items-center">
      <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
        History
      </h3>
    </div>
  </div>
  <div class="bg-white shadow-4xl shadow-b-0 rounded relative overflow-auto">
    <!-- -------------------Header------------------------- -->
    <div
      class="w-full absolute top-0 left-0 h-11 overflow-hidden min-w-1023px xl:pr-3 bg-naro-600"
    >
      <table class="w-full text-sm leading-relaxed min-w-1023px">
        <thead class="bg-naro-600 leading-loose">
          <tr>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Refreshed On</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Unit</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer gap-1">Refreshed By</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer gap-1">Available Balance</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer gap-1">Active Income</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Min-Max Loan</div>
            </th>
            <th
              class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Risk Assessment</div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-naro-200">
          <tr>
            <td
              class="w-48 px-4 py-2 whitespace-nowrap text-[#0A84FF] no-underline hover:underline"
              ><span>02/19/2023, 09:46 AM</span></td
            >
            <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
              >Cashmax 30</td
            >
            <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
              >User Name</td
            >
            <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
              >$461.95</td
            >
            <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
              >$8,461.95</td
            >
            <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
              >$1,700 - $3,400</td
            >
            <td
              class="w-48 px-4 py-2 whitespace-nowrap text-naro-600 flex items-center gap-1"
            >
              <i class="w-2 h-2 rounded-md bg-[#BE0027]"></i>
              <span>Acceptable</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- ----------------Body----------------------- -->
    <div
      class="bg-white shadow-b-4xl rounded-md rounded-b-none w-full overflow-hidden min-w-1023px mt-11"
    >
      <div
        class="w-full overflow-auto max-h-500px min-w-1023px xl:min-w-table-scroll-width overflow-x-hidden"
      >
        <table class="w-full text-sm leading-relaxed min-w-1023px -mt-11">
          <thead class="bg-naro-600 leading-loose">
            <tr>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer">Refreshed On</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer">Unit</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer gap-1">Refreshed By</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer gap-1">Available Balance</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer gap-1">Active Income</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer">Min-Max Loan</div>
              </th>
              <th
                class="w-48 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer">Risk Assessment</div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-naro-200">
            {#each historicalReportArr as report}
              <tr>
                <td class="w-48 px-4 py-2 whitespace-nowrap text-[#0A84FF]">
                  <a
                  href="/report/{report?.requestId}"
                  onclick={() => showLoader()}
                    class="no-underline hover:underline"
                    title={report?.requestId}
                    >{convertDateTime(report?.snapshotDate || "").replaceAll(
                      " at",
                      ","
                    )}</a
                  ></td
                >
                <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
                  >{report?.unitName || ""}</td
                >
                <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
                  >{report?.refreshedBy || ""}</td
                >
                <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
                  >{convertToUSD(report?.availableBalance) || "$0"}</td
                >
                <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
                  >{convertToUSD(report?.activeMonthlyIncome) || "$0"}</td
                >
                <td class="w-48 px-4 py-2 whitespace-nowrap text-naro-600"
                  >{convertToUSD(report?.minLoan) || "$0"} - {convertToUSD(
                    report?.maxLoan
                  ) || "$0"}</td
                >

                <td
                  class="w-48 px-4 py-2 whitespace-nowrap text-naro-600 flex items-center gap-1"
                >
                  {#if report?.riskAssessmentData === "High"}
                    <i class="w-2 h-2 rounded-md bg-[#BE0027]"></i>
                  {:else if report?.riskAssessmentData === "Moderate"}
                    <i class="w-2 h-2 rounded-md bg-[#CF8D2E]"></i>
                  {:else if report?.riskAssessmentData === "Acceptable"}
                    <i class="w-2 h-2 rounded-md bg-[#2C9F45]"></i>
                  {/if}
                  <div>
                    {report?.riskAssessmentData || ""}
                  </div>
                </td>
              </tr>
              <!-- {/if} -->
            {/each}
            {#if !historicalReportArr?.length}
              <tr>
                <td class="px-6 py-3 text-naro-600 whitespace-nowrap"
                  >No records found
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
