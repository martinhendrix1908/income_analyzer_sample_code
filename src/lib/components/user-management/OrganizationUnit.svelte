<script lang="ts">
  import { slide } from "svelte/transition";
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  import AppartmentIcon from "$lib/icons/AppartmentIcon.svelte";
  import type { OrgUnit } from "$lib/types/types";
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import clsx from "clsx";
  import { checkAllChildGroupUnits } from "../../../routes/manage/users/utils";
  import OrganizationUnit from "$lib/components/user-management/OrganizationUnit.svelte"; //self import

  let {
    organizationUnit = $bindable(),
    space = 20,
    depth = 0,
  }: {
    organizationUnit: OrgUnit;
    space?: number;
    depth?: number;
  } = $props();

  let isOpen = $state(false);
  let hoveredRowId = $state<string>("");
  let cursorOnWhitespace = $state(false);

  const toggleHoveredRowId = (rowId: string) => {
    if (!cursorOnWhitespace) {
      hoveredRowId = rowId;
    } else {
      hoveredRowId = "";
    }
  };

  const addHoverClass = (baseClass: string, hoveredUnitId: number) => {
    return clsx(baseClass, {
      "bg-naro-100": hoveredRowId === `row-${hoveredUnitId}`,
    });
  };

  const toggleRowOpen = () => {
    if (
      organizationUnit.orgUnitList &&
      organizationUnit.orgUnitList?.length >= 1
    ) {
      isOpen = !isOpen;
    }
  };
</script>

<div
  class="flex justify-between items-center h-[37px] relative"
  role="none"
  onmousemove={() => toggleHoveredRowId(`row-${organizationUnit.OrgUnitId}`)}
  onmouseleave={() => toggleHoveredRowId("")}
  onfocus={() => {}}
  id={`row-${organizationUnit.OrgUnitId}`}
>
  {#if !isOpen && depth === 0}
    <div class="border-t absolute top-0 left-0 w-full"></div>
  {/if}
  <div class="w-full h-full flex-1 text-naro-600 left-0 sticky z-20">
    <div
      onclick={toggleRowOpen}
      role="none"
      class={addHoverClass(
        `min-w-[400px] text-naro-600 w-full h-full flex-1 text-start bg-white ${depth === 0 ? "border-t" : ""}`,
        organizationUnit.OrgUnitId
      )}
    >
      <div
        class={addHoverClass(
          "flex items-center relative ps-3 gap-4 h-full",
          organizationUnit.OrgUnitId
        )}
      >
        {#each new Array(depth).fill("") as _, i}
          <div class="w-full absolute top-0 border-t z-[1] left-0"></div>
          {#if depth !== 0}
            <div class="w-[21px] h-full flex justify-center z-10 relative">
              {#if i !== 0}
                <div class="h-full border-r border-[#222222]"></div>
                <div
                  role="none"
                  onmouseover={() => {
                    cursorOnWhitespace = true;
                  }}
                  onmouseleave={() => {
                    cursorOnWhitespace = false;
                  }}
                  onfocus={() => {}}
                  class={clsx(
                    "absolute h-full  top-0 bg-white cursor-default",
                    {
                      "w-[59px] -left-[49px]": i == 1,
                      "w-[36px] -left-[26px]": i > 1,
                    }
                  )}
                ></div>
              {/if}
            </div>
          {/if}
        {/each}

        <i
          class={organizationUnit.orgUnitList &&
          organizationUnit.orgUnitList?.length <= 0
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"}
        >
          <ChevronIcon direction={isOpen ? "down" : "right"} />
        </i>
        {#if depth === 0}
          <i><AppartmentIcon fillColor="#0A84FF" /></i>
        {/if}
        <Tooltip
          position="bottom"
          class={clsx(
            "font-medium leading-[21px] text-sm text-nowrap truncate pr-2 w-fit",
            {
              "text-[#0A84FF]": depth === 0,
            }
          )}
          checkOverflow
        >
          {organizationUnit.Name}
        </Tooltip>
        {#if depth === 0}
          <span class="text-[14px] text-[#9C9C9C]"> Organization </span>
        {/if}
      </div>
    </div>
  </div>

  {#each organizationUnit.Roles as role, i}
    <div
      class={addHoverClass(
        "w-full h-full border-t flex items-center flex-1 text-naro-600 min-w-[100px] max-w-[100px]",
        organizationUnit.OrgUnitId
      )}
    >
      <div class="px-4 w-full">
        <Checkbox
          color={depth === 0 ? "#0A84FF" : "#000000"}
          bind:checked={organizationUnit.Roles[i].IsChecked}
          onCheckedChange={() => {
            checkAllChildGroupUnits(
              organizationUnit,
              role.RoleId,
              organizationUnit.Roles[i].IsChecked
            );
          }}
          class={depth === 0 ? "border-[#0A84FF]" : "border-[#000000]"}
        />
      </div>
    </div>
  {/each}
</div>

{#if isOpen}
  {#each organizationUnit?.orgUnitList as orgUnit, i (orgUnit)}
    <OrganizationUnit
      bind:organizationUnit={organizationUnit.orgUnitList[i]}
      space={depth === 0 ? space + 5 : space + 20}
      depth={depth + 1}
    />
  {/each}
{/if}
