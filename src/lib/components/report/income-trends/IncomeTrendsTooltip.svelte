<script lang="ts">
  import { Colors } from "$lib/constants";
  import type { IncomeSourceProp, TooltipData } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { getSourceNameById } from "../../../../routes/report/[id]/utils";

  let {
    title,
    tootipDatas,
    incomeSources,
    fromChart,
  }: {
    title: string;
    tootipDatas: TooltipData[];
    incomeSources: IncomeSourceProp[];
    fromChart?: boolean;
  } = $props();
</script>

<div
  id={fromChart ? "custom-tooltip" : ""}
  class="tooltip bg-white z-50 absolute p-2 shadow-3xl text-sm rounded-lg text-start leading-none
  {fromChart ? 'max-w-250px hidden' : '-left-6 md:-left-10 min-w-200px mt-1'}"
>
  <span class="font-medium text-naro-500 text-xs mb-2 inline-block">
    {title}
  </span>
  <ul class="flex text-xs flex-wrap gap-2 text-black">
    {#each tootipDatas as data (data)}
      <li class="flex gap-1 items-center w-full">
        <div
          class="w-2 h-2 min-w-8px border-1 rounded-md"
          style="background-color: {Colors[data.type]};"
        ></div>
        {getSourceNameById(data.sourceID, incomeSources)} - {convertToUSD(
          data.amount
        )}
      </li>
    {/each}
  </ul>
</div>
