<script lang="ts">
  import { slide } from "svelte/transition";
  import ChevronForward from "$lib/icons/ChevronForward.svelte";
  import { onMount } from "svelte";
  import clsx from "clsx";
  import ThreeDotIcon from "$lib/icons/ThreeDotIcon.svelte";
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import type { IOrganizationGroup } from "$lib/types/types";
  import { convertDate } from "$lib/utils/date-utils";
  import NestedGroupRows from "$lib/components/organization-management/NestedGroupRows.svelte";

  let {
    group = $bindable(),
    space = 16,
    class: customClass,
    depth = 0,
    maxDepth = 1,
  }: {
    group: IOrganizationGroup;
    space?: number;
    class?: string;
    depth?: number;
    maxDepth?: number;
  } = $props();

  let isOpen = $state(false);
  let row = $state<HTMLDivElement>();
  let hoveredRowId = $state<string>();

  onMount(() => {
    if (row) {
      row.onmouseenter = () => {
        hoveredRowId = (row as HTMLDivElement).id;
      };
      row.onmouseleave = () => {
        hoveredRowId = "";
      };
    }
  });
</script>

<div class="w-full">
  <div class="grid grid-cols-7" bind:this={row} id={"row" + group.groupId}>
    <button
      onclick={() => {
        if (group.groupList.length >= 1) {
          isOpen = !isOpen;
        }
      }}
      type="button"
      class="col-span-2 text-naro-600"
    >
      <div
        class={clsx("h-full w-full grid  ", {
          "bg-naro-100": hoveredRowId === "row" + group.groupId && depth === 0,
          "grid-cols-3": maxDepth <= 3,
          "grid-cols-2": maxDepth > 3,
        })}
      >
        <div class="w-full border-t relative" style="margin-left: {space}px ;">
          <div
            class={clsx(
              "cursor-pointer h-full flex items-center ps-3 ",
              {
                "bg-naro-100": hoveredRowId === "row" + group.groupId,
              },
              customClass
            )}
          >
            {#if group.groupList.length >= 1}
              <i><ChevronForward /></i>
            {/if}
          </div>
          {#if isOpen}
            <div transition:slide>
              {#each new Array(depth).fill("") as _, i}
                <div
                  class="absolute border-s-2 border-s-[#222222] h-[calc(100%+2px)] top-[calc(100%-2px]"
                  style="left:-{i * 20}px;"
                ></div>
              {/each}
            </div>
          {/if}
        </div>
        <span
          class={clsx(
            "text-[#222222] font-medium text-start h-full flex items-center border-t relative",
            {
              "bg-naro-100": hoveredRowId === "row" + group.groupId,
              "col-span-2": maxDepth <= 3,
              "col-span-1": maxDepth > 3,
            }
          )}
        >
          {group.name}
        </span>
      </div>
    </button>

    <div
      class="w-full px-4 py-2 text-naro-600 border-t {hoveredRowId ===
        'row' + group.groupId && 'bg-naro-100'}"
    >
      {group?.totalUnits}
    </div>
    <div
      class="w-full px-4 py-2 text-naro-600 border-t {hoveredRowId ===
        'row' + group.groupId && 'bg-naro-100'}"
    >
      {group?.totalUsers}
    </div>
    <div
      class="w-full px-4 py-2 text-naro-600 border-t {hoveredRowId ===
        'row' + group.groupId && 'bg-naro-100'}"
    >
      {convertDate(group.created) || "N/A"}
    </div>
    <div
      class="w-full px-4 py-2 text-naro-600 border-t {hoveredRowId ===
        'row' + group.groupId && 'bg-naro-100'}"
    >
      {convertDate(group.updated) || "N/A"}
    </div>
    <div
      class="w-full flex justify-center px-4 py-2 text-naro-600 border-t hover:underline {hoveredRowId ===
        'row' + group.groupId && 'bg-naro-100'}"
    >
      <a
        href="/manage/groups/{group.groupId}/?type=Group&tab=Settings&menu=Details"
        class="text-[#0a84ff] flex gap-1 font-medium"
      >
        <i><GearIcon /></i>
        Manage
      </a>
      <button class="hidden">
        <ThreeDotIcon />
      </button>
    </div>
  </div>

  {#if isOpen}
    <div transition:slide>
      {#each group.groupList as innerGroup, i}
        <NestedGroupRows
          bind:group={group.groupList[i]}
          space={space + 20}
          class="border-l-2 border-l-[#222222]"
          depth={depth + 1}
          {maxDepth}
        />
      {/each}
    </div>
  {/if}
</div>
