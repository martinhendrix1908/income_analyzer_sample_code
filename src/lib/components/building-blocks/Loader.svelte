<script lang="ts">
  import { onMount } from "svelte";

  interface LoaderProps {
    message?: string;
  }

  const { message }: LoaderProps = $props();
  let overlayRef = $state<HTMLDivElement | null>(null);

  function handleClick(e: Event) {
    if (overlayRef && overlayRef.contains(e.target as Node)) {
      e.preventDefault();
    }
  }
  // onMount(() => {
  //   if (document?.body.style) {
  //     document.body.style.overflow = "hidden";
  //     return () => {
  //       document.body.style.overflow = "auto";
  //     };
  //   }
  // });

</script>

<svelte:window onclick={handleClick} />
<div
  bind:this={overlayRef}
  class="fixed inset-0 overflow-hidden w-screen h-screen !z-[999999] flex flex-col gap-4 items-center justify-center bg-opacity-0 backdrop-blur-sm drop-shadow-md"
>
  <div class="flex items-center justify-center">
    <div
      class="w-4 h-4 bg-[#09814A] rotate-[-45] rounded-[1px] animate-IA-switch-1"
    ></div>
    <div
      class="w-4 h-4 bg-[#98C43D] rotate-[-45] rounded-[1px] animate-IA-switch-2"
    ></div>
  </div>
  <p class="text-[#09814A]">{message}</p>
</div>
