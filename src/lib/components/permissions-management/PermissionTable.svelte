<script lang="ts">
  import type { NestedPermission } from "$lib/types/permissions.types";
  import PermissionsRow from "$lib/components/permissions-management/PermissionsRow.svelte";
  import { page } from "$app/state";

  let {
    permissions = $bindable(),
    isLoading,
    handleCheckboxChange,
  }: {
    permissions: NestedPermission[];
    isLoading: boolean;
    handleCheckboxChange: (
      checked: boolean,
      permission: NestedPermission,
      roleId: number,
      isPartiallyChecked?: boolean
    ) => void;
  } = $props();
</script>

<div class="rounded-md overflow-x-auto">
  <table class="text-left border-collapse w-full">
    <thead>
      <tr class="bg-[#222222] text-white leading-loose sticky">
        <th class="px-[60px] py-2 bg-[#222222] md:sticky md:left-0 md:z-20"
          >Actions</th
        >
        {#each page?.data?.roles as role}
          <th class="px-4 py-2 text-center">{role.Name}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if permissions.length > 0}
        {#each permissions as permission, i}
          <!-- Category Row -->
          <PermissionsRow
            bind:permission={permissions[i]}
            bind:isExpanded={permissions[i].isExpanded}
            {handleCheckboxChange}
          />

          <!-- Actions Rows -->
          {#if permission.isExpanded}
            {#each permission.children as action, subIndex}
              <PermissionsRow
                bind:permission={permissions[i].children[subIndex]}
                {handleCheckboxChange}
                claimPosition={subIndex === 0
                  ? "first"
                  : permission.children.length - 1 === subIndex
                    ? "last"
                    : undefined}
              />
            {/each}
          {/if}
        {/each}
      {:else}
        <tr
          class="bg-white border-t border-t-[#a45b5b] group font-medium text-sm text-[#262626] capitalize hover:bg-[#EDEDED]"
        >
          <td>No records found</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
