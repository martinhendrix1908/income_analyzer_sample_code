<script lang="ts">
  type PopOverProps = {
    show: boolean;
    x: number;
    y: number;
    position?: "top" | "bottom" | "left" | "right";
    children: any;
  };

  let {
    show = false,
    x = 0,
    y = 0,
    position = "top",
    children,
  }: PopOverProps = $props();

  let tooltipRef: HTMLDivElement | null = null;
  let tooltipStyles = $state({ left: `${x}px`, top: `${y}px` });
  $effect(() => {
    tooltipStyles = calculateTooltipPosition();
  });

  function calculateTooltipPosition() {
    if (!tooltipRef || !show) {
      return { left: `${x}px`, top: `${y}px` };
    }

    const tooltipRect = tooltipRef.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    const padding = 20;

    let adjustedX = x;
    let adjustedY = y;

    switch (position) {
      case "top":
        adjustedY = y - tooltipRect.height - padding;
        break;
      case "bottom":
        adjustedY = y + padding;
        break;
      case "left":
        adjustedX = x - tooltipRect.width - padding;
        break;
      case "right":
        adjustedX = x + padding;
        break;
    }

    // Keep within viewport bounds
    adjustedX = Math.min(
      Math.max(padding, adjustedX),
      viewport.width - tooltipRect.width - padding
    );
    adjustedY = Math.min(
      Math.max(padding, adjustedY),
      viewport.height - tooltipRect.height - padding
    );

    return { left: `${adjustedX}px`, top: `${adjustedY}px` };
  }
</script>

<div
  class="fixed left-0 top-0 z-50 transition-opacity duration-150 min-w-[200px] max-w-[400px]"
  class:opacity-0={!show}
  class:opacity-100={show}
  bind:this={tooltipRef}
  style="left:{tooltipStyles.left}; top:{tooltipStyles.top}"
>
  <div class="bg-white shadow-lg rounded-md p-3 relative pointer-events-none">
    {@render children()}
  </div>
</div>
