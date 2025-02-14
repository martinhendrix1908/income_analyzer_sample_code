<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import { Months } from "$lib/constants";
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";

  const tabs = {
    Overview: () =>
      import("$lib/components/billing/overview/BillingOverview.svelte"),
    "Manage Plan": () => import("$lib/components/billing/ManagePlan.svelte"),
    "Past Invoices": () =>
      import("$lib/components/billing/PastInvoices.svelte"),
    "Manage Add-ons": () =>
      import("$lib/components/billing/ManageAddOns.svelte"),
    "Payment Methods": () =>
      import("$lib/components/billing/payment/Payment.svelte"),
  };

  let activeTab = $derived<string>(
    page?.url?.searchParams.get("tab") || "Overview"
  );
  let isDataLoading = $state(false);
  let DynamicComponent = $state<any>(null);
  let currentMonthIndex = $state(11);

  const handleTabClick = (tab: string) => {
    goto(`?tab=${tab}`);
  };

  $effect(() => {
    const loadComponent = async () => {
      try {
        const importFn = tabs[activeTab as keyof typeof tabs];
        const module = await importFn();
        DynamicComponent = module.default;
      } catch (error) {
        console.error("Failed to load component:", error);
        DynamicComponent = null;
      }
    };

    loadComponent();
  });

  function handleMonthChange(direction: "left" | "right") {
    if (direction === "left" && currentMonthIndex > 0) {
      currentMonthIndex -= 1;
    } else if (direction === "right" && currentMonthIndex < Months.length - 1) {
      currentMonthIndex += 1;
    }
  }
</script>

<SectionWrapper>
  <div class="flex md:flex-row flex-col gap-2">
    <div class="pr-2 md:border-r-4 border-parrot">
      <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
        Billing
      </h3>
    </div>
    <Tabs
      tabs={[
        "Overview",
        "Manage Plan",
        "Past Invoices",
        "Manage Add-ons",
        "Payment Methods",
      ]}
      variant="black"
      {activeTab}
      onTabClick={handleTabClick}
    />
    {#if activeTab === "Overview"}
      <div
        class="flex items-center justify-end md:ml-auto w-full md:w-auto mt-2 md:mt-0"
      >
        <button
          type="button"
          class="flex disabled:opacity-20 disabled:cursor-not-allowed"
          onclick={() => handleMonthChange("left")}
          disabled={currentMonthIndex === 0 || isDataLoading}
        >
          <ChevronIcon direction="left" />
        </button>
        <span class="w-20 text-center text-base font-normal">
          {Months[currentMonthIndex]}
        </span>
        <button
          type="button"
          class="flex disabled:opacity-20 disabled:cursor-not-allowed"
          onclick={() => handleMonthChange("right")}
          disabled={currentMonthIndex === Months.length - 1 || isDataLoading}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
    {/if}
  </div>

  {#if DynamicComponent}
    <DynamicComponent {currentMonthIndex} bind:isDataLoading />
  {/if}

</SectionWrapper>
