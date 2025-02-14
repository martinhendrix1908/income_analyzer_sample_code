<script lang="ts">
  import { onMount } from "svelte";

  let { zoom = $bindable() }: { zoom: number } = $props();

  let draggablePoint: HTMLDivElement;
  let progressBar: HTMLDivElement;
  let progressBarContainer: HTMLDivElement;

  let progress = $state(0);
  $effect(() => {
    progress = (zoom - 1) * 100;
  });
  $effect(() => {
    zoom = progress / 100 + 1;
  });

  onMount(() => {
    document.body.style.overflow = "hidden";
    const parentElement = progressBar.parentElement;

    const onClick = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        onMouseMove(event.clientX);
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        onMouseMove(event.touches[0].clientX);
      }
    };

    const onMouseMove = (clientX: number) => {
      if (!parentElement) return;

      const parentWidth = parentElement.clientWidth;

      let newZoom =
        ((clientX - parentElement.getBoundingClientRect().left) / parentWidth) *
        100;

      newZoom = Math.max(0, Math.min(100, newZoom));
      progress = newZoom;
    };

    const onPointerMove = (event: MouseEvent | TouchEvent) => {
      if (event instanceof MouseEvent) {
        onMouseMove(event.clientX);
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        onMouseMove(event.touches[0].clientX);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onPointerMove);
      document.removeEventListener("touchend", stopDrag);
    };

    const startDrag = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (event instanceof MouseEvent) {
        document.addEventListener("mousemove", onPointerMove);
        document.addEventListener("mouseup", stopDrag);
      } else if (event instanceof TouchEvent) {
        document.addEventListener("touchmove", onPointerMove);
        document.addEventListener("touchend", stopDrag);
      }
    };

    // Attach both mouse and touch event listeners
    draggablePoint.addEventListener("mousedown", startDrag);
    draggablePoint.addEventListener("touchstart", startDrag);
    progressBarContainer.addEventListener("click", onClick);

    // Cleanup event listeners on component destroy
    return () => {
      draggablePoint.removeEventListener("mousedown", startDrag);
      draggablePoint.removeEventListener("touchstart", startDrag);
      document.removeEventListener("mousemove", onPointerMove);
      document.removeEventListener("mouseup", stopDrag);
      document.removeEventListener("touchmove", onPointerMove);
      document.removeEventListener("touchend", stopDrag);
      document.body.style.overflow = "auto";
      progressBarContainer.addEventListener("click", onClick);
    };
  });
</script>

<div class="w-full h-2 bg-[#EEEEEE] rounded-full" id="audio-player-container">
  <div
    class="relative h-full cursor-pointer"
    id="audio-progress"
    bind:this={progressBarContainer}
  >
    <div
      bind:this={progressBar}
      class="bar h-full bg-[#98C43D] rounded-full relative"
      style="width: {progress}%;"
    ></div>
    <div
      bind:this={draggablePoint}
      class="absolute w-4 h-4 bg-[#98C43D] border border-[#222222] rounded-full cursor-pointer top-1/2 -translate-y-1/2"
      style="left: calc({progress}% - 8px);"
    ></div>
  </div>
</div>
