<script lang="ts">
  import { page } from "$app/state";
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import InformationTooltip from "$lib/components/building-blocks/InformationTooltip.svelte";
  import { HelpTexts } from "$lib/constants";
  import type {
    ClaimConfiguration,
    IncomeConfiguration,
  } from "$lib/types/types";
  import { deepClone, capitalize } from "$lib/utils/common-utils";

  import OverrideLock from "$lib/components/group-management/sections/OverrideLock.svelte";

  let {
    configuration,
    setConfiguration,
    claimValue,
  }: {
    configuration: IncomeConfiguration;
    setConfiguration: (config: ClaimConfiguration) => void;
    claimValue: string;
  } = $props();

  let localConfiguration = $state<IncomeConfiguration>(configuration);
  let allChecked = $derived.by(() => {
    return (
      localConfiguration.incomeList.every((item) => item.isChecked) || false
    );
  });

  const setAllChecked = (checked: boolean) => {
    let configCopy = {
      ...localConfiguration,
      incomeList: localConfiguration.incomeList.map((item) => ({
        ...item,
        isChecked: checked,
      })),
    };
    localConfiguration = deepClone(configCopy);
    setConfiguration({ ...localConfiguration });
  };

  const handleCheckboxChange = (checked: boolean, index: number) => {
    let configCopy = {
      ...localConfiguration,
      incomeList: localConfiguration.incomeList.map((item, i) =>
        i === index ? { ...item, isChecked: checked } : item
      ),
    };
    localConfiguration = deepClone(configCopy);
    setConfiguration({ ...localConfiguration });
  };

  $effect(() => {
    localConfiguration = deepClone(configuration);
  });
</script>

<div class="flex flex-col gap-4">
  <div class="flex items-center flex-wrap gap-4">
    <h4
      class="text-[#404040] text-[20px] font-semibold leading-[21px] inline-flex items-center gap-2"
    >
      <span>
        Accepted Income Types
        <InformationTooltip content={HelpTexts.AcceptedIncomeTypes} />
      </span>
    </h4>
    <span
      class="text-sm font-medium leading-[21px] text-left text-[#0A84FF] p-1 rounded-md bg-[#F3F9FF]"
      >{localConfiguration.text}</span
    >
  </div>
  <div class="py-2">
    <div class="flex gap-3 mb-4">
      <Checkbox
        id="All"
        color="#0A84FF"
        checked={allChecked}
        onCheckedChange={(v) => setAllChecked(v as boolean)}
        disabled={claimValue !== "Edit"}
      />
      <label for="All" class="text-base text-naro-600 leading-4">All</label>
    </div>
    <div class="flex flex-col gap-4 ms-6">
      {#each localConfiguration.incomeList as item, index (item)}
        <div class="flex gap-3 items-center">
          <Checkbox
            id={item.name}
            color="#000000"
            checked={item.isChecked}
            disabled={claimValue !== "Edit"}
            onCheckedChange={(checked) =>
              handleCheckboxChange(checked as boolean, index)}
          />

          <label
            for={item.name}
            class="flex items-center flex-wrap gap-2 text-base text-naro-600 leading-4"
          >
            {capitalize(item.name)}
            {#if item.text}
              <span
                class="text-sm font-medium leading-[21px] text-left text-[#0A84FF] p-1 rounded-md bg-[#F3F9FF]"
                >{item.text}
              </span>
            {/if}
          </label>
        </div>
      {/each}
    </div>
  </div>
</div>
{#if page.data.unitList.length > 0}
  <hr />
  <OverrideLock {configuration} {setConfiguration} {claimValue} />
{/if}
