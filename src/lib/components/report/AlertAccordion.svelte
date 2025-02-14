<script lang="ts">
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import type { IZoneStyleType } from "$lib/types/report.types";
  import { slide } from "svelte/transition";
  import AnimatedDot from "$lib/components/building-blocks/AnimatedDot.svelte";

  let {
    title,
    description,
    assessmentReasons,
    style,
    enableDropdown = true,
  }: {
    title: string;
    description: string;
    assessmentReasons: string[];
    style: IZoneStyleType;
    enableDropdown?: boolean;
  } = $props();

  let toggle = $state(false);
</script>

<div
  class="overflow-hidden rounded border"
  style="border-color: {style.borderColor}; background-color: {style.bgColor};"
>
  <button
    class="flex flex-wrap w-full justify-between gap-2 px-6 py-4 relative"
    style="color: {style.textColor};"
    type="button"
    onclick={() => (toggle = !toggle)}
  >
    <div
      class="lg:items-center inline-flex items-center w-full 2xl:flex-nowrap flex-wrap gap-2 xl:mr-10"
    >
      <AnimatedDot color={style.textColor} showAnimation={true} />
      <h2 class="text-2xl leading-10 font-medium text-nowrap ms-2">{title}</h2>
      <h4 class="text-naro-600 text-base text-start break-words ps-6 2xl:ps-0">
        {description}
      </h4>
    </div>

    {#if enableDropdown}
      <div
        class="flex items-center font-medium text-base absolute top-6 right-4 hover:underline"
      >
        <span class="hidden sm:inline">
          {toggle ? "Close" : "Reasons"}
        </span>

        <ChevronIcon
          direction={toggle ? "up" : "down"}
          fillColor={style.textColor}
        />
      </div>
    {/if}
  </button>

  {#if enableDropdown && toggle}
    <div class="max-h-[210px]" transition:slide={{ duration: 300 }}>
      <div class="border-t border-naro-600 opacity-40 mx-4"></div>

      <div class="min-h-full">
        <div
          class="text-naro-600 max-h-[210px] overflow-y-scroll px-5 py-3 text-sm custom-scrollbar"
        >
          {#if assessmentReasons?.length > 0}
            {#each assessmentReasons as reason (reason)}
              <div class="py-3 ps-8">
                {reason}
              </div>
            {/each}
          {:else}
            <span class="py-3 ps-8 font-medium">No data found</span>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
