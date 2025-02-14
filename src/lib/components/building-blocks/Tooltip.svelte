<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  type Position = "top" | "bottom" | "left" | "right";
  type Variant = "dark" | "light";

  let {
    content = "",
    delay = 400,
    children,
    class: customClass,
    position: preferredPosition = "bottom",
    hidden = false,
    variant = "dark" as Variant,
    checkOverflow = false,
    componentContent,
    contentClass,
  }: {
    content?: string;
    delay?: number;
    children: any;
    class?: string;
    position?: Position;
    hidden?: boolean;
    variant?: Variant;
    checkOverflow?: boolean;
    componentContent?: any;
    contentClass?: string;
  } = $props();

  let tooltipRef = $state<HTMLElement>();
  let triggerRef = $state<HTMLElement>();

  let isVisible = $state(false);
  let shouldShowTooltip = $state(false);
  let position = $state({ top: 0, left: 0 });
  let placement = $state<Position>(preferredPosition);
  let showTimeout = $state<ReturnType<typeof setTimeout>>();

  function hasEnoughSpace(
    pos: Position,
    spaceAbove: number,
    spaceBelow: number,
    spaceLeft: number,
    spaceRight: number,
    tooltipRect: DOMRect
  ): boolean {
    const minSpace = 10;

    switch (pos) {
      case "top":
        return spaceAbove >= tooltipRect.height + minSpace;
      case "bottom":
        return spaceBelow >= tooltipRect.height + minSpace;
      case "left":
        return spaceLeft >= tooltipRect.width + minSpace;
      case "right":
        return spaceRight >= tooltipRect.width + minSpace;
      default:
        return false;
    }
  }

  function checkContentOverflow() {
    if (!checkOverflow || !triggerRef) return true;
    return (
      triggerRef.scrollWidth > triggerRef.clientWidth ||
      triggerRef.scrollHeight > triggerRef.clientHeight
    );
  }

  function calculatePosition() {
    if (!tooltipRef || !triggerRef) return;

    const triggerRect = triggerRef.getBoundingClientRect();
    const tooltipRect = tooltipRef.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const spaceAbove = triggerRect.top;
    const spaceBelow = viewport.height - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = viewport.width - triggerRect.right;

    // Find best placement
    if (
      hasEnoughSpace(
        preferredPosition,
        spaceAbove,
        spaceBelow,
        spaceLeft,
        spaceRight,
        tooltipRect
      )
    ) {
      placement = preferredPosition;
    } else {
      const positions: Position[] = ["bottom", "top", "right", "left"];
      placement =
        positions.find((pos) =>
          hasEnoughSpace(
            pos,
            spaceAbove,
            spaceBelow,
            spaceLeft,
            spaceRight,
            tooltipRect
          )
        ) || "bottom";
    }

    // Calculate initial position based on placement
    let initialPosition = { top: 0, left: 0 };

    switch (placement) {
      case "top":
        initialPosition = {
          top: triggerRect.top - tooltipRect.height - 8,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
        break;
      case "bottom":
        initialPosition = {
          top: triggerRect.bottom + 8,
          left: triggerRect.left + (triggerRect.width - tooltipRect.width) / 2,
        };
        break;
      case "right":
        initialPosition = {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.right + 8,
        };
        break;
      case "left":
        initialPosition = {
          top: triggerRect.top + (triggerRect.height - tooltipRect.height) / 2,
          left: triggerRect.left - tooltipRect.width - 8,
        };
        break;
    }

    // Adjust position to keep tooltip within viewport
    const finalPosition = {
      top: Math.min(
        Math.max(10, initialPosition.top), // Keep 10px from top
        viewport.height - tooltipRect.height - 10 // Keep 10px from bottom
      ),
      left: Math.min(
        Math.max(10, initialPosition.left), // Keep 10px from left
        viewport.width - tooltipRect.width - 10 // Keep 10px from right
      ),
    };

    position = finalPosition;
  }

  function showTooltip() {
    shouldShowTooltip = checkContentOverflow();

    if (shouldShowTooltip) {
      showTimeout = setTimeout(() => {
        isVisible = true;
        calculatePosition();
      }, delay);
    }
  }

  function hideTooltip() {
    clearTimeout(showTimeout);
    isVisible = false;
  }

  $effect(() => {
    if (isVisible) {
      calculatePosition();
    }
  });

  onMount(() => {
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", hideTooltip);
    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", hideTooltip);
    };
  });

  const variantStyles = $derived.by(
    () =>
      ({
        dark: "bg-gray-800 text-white",
        light: "bg-white text-gray-800 shadow-lg border border-gray-200",
      })[variant]
  );
</script>

<div
  role="none"
  class="relative {customClass}"
  bind:this={triggerRef}
  onmouseenter={showTooltip}
  onmouseleave={hideTooltip}
  onfocus={showTooltip}
  onblur={hideTooltip}
>
  {@render children()}
</div>

{#if isVisible && shouldShowTooltip && !hidden}
  {#if content}
    <div
      bind:this={tooltipRef}
      class="fixed z-[50] rounded-md py-2 px-3 text-sm font-normal font-sans whitespace-normal break-words focus:outline-none pointer-events-none {variantStyles} {contentClass}"
      style="top: {position.top}px; left: {position.left}px;"
      transition:fade={{ duration: 200 }}
    >
      {content}
    </div>
  {:else if componentContent}
    <div
      bind:this={tooltipRef}
      class="fixed z-[50] md:max-w-md max-w-sm"
      style="top: {position.top}px; left: {position.left}px;"
      transition:fade={{ duration: 200 }}
    >
      {@render componentContent()}
    </div>
  {/if}
{/if}
