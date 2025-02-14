<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { AssessmentZone } from "$lib/types/types";
  import PopOver from "$lib/components/building-blocks/PopOver.svelte";
  import AnimatedDot from "$lib/components/building-blocks/AnimatedDot.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import TooltipIcon from "$lib/icons/TooltipIcon.svelte";
  import RangeBarThumb from "$lib/icons/RangeBarThumb.svelte";

  interface SegmentDetails {
    id: string;
    color: string;
    left: string;
    width: string;
    startPosition: number;
    endPosition: number;
    zoneName: string;
    description: string;
  }

  let {
    zones = $bindable(),
    claimValue,
  }: { zones: AssessmentZone[]; claimValue: string } = $props();

  let sliderRef = $state<HTMLDivElement>();
  let sliderWidth = 0;
  let start = $state<number>(0);
  let end = $state<number>(1000);
  let hoveredSegment = $state<SegmentDetails | null>(null);
  let tooltipPosition = $state({ x: 0, y: 0 });
  let isDragging = $state(false);
  let activePointId = $state<string | null | undefined>(null);

  // Event handler functions
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (isDragging && activePointId && sliderRef && claimValue === "Edit") {
      const rect = sliderRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      updatePosition(x, rect.width);
    }
  };

  const handleGlobalMouseUp = () => {
    if (isDragging) {
      isDragging = false;
      activePointId = null;
    }
  };

  const handleGlobalTouchMove = (e: TouchEvent) => {
    if (isDragging && activePointId && sliderRef && claimValue === "Edit") {
      e.preventDefault();
      const rect = sliderRef.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      updatePosition(x, rect.width);
    }
  };

  const handleGlobalTouchEnd = () => {
    if (isDragging) {
      isDragging = false;
      activePointId = null;
    }
  };

  // Cleanup function
  const cleanupEventListeners = () => {
    window.removeEventListener("mousemove", handleGlobalMouseMove);
    window.removeEventListener("mouseup", handleGlobalMouseUp);
    window.removeEventListener("touchmove", handleGlobalTouchMove);
    window.removeEventListener("touchend", handleGlobalTouchEnd);
  };

  onMount(() => {
    if (sliderRef) {
      sliderWidth = (sliderRef as HTMLDivElement).offsetWidth;
    }

    // Add event listeners
    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchmove", handleGlobalTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", handleGlobalTouchEnd);
  });

  onDestroy(() => {
    cleanupEventListeners();
  });

  let segments = $derived.by(() => {
    const sortedPoints = [...zones].toSorted((a, b) => a.position - b.position);
    let segmentArr = [];

    if (sortedPoints.length > 0) {
      segmentArr.push({
        id: sortedPoints[0].id,
        color: sortedPoints[0].color,
        left: "0%",
        width: `${(sortedPoints[0].position / end) * 100}%`,
        startPosition: start,
        endPosition: sortedPoints[0].position,
        zoneName: sortedPoints[0].name,
        description: sortedPoints[0].description,
      });
    }

    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const startZone = sortedPoints[i];
      const endZone = sortedPoints[i + 1];
      segmentArr.push({
        id: endZone.id,
        color: endZone.color,
        left: `${(startZone.position / end) * 100}%`,
        width: `${((endZone.position - startZone.position) / 1000) * 100}%`,
        startPosition: startZone.position,
        endPosition: endZone.position,
        zoneName: endZone.name,
        description: endZone.description,
      });
    }

    return segmentArr;
  });

  function handleMouseDown(e: MouseEvent, point: AssessmentZone) {
    if (claimValue !== "Edit") return;
    e.preventDefault();
    e.stopPropagation();
    if (point.id === zones[zones.length - 1].id) return;
    isDragging = true;
    activePointId = point.id;
  }

  function handleTouchStart(e: TouchEvent, point: AssessmentZone) {
    if (claimValue !== "Edit") return;
    e.preventDefault();
    e.stopPropagation();
    if (point.id === zones[zones.length - 1].id) return;
    isDragging = true;
    activePointId = point.id;
  }

  function updatePosition(x: number, width: number) {
    const position = Math.max(
      0,
      Math.min(1000, Math.round((x / width) * 1000))
    );

    const activePointIndex = zones.findIndex((p) => p.id === activePointId);
    if (activePointIndex === -1) return;

    const sortedPoints = [...zones].sort((a, b) => a.position - b.position);
    const previousPointPosition =
      sortedPoints[activePointIndex - 1]?.position ?? 0;
    const nextPointPosition =
      sortedPoints[activePointIndex + 1]?.position ?? 1000;

    const constrainedPosition = Math.max(
      previousPointPosition + 1,
      Math.min(position, nextPointPosition - 1)
    );

    zones = zones
      .map((p) =>
        p.id === activePointId ? { ...p, position: constrainedPosition } : p
      )
      .sort((a, b) => a.position - b.position);
  }

  function handleSegmentHover(e: MouseEvent, segment: SegmentDetails) {
    if (!isDragging) {
      hoveredSegment = segment;
      tooltipPosition = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }

  function handleSegmentMove(e: MouseEvent) {
    if (hoveredSegment && !isDragging) {
      e.stopPropagation();
      tooltipPosition = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }

  function handleSegmentLeave() {
    if (!isDragging) {
      hoveredSegment = null;
    }
  }
</script>

<div class="flex items-center justify-center gap-4">
  <div class="relative">
    <label
      for="minimum"
      class="absolute block -top-6 left-0 text-sm font-medium leading-[21px] disabled:opacity-50 disabled:cursor-not-allowed text-[#BCBCBC]"
    >
      Minimum
    </label>

    <InputField
      id="minimum"
      bind:value={start}
      numberOnly
      disabled
      class="max-w-[100px] text-[#BCBCBC] border-[#BCBCBC]"
      maxlength={5}
    />
  </div>
  <div
    bind:this={sliderRef}
    class="h-2 rounded-lg relative cursor-pointer mb-6 bg-gray-200 w-full mt-7"
  >
    {#each segments as segment, index}
      <div
        role="none"
        class="absolute top-0 bottom-0 cursor-default {segments.length === 1
          ? 'rounded'
          : ''} {index === 0
          ? 'rounded-s'
          : segments.length - 1 === index
            ? 'rounded-e'
            : ''}"
        style="left: {segment.left}; width: {segment.width}; background-color: {segment.color};"
        onmouseenter={(e) => handleSegmentHover(e, segment)}
        onmousemove={handleSegmentMove}
        onmouseleave={handleSegmentLeave}
      ></div>
    {/each}

    {#each zones as zone, i (zone.id)}
      <div
        role="none"
        class="absolute -top-[50px] cursor-default -translate-x-1/2 group"
        style="left: {(zone.position / 1000) * 100}%"
      >
        {#if i !== zones.length - 1}
          <TooltipIcon />
          <div
            class="text-sm leading-4 text-white absolute top-[8.5px] -translate-x-1/2 left-1/2"
          >
            {zone.position}
          </div>
          <RangeBarThumb
            onmousedown={(e) => handleMouseDown(e, zone)}
            ontouchstart={(e) => handleTouchStart(e, zone)}
          />
        {/if}
      </div>
    {/each}
  </div>
  <div class="relative">
    <label
      for="maximum"
      class="absolute block -top-6 left-0 text-sm font-medium leading-[21px] disabled:opacity-50 disabled:cursor-not-allowed text-[#BCBCBC]"
    >
      Maximum
    </label>

    <InputField
      id="maximum"
      bind:value={end}
      numberOnly
      disabled
      class="max-w-[100px] text-[#BCBCBC] border-[#BCBCBC]"
      maxlength={5}
    />
  </div>
</div>

{#if hoveredSegment}
  <PopOver
    show={!!hoveredSegment}
    x={tooltipPosition.x}
    y={tooltipPosition.y}
    position="bottom"
  >
    <div class="">
      <span class="text-lg font-bold text-gray-800 block mb-3"
        >Zone Details</span
      >
      <hr class="border-t border-gray-300 mb-4" />
      <div class="flex flex-col gap-4 text-sm text-gray-700">
        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Name:</span>
          <span class="text-gray-800">{hoveredSegment.zoneName || "Zone"}</span>
          <AnimatedDot color={hoveredSegment.color} showAnimation />
        </div>

        <div class="flex items-center gap-3">
          <span class="font-semibold text-gray-900">Range:</span>
          <span class="text-gray-800">
            {hoveredSegment.startPosition === 0
              ? hoveredSegment.startPosition
              : hoveredSegment.startPosition + 1} - {hoveredSegment.endPosition}
          </span>
        </div>

        <div class="flex flex-wrap flex-row gap-1">
          <span class="font-semibold text-gray-900">Description:</span>
          <span class="text-gray-800"
            >{hoveredSegment.description || "None "}</span
          >
        </div>
      </div>
    </div>
  </PopOver>
{/if}
