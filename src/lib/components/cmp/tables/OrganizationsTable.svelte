<script lang="ts">
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type {
    TableHeaderProps,
    IOrganizationDetails,
  } from "$lib/types/organizations.types";
  import { convertDate } from "$lib/utils/date-utils";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";

  let { onClick }: { onClick?: (org: IOrganizationDetails) => void } = $props();
  let sortOrder = $state<"asc" | "desc">("asc");
  let sortBy = $state("organizationName");

  const tableHeaders: TableHeaderProps[] = [
    {
      key: "organizationName",
      label: "Organization Name",
      width: "w-[300px]",
      sortable: true,
    },
    {
      key: "isActive",
      label: "Status",
      width: "w-[120px]",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Created By",
      width: "w-[250px]",
      sortable: true,
    },
    {
      key: "updated",
      label: "Last Updated",
      width: "w-[200px]",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      width: "w-[200px]",
      sortable: false,
    },
  ];

  let organizations: IOrganizationDetails[] = $state([]);
  let isLoading = $state(true);

  const onSortButtonClick = (sortByName: string) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  $effect(() => {
    getOrganizations();
  });

  const getOrganizations = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/organizations?sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      organizations = data as IOrganizationDetails[];
    } catch (e) {
      console.error("Error while fetching organizations:", e);
    } finally {
      isLoading = false;
    }
  };

  const handleClick = (org: IOrganizationDetails) => {
    onClick?.(org);
  };
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div class="bg-white w-full overflow-hidden min-w-[870px]">
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[870px] overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[870px]">
        <!-- Table Header -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-[2]">
          <div
            class="flex items-center justify-between border-s-4 border-s-[#222222]"
          >
            {#each tableHeaders as header}
              <div
                class="{header.width} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
              >
                {#if header.sortable}
                  <button
                    class="flex items-center"
                    onclick={() => onSortButtonClick(header.key)}
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
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if organizations?.length > 0}
            {#each organizations as org}
              <div
                class="flex justify-between duration-100 hover:bg-naro-100 items-center border-s-4 !border-s-white hover:!border-s-[#98c43d]"
              >
                {#each tableHeaders as header}
                  {#if header.key === "action"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      <a
                        href={`/manage-organizations/${org.organizationId}/details`}
                        class="text-[#0a84ff] hover:underline transition-all duration-200 flex items-center gap-1"
                      >
                        <i><GearIcon /></i>
                        <span>Manage</span>
                      </a>
                    </div>
                  {:else if header.key === "isActive"}
                    <div
                      class="{header.width} px-4 py-2 text-[#222222] flex items-center"
                    >
                      {#if org.isActive}
                        <div
                          class="py-2 text-[#2C9F45] bg-[#98C43D1A] min-w-[72px] text-center leading-none rounded-[4px]"
                        >
                          Active
                        </div>
                      {:else}
                        <div
                          class="py-2 text-[#444444] bg-[#EEEEEE] min-w-[72px] text-center leading-none rounded-[4px]"
                        >
                          Inactive
                        </div>
                      {/if}
                    </div>
                  {:else if header.key === "createdAt" || header.key === "updated"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      {convertDate(
                        org[header.key as keyof IOrganizationDetails] as string
                      ) || "N/A"}
                    </div>
                  {:else}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      <Tooltip
                        content={org[
                          header.key as keyof IOrganizationDetails
                        ] as string}
                        position="bottom"
                        class="w-full block truncate"
                        checkOverflow
                      >
                        {org[header.key as keyof IOrganizationDetails] || "N/A"}
                      </Tooltip>
                    </div>
                  {/if}
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
