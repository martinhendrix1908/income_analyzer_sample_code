<script lang="ts">
  import { page } from "$app/state";
  import type { IOrganizationGroup } from "$lib/types/types";
  import NestedGroupRows from "$lib/components/organization-management/NestedGroupRows.svelte";
  import clsx from "clsx";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";

  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  const groupHeaders = [
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
  let isLoading = $state(false);
  const getMaxDepth = (groups: any[]): number => {
    if (!groups.length) return 0;
    let maxDepth = 0;

    function traverse(group: any, currentDepth: number) {
      maxDepth = Math.max(maxDepth, currentDepth);

      if (group.groups && group.groups.length > 0) {
        group.groups.forEach((subGroup: any) => {
          traverse(subGroup, currentDepth + 1);
        });
      }
    }

    groups?.forEach((group) => traverse(group, 0));

    return maxDepth;
  };

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
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md w-full overflow-hidden min-w-[1023px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[1023px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1023px]">
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-9">
          <div class="grid grid-cols-7">
            <div
              class={clsx(
                "col-span-2 py-3.5 text-left text-white whitespace-nowrap text-sm grid grid-flow-row",
                {
                  "grid-cols-3": getMaxDepth(groups) <= 3,
                  "grid-cols-2": getMaxDepth(groups) > 3,
                },
              )}
            >
              <div></div>
              <div
                class={clsx("flex cursor-pointer", {
                  "col-span-2": getMaxDepth(groups) <= 3,
                  "col-span-1": getMaxDepth(groups) > 3,
                })}
              >
                <button class="flex" onclick={() => onSortButtonClick("name")}>
                  Group Name <SortButton
                    sortApplied={sortBy === "name"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
            {#each groupHeaders as header, i}
              <div
                class="px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
              >
                <div
                  class="flex cursor-pointer {header.key === 'action'
                    ? 'justify-center'
                    : ''}"
                >
                  <button
                    class="flex"
                    onclick={() =>
                      header.key !== "action" && onSortButtonClick(header.key)}
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
              <NestedGroupRows
                {group}
                space={24}
                depth={0}
                maxDepth={getMaxDepth(groups)}
              />
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
