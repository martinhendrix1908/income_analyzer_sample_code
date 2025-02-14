<script lang="ts">
  import { onMount } from "svelte";
  import type {
    PredictedPayday,
    FilteredPaydays,
    CheckboxProp,
  } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertDate } from "$lib/utils/date-utils";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import SortIcon from "$lib/icons/SortIcon.svelte";

  let { predictedPaydays }: { predictedPaydays: PredictedPayday[] } = $props();

  let data: FilteredPaydays[] = $state([]);
  let sortBy = $state("");
  let sortDirection = $state(1);
  let checkboxes: CheckboxProp[] = $state([]);
  let filteredData: FilteredPaydays[] = $state([]);
  let name = $state(""); //reactive svelte variable
  let selectedCheckboxNames = $state("");
  let checkBoxDropdown = $state(false);

  const toggleSort = (column: keyof FilteredPaydays) => {
    //sorting the table data
    if (sortBy === "") {
      sortBy = column;
    }
    if (sortBy === column) {
      sortDirection *= -1;
    } else {
      sortBy = column;
      sortDirection = 1;
    }

    filteredData = filteredData.sort(
      (a: FilteredPaydays, b: FilteredPaydays) => {
        const aValue = a[column];
        const bValue = b[column];
        if (aValue < bValue) return -sortDirection;
        if (aValue > bValue) return sortDirection;
        return 0;
      }
    );
  };

  const handleCheckboxChange = (event: any, index: number) => {
    //checkbox in dropdown change
    checkboxes[index].checked = event.target.checked;
  };
  const toggleData = () => {
    checkBoxDropdown = !checkBoxDropdown;
    getSelectedCheckboxNames();
    updateFilteredData();
  };
  const getSelectedCheckboxNames = () => {
    //show selected checkbox
    const selectedNames = checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.name);

    name = selectedNames.length === 0 ? "Select" : selectedNames.join(", ");
    return name;
  };
  const updateFilteredData = () => {
    //with selection of checkbox change table data
    const filterData = data.filter((item) =>
      checkboxes.some(
        (checkbox) =>
          checkbox.checked && item.incomeSource.includes(checkbox.name)
      )
    );
    filteredData = filterData;
  };

  const getDataArray = () => {
    // create the array to be rendered in the table from response
    const newPaydayArr: any[] = [];
    if (predictedPaydays.length > 0) {
      predictedPaydays.map((item) => {
        const { incomeType, incomeSource, incomePredictedPaydays } = item;

        let datesAndDays = incomePredictedPaydays;

        if (datesAndDays.length > 0) {
          for (const { date, day, amount } of datesAndDays) {
            const newObj = {
              date: date,
              day: day,
              incomeType: incomeType,
              incomeSource: incomeSource,
              amount: amount,
            };
            newPaydayArr.push(newObj);
          }
        }
      });
      data = newPaydayArr;
    } else {
      data = [];
    }
  };

  onMount(() => {
    getDataArray();
    if (data.length > 0) {
      checkboxes = [];
      data.forEach((obj) => {
        const exist = checkboxes.find((item) => item.name === obj.incomeSource);
        if (!exist) {
          if (checkboxes.length === 0) {
            checkboxes.push({
              name: obj.incomeSource,
              checked: true,
            });
          } else {
            checkboxes.push({
              name: obj.incomeSource,
              checked: false,
            });
          }
        }
      });
      name = checkboxes[0].name;
      updateFilteredData();
    }
  });
</script>

{#if data.length !== 0}
  <div role="table" onmouseleave={() => (checkBoxDropdown = false)}>
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4"
    >
      <div class="pr-2 md:border-r-4 border-parrot mr-2">
        <h3 class="text-black font-medium opacity-85">Forecasted Paydays</h3>
      </div>
      {#if data.length !== 0}
        <div class="flex flex-col md:flex-row md:items-center md:mr-auto">
          <div class="flex justify-between md:justify-start items-center">
            <span class="text-sm text-naro-600 mr-1"
              >Income Source:{selectedCheckboxNames}</span
            >
            <div class="relative inline-block text-left">
              <button
                onclick={() => (checkBoxDropdown = !checkBoxDropdown)}
                class="text-sm text-naro-600 font-bold flex items-center"
              >
                <span class="mr-1 text-sm">
                  {#if filteredData.length === 0}
                    Select
                  {:else}
                    {name}
                  {/if}
                </span>
                <DownArrowHead opacity={""} fillColor={"#222222"} />
              </button>
              <!-- {#if filteredData.length > 0} -->
              {#if checkBoxDropdown}
                <div
                  class="absolute right-0 z-10 mt-2 min-w-200px origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-242px overflow-auto"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                  onmouseleave={toggleData}
                >
                  <div class="p-2" role="none">
                    <div class="flex flex-col gap-2">
                      {#if checkboxes?.length > 0}
                        {#each checkboxes as checkbox, index (checkbox)}
                          <label
                            class="flex text-black p-2 leading-relaxed cursor-pointer hover:text-canva-200"
                            for="checkbox-{index + 2}"
                          >
                            <input
                              id="checkbox-{index + 2}"
                              type="checkbox"
                              class="appearance-none bg-center bg-cover border-2 border-current min-w-16px w-4 h-4 checked:border-black checked:bg-checkbox mt-0.5"
                              bind:checked={checkbox.checked}
                              onchange={(event) =>
                                handleCheckboxChange(event, index)}
                            />
                            <span class="ml-2 text-sm">{checkbox.name}</span>
                          </label>
                        {/each}
                      {/if}
                    </div>
                  </div>
                </div>
              {/if}
              <!-- {/if} -->
            </div>
          </div>
        </div>
      {/if}
    </div>
    <div class="bg-white shadow-4xl rounded-md overflow-auto relative">
      <div class="w-full overflow-hidden min-w-1023px">
        <div class="min-w-full xl:min-w-table-scroll-width overflow-y-auto">
          <div class="w-full overflow-auto max-h-500px min-w-1023px">
            <table class="w-full text-sm leading-relaxed">
              <thead class="bg-naro-600">
                <tr>
                  <th
                    class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
                  >
                    <!-- px-6 py-4 font-semibold text-left text-white whitespace-nowrap -->
                    <button
                      class="flex cursor-pointer"
                      onclick={() => toggleSort("date")}
                    >
                      Estimated Date
                      <SortIcon
                        fillColor1={sortDirection === 1 ? "#9C9C9C" : "white"}
                        fillColor2={sortDirection !== 1 ? "#9C9C9C" : "white"}
                      />
                    </button>
                  </th>
                  <th
                    class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
                  >
                    <div class="flex">Estimated Day</div>
                  </th>
                  <th
                    class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
                  >
                    <div class="flex">Income Type</div>
                  </th>
                  <th
                    class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
                  >
                    <div class="flex">Income Source</div>
                  </th>
                  <th
                    class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
                  >
                    <div class="flex">Estimated Amount</div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-naro-200">
                {#if filteredData?.length > 0}
                  {#each filteredData as item (item)}
                    <tr>
                      <td class="px-6 py-3 text-naro-600"
                        >{item["date"] ? convertDate(item["date"]) : "N/A"}</td
                      >
                      <td class="px-6 py-3 text-naro-600"
                        >{item["day"] ? item["day"] : "N/A"}</td
                      >
                      <td class="px-6 py-3 text-naro-600"
                        >{item["incomeType"] ? item["incomeType"] : "N/A"}</td
                      >
                      <td class="px-6 py-3 text-naro-600"
                        >{item["incomeSource"]
                          ? item["incomeSource"]
                          : "N/A"}</td
                      >
                      <td class="px-6 py-3 text-naro-600">
                        <b>
                          {convertToUSD(item["amount"])
                            ? convertToUSD(item["amount"])
                            : "N/A"}</b
                        >
                      </td>
                    </tr>
                  {/each}
                {:else}
                  <tr>
                    <td class="px-6 py-3 text-naro-600"
                      >No records found
                    </td></tr
                  >
                {/if}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="w-full absolute top-0 left-0 h-14 overflow-hidden min-w-1023px pr-3 bg-naro-600"
      >
        <table class="w-full text-sm leading-relaxed">
          <thead class="bg-naro-600">
            <tr>
              <th
                class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
              >
                <button
                  class="flex cursor-pointer"
                  onclick={() => toggleSort("date")}
                >
                  Estimated Date
                  <SortIcon
                    fillColor1={sortDirection === 1 ? "#9C9C9C" : "white"}
                    fillColor2={sortDirection !== 1 ? "#9C9C9C" : "white"}
                  />
                </button>
              </th>
              <th
                class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
              >
                <div class="flex">Estimated Day</div>
              </th>
              <th
                class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
              >
                <div class="flex">Income Type</div>
              </th>
              <th
                class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
              >
                <div class="flex">Income Source</div>
              </th>
              <th
                class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
              >
                <div class="flex">Estimated Amount</div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-naro-200 opacity-0 pointer-events-none">
            {#if filteredData.length > 0}
              {#each filteredData as item (item)}
                <tr>
                  <td class="px-6 py-3 text-naro-600"
                    >{item["date"] ? convertDate(item["date"]) : "N/A"}</td
                  >
                  <td class="px-6 py-3 text-naro-600"
                    >{item["day"] ? item["day"] : "N/A"}</td
                  >
                  <td class="px-6 py-3 text-naro-600"
                    >{item["incomeType"] ? item["incomeType"] : "N/A"}</td
                  >
                  <td class="px-6 py-3 text-naro-600"
                    >{item["incomeSource"] ? item["incomeSource"] : "N/A"}</td
                  >
                  <td class="px-6 py-3 text-naro-600"
                    >{convertToUSD(item["amount"])
                      ? convertToUSD(item["amount"])
                      : "N/A"}</td
                  >
                </tr>
              {/each}
            {:else}
              <tr>
                <td class="px-6 py-3 text-naro-600">No records found </td></tr
              >
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
