<script lang="ts">
  import BestPlanIcon from "$lib/icons/BestPlanIcon.svelte";
  import RecommendedIcon from "$lib/icons/RecommendedIcon.svelte";
  import RenewIcon from "$lib/icons/RenewIcon.svelte";
  import TickIcon from "$lib/icons/TickIcon.svelte";
  import type { PlanOptions } from "$lib/types/billing.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import {
    createMonthlyData,
    pricingPlans,
  } from "../../../routes/billing/utils";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import RangeSelector from "$lib/components/building-blocks/RangeSelector.svelte";

  let {
    currentMonthIndex,
    isDataLoading = $bindable(),
  }: { currentMonthIndex: number; isDataLoading: boolean } = $props();

  let options = [
    { label: "Starter", value: "Starter" },
    { label: "Pro", value: "Pro" },
    { label: "Pro + IBV", value: "Pro + IBV" },
    { label: "Pro + LMS + IBV", value: "Pro + LMS + IBV" },
  ];
  let plans = $state<PlanOptions[]>(pricingPlans);
  let numberOfCustomers: number = $state(2000);
  let selectedOptions = $state<{ label: string; value: string }[]>([]);
  let selectedPlan = $derived.by<PlanOptions>(
    () =>
      plans.find((plan) => plan.title === selectedOptions[0]?.label) || plans[0]
  );
  let calculatedMonthlyPlan = $derived.by(() =>
    createMonthlyData(selectedPlan, numberOfCustomers, 3)
  );
  const handlePlanSelection = (value: string) => {
    selectedOptions = [{ label: value, value }];
  };

  $effect(() => {
    plans = pricingPlans;
    let plan = pricingPlans.find((plan) => plan.isCurrentPlan);
    selectedOptions = [
      { label: plan?.title as string, value: plan?.title as string },
    ];
  });
</script>

<div class="flex flex-col gap-2 items-center text-[#262626]">
  <h4 class="text-4xl font-extrabold font-[Inter]">Pay as you grow</h4>
  <p class="text-center text-[#666666] max-w-[848px] text-base font-normal">
    With a simple, scalable pricing model, each new customer connection is
    subject to a one-time connection fee based on your plan. Active connections
    are then maintained with a nominal monthly charge, providing unlimited
    access to refreshed data, critical alerts, and important insights whenever
    you need them.
  </p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  {#each plans as plan, index (plan)}
    <div
      class="bg-white shadow-lg px-6 pt-6 pb-4 rounded-md text-[#262626] flex flex-col"
    >
      <!-- Top Section -->
      <div class="flex-grow flex flex-col gap-4">
        <!-- Title -->
        <div class="flex items-center gap-[10px]">
          <span class="text-xl font-semibold">{plan.title}</span>
          {#if plan.isRecommended}
            <RecommendedIcon />
          {:else if plan.isBestPlan}
            <BestPlanIcon />
          {/if}
        </div>

        <!-- Description -->
        <div class="text-[#595959] text-lg">
          <p class="line-clamp-3">{plan.description}</p>
        </div>

        <!-- Price -->
        <div class="text-[32px] whitespace-normal font-semibold">
          <span>{plan.pricePerCustomer}</span>/Customer
        </div>

        <!-- Renewal Information -->
        <div class="flex items-center text-sm text-[#262626]">
          <RenewIcon />
          <span class="ml-2">
            Renews at <b class="text-[#262626]">{plan.renewalRate}/mo</b> per customer
          </span>
        </div>

        <!-- Features List -->
        <div class="flex flex-col gap-4">
          {#each plan.features as feature, i (feature)}
            <div class="flex items-center gap-2">
              <i><TickIcon /></i>
              <span class="text-sm">{feature}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="mt-4">
        <Button
          variant={plan.title === selectedOptions[0]?.label
            ? "primary"
            : "black"}
          class="w-full text-sm hover:border-[#222222] hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_2px_6px_2px_rgba(0,0,0,0.15)]"
          onclick={() => handlePlanSelection(plan.title)}
        >
          {plan.title === selectedOptions[0]?.label
            ? "Your Current Plan"
            : "Select This Plan"}
        </Button>
        <a
          href="#!"
          class="text-sm text-[#0A84FF] hover:underline block text-center mt-2"
        >
          Calculate my price
        </a>
      </div>
    </div>
  {/each}
</div>

<div class="flex flex-col items-center text-[#262626] w-full px-4">
  <div class="flex flex-col gap-6 w-full max-w-[816px]">
    <h4 class="text-2xl md:text-4xl font-extrabold font-[Inter] text-center">
      How many customers do you expect to add each month?
    </h4>

    <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
      <!-- Change Plan Section -->
      <div class="w-full md:w-1/3">
        <label for="plans" class="block text-sm font-medium text-gray-700"
          >Change plan</label
        >
        <DynamicSelect
          id="plans"
          placeholder="Select a plan"
          bind:selectedValues={selectedOptions}
          {options}
          mode="single"
        />
      </div>

      <!-- Range Selector Section -->
      <div class="w-full md:w-2/3">
        <label for="range" class="invisible text-sm font-medium text-gray-700"
          >Expected Customers</label
        >
        <RangeSelector
          minValue={0}
          maxValue={10000}
          step={100}
          bind:rangeValue={numberOfCustomers}
        />
      </div>
    </div>
    <!-- ----------------Calculations Card------------- -->
    <div
      class="flex flex-col p-6 gap-6 bg-white text-[#000000] rounded-md shadow-md w-full mx-auto"
    >
      {#each calculatedMonthlyPlan as month (month)}
        <div class="flex flex-col gap-2">
          <h3 class="text-sm font-normal text-[#808080]">
            {month.month}
          </h3>
          <div class="flex justify-between text-sm">
            <span>{month.newCustomers.label}</span>
            <div class="flex gap-2 items-center">
              <span class="text-[#404040] text-xs">
                {convertToUSD(month.newCustomers.value)} x {month.newCustomers
                  .multiplier}
              </span>
              <span class="font-semibold text-[#000000]">
                {convertToUSD(month.newCustomers.total)}
              </span>
            </div>
          </div>
          {#if month.activeCustomers}
            <div class="flex justify-between text-sm">
              <span>{month.activeCustomers.label}</span>
              <div class="flex gap-2 items-center">
                <span class="text-[#404040] text-xs">
                  {convertToUSD(month.activeCustomers.value)} x {month
                    .activeCustomers.multiplier}
                </span>
                <span class="font-semibold text-[#000000]">
                  {convertToUSD(month.activeCustomers.total)}
                </span>
              </div>
            </div>
          {/if}
          <hr class="bg-[#CCCCCC]" />
          <div class="flex justify-between font-semibold text-sm">
            <span>Total</span>
            <span class="">{convertToUSD(month.total)}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
