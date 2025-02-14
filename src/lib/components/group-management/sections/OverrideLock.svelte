<script lang="ts">
  import { page } from "$app/state";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import InformationTooltip from "$lib/components/building-blocks/InformationTooltip.svelte";
  import { HelpTexts } from "$lib/constants";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import ShieldIcon from "$lib/icons/ShieldIcon.svelte";
  import type {
    ClaimConfiguration,
    DropdownOption,
    IUnit,
  } from "$lib/types/types";
  import { deepClone } from "$lib/utils/common-utils";
  import UnitSelectionPopup from "$lib/components/group-management/popups/UnitSelectionPopup.svelte";
  import { onMount } from "svelte";

  let {
    configuration,
    setConfiguration,
    claimValue,
  }: {
    configuration: ClaimConfiguration;
    setConfiguration: (config: ClaimConfiguration) => void;
    claimValue: string;
  } = $props();

  let units: DropdownOption[] = $state(
    page.data.unitList.map((unit: IUnit) => ({
      value: unit.orgUnitId,
      label: unit.name,
      icon: unit.ouType,
    }))
  );
  let lockedUnits: DropdownOption[] = $derived.by(() => {
    const splitData = localConfiguration?.lockedUnits?.split(",");
    if (splitData) {
      return page.data.unitList
        .filter((unit: IUnit) => splitData.includes(unit.orgUnitId.toString()))
        .map((unit: IUnit) => ({
          value: unit.orgUnitId,
          label: unit.name,
          icon: unit.ouType,
        }));
    }
  });

  let localConfiguration = $state(deepClone(configuration));
  let isOpen = $state(false);
  let toggle = $state(false);

  const handleToggle = () => {
    toggle = !toggle;
    if (!toggle) {
      setLockedUnits([]);
    }
  };

  const setLockedUnits = (units: DropdownOption[]) => {
    let configCopy = deepClone(localConfiguration);
    configCopy = {
      ...configCopy,
      lockedUnits: units.map((unit) => unit.value).join(","),
    };
    localConfiguration = configCopy;
  };

  const handleDeleteUnits = (
    unit: DropdownOption,
    modifiedUnits: DropdownOption[]
  ) => {
    let _modifiedUnits = modifiedUnits.filter((u) => u.value !== unit.value);
    setLockedUnits(_modifiedUnits);
  };

  onMount(() => {
    toggle = lockedUnits?.length > 0;
  });

  $effect(() => {
    localConfiguration = configuration;
  });

  $effect(() => {
    setConfiguration(localConfiguration);
  });
</script>

<div class="flex flex-col gap-4">
  <div class="text-[20px] font-semibold leading-[21px] text-[#444444]">
    <h4>
      Override Lock <InformationTooltip content={HelpTexts.OverrideLock} />
    </h4>
  </div>
  <div class="py-2 flex gap-2">
    <CustomSwitch
      disabled={claimValue !== "Edit"}
      title="override-lock"
      {toggle}
      isTextVisible={true}
      handleSwitch={handleToggle}
    />
    <div class="flex flex-wrap gap-2">
      <label
        for="override-lock"
        class="text-[#222222] text-[14px] leading-[24px] font-normal"
      >
        Lock entities from overriding this setting</label
      >
      {#if toggle}
        <a
          href={null}
          onclick={() => {
            claimValue !== "Edit" ? null : (isOpen = !isOpen);
          }}
          class="text-[#0A84FF] hover:underline text-[14px] leading-[24px] font-normal cursor-pointer aria-disabled:cursor-not-allowed"
          aria-disabled={claimValue !== "Edit"}>Select entities</a
        >
      {/if}
    </div>
  </div>
  <section
    aria-label="Override Lock"
    class="px-1 flex overflow-hidden gap-2 items-center py-1 text-xs font-medium bg-[#FFF8FD] rounded-lg border border-[#EE42BD] text-neutral-800 w-fit"
  >
    <ShieldIcon />
    <h2 class="self-stretch my-auto text-base text-[#EE42BD]">Override Lock</h2>
    {#each lockedUnits as unit, i (i)}
      <button
        disabled={claimValue !== "Edit"}
        class="flex gap-2 items-center self-stretch px-1.5 py-0.5 my-auto text-center whitespace-nowrap rounded bg-zinc-100"
        onclick={claimValue === "Edit"
          ? () => handleDeleteUnits(unit, lockedUnits)
          : undefined}
      >
        <span class="self-stretch my-auto">{unit.label}</span>
        <CloseIcon height="16" width="16" fillColor="#6B7280" />
      </button>
    {/each}
  </section>
</div>

<UnitSelectionPopup bind:isOpen {units} {lockedUnits} {setLockedUnits} />
