<script lang="ts">
  import { Months } from "$lib/constants";
  import { isLoading } from "$lib/store/loader-store";
  import { addToast } from "$lib/store/toast-store";
  import type { IBillingDetails } from "$lib/types/billing.types";
  import BillingBreakdown from "$lib/components/billing/overview/BillingBreakdown.svelte";
  import BillingStatistic from "$lib/components/billing/overview/BillingStatistic.svelte";
  import BillingTrends from "$lib/components/billing/overview/BillingTrends.svelte";

  let {
    currentMonthIndex,
    isDataLoading = $bindable(),
  }: { currentMonthIndex: number; isDataLoading: boolean } = $props();
  let billingDetails = $state<IBillingDetails>({} as IBillingDetails);
  let unitCustomerDetails = $derived(billingDetails?.unitCustomerDetails);
  let customerIncomeDetails = $derived(billingDetails?.customerIncomeDetails);

  const getBillingData = async (currentMonth: number) => {
    isDataLoading = true;
    try {
      billingDetails = {} as IBillingDetails;
      const response = await fetch(`/api/billing?month=${currentMonth}&year=0`);
      if (!response.ok) {
        throw new Error("Error fetching billing data: " + response.statusText);
      }
      const data = await response.json();
      billingDetails = data;
      isDataLoading = false;
    } catch (error) {
      console.error("Error fetching billing data:", error);
      addToast({
        type: "error",
        message: "Error fetching billing data.",
      });
      isDataLoading = false;
    }
  };

  $effect(() => {
    getBillingData(currentMonthIndex + 1);
  });
</script>

{#if !isDataLoading}
  <BillingStatistic {customerIncomeDetails} />
  <BillingTrends {billingDetails} />
  <BillingBreakdown {unitCustomerDetails} />
{:else if !$isLoading}
  <div
    class="mt-10 overflow-hidden w-full h-[200px] !z-[999999] flex flex-col gap-4 items-center justify-center"
  >
    <div class="flex items-center justify-center">
      <div
        class="w-4 h-4 bg-[#09814A] rotate-[-45] rounded-[1px] animate-IA-switch-1"
      ></div>
      <div
        class="w-4 h-4 bg-[#98C43D] rotate-[-45] rounded-[1px] animate-IA-switch-2"
      ></div>
    </div>
    <p class="text-[#09814A]">
      Fetching data for {Months[currentMonthIndex]}...
    </p>
  </div>
{/if}
