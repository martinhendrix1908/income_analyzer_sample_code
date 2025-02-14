<script lang="ts">
  import { page } from "$app/state";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import InformationTooltip from "$lib/components/building-blocks/InformationTooltip.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { HelpTexts } from "$lib/constants";
  import PercentageIcon from "$lib/icons/PercentageIcon.svelte";
  import type {
    ClaimConfiguration,
    LendingGuideConfiguration,
  } from "$lib/types/types";
  import OverrideLock from "$lib/components/group-management/sections/OverrideLock.svelte";
  let {
    configuration = $bindable(),
    setConfiguration,
    claimValue,
  }: {
    configuration: LendingGuideConfiguration;
    setConfiguration: (config: ClaimConfiguration) => void;
    claimValue: string;
  } = $props();

  let config = $state<any>({
    minLoanAmountPercentage: configuration.minLoanAmountPercentage || 0,
    maxLoanAmountPercentage: configuration.maxLoanAmountPercentage || 0,
    minLoanAmount: configuration.minLoanAmount || 0,
    maxLoanAmount: configuration.maxLoanAmount || 0,
  });

  $effect(() => {
    config.minLoanAmountPercentage = configuration.minLoanAmountPercentage || 0;
    config.maxLoanAmountPercentage = configuration.maxLoanAmountPercentage || 0;
    config.minLoanAmount = configuration.minLoanAmount || 0;
    config.maxLoanAmount = configuration.maxLoanAmount || 0;
  });

  let bankuitySuggestionsDisabled = $state(
    !(
      configuration.minLoanAmountPercentage &&
      configuration.maxLoanAmountPercentage
    )
  );

  $effect(() =>
    setConfiguration({
      ...config,
      minLoanAmountPercentage: bankuitySuggestionsDisabled
        ? 0
        : +config.minLoanAmountPercentage,
      maxLoanAmountPercentage: bankuitySuggestionsDisabled
        ? 0
        : +config.maxLoanAmountPercentage,
      minLoanAmount: +config.minLoanAmount,
      maxLoanAmount: +config.maxLoanAmount,
    })
  );
</script>

<div class="flex flex-col gap-6 text-[#404040]">
  <h3 class="text-[#404040] font-semibold text-xl leading-[21px]">
    Bankuity-Suggested Loan Amounts
    <InformationTooltip content={HelpTexts.BankuitySuggestedLoanAmounts} />
  </h3>
  <div class="w-fit flex gap-2">
    <CustomSwitch
      isTextVisible
      handleSwitch={() => {}}
      title="bankuity-suggestions"
      bind:toggle={bankuitySuggestionsDisabled}
      disabled={claimValue !== "Edit"}
    />
    <label
      for="bankuity-suggestions"
      class="leading-6 text-[16px] text-[#262626]"
      >Bankuity Suggestions Disabled</label
    >
  </div>
</div>
{#if !bankuitySuggestionsDisabled}
  <div class="flex flex-col gap-6 text-[#404040]">
    <h3 class="text-[#404040] font-semibold text-xl leading-[21px]">
      Active Monthly Income (AMI) Based Lending Limits: <InformationTooltip
        content={HelpTexts.ActiveMonthlyIncome}
      />
    </h3>

    <div class="flex flex-col md:gap-8 gap-4">
      <div
        class="flex md:gap-8 gap-4 flex-wrap justify-start items-center w-full"
      >
        <div class="md:w-1/3 sm:w-2/5 w-full relative">
          <label
            class="text-sm font-medium leading-[21px] flex items-center gap-2 text-normal"
            for="minAmount"
          >
            Suggested Min Loan Amount
          </label>
          <div class="relative">
            <InputField
              placeholder="10"
              id="minAmount"
              bind:value={config.minLoanAmountPercentage}
              numberOnly
              disabled={claimValue !== "Edit"}
              isFloat
            />

            <div
              class="absolute right-3 inset-y-0 flex items-center pointer-events-none text-sm font-medium text-[#444444]"
            >
              <PercentageIcon />
            </div>
          </div>
          <span class="text-sm text-[#444444]"
            >E.g., If Active income is $3000, 10% = $300.</span
          >
        </div>
        <div class="md:w-1/3 sm:w-2/5 w-full relative">
          <label
            class="text-sm font-medium leading-[21px] flex items-center gap-2 text-normal"
            for="maxAmount"
            >Suggested Max Loan Amount
          </label>
          <div class="relative">
            <InputField
              placeholder="30"
              id="maxAmount"
              bind:value={config.maxLoanAmountPercentage}
              numberOnly
              disabled={claimValue !== "Edit"}
              isFloat
            />
            <div
              class="absolute right-3 inset-y-0 flex items-center pointer-events-none text-sm font-medium text-[#444444]"
            >
              <PercentageIcon />
            </div>
          </div>
          <span class="text-sm text-[#444444]"
            >E.g., If Active income is $3000, 30% = $900.</span
          >
        </div>
      </div>
    </div>
  </div>
  <hr />
{/if}
<div class="flex flex-col gap-6 text-[#404040]">
  <h3 class="text-[#404040] font-semibold text-xl leading-[21px]">
    Absolute Lending Limits
    <InformationTooltip content={HelpTexts.AbsoluteLendingLimits} />
  </h3>

  <div class="flex flex-col md:gap-8 gap-4">
    <div class="flex md:gap-8 gap-4 flex-wrap justify-start items-center">
      <div class="md:w-1/3 sm:w-2/5 w-full relative">
        <label
          class="text-sm font-medium leading-[21px] flex items-center gap-2 text-nowrap"
          for="minAmount"
        >
          Min Loan Amount
        </label>
        <InputField
          placeholder="10"
          id="minAmount"
          bind:value={config.minLoanAmount}
          numberOnly
          disabled={claimValue !== "Edit"}
          isFloat
          isPriceField
        />
      </div>
      <div class="md:w-1/3 sm:w-2/5 w-full relative">
        <label
          class="text-sm font-medium leading-[21px] flex items-center gap-2 text-nowrap"
          for="maxAmount"
          >Suggested Max Loan Amount
        </label>

        <InputField
          placeholder="30"
          id="maxAmount"
          bind:value={config.maxLoanAmount}
          numberOnly
          disabled={claimValue !== "Edit"}
          isFloat
          isPriceField
        />
      </div>
    </div>
  </div>
</div>

{#if page.data.unitList.length > 0}
  <hr />
  <OverrideLock {configuration} {setConfiguration} {claimValue} />
{/if}
