<script lang="ts">
  import type { IZoneStyleType } from "$lib/types/report.types";
  import AnimatedDot from "$lib/components/building-blocks/AnimatedDot.svelte";

  let {
    style,
    title,
    description,
  }: {
    style: IZoneStyleType;
    title: string;
    description: string;
  } = $props();
</script>

<div
  class="border rounded overflow-hidden"
  style="border-color: {style.borderColor}; background-color: {style.bgColor};"
>
  <div
    class="lg:items-center inline-flex items-center w-full pl-8 sm:pr-4 py-1 my-4 2xl:flex-nowrap flex-wrap gap-2"
  >
    <AnimatedDot color={style.textColor} showAnimation={true} />
    <span
      class="sm:ml-2 sm:text-[24px] text-[20px] font-medium"
      style="color: {style.textColor};"
    >
      {title}
    </span>
    <span
      class="text-left text-[16px] text-naro-600 xl:mt-[0.5px] ml-6 sm:ml-8 xl:ml-0"
    >
      {description}
    </span>
  </div>
</div>
