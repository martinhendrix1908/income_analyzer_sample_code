<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import PermissionTable from "$lib/components/permissions-management/PermissionTable.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type {
    NestedPermission,
    Permission,
  } from "$lib/types/permissions.types";
  import { areObjectsEqual, deepClone } from "$lib/utils/common-utils";
  import {
    transformToNestedPermissions,
    restoreNestedPermissions,
  } from "$lib/utils/permission-utils";
  import { onMount } from "svelte";
  let permissions = $state<NestedPermission[]>([]);
  let isLoading = $state(false);

  let restoredData = $derived.by(() => {
    const restored = restoreNestedPermissions(
      JSON.parse(JSON.stringify(permissions))
    );
    return restored;
  });

  onMount(() => {
    goto("?tab=General");
  });

  $effect(() => {
    let transformedData = transformToNestedPermissions(
      page.data.permissions as Permission[]
    );
    permissions = deepClone(transformedData);
  });
  const handleCheckboxChange = (
    checked: boolean,
    permission: NestedPermission,
    roleIndex: number,
    isPartiallyChecked?: boolean
  ) => {
    // Update the current permission checkbox
    if (isPartiallyChecked) {
      permission.roles[roleIndex].IsChecked = true;
      permission.children.forEach((child: NestedPermission) => {
        child.roles[roleIndex].IsChecked = true;
      });
      return;
    }
    permission.roles[roleIndex].IsChecked = checked;

    // Update all child permissions to match the parent checkbox state
    if (permission.children.length > 0) {
      const toggleChildren = (perm: NestedPermission, state: boolean) => {
        perm.roles[roleIndex].IsChecked = state;
        perm.children.forEach((child) => toggleChildren(child, state));
      };
      toggleChildren(permission, checked);
    }

    // Update the parent checkbox state
    const updateParentState = (perm: NestedPermission) => {
      if (perm.parentId !== null) {
        let parentPermission = permissions.find(
          (item) => item.claimId === perm.parentId
        );

        if (parentPermission) {
          const allChecked = parentPermission.children.every(
            (child) => child.roles[roleIndex].IsChecked
          );

          parentPermission.roles[roleIndex].IsChecked = allChecked;

          // Recursively update parent permissions
          updateParentState(parentPermission);
        }
      }
    };

    updateParentState(permission);
  };
</script>

<div>
  <div
    class="flex lg:flex-row flex-col justify-between lg:items-center gap-5 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Global Permissions
        </h3>
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-2 md:gap-4">
      <form
        action="?/setGlobalPermissions"
        use:enhance={async (submitEvent) => {
          isLoading = true;
          submitEvent.formData.set("permissions", JSON.stringify(restoredData));
          return async ({ result }) => {
            isLoading = false;
            if (result.type !== "success" || !result.data?.succeeded) {
              addToast({
                type: "error",
                message: "Unable to update permissions",
              });

              return;
            }
            addToast({
              type: "success",
              message: "Permissions updated successfully",
            });
          };
        }}
        method="post"
      >
        <Button
          disabled={areObjectsEqual(
            page.data.permissions,
            restoredData.toSorted((a, b) => a.claimId - b.claimId)
          ) || isLoading}
          type="submit"
          variant="primary"
          class="px-6">Save Changes</Button
        >
      </form>
    </div>
  </div>
  <div class="flex flex-col gap-8">
    <PermissionTable
      bind:permissions
      isLoading={false}
      {handleCheckboxChange}
    />
  </div>
</div>
