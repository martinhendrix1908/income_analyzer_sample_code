<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import ConnectedIcon from "$lib/icons/ConnectedIcon.svelte";
  import DisconnectedIcon from "$lib/icons/DisconnectedIcon.svelte";
  import PolicyAlertIcon from "$lib/icons/PolicyAlertIcon.svelte";
  import type {
    AccountDropdownOption,
    IncomeAnalyzerData,
    ProductProcessingResult,
  } from "$lib/types/report.types";
  import AccountDropDown from "$lib/components/report/top-banner/AccountDropDown.svelte";

  interface TabProps {
    label: string;
    value: string;
  }
  let {
    accountGuid = $bindable(),
    activeTab,
  }: { accountGuid: string; activeTab: string } = $props();
  let iaResponse = $derived<IncomeAnalyzerData>(page?.data?.IAResponse);
  let productProcessingResult: ProductProcessingResult = $derived(
    iaResponse?.processingResult?.productProcessingResult
  );
  let options = $derived.by<AccountDropdownOption[]>(() =>
    productProcessingResult?.accounts?.map((item) => ({
      label: item?.banking?.accountType ?? "",
      value: item?.accountGuid,
      ending: item?.banking?.accountNumber,
      ami: item?.monthlyIncome?.activeMonthlyIncome.toString(),
      balance: item?.availableBalance
        ? item?.availableBalance?.toString() || "0"
        : item?.currentBalance?.toString() || "0",
      isConnected:
        iaResponse?.ibvStatusInfo?.requestCodeStatus ===
          "Cool Down" ||
        iaResponse?.ibvStatusInfo?.requestCodeStatus ===
          "Connected",
      isPrimary: item.primaryIncomeAccount,
    }))
  );

  let tabs = $state<TabProps[]>([
    { label: "Overview", value: "Overview" },
    { label: "Income", value: "Income" },
    { label: "Spending", value: "Spending" },
    { label: "Debt", value: "Debt" },
    { label: "Transactions", value: "Transactions" },
    { label: "History", value: "history" },
  ]);
  let connectedAccounts = $derived.by(
    () => options?.filter((i) => i.isConnected === true).length
  );
  let showActionbarTabs = $derived.by(() => {
    return page?.data?.user?.panelConfig?.ShowActionTabs ?? true;
  });

</script>

{#if activeTab !== "History" && page?.params?.id === iaResponse?.ibvStatusInfo?.lastRequestId}
  <div
    class="bg-naro-600 py-4 shadow-3xl sticky z-10 top-[60px] lg:top-[72px] left-0 border-t border-[#595959]"
  >
    <div
      class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto flex flex-wrap items-center justify-normal gap-6"
    >
      <!-- Left section: Account Selector -->
      <div class="flex items-center order-1 grow xl:grow-0">
        <!-- Icon links -->
        <div class="flex flex-col items-center">
          <div class="flex items-center text-[#98C43D] gap-1">
            <ConnectedIcon />
            <span class="text-sm">{connectedAccounts}</span>
          </div>
          <div class="flex items-center text-[#FF8400] gap-1">
            <DisconnectedIcon />
            <span class="text-sm">{options?.length - connectedAccounts}</span>
          </div>
        </div>
        <!-- Account Dropdown -->
        <div
          class="px-6 {showActionbarTabs
            ? 'border-e border-[#BFBFBF]'
            : 'border-none'}"
        >
          <AccountDropDown
            {options}
            placeholder="Select Account"
            id="account-dropdown"
            name="account-dropdown"
            bind:value={accountGuid}
            disabled={false}
          />
        </div>
      </div>
      {#if showActionbarTabs}
        <!-- Center section: Navigation -->
        <div
          class="flex grow items-center gap-6 text-white order-3 xl:order-2 overflow-x-auto scrollbar-hide"
        >
          {#each tabs as tab, index (tab)}
            <a
              href="?tab={tab.value}"
              onclick={(e) => {
                e.preventDefault();
                goto(`?tab=${tab.value}`, {
                  replaceState: true,
                  noScroll: true,
                });
              }}
              class="text-sm rounded hover:text-white p-2 {activeTab ===
              tab.value
                ? 'bg-[#98C43D] text-[#262626]'
                : 'hover:bg-[#404040]'}"
            >
              {tab.label}
            </a>
          {/each}
        </div>

        <!-- Right section: Buttons -->
        <div class="flex items-center gap-4 order-2 xl:order-3">
          <button
            class="bg-[#0A84FF] text-white text-sm py-2 px-6 rounded text-nowrap"
          >
            <span class="hidden sm:inline">Loan Dashboard</span>
            <span class="inline sm:hidden">Loan</span>
          </button>

          <div class="w-[1px] h-[39px] bg-[#BFBFBF]"></div>

          <i class="px-2"><PolicyAlertIcon /></i>
        </div>
      {/if}
    </div>
  </div>
{/if}
