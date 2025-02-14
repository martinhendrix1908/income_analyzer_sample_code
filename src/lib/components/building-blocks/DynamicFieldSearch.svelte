<script lang="ts">
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import type { DynamicSearchField } from "$lib/types/types";
  import InputField from "$lib/components/building-blocks/InputField.svelte";

  let {
    searchValue = $bindable(""),
    selectedSearchField = $bindable(),
    options,
  }: {
    searchValue: string;
    selectedSearchField: DynamicSearchField;
    options: DynamicSearchField[];
  } = $props();

  let isDropdownOpen = $state(false);

  function selectSearchField(field: DynamicSearchField) {
    selectedSearchField = field;
    isDropdownOpen = false;
    searchValue = "";
  }
</script>

<div class="flex md:flex-row flex-col gap-2 md:gap-4">
  <div class="relative flex min-w-[288px]">
    <div class="relative">
      <button
        type="button"
        class="flex items-center justify-between px-4 py-2 bg-white border border-[#4B5563] rounded-l-md text-[#222222] min-w-[120px]"
        onclick={() => (isDropdownOpen = !isDropdownOpen)}
      >
        <span>{selectedSearchField.label}</span>
        <i class="w-4 h-4 ml-2">
          <ChevronIcon direction="down" />
        </i>
      </button>
      {#if isDropdownOpen}
        <div
          class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
        >
          {#each options as field}
            <button
              class="w-full px-4 py-2 text-left hover:bg-gray-100"
              onclick={() => selectSearchField(field)}
            >
              {field.label}
            </button>
          {/each}
        </div>
      {/if}
    </div>
    <InputField
      class="flex-1 px-4 py-2 bg-white border border-l-0 border-[#4B5563] rounded-l-none rounded-r-md text-[#222222]"
      placeholder={`Search by ${selectedSearchField.label.toLowerCase()}...`}
      bind:value={searchValue}
    />
  </div>
</div>
