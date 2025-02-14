<script lang="ts">
  import CheckCircle from "$lib/icons/CheckCircle.svelte";
  import CrossCircle from "$lib/icons/CrossCircle.svelte";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import { onDestroy, onMount } from "svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { parseNumericValue } from "$lib/utils/number-format";
  import type { AccountData, AccountDetails } from "$lib/types/report.types";

  type DropDownProps = {
    name: string;
    active: boolean;
  };
  let {
    toggleApplicationDiscrepanciesModal,
    applicationDiscrepancyByRequestId,
    activeAccount,
    accountGuid,
  }: {
    toggleApplicationDiscrepanciesModal: () => void;
    applicationDiscrepancyByRequestId: AccountData[] | [];
    activeAccount: AccountData | undefined;
    accountGuid: string | undefined;
  } = $props();

  let dropdownOptions: DropDownProps[] = $state([]);
  let popUpwrapper: HTMLDivElement | null = $state(null);
  let applicationDiscrepanciesModal: HTMLDivElement | null = $state(null);
  let selectedDropdownValue = $state("Select");
  let checkBoxDropdown = $state(false);
  // let allAccounts: AccountData[] | [] = $state(applicationDiscrepancyByRequestId);
  let selectedAccount: AccountDetails[] | undefined = $state(
    activeAccount?.details
  );

  const handleDropDownChange = (option: DropDownProps, index: number) => {
    dropdownOptions = dropdownOptions.map((item, ind) => ({
      ...item,
      active: ind === index ? true : false,
    }));
    toggleData();
  };

  const toggleData = () => {
    checkBoxDropdown = !checkBoxDropdown;
    const index = dropdownOptions.findIndex((item) => item.active);
    selectedDropdownValue = dropdownOptions[index].name;
    selectedAccount = applicationDiscrepancyByRequestId?.find(
      (item) =>
        item.accountType + " - " + item.accountNumber === selectedDropdownValue
    )?.details;
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (!applicationDiscrepanciesModal) return;
    if (
      applicationDiscrepanciesModal &&
      !applicationDiscrepanciesModal.contains(event.target as Node)
    ) {
      toggleApplicationDiscrepanciesModal();
    }
  };

  onMount(() => {
    if (applicationDiscrepancyByRequestId) {
      dropdownOptions = applicationDiscrepancyByRequestId.map((item) => ({
        name: item.accountType + " - " + item.accountNumber,
        active: item.accountGuid === accountGuid ? true : false,
      }));
      selectedDropdownValue =
        activeAccount?.accountType + " - " + activeAccount?.accountNumber;
    }

    if (popUpwrapper) {
      popUpwrapper.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    }
  });

  onDestroy(() => {
    if (popUpwrapper) {
      popUpwrapper.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "auto";
    }
  });
</script>

<div
  class="fixed flex items-center justify-center w-full h-full z-50 p-2 backdrop-blur-sm bg-opacity-50 drop-shadow-md overflow-hidden top-0 left-0"
  bind:this={popUpwrapper}
>
  <div
    class="h-fit flex bg-[#EEEEEE] rounded md:flex-row flex-col"
    id="account-details-popup"
    bind:this={applicationDiscrepanciesModal}
  >
    <div class="w-full px-6 mx-auto flex flex-col h-full py-4">
      <div class="flex flex-col md:flex-row gap-3 md:items-center py-2 mb-1">
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">Data Comparison</h3>
        </div>
        <div class="flex flex-col md:flex-row md:items-center">
          <div class="flex justify-between md:justify-start items-center">
            <span class="text-sm text-naro-600 mr-1">Account:</span>
            <div class="relative inline-block text-left">
              <button
                onclick={() => (checkBoxDropdown = !checkBoxDropdown)}
                class="text-sm text-naro-600 font-bold flex items-center"
              >
                <span
                  class="mr-1 max-w-[200px] truncate"
                  title={selectedDropdownValue}
                  >{selectedDropdownValue.replace(/_/g, " ")}</span
                >
                <DownArrowHead opacity={""} fillColor={"#222222"} />
              </button>
              {#if checkBoxDropdown}
                <div
                  class="absolute right-0 z-20 mt-2 min-w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[200px] overflow-auto"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="Account Details"
                  tabindex="-1"
                  onmouseleave={() => (checkBoxDropdown = false)}
                >
                  <div class="p-2" role="none">
                    <div class="flex flex-col gap-2">
                      {#if dropdownOptions?.length > 0}
                        {#each dropdownOptions as option, index (option)}
                          <button
                            class={`block px-4 py-2 text-sm rounded-md text-[#222222] hover:bg-naro-100 font-normal ${selectedDropdownValue === option.name ? "text-[#98c43d]" : ""}`}
                            onclick={() => handleDropDownChange(option, index)}
                          >
                            {option.name.replace(/_/g, " ")}
                          </button>
                        {/each}
                      {:else}
                        <div
                          class="flex items-center justify-center w-full h-full"
                        >
                          No Options Available
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white shadow-4xl shadow-b-0 rounded-md relative overflow-hidden"
      >
        <div
          class="bg-white shadow-b-4xl rounded-md rounded-b-none w-full overflow-hidden"
        >
          <div class="w-full overflow-auto max-h-[600px]">
            <div class="text-sm leading-relaxed min-w-full lg:min-w-[1023px]">
              <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-10">
                <div class="flex items-center">
                  <div
                    class="w-1/4 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <div class="flex cursor-pointer">Data Field</div>
                  </div>
                  <div
                    class="w-1/4 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <div class="flex cursor-pointer">Application Data</div>
                  </div>
                  <div
                    class="w-1/4 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <div class="flex cursor-pointer">Bankuity Data</div>
                  </div>
                  <div
                    class="w-1/4 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
                  >
                    <div class="flex cursor-pointer">Match/Mismatch</div>
                  </div>
                </div>
              </div>
              <div class="divide-y divide-naro-200">
                {#if selectedAccount && selectedAccount?.length > 0}
                  {#each selectedAccount as item, index (item)}
                    <div
                      class="flex justify-evenly duration-100 hover:bg-naro-100 hover:font-semibold"
                    >
                      <div
                        class="w-1/4 px-4 py-2 text-naro-600 flex items-center gap-1"
                      >
                        {item?.dataField}
                      </div>
                      <div
                        class="w-1/4 px-4 py-2 text-naro-600 truncate"
                        title={item?.applicationData.toString() || ""}
                      >
                        {item?.applicationData || "***"}
                      </div>
                      <div
                        class="w-1/4 px-4 py-2 text-naro-600 truncate flex gap-2 items-center"
                        title={item?.bankuityData.toString() || ""}
                      >
                        <span class="truncate">
                          {item?.bankuityData || "N/A"}
                        </span>
                        {#if item?.dataField === "Monthly Income" && !item.match}
                          {#if parseNumericValue(item?.bankuityData) > parseNumericValue(item?.applicationData)}
                            <p class="text-green-600 text-xs">
                              (+{convertToUSD(
                                parseNumericValue(item?.bankuityData) -
                                  parseNumericValue(item?.applicationData)
                              )})
                            </p>
                          {:else}
                            <p class="text-red-600 text-xs">
                              (-{convertToUSD(
                                parseNumericValue(item?.applicationData) -
                                  parseNumericValue(item?.bankuityData)
                              )})
                            </p>
                          {/if}
                        {/if}
                      </div>
                      <div class="w-1/4 px-4 py-2 text-naro-600">
                        {#if item?.match}
                          <CheckCircle />
                        {:else}
                          <CrossCircle />
                        {/if}
                      </div>
                    </div>
                  {/each}
                {:else}
                  <div>
                    <div
                      class="px-6 py-3 text-naro-600 h-[400px] items-center justify-center flex"
                    >
                      No records found
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
