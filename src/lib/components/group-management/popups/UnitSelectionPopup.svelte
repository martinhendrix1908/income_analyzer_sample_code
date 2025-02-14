<script lang="ts">
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import type { DropdownOption } from "$lib/types/types";
  import Button from "$lib/components/building-blocks/Button.svelte";

  let {
    isOpen = $bindable(),
    units,
    lockedUnits,
    setLockedUnits,
  }: {
    isOpen: boolean;
    units: DropdownOption[];
    lockedUnits: DropdownOption[];
    setLockedUnits: (lockedUnits: DropdownOption[]) => void;
  } = $props();

  let modifiedUnits = $state<DropdownOption[]>([]);

  let isAllUnitChecked = $derived(modifiedUnits?.length === units?.length);

  let popUpBody: HTMLElement | undefined = $state(undefined);

  const handleSelectedUnits = (unit: DropdownOption) => {
    modifiedUnits = modifiedUnits?.some((u) => u.value === unit.value)
      ? modifiedUnits?.filter((u) => u.value !== unit.value)
      : [...modifiedUnits, unit];
  };

  const handleAllUnitsToggle = () => {
    modifiedUnits = isAllUnitChecked ? [] : [...units];
  };

  const handleSave = () => {
    setLockedUnits(modifiedUnits);
    isOpen = false;
  };

  const handleCancel = () => {
    modifiedUnits = lockedUnits;
    isOpen = false;
  };

  $effect(() => {
    modifiedUnits = lockedUnits || [];
  });
</script>

{#if isOpen}
  <PopupWrapper bind:isOpen {popUpBody}>
    <section
      class="flex flex-col p-6 bg-white rounded-lg max-w-[565px] w-[565px] max-md:px-5"
      bind:this={popUpBody}
    >
      <div
        class="flex overflow-hidden flex-col justify-center w-full font-medium bg-white rounded-lg border border-solid border-neutral-800 max-md:max-w-full"
      >
        <header
          class="flex flex-wrap gap-10 justify-between items-start px-6 py-2 w-full text-sm text-white border-solid bg-neutral-800 border-b-[0.5px] border-b-black max-md:px-5 max-md:max-w-full"
          style="position: sticky; top: 0; z-index: 1;"
        >
          <h4 class="text-sm font-medium leading-[21px] text-white">
            Entity Name
          </h4>
          <h4 class="text-sm font-medium leading-[21px] text-white">
            Override Lock
          </h4>
        </header>
        <div
          class="flex flex-col overflow-y-auto max-h-80 bg-zinc-100 custom-scrollbar"
        >
          <div
            class="flex flex-wrap gap-10 justify-between items-center px-6 py-2 w-full max-md:px-5 max-md:max-w-full bg-zinc-100"
          >
            <p class="text-sm leading-5 text-neutral-800">All Entities</p>

            <CustomSwitch
              title="All Entities"
              toggle={isAllUnitChecked}
              handleSwitch={handleAllUnitsToggle}
              isTextVisible
              color="#0A84FF"
            />
          </div>
          {#each units as unit (unit.value)}
            <div
              class="flex flex-wrap gap-10 justify-between items-center px-6 py-2 w-full border-t border-black max-md:px-5 max-md:max-w-full"
            >
              <div
                class="flex gap-2 self-stretch my-auto w-40 h-6 text-sm leading-5 text-neutral-800 items-center"
              >
                {unit.label}
                <span class="text-[#9C9C9C] font-normal text-xs"
                  >({unit.icon})</span
                >
              </div>

              <CustomSwitch
                title={unit.label}
                toggle={modifiedUnits?.some((u) => u.value === unit.value)}
                handleSwitch={() => handleSelectedUnits(unit)}
                isTextVisible
              />
            </div>
          {/each}
        </div>
      </div>

      <footer
        class="flex gap-2 items-start mt-8 w-full text-sm text-center max-md:max-w-full"
      >
        <Button class="w-full" onclick={handleSave}>Save choice</Button>
        <Button class="w-full" outlined onclick={handleCancel}>Cancel</Button>
      </footer>
    </section>
  </PopupWrapper>
{/if}
