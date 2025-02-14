<script lang="ts">
  import ColorRangePicker from "$lib/components/building-blocks/ColorRangePicker.svelte";
  import type {
    AssessmentZone,
    AssessmentZoneConfiguration,
  } from "$lib/types/types";
  import AssessmentZoneDetails from "$lib/components/group-management/sections/AssessmentZoneDetails.svelte";
  import { page } from "$app/state";
  import OverrideLock from "$lib/components/group-management/sections/OverrideLock.svelte";
  import { deepClone, generateUniqueId } from "$lib/utils/common-utils";

  let {
    configuration = $bindable(),
    setConfiguration,
    claimValue,
  }: {
    configuration: AssessmentZoneConfiguration;
    setConfiguration: (config: any) => void;
    claimValue: string;
  } = $props();

  let zones = $state<AssessmentZone[]>([]);
  (() => {
    const zoneCopy = deepClone(
      configuration.zoneList.map((item: AssessmentZone) => ({
        ...item,
        id: item?.id || generateUniqueId(),
      }))
    );
    zones =
      zoneCopy?.length >= 2
        ? zoneCopy
        : [
            ...zoneCopy,
            ...Array(2 - (zoneCopy?.length || 0))
              .fill(null)
              .map((_, index) => ({
                id: generateUniqueId(),
                position: 500 + index * 500,
                color: index === 0 ? "#BE0027" : "#98C43D",
                description: "",
                name: `zone ${index + 1}`,
              })),
          ];
  })();

  $effect(() => setConfiguration({ zoneList: zones }));
</script>

<div class="grid gap-4 grid-flow-row grid-cols-1 w-full">
  <ColorRangePicker bind:zones {claimValue} />
  <AssessmentZoneDetails bind:zones {claimValue} />
</div>

{#if page.data.unitList.length > 0}
  <hr />
  <OverrideLock {configuration} {setConfiguration} {claimValue} />
{/if}
