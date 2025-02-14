<script lang="ts">
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import ThreeDotIcon from "$lib/icons/ThreeDotIcon.svelte";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import { page } from "$app/state";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { convertDate } from "$lib/utils/date-utils";
  interface IUserRole {
    roleId: string;
    name: string;
    usersCount: number;
    updated: string;
  }
  let {
    sortBy = $bindable(),
    sortOrder = $bindable(),
    searchValue,
    currentRole = $bindable(),
    isOpen = $bindable(),
    isRoleChanged = $bindable(),
  }: {
    sortBy: string;
    sortOrder: "asc" | "desc";
    searchValue?: string;
    currentRole?: Partial<IUserRole>;
    isOpen?: boolean;
    isRoleChanged?: boolean;
  } = $props();

  const onSortButtonClick = (sortByName: string) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  let roles = $state<IUserRole[]>([]);
  let isLoading = $state(true);

  const getRoles = async () => {
    try {
      isLoading = true;
      const req = await fetch("/api/users/get-roles", {
        method: "POST",
        body: JSON.stringify({
          authToken: page?.data?.user?.authToken,
          ouType: "Unit",
          orgId: 1,
          sortBy: sortBy === "created" ? "" : sortBy,
          sortOrder,
          searchValue,
        }),
      });
      const res: IUserRole[] = await req.json();
      roles = res;
    } catch (e) {
      console.log(`Something went wrong -- ${e}`);
    } finally {
      isLoading = false;
    }
  };

  $effect(() => {
    getRoles();
  });
  $effect(() => {
    if (currentRole?.roleId !== "") {
      isRoleChanged =
        currentRole?.name?.trim() !==
        roles.find((item) => item.roleId === currentRole?.roleId)?.name;
    }
  });
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[1023px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[1023px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1023px]">
        <!-- Table Header  -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0">
          <div class="flex items-center justify-evenly">
            <div
              class="w-1/5 px-6 py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button class="flex" onclick={() => onSortButtonClick("name")}>
                  Role Name<SortButton
                    sortApplied={sortBy === "name"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
            <div
              class="w-1/5 px-4 py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button
                  class="flex items-center"
                  onclick={() => onSortButtonClick("usersCount")}
                >
                  Users
                  <SortButton
                    sortApplied={sortBy === "usersCount"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
            <div
              class="w-1/5 px-4 py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <button
                class="flex items-center"
                onclick={() => onSortButtonClick("updated")}
              >
                Last Updated
                <SortButton sortApplied={sortBy === "updated"} {sortOrder} />
              </button>
            </div>

            <div
              class="w-1/5 px-4 py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer justify-center">Actions</div>
            </div>
            <div
              class="w-fit px-4 py-3 font-semibold text-right text-white whitespace-nowrap text-sm hidden"
            >
              <i><ThreeDotIcon /></i>
            </div>
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
          {:else if roles.length > 0}
            {#each roles as role}
              <div
                class="flex justify-evenly items-center duration-100 hover:bg-naro-100"
              >
                <div class="w-1/5 px-6 py-2 text-[#222222]">
                  {role.name}
                </div>
                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {role.usersCount}
                </div>

                <div class="w-1/5 px-4 py-2 text-[#222222]">
                  {convertDate(role.updated) || "N/A"}
                </div>

                <div class="w-1/5 px-4 py-2 text-[#222222] hover:underline">
                  <a
                    href="#!"
                    onclick={() => {
                      currentRole = {
                        name: role.name,
                        roleId: role.roleId,
                      };
                      isOpen = true;
                    }}
                    class="text-[#0a84ff] flex gap-1 justify-center"
                  >
                    <i><GearIcon /></i>
                    Manage
                  </a>
                </div>
                <div class="w-fit px-4 py-2 text-[#222222] hidden">
                  <a href={null} class="text-[#0a84ff] flex gap-1">
                    <i><ThreeDotIcon /></i>
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
