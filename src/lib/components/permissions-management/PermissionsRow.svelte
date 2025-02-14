<script lang="ts">
  import ChevronForward from "$lib/icons/ChevronForward.svelte";
  import Checkbox from "$lib/components/building-blocks/Checkbox.svelte";
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import type { NestedPermission } from "$lib/types/permissions.types";

  let {
    permission = $bindable(),
    isExpanded = $bindable(),
    handleCheckboxChange,
    claimPosition,
  }: {
    permission: any;
    isExpanded?: boolean;
    handleCheckboxChange: (
      checked: boolean,
      permission: NestedPermission,
      roleIndex: number,
      isPartiallyChecked?: boolean
    ) => void;
    claimPosition?: "first" | "last";
  } = $props();
  let isPartiallyChecked = (
    permission: NestedPermission,
    roleIndex: number
  ) => {
    let rolePermission: any[] = [];
    permission.children.forEach((child) => {
      rolePermission.push(child.roles[roleIndex]);
    });

    return (
      rolePermission.some((item) => item.IsChecked) &&
      !rolePermission.every((item) => item.IsChecked)
    );
  };
</script>

<tr
  class="bg-white border-t border-t-[#BFBFBF] group font-medium text-sm text-[#262626] capitalize hover:bg-[#EDEDED]"
>
  <td
    class="relative bg-white md:sticky group-hover:bg-[#EDEDED] left-0 z-20 min-w-[300px] w-[400px] px-[60px] py-2 flex items-center"
  >
    <span
      role="none"
      class="absolute left-[26px] {permission.isParent ? '' : 'hidden'}"
      onclick={() =>
        permission?.children?.length > 0 ? (isExpanded = !isExpanded) : null}
    >
      <i
        class={permission?.children?.length > 0
          ? "cursor-pointer"
          : "cursor-not-allowed opacity-50"}
      >
        {#if isExpanded}
          <ChevronIcon direction="down" />
        {:else}
          <ChevronForward />
        {/if}
      </i>
    </span>
    {#if !permission.isParent}
      <div
        class="absolute h-[38.8px] w-[37.5px] left-0 border-r-2 border-r-[#262626] !z-10 bg-white {claimPosition ===
        'last'
          ? 'border-b border-b-[#BFBFBF]'
          : claimPosition === 'first'
            ? 'border-t border-t-white'
            : ''}"
      ></div>
    {/if}

    <span class="whitespace-nowrap">{permission.claimName}</span>
  </td>

  {#each permission.roles as _, index}
    <td class="px-4 py-2 text-center flex-1 min-w-[150px]">
      <Checkbox
        color="#000000"
        bind:checked={permission.roles[index].IsChecked}
        onCheckedChange={(checked) => {
          handleCheckboxChange(
            checked as boolean,
            permission,
            index,
            isPartiallyChecked(permission, index)
          );
        }}
        indeterminate={isPartiallyChecked(permission, index)}
      />
    </td>
  {/each}
</tr>
