<script lang="ts">
  import { convertDateToDay } from "$lib/utils/date-utils";
  import { onMount } from "svelte";
  import IncomeTableRow from "$lib/components/report/source-and-frequency/IncomeTableRow.svelte";
  import IncomeTableRowHeader from "$lib/components/report/source-and-frequency/IncomeTableRowHeader.svelte";
  import {
    getDayName,
    incomeTableHeaders,
  } from "../../../../routes/report/[id]/utils";
  import type { IncomeSource } from "$lib/types/report.types";
  type FrequencyByDate = {
    [key: string]: number;
  };
  let { incomeData }: { incomeData: IncomeSource[] } = $props();

  let data = $state<any[]>([]);

  let indexOfLine = $state<number>();
  let existMissingDay = $state(false);
  let tooltipVisible = $state(false);
  let tooltipX = $state(0);
  let tooltipY = $state(0);
  let tooltipData = $state("");

  const findShade = (data: string[], frequency: string) => {
    //function to find shade according to frequency
    let shades = [];
    let dayFrequency: FrequencyByDate = {};
    if (frequency === "I") {
      return {};
    }
    shades = ["bg-[#F5FFF4]", "bg-[#09814A]"];

    if (frequency === "I" || frequency === "M" || frequency === "S") {
      for (const date of data) {
        const dayOfMonth = new Date(date).getDate();
        if (dayFrequency[dayOfMonth]) {
          // If the day already exists in the object, increment the count
          dayFrequency[dayOfMonth]++;
        } else {
          // If the day doesn't exist, initialize the count to 1
          dayFrequency[dayOfMonth] = 1;
        }
      }
    }

    if (frequency === "W" || frequency === "B") {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (const date of data) {
        const dayOfWeekIndex = new Date(date).getDay(); // Get the day of the week index (0-6)
        const dayOfWeek = daysOfWeek[dayOfWeekIndex]; // Get the name of the day of the week
        if (dayFrequency[dayOfWeek]) {
          // If the day already exists in the object, increment the count
          dayFrequency[dayOfWeek]++;
        } else {
          // If the day doesn't exist, initialize the count to 1
          dayFrequency[dayOfWeek] = 1;
        }
      }
    }
    const frequencies = Object.values(dayFrequency).filter((freq) => freq > 0);
    // Sort frequencies in ascending order
    frequencies.sort((a, b) => a - b);

    const assignedColors: { [key: string]: string } = {};

    const areAllValuesSame = frequencies.every(
      //check if all values in array are same
      (value, index, array) => value === array[0]
    );
    if (areAllValuesSame) {
      if (frequencies[0] === 1) {
        for (const day in dayFrequency) {
          assignedColors[day] = shades[0];
        }
      } else {
        for (const day in dayFrequency) {
          assignedColors[day] = shades[shades.length - 1]; // Assign a dark color (last) from the shades array
        }
      }
    } else {
      if (frequencies.length === 1) {
        // If there's only one frequency, assign a dark color
        for (const day in dayFrequency) {
          assignedColors[day] = shades[shades.length - 1]; // Assign a dark color (last) from the shades array
        }
      } else if (frequencies.length > 1) {
        // Assign colors based on frequency range
        const minFrequency = frequencies[0];
        const maxFrequency = frequencies[frequencies.length - 1];

        for (const day in dayFrequency) {
          const frequency = dayFrequency[day];
          if (frequency === minFrequency) {
            assignedColors[day] = shades[0]; // Assign the first color for the lowest frequency
          } else if (frequency === maxFrequency) {
            assignedColors[day] = shades[shades.length - 1]; // Assign the last color for the highest frequency
          } else if (frequency > minFrequency && frequency < maxFrequency) {
            // Assign colors in between
            const index = frequencies.indexOf(frequency);
            const colorIndex = Math.floor(
              ((index - 1) / (frequencies.length - 2)) * (shades.length - 2) + 1
            );
            assignedColors[day] = shades[colorIndex];
          }
        }
      }
    }
    return assignedColors;
  };
  const initializeIncomeTableData = () => {
    const modifiedIncomeData = incomeData;
    for (let i = 0; i < incomeData?.length; i++) {
      let res = {};
      let sortedDates = [];

      const sortedArray = incomeData[i]?.pastDeposits.sort(
        (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
      );

      if (incomeData[i].missingPayDay.length === 0) {
        sortedDates = sortedArray;
      } else {
        existMissingDay = true;
        sortedDates = [...incomeData[i].missingPayDay, ...sortedArray];
      }

      sortedDates = sortedDates.sort(
        (a: string, b: string) => new Date(b).getTime() - new Date(a).getTime()
      );

      if (incomeData[i].frequency === "I") {
      } else {
        res = findShade(sortedDates, incomeData[i].frequency);
      }

      modifiedIncomeData[i].shades = res; //add shades to the income array
      modifiedIncomeData[i].sortedDates = sortedDates; //add sorted array to the income-array

      if (sortedDates.length === 0) {
        //add most frequency day
        modifiedIncomeData[i].mostFrequentDay = "N/A";
        return;
      }

      // Group by month
      const groupedAndSortedDates: { [key: string]: string[] } =
        sortedDates.reduce((acc: any, date: string) => {
          const monthIndex = date.split("-")[1];
          const year = date.split("-")[0];
          const key = year + "-" + monthIndex;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(date);
          acc[key].sort(
            (a: string, b: string) =>
              new Date(a).getTime() - new Date(b).getTime()
          );
          return acc;
        }, {});
      // Sort month indexes in descending order ( oldest to latest)
      const sortedMonthIndexes = Object.keys(groupedAndSortedDates).sort(
        (a, b) => a.localeCompare(b)
      );

      // Create the final result array with sorted month indexes
      const result = sortedMonthIndexes.map((monthIndex) =>
        groupedAndSortedDates[monthIndex].map((date) => date)
      );
      modifiedIncomeData[i].groupedDates = result || []; //append the result to the data array
    }
    data = modifiedIncomeData;
  };
  const categorizeData = (dataparam: any[], category: string) => {
    let oneTimeArray: any[] = [];
    // let noDataFoundArray = [];
    let estimatedMonthlyArray: any[] = [];
    let inconsistantArray: any[] = [];

    if (category == "I") {
      data?.forEach((item) => {
        if (
          item.frequency == "I" &&
          item.sortedDates &&
          item.sortedDates.length !== 1
        ) {
          inconsistantArray.push(item);
        }
      });

      return inconsistantArray;
    }

    if (category == "O") {
      data?.forEach((item) => {
        if (
          (item.sortedDates && item.sortedDates.length === 1) ||
          (item.pastDeposits.length === 0 && item.missingPayDay.length === 1) ||
          (item.pastDeposits.length === 1 && item.missingPayDay.length === 0)
        ) {
          oneTimeArray.push(item);
        }
      });
      return oneTimeArray;
    }

    if (category == "E") {
      data?.forEach((item) => {
        if (item.frequency !== "I") {
          if (
            (item.sortedDates && item.sortedDates.length === 1) ||
            (item.pastDeposits.length === 0 &&
              item.missingPayDay.length === 1) ||
            (item.pastDeposits.length === 1 && item.missingPayDay.length === 0)
          ) {
          } else if (item.sortedDates && item.sortedDates.length === 0) {
          } else {
            estimatedMonthlyArray.push(item);
          }
        }
      });

      return estimatedMonthlyArray;
    }
    return [];
  };
  const showHideTooltip = (index: number) => {
    indexOfLine = index;
  };
  const getClassName = (
    data: string,
    frequency: string,
    shades: any,
    missingPayDay: any[]
  ) => {
    //assign class according to frequency
    const defaultClass = " px-1 leading-loose rounded-sm min-w-[35px] ";
    const missingDateClass = " text-white bg-red";
    let resultClass = "";
    if (frequency === "I") {
      if (missingPayDay.length > 0) {
        if (missingPayDay.includes(data)) {
          resultClass = missingDateClass + defaultClass;
          return resultClass;
        }
      }
      resultClass = "bg-[#F5FFF4]" + defaultClass;
    }
    if (frequency === "W" || frequency === "B") {
      if (missingPayDay.length > 0) {
        if (missingPayDay.includes(data)) {
          resultClass = missingDateClass + defaultClass;
          return resultClass;
        }
      }
      let shade = shades[getDayName(data, frequency) as keyof typeof shades];

      if (shade == "bg-[#09814A]")
        resultClass = shade + " text-[#FEF] " + defaultClass;
      else
        resultClass =
          shades[getDayName(data, frequency) as keyof typeof shades] +
          defaultClass;
    }
    if (frequency === "M" || frequency === "S") {
      if (missingPayDay.length > 0) {
        if (missingPayDay.includes(data)) {
          resultClass = missingDateClass + defaultClass;
          return resultClass;
        }
      }
      let shade = shades[getDayName(data, frequency) as keyof typeof shades];

      if (shade == "bg-[#09814A]")
        resultClass = shade + " text-[#FEF] " + defaultClass;
      else
        resultClass =
          shades[getDayName(data, frequency) as keyof typeof shades] +
          defaultClass;
    }
    return resultClass;
  };
  const scrollable = (): void => {
    const scrollableDivs =
      document.querySelectorAll<HTMLElement>(".scrollableDiv");

    scrollableDivs.forEach((scrollableDiv) => {
      let isDragging = false;
      let startX: number;
      let startScrollLeft: number;

      scrollableDiv.addEventListener("mousedown", (event: MouseEvent) => {
        isDragging = true;
        startX = event.clientX;
        startScrollLeft = scrollableDiv.scrollLeft;

        // Prevent text selection during drag
        document.body.style.userSelect = "none";
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", () => {
          isDragging = false;
          document.body.style.userSelect = "auto";
          document.removeEventListener("mousemove", handleDrag);
        });
      });

      const handleDrag = (event: MouseEvent): void => {
        if (!isDragging) return;

        const deltaX = event.clientX - startX;
        scrollableDiv.scrollLeft = startScrollLeft - deltaX;
      };

      // Optionally, you can also handle touch events for mobile devices
      scrollableDiv.addEventListener("touchstart", (event: TouchEvent) => {
        isDragging = true;
        startX = event.touches[0].clientX;
        startScrollLeft = scrollableDiv.scrollLeft;

        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", () => {
          isDragging = false;
          document.removeEventListener("touchmove", handleTouchMove);
        });
      });

      const handleTouchMove = (event: TouchEvent): void => {
        if (!isDragging) return;

        const deltaX = event.touches[0].clientX - startX;
        scrollableDiv.scrollLeft = startScrollLeft - deltaX;
      };
    });
  };
  const showTooltip = (event: MouseEvent, date: string) => {
    tooltipVisible = true;
    tooltipX = event.clientX - 75;
    tooltipY = event.clientY - 40;
    tooltipData = date;
  };
  onMount(() => {
    scrollable();
  });
  
  $effect(() => {
    initializeIncomeTableData();
  });
</script>

{#if tooltipVisible}
  <div
    class="fixed text-black bottom-6 bg-white min-w-120px max-h-[35px] shadow-3xl text-sm font-normal not-italic text-center p-2 rounded z-20"
    style="left: {tooltipX}px; top: {tooltipY}px;"
  >
    {convertDateToDay(tooltipData) ?? "N/A"}
  </div>
{/if}
<div
  role="table"
  class="overflow-auto"
  id="incomeTable"
  onmouseenter={scrollable}
>
  <table class="w-full text-sm leading-relaxed min-w-1285px">
    <thead class="bg-[#222222]">
      <tr>
        {#each incomeTableHeaders as header (header)}
          <th
            class="px-6 py-4 font-normal text-left text-white whitespace-nowrap"
          >
            <div class="flex">{header.title}</div>
            <span class="text-naro-300">
              {header.subtitle} &nbsp;
            </span>
          </th>
        {/each}
      </tr>
    </thead>

    <tbody class="text-base align-top">
      {#if data?.length > 0}
        {#if categorizeData(data, "E").length !== 0}
          <IncomeTableRowHeader
            title="Recurring Income"
            tooltipDescription=" Consistent income that is deposited on a fixed schedule.
                      Can be considered payroll."
          />
          {#each categorizeData(data, "E") as item, rowIndex (item)}
            <IncomeTableRow
              {item}
              {rowIndex}
              bind:tooltipVisible
              bind:indexOfLine
              {showHideTooltip}
              {showTooltip}
              {getClassName}
            />
          {/each}
        {/if}
        {#if categorizeData(data, "I").length !== 0}
          <IncomeTableRowHeader
            title="Irregular Income"
            tooltipDescription="Deposits that can be considered income, but do not follow
                      any fixed schedule. This is typically from part time jobs."
          />
          {#each categorizeData(data, "I") as item, rowIndex (item)}
            <IncomeTableRow
              {item}
              {rowIndex}
              bind:tooltipVisible
              bind:indexOfLine
              {showHideTooltip}
              {showTooltip}
              {getClassName}
            />
          {/each}
        {/if}
        {#if categorizeData(data, "O").length !== 0}
          <IncomeTableRowHeader
            title="One-Time"
            tooltipDescription="Deposits that appear once within this time period.
                      Examples are tax refunds, gifts, etc."
          />
          {#each categorizeData(data, "O") as item, rowIndex (item)}
            <IncomeTableRow
              {item}
              {rowIndex}
              bind:tooltipVisible
              bind:indexOfLine
              {showHideTooltip}
              {showTooltip}
              {getClassName}
            />
          {/each}
        {/if}
        {#if categorizeData(data, "O").length === 0 && categorizeData(data, "I").length === 0 && categorizeData(data, "E").length === 0}
          <tr> <td class="px-6 py-3 text-naro-600">No records found </td></tr>
        {/if}
      {:else}
        <tr> <td class="px-6 py-3 text-naro-600">No records found </td></tr>
      {/if}
    </tbody>
  </table>
</div>
