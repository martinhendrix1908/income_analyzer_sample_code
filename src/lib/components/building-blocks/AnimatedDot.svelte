<script lang="ts">
  import { Colors } from "$lib/constants";
  let {
    color,
    showAnimation,
    eventType,
  }: { color?: string; eventType?: string; showAnimation: boolean } 
  = $props();
</script>
<span
    class="relative flex h-2 w-2"
    style="color: {color || Colors[eventType as string]};"
  >
    {#if showAnimation}
      {#each new Array(3).fill("") as item,i }
      <span
          class="animate-wiggle{i>0?i:''} absolute inline-flex h-full w-full rounded-md opacity-75"
          style="background-color: {color || Colors[eventType as string]};">
      </span>
      {/each}
    {/if}
    <span class="relative inline-flex rounded-md h-2 w-2" style="background-color: {color || Colors[eventType as string]};" ></span>
</span>
