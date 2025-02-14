<script lang="ts">
  import { convertDateToDay } from "$lib/utils/date-utils";
  import LeftArrowHead from "$lib/icons/LeftArrowHead.svelte";
  import RightArrowHead from "$lib/icons/RightArrowHead.svelte";
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import type {
    Account,
    IncomeSourceProp,
    TooltipData,
    MonthlyBreakdown,
  } from "$lib/types/report.types";
  import AnimatedDot from "$lib/components/building-blocks/AnimatedDot.svelte";
  import { Days } from "$lib/constants";
    import IncomeTrendsTooltip from "./IncomeTrendsTooltip.svelte";

  let {
    accountData,
    navMonth = $bindable(),
    navYear = $bindable(),
    yearDropdown,
    chartDatas,
    activeEvent,
    activeMonth,
    incomeSources,
  } = $props<{
    accountData: Account;
    navMonth: number;
    navYear: number;
    yearDropdown: number[];
    chartDatas: MonthlyBreakdown[];
    activeEvent: string;
    activeMonth: number;
    incomeSources: IncomeSourceProp[];
  }>();

  // Derived values for date ranges
  let startDate = $derived.by(() => {
    const start = new Date(accountData?.transactionsRange?.start);
    return new Date(
      start.getUTCFullYear(),
      start.getUTCMonth(),
      start.getUTCDate(),
    );
  });

  let endDate = $derived.by(() => {
    const end = new Date(accountData?.transactionsRange?.end);
    return new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
  });

  let enableDropdown = $state(false);
  let eventByDay = $state<{ [key: number]: TooltipData[] }>({});
  let days = $state<number[]>([]);
  let monthName = $state<string>();
  let hoveredDay = $state<number | null>(null);
  let year = $state(new Date().getFullYear());

  function eventBinding(
    _chartDatas: MonthlyBreakdown[],
    month: number,
    year: number,
  ) {
    const newEventByDay: { [key: number]: TooltipData[] } = {};

    const data = _chartDatas?.filter(
      (item) => item.month === month + 1 && item.year === year,
    );

    data?.forEach((chartData) => {
      chartData?.incomeEvents?.forEach((event) => {
        const date = new Date(event?.date as string).getDate();
        if (!newEventByDay[date]) {
          newEventByDay[date] = [];
        }
        newEventByDay[date].push({
          type: event.type,
          amount: event.amount,
          sourceID: event.sourceID,
        });
      });
    });

    eventByDay = newEventByDay;
  }

  function load() {
    const dt = new Date();
    dt.setMonth(navMonth);
    dt.setFullYear(navYear);

    year = dt.getFullYear();
    monthName = dt.toLocaleDateString("en-GB", { month: "long" });

    const firstDayOfMonth = new Date(year, dt.getMonth(), 0);
    const lastDayOfPrevMonth = new Date(year, dt.getMonth(), 0).getDate();
    const daysInMonth = new Date(year, dt.getMonth() + 1, 0).getDate();
    const afterPaddingDays = 7 - new Date(year, dt.getMonth() + 1, 0).getDay();
    const paddingDays = firstDayOfMonth.getDay();

    const newDays: number[] = [];

    // Previous month padding
    for (
      let i = lastDayOfPrevMonth - paddingDays + 1;
      i <= lastDayOfPrevMonth;
      i++
    ) {
      newDays.push(i);
    }

    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      newDays.push(i);
    }

    // Next month padding
    if (afterPaddingDays !== 7) {
      for (let i = 1; i <= afterPaddingDays; i++) {
        newDays.push(i);
      }
    }

    days = newDays;

    if (chartDatas && navMonth !== undefined && navYear) {
      eventBinding(chartDatas, navMonth, navYear);
    }
  }

  $effect(() => load());

  function nextButtons() {
    const checkDate = new Date(navYear, navMonth + 1, 1);
    if (checkDate >= startDate && checkDate <= endDate) {
      navMonth = (navMonth + 1) % 12;
      if (navMonth === 0) {
        navYear++;
      }
    }
  }

  function backButtons() {
    const checkDate = new Date(navYear, navMonth, 1);
    if (checkDate >= startDate && checkDate <= endDate) {
      navMonth = (navMonth - 1 + 12) % 12;
      if (navMonth === 11) {
        navYear--;
      }
    }
  }

  function isMonthYearEqual(date: Date, month: number, year: number) {
    return date.getMonth() === month && date.getFullYear() === year;
  }

  function changeMonth(selectedYear: number) {
    enableDropdown = !enableDropdown;
    navYear = +selectedYear;
    navMonth = navYear === endDate.getFullYear() ? endDate.getMonth() : 11;
  }

  function setHoveredDay(day: number | null, index: number) {
    hoveredDay =
      day === null || (index < 7 && day > 7) || (index > 28 && day < 8)
        ? null
        : day;
  }

  function getUniqueEvents(data: TooltipData[]) {
    const uniqueTypes = new Map<string, TooltipData>();
    data.forEach((item) => {
      if (!uniqueTypes.has(item.type)) {
        uniqueTypes.set(item.type, item);
      }
    });
    return Array.from(uniqueTypes.values());
  }

  function sortEventByDay(data: TooltipData[]) {
    return [...data].sort((a, b) => b.amount - a.amount);
  }
</script>

<div class=" min-h-full text-center flex flex-col h-full" id="container">
  <!-- Calendar Header -->
  <div class="flex justify-between items-center text-white" id="header">
    <!-- Month Selection -->
    <div class="flex items-center">
      <span class="text-parrot"> Viewing: </span>
      <button
        type="button"
        class={isMonthYearEqual(startDate, navMonth, navYear)
          ? "pointer-events-none opacity-40"
          : " remove"}
        onclick={backButtons}
      >
        <LeftArrowHead fillColor="#FFFFFF" />
      </button>
      <span>{monthName}</span>
      <button
        type="button"
        class={isMonthYearEqual(endDate, navMonth, navYear)
          ? "pointer-events-none opacity-40"
          : " remove"}
        onclick={nextButtons}
      >
        <RightArrowHead />
      </button>
    </div>
    <!-- Year Selection -->
    <div class="relative inline-block text-left">
      <button
        onclick={() => (enableDropdown = !enableDropdown)}
        class="text-white flex items-center"
      >
        <span class="mr-1" id="monthDisplay">{navYear}</span>
        <DownArrowHead
          opacity={yearDropdown?.length > 1 ? "" : "opacity-50"}
          fillColor={"#FFFFFF"}
        />
      </button>
      {#if yearDropdown.length > 1}
        {#if enableDropdown}
          <div
            class="absolute left-0 z-10 mt-2 min-w-100px origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div
              class="py-1"
              role="none"
              onmouseleave={() => (enableDropdown = !enableDropdown)}
            >
              {#each yearDropdown as year (year)}
                <button
                  onclick={() => changeMonth(year)}
                  class="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-0">{year}</button
                >
              {/each}
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </div>
  <!-- Calendar Week Days -->
  <div
    class="grid grid-cols-7 text-white leading-loose font-medium mt-2 mb-1 sm:my-4"
    id="weekdays"
  >
    {#each Days as day}
      <div class="weekday py-1">{day}</div>
    {/each}
  </div>

  <!-- Calendar Week Dates -->
  <div
    class="grid grid-cols-7 text-white leading-loose flex-auto"
    id="calendar"
  >
    {#each days as day, i}
      <div
        role="table"
        class={(i < 7 && day > 7) || (i > 28 && day < 8)
          ? "py-1 day text-naro-300 relative"
          : "py-1 day text-white relative"}
        onmouseenter={() => setHoveredDay(day, i)}
        onmouseleave={() => setHoveredDay(null, i)}
      >
        {day}
        <!-- Calendar Event Dots -->
        <div class="flex justify-center gap-0.5">
          {#if (i < 7 && day > 7) || (i > 28 && day < 8)}
            <i class=""></i>
          {:else if eventByDay[day]}
            {#each getUniqueEvents(eventByDay[day]) as event}
              <AnimatedDot
                eventType={event.type}
                showAnimation={activeEvent === event.type &&
                  activeMonth === navMonth}
              />
            {/each}
          {/if}
        </div>
        <!-- Event Tooltips -->
        {#if (i < 7 && day > 7) || (i > 28 && day < 8)}
          <li class="hidden"></li>
        {:else if hoveredDay === day && eventByDay[day]}
          <IncomeTrendsTooltip
            title={convertDateToDay(
              `${navYear}-${
                navMonth + 1 < 10 ? "0" + (navMonth + 1) : navMonth + 1
              }-${day < 10 ? "0" + day : day} 00:00:00`,
            )}
            tootipDatas={sortEventByDay(eventByDay[day])}
            {incomeSources}
          />
        {/if}
      </div>
    {/each}
  </div>
</div>
