<script lang="ts">
  import { page } from "$app/state";
  import type { Bundle, Feature } from "$lib/types/organizations.types";
  import type { SubscriptionDetailsConfiguration } from "$lib/types/types";

  let configuration = $state<SubscriptionDetailsConfiguration | undefined>(
    page.data.subscriptionDetails
  );

  const currentBundle = $derived.by(() => {
    return page.data.bundleList?.find((i: Bundle) => {
      return `${i?.bundleId}` === configuration?.bundleId;
    });
  });
  const features = $derived.by<{
    addOnFeatures: Feature[];
    availableFeatures: Feature[];
    bundleFeatures: Feature[];
  }>(() => {
    const bundleFeatureIds = currentBundle?.featuresList?.split(",") || [];
    const currentFeatureIds = configuration?.featureIds?.split(",") || [];

    return {
      addOnFeatures: page?.data?.featureList?.filter((item: Feature) =>
        currentFeatureIds?.includes(`${item.featureId}`)
      ),
      availableFeatures: page?.data?.featureList?.filter(
        (item: Feature) =>
          ![...currentFeatureIds, ...bundleFeatureIds].includes(
            `${item.featureId}`
          )
      ),
      bundleFeatures: page?.data?.featureList?.filter((item: Feature) =>
        bundleFeatureIds?.includes(`${item.featureId}`)
      ),
    };
  });
</script>

<div class="flex md:flex-row flex-col gap-2 -mb-7">
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
      Subscription
    </h3>
  </div>
</div>
{#if currentBundle?.bundleName}
  <div
    class="relative overflow-hidden bg-[#262626] shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)] px-6 pt-6 pb-4 rounded-md text-white z-[5]"
  >
    <div class="relative z-10">
      <div class="flex items-center gap-2 mb-2">
        <div class="h-2 w-2 rounded-full bg-green-400"></div>
        <span class="text-xs font-medium text-white">Your bundle</span>
      </div>
      <h1 class="text-xl font-bold mb-2 text-[#98C43D]">
        {currentBundle?.bundleName}
      </h1>
      <p class="text-[#BFBFBF] text-[13px]">{currentBundle?.description}</p>
    </div>
    <div
      class="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-gradient-to-l from-white"
    ></div>
  </div>
{:else}
  <div class="p-4 bg-[#2F80ED1A] rounded-md border border-[#2F80ED] mt-2">
    <p class="text-sm text-[#2F80ED]">No bundle subscribed.</p>
  </div>
{/if}

<div class="flex md:flex-row flex-col gap-2 -mb-7">
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
      Features
    </h3>
  </div>
</div>
<div class="">
  {#if page.data?.featureList?.length > 0}
    <div class="space-y-4">
      {#each features.addOnFeatures as feature}
        <div class="bg-white rounded-lg border shadow p-4 border-gray-400">
          <div class="flex items-start justify-between mb-2">
            <div class="flex flex-wrap items-center gap-2">
              <h4 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h4>
              <span class="text-sm px-2 rounded-md bg-[#0A84FF] text-white">
                Add-on
              </span>
            </div>
            <div class=" text-sm px-2 rounded-md bg-[#98C43D]">Included</div>
          </div>
          <p class="text-sm text-gray-600">
            {feature?.description}
          </p>
        </div>
      {/each}
      {#each features.bundleFeatures as feature}
        <div class="bg-white rounded-lg border shadow p-4 border-gray-400">
          <div class="flex items-start justify-between mb-2">
            <div class="flex flex-wrap items-center gap-2">
              <h4 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h4>
              {#if currentBundle?.bundleName}
                <div class="text-sm px-2 rounded-md bg-[#0A84FF] text-white">
                  {currentBundle?.bundleName}
                </div>
              {/if}
            </div>
            <div class=" text-sm px-2 rounded-md bg-[#98C43D]">Included</div>
          </div>
          <p class="text-sm text-gray-600">
            {feature?.description}
          </p>
        </div>
      {/each}
      {#each features.availableFeatures as feature}
        <div
          class="bg-white rounded-lg border shadow p-4 border-gray-400 opacity-65"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <h4 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h4>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            {feature?.description}
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="p-4 bg-blue-50 rounded-md border border-blue-100 mt-2">
      <p class="text-sm text-blue-700">No features available.</p>
    </div>
  {/if}
</div>
