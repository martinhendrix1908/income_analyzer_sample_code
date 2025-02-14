<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type {
    DropdownOption,
    ClaimConfiguration,
    IUnit,
  } from "$lib/types/types";

  let {
    isOpen = $bindable(),
    configuration,
  }: {
    isOpen: boolean;
    configuration: ClaimConfiguration | undefined;
  } = $props();

  let tab = $state("");
  let applyToOverrideUnits = $state(false);
  let selectedUnits = $state<DropdownOption[]>([]);
  let selectedOption = $state("all");
  let popUpBody = $state<HTMLDivElement>();
  let isLoading = $state(false);
  let units = $derived(page.data.unitList as IUnit[]);
  let unitDropdownOptions = $state<{ value: number | string; label: string }[]>(
    []
  );
  let errorMessage = $state("");
  let radioOptions = [
    {
      label: "All Entities",
      description: "New Changes will be applied to all entities in this group.",
      value: "all",
    },
    {
      label: "Selected Entities",
      description: "New Changes will only be applied to entities you select.",
      value: "selected",
    },
  ];

  const handleApplyChanges = async () => {
    const data = JSON.parse(JSON.stringify(configuration, null, 2));
    if (data?.ibvList?.length > 0) {
      data.ibvList = data.ibvList.map(
        ({ isDeleteOpen, isEditOpen, ...rest }: any) => ({ ...rest })
      );
    }
    if (
      units.length > 0 &&
      selectedOption === "selected" &&
      selectedUnits.length === 0
    ) {
      errorMessage = "Please select at least one unit";
      return;
    }

    try {
      isLoading = true;
      let res = await fetch(
        `/api/organization-settings/${page?.params?.id}?selectedUnits=${selectedUnits?.map((unit) => unit.value).join(",")}&applyToOverridden=${applyToOverrideUnits}`,
        {
          method: "POST",
          body: JSON.stringify({
            [tab]: data,
          }),
        }
      );
      const response = await res.json();
      if (!response.succeeded) {
        addToast({
          type: "error",
          message: response.message,
        });
        return;
      }
      addToast({
        type: "success",
        message: response.message,
      });
      goto(page.url.pathname + page.url.search, { invalidateAll: true });
      isOpen = !isOpen;
    } catch (e: any) {
      addToast({
        type: "error",
        message: e.message,
      });
    } finally {
      isLoading = false;
    }
  };

  $effect(() => {
    tab = page.url.searchParams.get("menu") || "";
    unitDropdownOptions = units.map((unit) => ({
      value: unit.orgUnitId,
      label: unit.name,
      icon: unit.ouType,
    }));
    if (tab === "Details") {
      applyToOverrideUnits = true;
    } else {
      applyToOverrideUnits = false;
    }
  });

  $effect(() => {
    if (selectedUnits.length < 0) {
      errorMessage = "Please select at least one unit";
    } else {
      errorMessage = "";
    }
  });
</script>

{#if isOpen}
  <PopupWrapper bind:isOpen {popUpBody}>
    <div
      class="flex relative flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5"
      bind:this={popUpBody}
    >
      {#if !(tab == "Details" || units.length === 0)}
        <div class="flex z-0 flex-col w-full max-md:max-w-full">
          <h2
            class="gap-10 self-stretch w-full text-lg font-medium leading-none text-neutral-800 max-md:max-w-full"
          >
            Apply New Settings to:
          </h2>

          {#each radioOptions as option}
            <div class="flex flex-wrap items-center gap-1 mt-4">
              <div class="flex gap-2 items-center max-md:max-w-full">
                <input
                  type="radio"
                  name="uni-selection"
                  checked={option.value === selectedOption}
                  onclick={() => {
                    selectedOption = option.value;
                    selectedUnits = [];
                    applyToOverrideUnits = false;
                  }}
                  id={option.label}
                />
                <label
                  class="self-stretch my-auto text-base font-semibold text-neutral-800 whitespace-nowrap"
                  for={option.label}
                >
                  {option.label}
                </label>
              </div>
              <p class="self-stretch my-auto text-sm text-zinc-600">
                {option.description}
              </p>
            </div>
            {#if selectedOption === "all" && option.value === "all" && tab !== "Details"}
              <div class="flex items-center gap-1 mt-4 ms-8">
                <Checkbox
                  bind:checked={applyToOverrideUnits}
                  id="applyToOverrideUnits"
                />
                <label for="applyToOverrideUnits"
                  >Apply to overridden entities.</label
                >
              </div>
            {/if}
          {/each}
        </div>
        {#if selectedOption === "selected"}
          <div class="flex z-0 flex-col mt-10 w-80 max-w-full">
            <h2
              class="gap-10 self-start text-lg font-medium leading-none text-neutral-800"
            >
              Select Entities to Apply New Setting
            </h2>

            <div class="flex flex-col mt-4 w-full max-w-xs">
              <label
                for="unitSelect"
                class="text-sm font-medium text-neutral-700"
                >Select Entities</label
              >
              <DynamicSelect
                mode="multi"
                options={unitDropdownOptions}
                bind:selectedValues={selectedUnits}
                placeholder="Search and select entities"
              />
            </div>
            {#if errorMessage.length > 0}
              <span class="text-red-600 text-xs"
                >{errorMessage || "Please select atleast one entity"}</span
              >
            {/if}
          </div>
        {/if}
      {:else}
        <div class="flex z-0 flex-col w-full max-md:max-w-full">
          <h2
            class="gap-10 self-stretch w-full text-lg font-medium leading-none text-neutral-800 max-md:max-w-full"
          >
            Are you sure you want to apply these changes?
          </h2>
        </div>
      {/if}
      <footer class="flex gap-2 items-start mt-10 min-h-[37px]">
        <Button
          class="w-full whitespace-nowrap"
          variant="black"
          onclick={handleApplyChanges}
          disabled={isLoading}
        >
          Apply Changes
        </Button>
        <Button
          class="w-full"
          variant="black"
          outlined
          onclick={() => {
            isOpen = false;
            selectedUnits = [];
            selectedOption = "all";
          }}
        >
          Cancel
        </Button>
      </footer>
    </div>
  </PopupWrapper>
{/if}
