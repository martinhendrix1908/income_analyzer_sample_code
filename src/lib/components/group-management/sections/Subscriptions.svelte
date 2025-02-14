<script lang="ts">
  import { page } from "$app/state";
  import type { Bundle, Feature } from "$lib/types/organizations.types";
  import type { SubscriptionDetailsConfiguration } from "$lib/types/types";

  let {
    configuration,
  }: {
    configuration: SubscriptionDetailsConfiguration;
  } = $props();

  const currentBundle = $derived.by(() => {
    return page.data.bundleList?.find(
      (i: Bundle) => `${i?.bundleId}` === configuration?.bundleId
    );
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

{#if currentBundle?.bundleName}
  <div
    class="relative overflow-hidden rounded-md bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6"
  >
    <div class="relative z-10">
      <div class="flex items-center gap-2 mb-2">
        <div class="h-2 w-2 rounded-full bg-green-400"></div>
        <span class="text-xs font-medium text-blue-100">Your bundle</span>
      </div>
      <h1 class="text-xl font-bold mb-2">{currentBundle?.bundleName}</h1>
      <p class=" text-blue-100">{currentBundle?.description}</p>
    </div>
    <div
      class="absolute right-0 top-0 w-1/3 h-full opacity-10 bg-gradient-to-l from-white"
    ></div>
  </div>
{:else}
  <div class="p-4 bg-yellow-50 rounded-md border border-yellow-100 mt-2">
    <p class="text-sm text-yellow-700">No bundle subscribed.</p>
  </div>
{/if}

<div class="">
  <h3 class="text-[#493d3d] text-[20px] font-semibold leading-[21px] mb-4">
    Features:
  </h3>
  {#if page.data?.featureList?.length > 0}
    <div class="space-y-4">
      {#each features.addOnFeatures as feature}
        <div
          class="bg-card text-card-foreground rounded-lg border shadow p-4 border-gray-400"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <h4 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h4>
              <div class="text-sm px-2 rounded-md bg-[#0A84FF] text-white">
                Add-on
              </div>
            </div>
            <div class=" text-sm px-2 rounded-md bg-[#98C43D]">Included</div>
          </div>
          <p class="text-sm text-gray-600">
            {feature?.description}
          </p>
        </div>
      {/each}
      {#each features.bundleFeatures as feature}
        <div
          class="bg-card text-card-foreground rounded-lg border shadow p-4 border-gray-400
          "
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
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
          class="bg-card text-card-foreground rounded-lg border shadow p-4
           opacity-65"
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
      <p class="text-sm text-blue-700">No bundle available.</p>
    </div>
  {/if}
</div>

<!-------------------- TODO: For future reference -------------------->

<!-- <div class="space-y-8">
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class=" font-semibold leading-[21px] text-[20px] text-[#444444]">
          Bundle Features
        </h2>
        <p class="text-sm text-gray-600">Included in your subscription</p>
      </div>
      <div
        class="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
      >
        {features?.bundleFeatures?.length} Feature{features?.bundleFeatures
          ?.length > 1
          ? "s"
          : ""}
      </div>
    </div>
    <div class="bg-card text-card-foreground rounded-md border shadow">
      {#each features?.bundleFeatures as feature}
        <div
          class="flex items-center p-4 border-b border-gray-100 last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h3>
            </div>
            <p class="text-sm">
              {feature?.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Add-on Features</h2>
        <p class="text-sm text-gray-600">Additional features you've enabled</p>
      </div>
      <div
        class="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
      >
        {features?.addOnFeatures?.length} Feature{features?.addOnFeatures
          ?.length > 1
          ? "s"
          : ""}
      </div>
    </div>
    <div class="bg-card text-card-foreground rounded-md border shadow">
      {#each features?.addOnFeatures as feature}
        <div
          class="flex items-center p-4 border-b border-gray-100 last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h3>
            </div>
            <p class="text-sm">
              {feature?.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <div>
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Available Features</h2>
        <p class="text-sm text-gray-600">Enhance your analysis capabilities</p>
      </div>
      <div
        class="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
      >
        {features?.availableFeatures?.length} Feature{features
          ?.availableFeatures?.length > 1
          ? "s"
          : ""}
      </div>
    </div>
    <div
      class="bg-card text-card-foreground rounded-md border shadow opacity-7"
    >
      {#each features?.availableFeatures as feature}
        <div
          class="flex items-center p-4 border-b border-gray-100 last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="text-[#493d3d] text-[20px] font-semibold">
                {feature?.featureName}
              </h3>
            </div>
            <p class="text-sm">
              {feature?.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div> -->
