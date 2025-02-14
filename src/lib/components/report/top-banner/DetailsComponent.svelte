<script lang="ts">
  import type { DetailsTopBanner } from "$lib/types/report.types";

  let { data }: { data: DetailsTopBanner } = $props();
</script>

<div
  class="col-span-2 lg:col-span-8 xl:col-span-6 flex flex-col md:flex-row lg:justify-end gap-6 md:gap-20"
>
  <div class="">
    <h6 class="text-[#98c43d] mb-2 font-semibold">{data?.heading}</h6>
    <div class="text-naro-300 flex flex-col gap-y-2">
      {#each data?.details as item (item)}
        {#if item?.isVisible}
          <div class="flex whitespace-nowrap">
            {item?.label}:
            <span class="sm:ms-1 text-white text-wrap max-w-[185px]">
              {item?.value ?? "N/A"}
            </span>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
