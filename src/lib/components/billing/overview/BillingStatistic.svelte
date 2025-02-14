<script lang="ts">
  import DownTriangleDotIcon from "$lib/icons/DownTriangleDotIcon.svelte";
  import UpTriangleDotIcon from "$lib/icons/UpTriangleDotIcon.svelte";
  import type { CustomerIncomeDetails } from "$lib/types/billing.types";
  import { convertToUSD } from "$lib/utils/currency-utils";

  let {
    customerIncomeDetails,
  }: { customerIncomeDetails: CustomerIncomeDetails } = $props();
</script>

<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
>
  <!-- Invoice Total -->
  <div
    class="bg-[#262626] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-white"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <span class="text-sm font-medium text-[#BFBFBF]">Invoice Total</span>
      </div>
      <div class="flex items-center">
        <h2 class="text-[#98C43D] text-[28px] font-medium mr-2">$0.00</h2>
      </div>
      <div class="flex flex-wrap mb-1 text-sm text-[#BFBFBF]">
        Next Invoice on:
        <span class="font-medium mx-1 text-white"> 02/19/2024 </span>
      </div>
    </div>
  </div>

  <!-- New Customers -->
  <div
    class="bg-[#FFF] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-[#404040]"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">New Customers</span>
        <span class="text-sm font-medium text-[#808080]">
          {convertToUSD(customerIncomeDetails?.newPrice)}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[#000000] text-[28px] font-medium mr-2">
          {customerIncomeDetails?.totalNew || "0"}
        </h2>
        <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
          {customerIncomeDetails?.totalNewDelta}
          {#if customerIncomeDetails?.totalNewDelta >= 0}
            <i class=""><UpTriangleDotIcon fillColor="#2C9F45" /></i>
          {:else}
            <i class=""><DownTriangleDotIcon fillColor="#BE0027" /></i>
          {/if}
        </span>
      </div>
      <div class="flex flex-wrap mb-1 text-sm text-[#404040]">
        Cost:
        <span class="font-medium mx-1 text-[#262626]">
          {convertToUSD(
            customerIncomeDetails?.newPrice * customerIncomeDetails?.totalNew
          )}
        </span>
      </div>
    </div>
  </div>

  <!-- Active Customers -->
  <div
    class="bg-[#FFF] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-[#404040]"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Active Customers</span>
        <span class="text-sm font-medium text-[#808080]">
          {convertToUSD(customerIncomeDetails?.activePrice)}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[#000000] text-[28px] font-medium mr-2">
          {customerIncomeDetails?.totalActive || "0"}
        </h2>
        <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
          {customerIncomeDetails?.totalActiveDelta}
          {#if customerIncomeDetails?.totalActiveDelta >= 0}
            <i class=""><UpTriangleDotIcon fillColor="#2C9F45" /></i>
          {:else}
            <i class=""><DownTriangleDotIcon fillColor="#BE0027" /></i>
          {/if}
        </span>
      </div>
      <div class="flex flex-wrap mb-1 text-sm text-[#404040]">
        Cost:
        <span class="font-medium mx-1 text-[#262626]">
          {convertToUSD(
            customerIncomeDetails?.activePrice *
              customerIncomeDetails?.totalActive
          )}
        </span>
      </div>
    </div>
  </div>

  <!-- Disconnected -->
  <div
    class="bg-[#FFF] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-[#404040]"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Disconnected</span>
        <span class="text-sm font-medium text-[#808080]">
          {convertToUSD(customerIncomeDetails?.disconnectedPrice)}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[#000000] text-[28px] font-medium mr-2">
          {customerIncomeDetails?.totalDisconnected || "0"}
        </h2>
        <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
          {customerIncomeDetails?.totalDisconnectedDelta}
          {#if customerIncomeDetails?.totalDisconnectedDelta >= 0}
            <i class=""><UpTriangleDotIcon fillColor="#2C9F45" /></i>
          {:else}
            <i class=""><DownTriangleDotIcon fillColor="#BE0027" /></i>
          {/if}
        </span>
      </div>
      <div class="flex flex-wrap mb-1 text-sm text-[#404040]">
        Cost:
        <span class="font-medium mx-1 text-[#262626]">
          {convertToUSD(
            customerIncomeDetails?.disconnectedPrice *
              customerIncomeDetails?.totalDisconnected
          )}
        </span>
      </div>
    </div>
  </div>

  <!-- Refreshes -->
  <div
    class="bg-[#FFF] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-[#404040]"
  >
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Refreshes</span>
        <span class="text-sm font-medium text-[#808080]">
          <!-- {convertToUSD(customerIncomeDetails?.refreshesPrice)} -->
          Free + Unlimited
        </span>
      </div>
      <div class="flex items-center gap-2">
        <h2 class="text-[#000000] text-[28px] font-medium mr-2">
          {customerIncomeDetails?.totalRefreshes || "0"}
        </h2>
        <span class="flex gap-1 items-center text-[#9C9C9C] text-[10px]">
          {customerIncomeDetails?.totalRefreshesDelta}
          {#if customerIncomeDetails?.totalRefreshesDelta >= 0}
            <i class=""><UpTriangleDotIcon fillColor="#2C9F45" /></i>
          {:else}
            <i class=""><DownTriangleDotIcon fillColor="#BE0027" /></i>
          {/if}
        </span>
      </div>
      <div class="flex flex-wrap mb-1 text-sm text-[#404040]">
        Cost:
        <span class="font-medium mx-1 text-[#262626]">
          {convertToUSD(
            customerIncomeDetails?.refreshesPrice *
              customerIncomeDetails?.totalRefreshes
          )}
        </span>
      </div>
    </div>
  </div>
</div>
