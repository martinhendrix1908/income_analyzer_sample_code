<script lang="ts">
  import { page } from "$app/state";
  import type { IOrganizationGroup } from "$lib/types/types";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { convertDate } from "$lib/utils/date-utils";
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  const groupHeaders = [
    {
      label: "Group Name",
      key: "name",
    },
    {
      label: "Units",
      key: "totalUnits",
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
  }: {
    sortBy: string;
    sortOrder: "asc" | "desc";
    searchValue: string;
  } = $props();
  let groups = $state<IOrganizationGroup[]>([]);
  let isLoading = $state(true);

  const onSortButtonClick = (sortByName: string) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  const getGroups = async () => {
    try {
      isLoading = true;
      const req = await fetch("/api/organization-units", {
        method: "POST",
        body: JSON.stringify({
          authToken: page?.data?.user?.authToken,
          ouType: "Group",
          sortBy,
          sortOrder,
          searchValue,
          orgUnitId: page.params.id || "0",
        }),
      });
      const res: IOrganizationGroup[] = await req.json();
      groups = res;
    } catch (e) {
      console.log(`Something went wrong -- ${e}`);
    } finally {
      isLoading = false;
    }
  };
  $effect(() => {
    getGroups();
  });
</script>

<div
  class="Groups-table bg-white {page.url.search !== ''
    ? 'border'
    : 'shadow-[0px_4px_4px_0px_#00000040]'} rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[970px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[970px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[970px]">
        <div class="bg-[#222222] leading-loose sticky top-0 left-0 z-9">
          <div class="flex items-center justify-evenly">
            {#each groupHeaders as header, i}
              <div
                class="w-1/5 {i === 0
                  ? 'px-6'
                  : 'px-4'} py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
              >
                <div
                  class="flex cursor-pointer {i === groupHeaders.length - 1
                    ? 'justify-center'
                    : ''}"
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
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if groups.length > 0}
            {#each groups as group}
              <div class="flex justify-evenly duration-100 hover:bg-naro-100">
                <Tooltip
                  class="w-1/5 px-6 py-2 text-[#222222] truncate"
                  content={group.name}
                  checkOverflow
                >
                  {group.name || "N/A"}
                </Tooltip>
                <div></div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {group.totalUnits || 0}
                </div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {group.totalUsers || 0}
                </div>

                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {convertDate(group.created as string) || "N/A"}
                </div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {convertDate(group.updated as string) || "N/A"}
                </div>

                <div class="w-1/5 px-4 py-2 text-[#222222] hover:underline">
                  <a
                    href="/manage/groups/{group.groupId}/?tab=Settings&type=Group&menu=Details"
                    class="text-[#0a84ff] flex gap-1 justify-center"
                  >
                    <i><GearIcon /></i>
                    <span>Manage</span>
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
