<script>
  import BillingOverview from "$lib/components/billing/overview/BillingOverview.svelte";
  let currentMonthIndex = $state(new Date().getMonth());
  let isDataLoading = $state(false);
</script>

<div class="flex md:flex-row flex-col gap-2 -mb-7">
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85 whitespace-nowrap">Billing</h3>
  </div>
</div>
<BillingOverview {currentMonthIndex} bind:isDataLoading />
