<script lang="ts">
  import { page } from "$app/state";
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type {
    Bundle,
    Feature,
    TableHeaderProps,
  } from "$lib/types/organizations.types";
  import { convertDate } from "$lib/utils/date-utils";
  import { slide } from "svelte/transition";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";

  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<keyof Bundle>("created");

  const tableHeaders: TableHeaderProps[] = [
    {
      key: "bundleName",
      label: "Bundle Name",
      width: "min-w-[200px] w-full",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
      width: "min-w-[400px] w-full",
      sortable: false,
    },
    {
      key: "bundlePrice",
      label: "Bundle Price",
      width: "min-w-[120px] w-full !text-right",
      sortable: true,
    },
    {
      key: "platformFee",
      label: "Platform Fee",
      width: "min-w-[120px] w-full !text-right",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Created By",
      width: "min-w-[120px] w-full",
      sortable: true,
    },
    {
      key: "updated",
      label: "Last Updated",
      width: "min-w-[120px] w-full",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      width: "min-w-[120px] w-full",
      sortable: false,
    },
  ];

  let bundles: Bundle[] = $state([]);
  let isLoading = $state(true);

  const onSortButtonClick = (sortByName: keyof Bundle) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  const toggleRow = (bundleId: number | undefined) => {
    let bundleIndex = bundles.findIndex((b) => b.bundleId === bundleId);
    if (bundleIndex !== -1) {
      bundles[bundleIndex].expanded = !bundles[bundleIndex].expanded;
    }
  };

  $effect(() => {
    getBundles();
  });

  const getBundles = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/bundles?sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      bundles = data as Bundle[];
    } catch (e) {
      console.error("Error while fetching bundles:", e);
    } finally {
      isLoading = false;
    }
  };

  const getFeatureNames = (features: string): string => {
    let featureList = page?.data?.features || [];
    if (!featureList?.length) return "";
    const featureNames = features?.split(",");

    const featureNamesArray = featureNames?.map((feature: string) => {
      return featureList.find((item: Feature) => item.featureId === +feature)
        ?.featureName;
    });
    return featureNamesArray?.join(", ") || "";
  };

  const getFeatureDetails = (features: string): Feature[] => {
    let featureList = page?.data?.features || [];
    if (!featureList?.length) return [];
    const featureIds = features?.split(",");
    return (
      featureIds
        ?.map((featureId: string) =>
          page.data?.features.find(
            (item: Feature) => item.featureId === +featureId
          )
        )
        .filter(Boolean) || []
    );
  };
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[1250px]"
  >
    <div
      class="w-full overflow-auto min-w-[1250px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1250px]">
        <!-- Table Header -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-[2]">
          <div
            class="flex items-center justify-between border-s-4 border-s-[#222222]"
          >
            <!-- Expand/Collapse Column -->
            <div class="min-w-12 max-w-12">&nbsp;</div>

            {#each tableHeaders as header}
              <div
                class="{header.width} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
              >
                {#if header.sortable}
                  <button
                    class="flex items-center"
                    onclick={() =>
                      onSortButtonClick(header.key as keyof Bundle)}
                  >
                    {header.label}
                    <SortButton
                      sortApplied={sortBy === header.key}
                      {sortOrder}
                    />
                  </button>
                {:else}
                  {header.label}
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-[#e1e1e1]">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if bundles?.length > 0}
            {#each bundles as bundle}
              <!-- Main Row -->
              <div
                role="none"
                class="flex justify-between duration-100 hover:bg-naro-100 items-center border-s-4 !border-s-white hover:!border-s-[#98c43d] cursor-pointer"
                onclick={() => {
                  if (!getFeatureDetails(bundle.featuresList).length) return;
                  toggleRow(bundle.bundleId);
                }}
              >
                <!-- Expand/Collapse Icon -->
                <div
                  class="min-w-12 max-w-12 flex justify-center items-center {!getFeatureDetails(
                    bundle.featuresList
                  ).length
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-default'}"
                >
                  {#if bundle.expanded}
                    <i class="ps-8"> <ChevronIcon direction="up" /></i>
                  {:else}
                    <i class="ps-8"> <ChevronIcon direction="down" /></i>
                  {/if}
                </div>

                {#each tableHeaders as header}
                  <div class="{header.width} px-4 py-2 text-[#222222]">
                    <Tooltip
                      content={header.key === "action"
                        ? ""
                        : header.key === "featuresList"
                          ? getFeatureNames(bundle[header.key] as string)
                          : (bundle[header.key as keyof Bundle] as string)}
                      position="bottom"
                      class="w-full block truncate text-wrap"
                      contentClass="max-w-[calc(50vw-2rem)] !bg-[#F5F5F5] !text-black !shadow-md"
                      checkOverflow
                    >
                      {#if header.key === "action"}
                        <a
                          href="/manage/bundles/{bundle?.bundleId}"
                          class="text-[#0a84ff] hover:underline transition-all duration-200 flex gap-1"
                          onclick={(e) => e.stopPropagation()}
                        >
                          <i><GearIcon /></i>
                          <span>Manage</span>
                        </a>
                      {:else if header.key === "featuresList"}
                        {getFeatureNames(bundle[header.key] as string)}
                      {:else if header.key === "created" || header.key === "updated"}
                        {convertDate(bundle[header.key] as string)}
                      {:else if ["bundlePrice", "platformFee"].includes(header.key)}
                        {convertToUSD(
                          bundle[header?.key as "platformFee" | "bundlePrice"]
                        )}
                      {:else}
                        {bundle[header.key as keyof Bundle] || ""}
                      {/if}
                    </Tooltip>
                  </div>
                {/each}
              </div>
              <!-- Expanded Features Row -->
              {#if bundle.expanded}
                <div class="bg-gray-50 w-full" transition:slide>
                  <div class="overflow-x-auto">
                    <table class="table-auto w-full border-collapse text-left">
                      <tbody class="divide-y divide-[#e1e1e1]">
                        {#each getFeatureDetails(bundle.featuresList) as feature}
                          <tr class="bg-white group">
                            <td
                              class="min-w-11 max-w-12 border-b border-b-white"
                            ></td>
                            <td
                              class="px-4 py-2 min-w-52 max-w-64 border-s-2 border-s-[#222222] group-hover:bg-naro-100 text-left"
                            >
                              {feature.featureName}
                            </td>
                            <td
                              class="px-4 py-2 w-full min-w-96 text-wrap group-hover:bg-naro-100"
                            >
                              <span class="ps-2"
                                >{feature.description || "No description"}</span
                              ></td
                            >
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </div>
              {/if}
            {/each}
          {:else}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              No records found
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
