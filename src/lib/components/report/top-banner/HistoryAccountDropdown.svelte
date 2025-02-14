<script lang="ts">
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import UpArrowHead from "$lib/icons/UpArrowHead.svelte";

  type DropdownOption = {
    value: string;
    label: string;
    secondaryLabel?: string;
  };

  let {
    options,
    value = $bindable(""),
    placeholder = "Select an option",
    disabled = false,
  }: {
    options: DropdownOption[];
    value: string;
    placeholder: string;
    disabled: boolean;
  } = $props();

  let activeDropdown = $state(false);
  const selectedOption = $derived.by(() =>
    options.find((option) => option.value === value)
  );

  const toggleDropdown = () => {
    if (disabled || options.length <= 1) return;
    activeDropdown = !activeDropdown;
  };

  const selectOption = (option: DropdownOption) => {
    value = option.value;
    activeDropdown = false;
  };
</script>

<div
  role="button"
  tabindex={0}
  class="flew-col relative font-[400]"
  onmouseleave={() => {
    activeDropdown = false;
  }}
>
  <h1 class="font-normal text-[#DDDDDD] leading-6 text-sm">
    {placeholder}
  </h1>
  <button
    class="flex items-center justify-between bg-[#333333] rounded border-2 border-[#98C43D] px-2 md:px-3 py-3 mr-0 md:mr-3 font-medium text-xs md:text-sm w-[170px] md:w-[222px] h-[35px] md:h-[48px] {options?.length >
    1
      ? 'hover:bg-[#FFFFFF] hover:text-[#222222] hover:border-none text-[#98C43D]'
      : 'cursor-not-allowed opacity-80'}"
    onclick={toggleDropdown}
    disabled={disabled || options.length <= 1}
  >
    <div
      class="flex w-[140px] gap-1"
      title={selectedOption
        ? `${selectedOption?.label?.replaceAll("_", " ")}-${selectedOption.secondaryLabel ?? ""}`
        : placeholder}
    >
      <span class="truncate w-[80px]">
        {selectedOption?.label?.replaceAll("_", " ") || "N/A"}
      </span>
      <span class="truncate w-[60px]">
        {selectedOption?.secondaryLabel
          ? `...XX${selectedOption?.secondaryLabel}`
          : "N/A"}
      </span>
    </div>
    <div class="-ml-1 md:ml-2">
      <DownArrowHead
        opacity={options?.length > 1 ? "" : "opacity-50"}
        fillColor="#98C43D"
      />
    </div>
  </button>

  {#if activeDropdown}
    <div
      class="absolute left-[-0px] right-[-0.5px] mt-9 border-2 z-1 top-[-12px] origin-top-right rounded shadow-3xl w-[170px] md:w-[222px] justify-between text-[#222222] bg-[#FFFFFF] border-none font-medium text-xs md:text-sm flex flex-col overflow-x-hidden transition-all ease-in-out max-h-[200px]"
      role="none"
      onclick={() => {
        activeDropdown = false;
      }}
    >
      {#each options as option, index (option.value)}
        <button
          onclick={() => selectOption(option)}
          class="flex justify-between text-black hover:text-[#98c43d] truncate px-3 md:px-3 py-[14px] mr-0 md:mr-3 items-center bg-[#FFFFFF] rounded font-medium text-xs md:text-sm w-full min-h-[48px]"
          role="menuitem"
          title={`${option.label.replaceAll("_", " ") ?? "N/A"} - ${option.secondaryLabel ? "XX" + option.secondaryLabel : "N/A"}`}
        >
          <div class="flex w-[140px]">
            <span class="truncate w-[80px]">
              {option.label?.replaceAll("_", " ") ?? "N/A"}
            </span>
            <span class="truncate w-[60px]">
              {option.secondaryLabel ? `...XX${option.secondaryLabel}` : "N/A"}
            </span>
          </div>
          {#if index === 0}
            <div class="-ml-1 md:ml-2">
              <UpArrowHead opacity="" fillColor="#98C43D" />
            </div>
          {/if}
        </button>
      {/each}
    </div>
  {/if}
</div>
