<script lang="ts">
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { convertDate } from "$lib/utils/date-utils";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  import type { Feature } from "$lib/types/organizations.types";
  import { convertToUSD } from "$lib/utils/currency-utils";

  interface TableHeaderProps {
    key: keyof Feature | "action";
    label: string;
    width: string;
    sortable: boolean;
  }

  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<keyof Feature>("created");
  let expandedRows = $state<number | undefined>();

  const tableHeaders: TableHeaderProps[] = [
    {
      key: "featureName",
      label: "Feature Name",
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
      key: "basePrice",
      label: "Base Price",
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

  let features: Feature[] = $state([]);
  let isLoading = $state(true);

  const onSortButtonClick = (sortByName: keyof Feature) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  const toggleRow = (featureId: number | undefined) => {
    expandedRows = featureId;
  };

  $effect(() => {
    getFeatures();
  });

  const getFeatures = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/features?sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      features = data as Feature[];
    } catch (e) {
      console.error("Error while fetching features:", e);
    } finally {
      isLoading = false;
    }
  };
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[1200px]"
  >
    <div
      class="w-full overflow-auto min-w-[1200px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1200px]">
        <!-- Table Header -->
        <div class="bg-[#222222] leading-loose sticky top-0 left-0 z-[2]">
          <div
            class="flex items-center justify-evenly"
          >
            {#each tableHeaders as header}
              <div
                class="{header.width} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
              >
                {#if header.sortable}
                  <button
                    class="flex items-center"
                    onclick={() =>
                      onSortButtonClick(header.key as keyof Feature)}
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
          {:else if features?.length > 0}
            {#each features as feature}
              <!-- Main Row -->
              <div
                role="none"
                class="flex justify-between duration-100 hover:bg-naro-100 cursor-default"
                onclick={() =>
                  toggleRow(
                    expandedRows === feature.featureId
                      ? undefined
                      : feature.featureId
                  )}
              >
                {#each tableHeaders as header}
                  <div class="{header.width} px-4 py-2 text-[#222222]">
                    <Tooltip
                      content={header.key === "action"
                        ? ""
                        : String(feature[header.key as keyof Feature])}
                      position="top"
                      class="w-full block truncate text-wrap"
                      contentClass="max-w-[calc(50vw-2rem)] !bg-[#F5F5F5] !text-black !shadow-md"
                      checkOverflow
                    >
                      {#if header.key === "action"}
                        <a
                          href="/manage/features/{feature.featureId}"
                          class="text-[#0a84ff] hover:underline transition-all duration-200 flex gap-1"
                        >
                          <i><GearIcon /></i>
                          <span>Manage</span>
                        </a>
                      {:else if header.key === "basePrice" || header.key === "platformFee"}
                        {convertToUSD(feature[header.key])}
                      {:else if header.key === "created" || header.key === "updated"}
                        {feature[header.key]
                          ? convertDate(feature[header.key])
                          : "N/A"}
                      {:else}
                        {feature[header.key as keyof Feature] || "N/A"}
                      {/if}
                    </Tooltip>
                  </div>
                {/each}
              </div>
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
