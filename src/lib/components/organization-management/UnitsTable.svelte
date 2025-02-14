<script lang="ts">
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import { convertDate } from "$lib/utils/date-utils";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import { page } from "$app/state";
  import type { IOrganizationUnit } from "$lib/types/types";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  const unitHeaders = [
    {
      label: "Unit Name",
      key: "name",
    },
    {
      label: "Parent Group",
      key: "parentGroupName",
    },
    {
      label: "Users",
      key: "totalUsers",
    },
    {
      label: "Date Created",
      key: "created",
    },
    {
      label: "Last Updated",
      key: "updated",
    },
    {
      label: "Actions",
      key: "action",
    },
  ];

  let {
    sortBy = $bindable(),
    sortOrder = $bindable(),
    searchValue,
    fromManagementScreen = false,
  }: {
    sortBy: string;
    sortOrder: "asc" | "desc";
    searchValue?: string;
    fromManagementScreen?: boolean;
  } = $props();

  const onSortButtonClick = (sortByName: string) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  let units = $state<IOrganizationUnit[]>([]);
  let isLoading = $state(true);

  const getUnits = async () => {
    try {
      isLoading = true;
      const req = await fetch("/api/organization-units", {
        method: "POST",
        body: JSON.stringify({
          authToken: page?.data?.user?.authToken,
          ouType: "Unit",
          sortBy,
          sortOrder,
          searchValue,
          orgUnitId: page.params.id || "0",
        }),
      });
      const res: IOrganizationUnit[] = await req.json();
      units = res;
    } catch (e) {
      console.log(`Something went wrong -- ${e}`);
    } finally {
      isLoading = false;
    }
  };

  $effect(() => {
    getUnits();
  });
</script>

<div
  class="bg-white {page.url.search !== ''
    ? 'border'
    : 'shadow-[0px_4px_4px_0px_#00000040]'} rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden {fromManagementScreen
      ? 'min-w-[970px]'
      : 'min-w-[1023px]'}"
  >
    <div
      class="w-full overflow-auto max-h-[500px] {fromManagementScreen
        ? 'min-w-[970px]'
        : 'min-w-[1023px]'} xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div
        class="w-full text-sm leading-relaxed {fromManagementScreen
          ? 'min-w-[970px]'
          : 'min-w-[1023px]'}"
      >
        <!-- Table Header  -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0">
          <div class="flex items-center justify-evenly">
            {#each unitHeaders as header, index}
              <div
                class="w-1/5 {header.key === 'name'
                  ? 'px-6'
                  : 'px-4'} py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
              >
                <div
                  class="flex cursor-pointer {header.key === 'action'
                    ? 'justify-center'
                    : ''} "
                >
                  <button
                    class="flex"
                    onclick={header.key !== "action"
                      ? () => onSortButtonClick(header.key)
                      : undefined}
                  >
                    {header.label}
                    {#if header.key !== "action"}
                      <SortButton
                        sortApplied={sortBy === header.key}
                        {sortOrder}
                      />
                    {/if}
                  </button>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Table Body-->
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if units.length > 0}
            {#each units as unit}
              <div class="flex justify-evenly duration-100 hover:bg-naro-100">
                <Tooltip
                  class="w-1/5 px-6 py-2 text-[#222222] truncate"
                  checkOverflow
                  content={unit.name}
                >
                  {unit.name || "N/A"}
                </Tooltip>
                <Tooltip
                  class="w-1/5 px-4 py-2 text-[#222222] truncate"
                  checkOverflow
                  content={unit.parentGroupName}
                >
                  {unit.parentGroupName || "N/A"}
                </Tooltip>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {unit.totalUsers}
                </div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {convertDate(unit.created as string) || "N/A"}
                </div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {convertDate(unit.updated as string) || "N/A"}
                </div>

                <div
                  class="w-1/5 px-4 py-2 text-[#222222] hover:underline flex justify-center"
                >
                  <a
                    href="/manage/units/{unit.unitId}/?tab=Settings&type=Unit&menu=Details"
                    class="text-[#0a84ff] flex gap-1 justify-center"
                  >
                    <i><GearIcon /></i>
                    Manage
                  </a>
                </div>
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
