<script lang="ts">
  let {
    minValue,
    maxValue,
    step,
    rangeValue = $bindable(),
  }: {
    minValue: number;
    maxValue: number;
    step: number;
    rangeValue: number;
  } = $props();

  let isDragging: boolean = $state(false);
  let sliderRef = $state<HTMLDivElement | null>(null);
  let tooltipRef = $state<HTMLDivElement | null>(null);
  let caretPosition = $state(50);
  let tooltipPosition = $state(50);

  function handlePointerDown(event: PointerEvent) {
    event.preventDefault();

    isDragging = true;
    const target = event.target as HTMLDivElement;
    target.setPointerCapture(event.pointerId);

    updateRangeValue(getEventClientX(event));
  }

  function handlePointerMove(event: PointerEvent) {
    if (!isDragging) return;

    event.preventDefault();

    updateRangeValue(getEventClientX(event));
  }

  function handlePointerUp(event: PointerEvent) {
    isDragging = false;
    const target = event.target as HTMLDivElement;
    target?.releasePointerCapture(event.pointerId);
  }

  function getEventClientX(event: PointerEvent) {
    return (event as any).touches
      ? (event as any).touches[0].clientX
      : event.clientX;
  }

  function updateRangeValue(clientX: number) {
    if (!sliderRef) return;

    const sliderRect = sliderRef.getBoundingClientRect();
    const relativeX = Math.max(
      0,
      Math.min(clientX - sliderRect.left, sliderRect.width)
    );
    const percentage = relativeX / sliderRect.width;
    const newValue = minValue + percentage * (maxValue - minValue);

    rangeValue = Math.round(newValue / step) * step;
  }

  $effect(() => {
    if (sliderRef && tooltipRef) {
      const sliderRect = sliderRef.getBoundingClientRect();
      const tooltipRect = tooltipRef.getBoundingClientRect();

      const percentage =
        ((rangeValue - minValue) / (maxValue - minValue)) * 100;
      const sliderWidth = sliderRect.width;
      const tooltipWidth = tooltipRect.width;
      const thumbPosition = (percentage / 100) * sliderWidth;

      // Calculate initial tooltip position (centered on the thumb)
      let tooltipLeft = thumbPosition - tooltipWidth / 2;

      // Check available space on the right and left
      const availableSpaceRight = window.innerWidth - sliderRect.right;
      const availableSpaceLeft = sliderRect.left;

      // Adjust tooltip position only if it overflows the slider boundaries
      if (tooltipLeft < 0 && availableSpaceLeft < tooltipWidth / 2) {
        tooltipLeft = 0;
      } else if (
        tooltipLeft + tooltipWidth > sliderWidth &&
        availableSpaceRight < tooltipWidth / 2
      ) {
        tooltipLeft = sliderWidth - tooltipWidth;
      }

      // Calculate caret position relative to the tooltip
      let caretLeft = thumbPosition - tooltipLeft;

      // Clamp caret position within the tooltip bounds
      if (caretLeft < 0) {
        caretLeft = 0;
      } else if (caretLeft > tooltipWidth) {
        caretLeft = tooltipWidth;
      }

      tooltipPosition = (tooltipLeft / sliderWidth) * 100;
      caretPosition = (caretLeft / tooltipWidth) * 100;
    }
  });
</script>

<div class="w-full flex flex-col items-center relative touch-none select-none">
  <div
    bind:this={sliderRef}
    class="w-full h-4 bg-gray-200 rounded-full relative"
    role="slider"
    aria-valuemin={minValue}
    aria-valuemax={maxValue}
    aria-valuenow={rangeValue}
  >
    <!-- Filled Track -->
    <div
      class="h-full bg-[#09814A] rounded-full"
      style="width: {((rangeValue - minValue) / (maxValue - minValue)) * 100}%;"
    ></div>

    <!-- Slider Thumb -->
    <div
      role="none"
      class="w-6 h-6 bg-white rounded-full absolute top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-[0px_2px_4px_0px_#0000004D] touch-none"
      style="left: {((rangeValue - minValue) / (maxValue - minValue)) * 100}%;"
      onpointerdown={handlePointerDown}
      onpointermove={handlePointerMove}
      onpointerup={handlePointerUp}
      onpointercancel={handlePointerUp}
    ></div>

    <!-- Tooltip -->
    <div
      bind:this={tooltipRef}
      class="absolute text-nowrap text-[#FFFFFF] text-sm -top-12 px-3 py-2 bg-black rounded-md"
      style="left: {tooltipPosition}%;"
    >
      {rangeValue} customers
      <!-- <div
        class="absolute w-2 h-2 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-black top-full left-1/2 transform"
        style="left: {caretPosition}%;"
      ></div> -->
      <div
        class="absolute w-2 h-2 bg-black transform rotate-45 top-full"
        style="left: {caretPosition}%; transform: translate(-50%, -50%) rotate(45deg);"
      ></div>
    </div>
  </div>
</div>

<style>
  /* Ensure no tap highlights on mobile */
  * {
    -webkit-tap-highlight-color: transparent;
  }
</style>
