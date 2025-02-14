<script lang="ts">
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import type { TransactionDropDown } from "$lib/types/report.types";
  import { getSourceNameById } from "../../../../routes/report/[id]/utils";

  let {
    label,
    selectedName = "Select",
    isOpen = false,
    items = $bindable(),
    handleButtonClick,
    handleCheckboxChange,
    checkOnlyOne,
    getSelectedCheckboxNames,
    convertIncomeType,
    category = [],
    categoryName = "",
    checkOnlyOneCategory = "",
    ariaLabelledBy = "menu-button",
    visibility,
    incomeSources,
  }: TransactionDropDown = $props();
</script>

<div
  class={`w-full sm:w-1/2 md:w-1/3 lg:w-auto flex justify-between lg:justify-start items-center sm:pr-6 lg:pr-0  ${visibility ? "" : "cursor-not-allowed opacity-50"}`}
>
  <span class="text-sm text-naro-600 mr-1">{label}</span>
  <div class="relative inline-block text-left">
    <button
      onclick={handleButtonClick}
      class={`text-sm text-naro-600 font-bold flex items-center ${visibility ? "" : "cursor-not-allowed opacity-50"}`}
      disabled={!visibility}
    >
      <span class="mr-1 max-w-[300px] truncate" title={selectedName}
        >{selectedName}</span
      >
      <DownArrowHead opacity={""} fillColor={"#222222"} />
    </button>
    {#if isOpen}
      <div
        class={`absolute right-0 z-10 mt-2 min-w-[240px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[242px] overflow-auto`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={ariaLabelledBy}
        tabindex="-1"
        onmouseleave={() => getSelectedCheckboxNames(category, categoryName)}
      >
        <div class="p-2" role="none">
          <div class="flex flex-col gap-2">
            {#each items as checkbox, index (checkbox.name)}
              <div class="group flex justify-between items-center">
                <label
                  class="flex text-black p-2 leading-relaxed cursor-pointer hover:text-[#2f80ed]"
                  for="checkbox-{index + 2}"
                >
                  <input
                    id="checkbox-{index + 2}"
                    type="checkbox"
                    class="appearance-none bg-center bg-cover border-2 border-current min-w-16px w-4 h-4 checked:border-black checked:bg-checkbox mt-0.5"
                    bind:checked={checkbox.checked}
                    onchange={(event) =>
                      handleCheckboxChange(
                        event,
                        index,
                        category,
                        checkOnlyOneCategory
                      )}
                  />
                  <span class="ml-2 text-sm">
                    {#if categoryName === "incomeSourceName"}
                      {getSourceNameById(checkbox?.name, incomeSources)}
                    {:else if categoryName === "incomeTypeName"}
                      {convertIncomeType(checkbox?.name)}
                    {:else}
                      {checkbox.name}
                    {/if}
                  </span>
                </label>
                {#if checkbox.name !== "All"}
                  <a
                    href="/"
                    title=""
                    class="text-[#2f80ed] text-sm group-hover:opacity-100 opacity-0 bg-[#e0f2fe] px-2 py-1 rounded-2xl"
                    onclick={(event) =>
                      checkOnlyOne(
                        event,
                        index,
                        category,
                        checkOnlyOneCategory
                      )}>Only</a
                  >
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
