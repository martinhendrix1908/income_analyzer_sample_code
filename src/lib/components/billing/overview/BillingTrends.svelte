<script lang="ts">
  import DynamicLineChart from "$lib/components/building-blocks/charts/DynamicLineChart.svelte";
  import UpTriangleDotIcon from "$lib/icons/UpTriangleDotIcon.svelte";
  import DownTriangleDotIcon from "$lib/icons/DownTriangleDotIcon.svelte";
  import EqualsToIcon from "$lib/icons/EqualsToIcon.svelte";
  import DoughnutChart from "$lib/components/building-blocks/charts/DoughnutChart.svelte";
  import type { ChartData } from "chart.js";
  import {
    createCardData,
    processCustomerDataForChart,
  } from "../../../../routes/billing/utils";
  import type { IBillingDetails } from "$lib/types/billing.types";
  import { convertToUSD } from "$lib/utils/currency-utils";

  let {
    billingDetails,
  }: {
    billingDetails: IBillingDetails;
  } = $props();

  // Process line chart data
  let datasetsArray = $derived.by(() =>
    processCustomerDataForChart(billingDetails)
  );

  const cardData = $derived(createCardData(billingDetails));
</script>


  <div>
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap-1 lg:gap-0"
    >
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">Trends This Month</h3>
      </div>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <!-- Regular Cards -->
      {#each cardData as card, index (card)}
        <div
          class="flex flex-col bg-white shadow-md rounded-md text-[#404040] p-6 gap-4"
        >
          <h2 class="text-sm font-medium leading-5 text-[#404040]">
            {card?.title || "Title"}
          </h2>
          <hr class="border-t border-[#0000001A]" />

          <p class="text-2xl font-medium leading-tight text-[#404040]">
            {card?.value || "0"}
          </p>
          <div class="max-h-[130px] w-full">
            {#if card?.chartType === "line"}
              <DynamicLineChart
                chartData={datasetsArray[index] as ChartData<"line">}
              />
            {:else if card?.chartType === "doughnut"}
              <DoughnutChart
                chartData={datasetsArray[index] as ChartData<"doughnut">}
              />
            {/if}
          </div>
          <div class="flex flex-wrap text-sm mt-2">
            <span>Compared to last month:</span>
            <span class="font-medium mx-1 text-[#404040]">
              {card?.comparedValue || "0"}
            </span>
            <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
              {card?.comparedTrend || "0"}
              <i>
                {#if card?.trendIcon === "up"}
                  <UpTriangleDotIcon fillColor="#2C9F45" />
                {:else if card?.trendIcon === "down"}
                  <DownTriangleDotIcon fillColor="#BE0027" />
                {:else}
                  <EqualsToIcon fillColor="#000000" />
                {/if}
              </i>
            </span>
          </div>
          <hr class="border-t border-[#0000001A]" />

          <div class="flex flex-wrap text-sm mt-2">
            <span>Billing for the New Connections:</span>
            <span class="font-medium mx-1 text-[#404040]"
              >{convertToUSD(card?.billing)}</span
            >
          </div>
        </div>
      {/each}

      <!-- Refreshes Card -->
      <!-- <div
      class="flex flex-col bg-white shadow-md rounded-md text-[#404040] p-6 gap-4"
    >
      <h2 class="text-sm font-medium leading-5 text-[#404040]">
        Number of Refreshes
      </h2>
      <hr class="border-t border-[#0000001A]" />

      <p class="text-2xl font-medium leading-tight text-[#404040]">120</p>

      <div class="max-h-[130px] w-full">
        <DoughnutChart datasets={doughnutData} />
      </div>

      <div class="flex flex-wrap text-sm mt-2">
        <span>Compared to last month:</span>
        <span class="font-medium mx-1 text-[#404040]">50</span>
        <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
          200%
          <i><UpTriangleDotIcon fillColor="#2C9F45" /></i>
        </span>
      </div>
      <hr class="border-t border-[#0000001A]" />

      <div class="flex flex-wrap text-sm mt-2">
        <span>Billing for the New Connections:</span>
        <span class="font-medium mx-1 text-[#404040]">$253</span>
      </div>
    </div> -->
    </div>
  </div>