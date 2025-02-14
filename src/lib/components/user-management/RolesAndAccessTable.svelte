<script lang="ts">
  import type { UserData } from "$lib/types/types";
  import { onMount } from "svelte";
  import OrganizationUnit from "$lib/components/user-management/OrganizationUnit.svelte";
  import { transformOrgUnits } from "../../../routes/manage/users/utils";

  let { user = $bindable() }: { user: UserData } = $props();

  onMount(() => {
    user = { ...user, orgUnitList: transformOrgUnits(user.orgUnitList) };
  });
</script>

<div
  class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap-1 lg:gap-0 lg:mt-12 mt-8"
>
  <div class="pr-2 md:border-r-4 border-parrot order-1">
    <h3 class="text-black font-medium opacity-85">Roles & Access</h3>
  </div>
</div>

<div class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md">
  <div class="relative overflow-x-auto rounded-md">
    <div class="min-w-max">
      <div class="text-sm leading-relaxed">
        <!-- Table Header -->
        <div class="sticky top-0 left-0 z-10">
          <div class="flex bg-naro-600 items-center">
            <!-- Sticky Units Column -->
            <div class="sticky left-0 z-10 bg-naro-600">
              <div
                class="w-[400px] px-4 py-3.5 text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer ps-[70px]">Units</div>
              </div>
            </div>

            <!-- Scrollable Role Columns -->
            {#each user.roleList as role}
              <div
                class="min-w-[100px] max-w-[100px] px-4 py-3.5 text-left text-white text-sm bg-naro-600"
              >
                <div class="flex cursor-pointer">{role.Name}</div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Table Body -->
        {#if user.orgUnitList.length > 0}
          <div class="relative">
            <div class="min-w-max">
              {#each user.orgUnitList as organization, i}
                <OrganizationUnit
                  bind:organizationUnit={user.orgUnitList[i]}
                  space={0}
                  depth={0}
                />
              {/each}
            </div>
          </div>
        {:else}
          <div class="divide-y divide-naro-200 p-2 flex justify-center">
            No records found
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
