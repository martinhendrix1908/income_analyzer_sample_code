<script lang="ts">
  import ConnectedIcon from "$lib/icons/ConnectedIcon.svelte";
  import DisconnectedIcon from "$lib/icons/DisconnectedIcon.svelte";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import StarIcon from "$lib/icons/StarIcon.svelte";
  import type { AccountDropdownOption } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";

  let showMenu = $state(false);
  let selectedOption = $state<AccountDropdownOption | null>(null);
  let dropdownRef = $state<HTMLDivElement | null>(null);
  let {
    options,
    placeholder = "Select an option",
    value = $bindable(),
    onChange,
    name,
    id,
    disabled,
  }: {
    id?: string;
    options: AccountDropdownOption[];
    placeholder: string;
    value: string | string[];
    onChange?: (value: string | string[]) => void;
    name?: string;
    disabled?: boolean;
  } = $props();

  function handleOptionClick(option: AccountDropdownOption) {
    if (onChange) {
      onChange(option.value);
    }
    value = option.value;
    showMenu = false;
  }

  function handleOutsideClick(e: Event) {
    if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
      showMenu = false;
    }
  }

  $effect(() => {
    selectedOption =
      options.find((option) => option.value === value) || options[0];
  });
</script>

<svelte:window onclick={handleOutsideClick} />
<div
  class="relative w-[200px] shadow-[0px_0px_2px_0px_var(--Brand-Colors-primary,#09814A)] rounded"
  bind:this={dropdownRef}
>
  <button
    {id}
    type="button"
    class="flex items-center justify-between w-full bg-[#404040] border border-[#595959] text-white py-2 px-4 rounded"
    onclick={() => (showMenu = !showMenu)}
    {disabled}
  >
    <div class="flex items-center gap-2 text-base text-nowrap">
      <i class={selectedOption?.isPrimary ? "" : "hidden"}><StarIcon /></i>
      {#if selectedOption}
        <span class="flex items-center max-w-[113px] gap-1 text-xs">
          <Tooltip
            class="max-w-[90px] truncate"
            content={selectedOption.label}
            position="bottom"
            checkOverflow
          >
            {selectedOption.label.replaceAll("_", " ")}...
          </Tooltip><span>{selectedOption.ending}</span>
        </span>
      {:else}
        <span>{placeholder}</span>
      {/if}
    </div>
    <i class="w-4 h-4">
      <DownArrowHead fillColor="#ffffff" opacity="" />
    </i>
  </button>

  <!-- Dropdown Menu -->
  {#if showMenu}
    <div
      role="none"
      class="absolute left-0 w-full bg-[#404040] text-white shadow-lg max-h-60 overflow-y-auto z-50 rounded scrollbar-hide"
      onmouseleave={() => (showMenu = false)}
    >
      {#each options as option (option.value)}
        <div
          role="none"
          class="flex flex-col px-4 py-2 gap-1 cursor-pointer hover:bg-[#262626] text-[10px] text-white border-b border-[#666666] {option.isConnected
            ? 'bg-[#404040]'
            : 'bg-[#595959]'}"
          onclick={() => handleOptionClick(option)}
        >
          <div class="flex items-center justify-between w-full gap-1">
            <div class="flex items-center gap-1">
              <i>
                {#if option.isConnected}
                  <ConnectedIcon />
                {:else}
                  <DisconnectedIcon />
                {/if}
              </i>
              <span class="text-xs text-nowrap"
                >{option.label.replaceAll("_", " ")}</span
              >
            </div>
            <span
              class=" text-gray-300 truncate"
              title={convertToUSD(+option?.balance)}
              >Balance: {convertToUSD(+option?.balance)}</span
            >
          </div>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-1">
              <i class={option?.isPrimary ? "" : "invisible"}>
                <StarIcon />
              </i>
              <span class=" text-gray-300 truncate" title={option?.ending}
                >Ending in: {option?.ending}</span
              >
            </div>
            <span
              class=" text-gray-300 truncate"
              title={convertToUSD(+option?.ami)}
              >AMI: {convertToUSD(+option?.ami)}</span
            >
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
