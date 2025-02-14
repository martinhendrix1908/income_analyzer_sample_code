<script lang="ts">
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import { onMount } from "svelte";
  import DynamicIcon from "$lib/components/layout/DynamicIcon.svelte";
  import type { Option } from "$lib/types/types";

  let showMenu = $state(false);
  let searchValue = $state("");
  let dropdownPosition = $state<"top" | "bottom">("bottom");
  let selectedDiv = $state<HTMLDivElement | null>(null);
  let buttonRef = $state<HTMLDivElement | null>(null);
  let dropdownRef = $state<HTMLDivElement | null>(null);
  let filteredOptions = $state<Option[]>([]);

  let {
    id = "",
    name,
    options,
    placeholder,
    selectedValues = $bindable([]),
    disabled = false,
    required = false,
    maxHeight = "200px",
    noOptionsMessage = "No options available",
    customClass = "",
    mode = "multi",
    onChange,
    enableSearch = true,
    errorMessage,
    enableRemoveOption = false,
  }: {
    id?: string;
    name?: string;
    options: Option[];
    placeholder: string;
    selectedValues: Option[];
    disabled?: boolean;
    required?: boolean;
    maxHeight?: string;
    noOptionsMessage?: string;
    customClass?: string;
    mode?: "single" | "multi";
    onChange?: (selected: Option[]) => void;
    enableSearch?: boolean;
    errorMessage?: string;
    enableRemoveOption?: boolean; //This is for single mode only
  } = $props();

  $effect(() => {
    if (!searchValue.trim()) {
      filteredOptions = options;
    } else {
      filteredOptions = options.filter((item) =>
        item.label
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim())
      );
    }
  });

  $effect(() => {
    if (!showMenu) {
      searchValue = "";
    }
  });

  // Handle positioning
  function updateDropdownPosition() {
    if (!buttonRef || !dropdownRef) return;

    const buttonRect = buttonRef.getBoundingClientRect();
    const dropdownHeight = dropdownRef.offsetHeight;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const padding = 10;

    dropdownPosition =
      spaceBelow < dropdownHeight + padding && spaceAbove > spaceBelow
        ? "top"
        : "bottom";
  }

  // Handle selection/deselection
  function handleSelect(option: Option) {
    if (disabled) return;
    let newSelectedValues: Option[];

    if (mode === "single") {
      newSelectedValues = [option];
      showMenu = false;
    } else {
      const isSelected = selectedValues.some(
        (selected) => selected.value === option.value
      );

      if (isSelected) {
        newSelectedValues = selectedValues.filter(
          (selected) => selected.value !== option.value
        );
      } else {
        newSelectedValues = [...selectedValues, option];
      }
    }

    selectedValues = newSelectedValues;
    onChange?.(newSelectedValues);

    // Scroll to end of selection area for multi-select
    if (mode === "multi") {
      setTimeout(() => {
        selectedDiv?.scrollTo({
          left: selectedDiv.scrollWidth,
          behavior: "smooth",
        });
      }, 100);
    }
  }

  // Remove selected option
  function removeOption(optionValue: string | number) {
    if (disabled) return;
    const newSelectedValues = selectedValues.filter(
      (selected) => selected.value !== optionValue
    );
    selectedValues = newSelectedValues;
    onChange?.(newSelectedValues);
  }

  // Click outside handling
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (mode !== "single" && dropdownRef?.contains(target)) {
      return;
    }
    if (!target.closest(`.multi-select-area-${id}`)) {
      showMenu = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", updateDropdownPosition);
    window.addEventListener("resize", updateDropdownPosition);

    // Initialize filtered options
    filteredOptions = options;

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", updateDropdownPosition);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  });
</script>

<div class="relative {customClass} group {disabled && 'cursor-not-allowed'}">
  <div
    role="none"
    bind:this={buttonRef}
    class="multi-select-area-{id} relative inline-block font-[400] text-left w-full"
    onclick={() => {
      if (!disabled) {
        showMenu = !showMenu;
        if (showMenu) updateDropdownPosition();
      }
    }}
  >
    {#if enableRemoveOption && selectedValues.length > 0}
      <button
        type="button"
        class="focus:outline-none absolute top-[15px] right-10 transition-transform rounded-full bg-transparent disabled:cursor-not-allowed"
        onclick={(e) => {
          e.stopPropagation();
          removeOption(selectedValues[0].value);
        }}
        {disabled}
      >
        <CloseIcon height="16" width="16" fillColor="#6B7280" />
      </button>
    {/if}
    <i
      class="w-5 h-5 absolute top-[15px] right-2 transition-transform {showMenu
        ? 'rotate-180'
        : ''}"
    >
      <DownArrowHead fillColor="#222222" />
    </i>
    <div
      bind:this={selectedDiv}
      class="absolute flex gap-1 ms-2 top-[12px] max-w-[80%] whitespace-nowrap overflow-auto scrollbar-hide"
    >
      {#if mode === "multi"}
        {#each selectedValues as selected (selected.value)}
          <span
            class="flex gap-2 items-center self-stretch px-1.5 my-auto text-center whitespace-nowrap rounded bg-zinc-100 {disabled && '!bg-[#eee]'}"
          >
            <span class="self-stretch my-auto text-sm">{selected.label}</span>
            <button
              type="button"
              class="focus:outline-none disabled:cursor-not-allowed"
              onclick={(e) => {
                e.stopPropagation();
                removeOption(selected.value);
              }}
              {disabled}
            >
              <CloseIcon height="16" width="16" fillColor="#6B7280" />
            </button>
          </span>
        {/each}
      {:else if selectedValues.length > 0}
        <div
          class="flex gap-4 items-center self-stretch px-1.5 my-auto text-center whitespace-nowrap rounded"
        >
          {#if selectedValues[0]?.icon}
            <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
              <DynamicIcon icon={selectedValues[0]?.icon.toLowerCase()} />
            </i>
          {/if}
          <span class="self-stretch my-auto text-sm text-naro-500">
            {selectedValues[0].label}
          </span>
        </div>
      {/if}
    </div>

    <input
      {id}
      {name}
      class="flex justify-between items-center bg-white appearance-none p-3 border border-naro-300 text-naro-500 rounded text-sm outline outline-0 w-full disabled:bg-[#eee] !pr-6 disabled:cursor-not-allowed"
      placeholder={selectedValues.length > 0 ? "" : placeholder}
      {required}
      {disabled}
      style="padding-left:{selectedDiv?.clientWidth + 10}px;"
      value={searchValue}
      readonly={!enableSearch}
      oninput={(e) => {
        searchValue = e.currentTarget.value;
        showMenu = true;
        updateDropdownPosition();
      }}
    />
  </div>

  {#if showMenu}
    <div
      bind:this={dropdownRef}
      class="absolute z-[5] left-0 w-full shadow-lg ring-1 ring-black ring-opacity-5 bg-white rounded-md
            {dropdownPosition === 'top'
        ? 'bottom-[calc(100%+0.5rem)]'
        : 'top-[calc(100%+0.5rem)]'}"
    >
      <div class="p-2">
        <div class="overflow-y-auto" style="max-height: {maxHeight}">
          {#if filteredOptions.length > 0}
            {#each filteredOptions as option (option.value)}
              <div
                role="none"
                class="w-full flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
                onclick={() => handleSelect(option)}
              >
                {#if mode === "multi"}
                  <Checkbox
                    id={"checkbox-" + option.value}
                    checked={selectedValues.some(
                      (o) => o.value === option.value
                    )}
                  />
                {/if}
                <label
                  role="none"
                  class="flex cursor-pointer flex-1 gap-4 items-center"
                  for={mode === "multi"
                    ? "checkbox-" + option.value
                    : undefined}
                  onclick={(e) => {
                    if (mode === "multi") {
                      e.stopPropagation();
                    }
                  }}
                >
                  {#if mode !== "multi" && option?.icon}
                    <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
                      <DynamicIcon icon={option.icon.toLowerCase()} />
                    </i>
                  {/if}
                  <span>{option.label}</span>
                  {#if mode === "multi" && option?.icon}
                    <i class="h-5 w-5 flex-shrink-0" aria-hidden="true">
                      <DynamicIcon icon={option.icon.toLowerCase()} />
                    </i>
                  {/if}
                </label>

                {#if mode === "single" && selectedValues.some((o) => o.value === option.value)}
                  <i class="text-blue-500">✓</i>
                {/if}
              </div>
            {/each}
          {:else}
            <div class="p-2 text-gray-500">{noOptionsMessage}</div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>

{#if errorMessage}
  <span class="text-red text-sm">{errorMessage}</span>
{/if}
