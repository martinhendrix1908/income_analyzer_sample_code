<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import clsx from "clsx";
  import type { Component } from "svelte";
  import TabIconWrapper from "$lib/components/building-blocks/TabIconWrapper.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  import DynamicIcon from "../layout/DynamicIcon.svelte";

  type IconType = {
    [key: string]: Component;
  };
  let {
    tabs = $bindable(),
    variant = "black",
    class: customClass,
    activeTab,
    onTabClick,
    tabIcons,
    hideTooltip = true,
    showTabNames = false,
  }: {
    tabs: string[];
    variant: "primary" | "black" | "secondary";
    class?: string;
    activeTab?: string;
    onTabClick?: (tab: string) => void;
    tabIcons?: IconType;
    hideTooltip?: boolean;
    showTabNames?: boolean;
  } = $props();

  let tabStyles = (tab: string, activeTab: string) => {
    return clsx(
      "p-2 text-sm font-medium rounded-[4px] w-full flex items-center justify-center gap-2",
      {
        "bg-naro-600 text-white": activeTab === tab && variant === "black",
        "bg-transparent text-naro-600 active:bg-naro-600 active:text-white hover:bg-[#EEEEEE]":
          activeTab !== tab && variant === "black",
        "bg-[#09814A] text-white": activeTab === tab && variant === "primary",
        "bg-transparent text-[#09814A] active:bg-[#09814A] active:text-white hover:bg-[#EEEEEE]":
          activeTab !== tab && variant === "primary",
        "bg-[#98C43D] text-[#262626]":
          activeTab === tab && variant === "secondary",
        "hover:bg-[#404040] text-white":
          activeTab !== tab && variant === "secondary",
      }
    );
  };

  let isDragging = false;
  let startX: number;
  let scrollLeft: number;
  let tabsContainer = $state<HTMLDivElement>();

  // Check if tabs overflow
  let iconOnly = $derived(
    tabsContainer && tabsContainer.scrollWidth > tabsContainer.clientWidth
  );

  // Mouse events for desktop
  const onMouseDown = (e: MouseEvent) => startDrag(e.pageX);
  const onMouseMove = (e: MouseEvent) => drag(e.pageX);
  const onMouseUp = endDrag;

  // Touch events for mobile
  const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].pageX);
  const onTouchMove = (e: TouchEvent) => drag(e.touches[0].pageX);
  const onTouchEnd = endDrag;

  function startDrag(position: number) {
    isDragging = true;
    startX = position - (tabsContainer as HTMLDivElement)?.offsetLeft;
    scrollLeft = tabsContainer?.scrollLeft as number;
  }

  function drag(position: number) {
    if (!isDragging) return;
    const x = position - (tabsContainer as HTMLDivElement)?.offsetLeft;
    const walk = (x - startX) * 1; // Multiply for faster scroll
    if (tabsContainer) {
      tabsContainer.scrollLeft = scrollLeft - walk;
    }
  }

  function endDrag() {
    isDragging = false;
  }
</script>

<div
  role="tablist"
  aria-label="Tabs"
  aria-orientation="horizontal"
  tabindex="0"
  bind:this={tabsContainer}
  class={clsx(
    "flex gap-x-1 md:gap-x-2 max-w-full overflow-auto whitespace-nowrap text-sm md:text-base scrollbar-hide",
    customClass
  )}
  onmousedown={onMouseDown}
  onmousemove={onMouseMove}
  onmouseup={onMouseUp}
  onmouseleave={onMouseUp}
  ontouchstart={onTouchStart}
  ontouchmove={onTouchMove}
  ontouchend={onTouchEnd}
>
  {#each tabs as tab}
    <Tooltip
      content={tab}
      class={variant !== "secondary" ? "w-full" : ""}
      hidden={hideTooltip}
      position="bottom"
    >
      <button
        class={tabStyles(
          tab?.toLowerCase(),
          (activeTab || page.url.searchParams.get("tab") || "").toLowerCase()
        )}
        onclick={onTabClick
          ? () => onTabClick(tab)
          : () => {
              goto(page.url.pathname + "?tab=" + tab);
            }}
      >
        <TabIconWrapper
          {tab}
          tabIcons={tabIcons as { [key: string]: Component }}
          fillColor={activeTab?.toLowerCase() === tab.toLowerCase() ||
          variant !== "secondary"
            ? "currentColor"
            : "#FF8400"}
        />
        <span
          class={clsx(
            iconOnly &&
              Object.keys(tabIcons as IconType).length &&
              !showTabNames
              ? "hidden"
              : "inline"
          )}>{tab}</span
        >
      </button>
    </Tooltip>
  {/each}
</div>
