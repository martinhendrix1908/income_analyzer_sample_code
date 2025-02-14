<script lang="ts">
  import { page } from "$app/state";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type { UserData } from "$lib/types/types";
  import { convertDate } from "$lib/utils/date-utils";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  interface UserTableProps {
    sortOrder: "asc" | "desc";
    sortBy: string;
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    fromManagementScreen?: boolean;
    searchValue?: string;
  }

  let {
    sortOrder = $bindable(),
    sortBy = $bindable(),
    currentPage = $bindable(),
    pageSize = $bindable(),
    totalRecords = $bindable(),
    searchValue = $bindable(),
    fromManagementScreen = false,
  }: UserTableProps = $props();

  let users: UserData[] = $state([]);
  let isLoading = $state(true);
  const onSortButtonClick = (sortByName: string) => {
    sortBy = sortByName;
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
  };

  $effect(() => {
    getUsers();
  });

  const getUsers = async () => {
    try {
      isLoading = true;

      let res = await fetch(
        `/api/users?pageNo=${currentPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&orgUnitId=${page.params.id || "0"}&filters=${searchValue}`
      );

      let data = await res.json();
      users = data.users;
      totalRecords = data.totalRecords || 0;
    } catch (e) {
      console.log("error while fetching users", e);
    } finally {
      isLoading = false;
    }
  };
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
        : 'min-w-[1023px]'} overflow-x-hidden"
    >
      <div
        class="w-full text-sm leading-relaxed {fromManagementScreen
          ? 'min-w-[970px]'
          : 'min-w-[1023px]'}"
      >
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-[2]">
          <div
            class="flex items-center justify-between border-s-4 border-s-[#222222]"
          >
            <div
              class="{fromManagementScreen
                ? 'w-[200px]'
                : 'w-[218px]'} px-4 py-3.5 text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer justify-center">
                <button
                  class="flex items-center {fromManagementScreen ? 'ps-4' : ''}"
                  onclick={() => onSortButtonClick("firstname")}
                >
                  Full Name <SortButton
                    sortApplied={sortBy === "firstname"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
            <div
              class="{fromManagementScreen
                ? 'w-[200px]'
                : 'w-[218px]'} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button
                  class="flex items-center"
                  onclick={() => onSortButtonClick("emailId")}
                >
                  User Email
                  <SortButton sortApplied={sortBy === "emailId"} {sortOrder} />
                </button>
              </div>
            </div>
            <div
              class="{fromManagementScreen
                ? 'w-[80px]'
                : 'w-[88px]'} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
            >
              <button
                class="flex items-center"
                onclick={() => onSortButtonClick("isActive")}
              >
                Status<SortButton
                  sortApplied={sortBy === "isActive"}
                  {sortOrder}
                />
              </button>
            </div>
            <div
              class="{fromManagementScreen
                ? 'w-[100px]'
                : 'w-[140px]'} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
            >
              <button
                class="flex items-center"
                onclick={() => onSortButtonClick("created")}
              >
                Date Joined<SortButton
                  sortApplied={sortBy === "created"}
                  {sortOrder}
                />
              </button>
            </div>
            <div
              class="{fromManagementScreen
                ? 'w-[100px]'
                : 'w-[140px]'} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button
                  class="flex items-center"
                  onclick={() => onSortButtonClick("lastActivityDate")}
                >
                  Last Active
                  <SortButton
                    sortApplied={sortBy === "lastActivityDate"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
            <div
              class="{fromManagementScreen
                ? 'w-[120px]'
                : 'w-[140px]'} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button
                  class="flex items-center"
                  onclick={() => onSortButtonClick("roleNames")}
                >
                  User Role
                  <SortButton
                    sortApplied={sortBy === "roleNames"}
                    {sortOrder}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if users?.length > 0}
            {#each users as user}
              <div
                class="flex justify-between duration-100 hover:bg-naro-100 items-center !border-t-0 border-s-4 !border-white hover:!border-[#98c43d]"
              >
                <div
                  class="{fromManagementScreen
                    ? 'w-[200px]'
                    : 'w-[218px]'} px-4 py-2 text-[#222222] flex items-center gap-4"
                >
                  <img
                    src={"data:image/png;base64," + user.imageData}
                    class="w-8 h-8 rounded-md flex-shrink-0"
                    alt="user-avatar"
                    onerror={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/user-profile.jfif";
                    }}
                  />
                  <Tooltip
                    content={user.firstname + " " + user.lastname}
                    position="bottom"
                    class="w-full font-semibold text-nowrap truncate"
                    checkOverflow
                  >
                    <a
                      href="/manage/users/{user.userId}"
                      class="hover:text-[#0a84ff] hover:underline transition-all duration-200"
                    >
                      {user.firstname || user.lastname
                        ? user.firstname + " " + user.lastname
                        : "N/A"}
                    </a>
                  </Tooltip>
                </div>

                <div
                  class="{fromManagementScreen
                    ? 'w-[200px]'
                    : 'w-[218px]'} px-4 py-2 text-[#222222]"
                >
                  <Tooltip
                    content={user.emailId}
                    position="bottom"
                    class="w-full block truncate"
                    checkOverflow
                  >
                    {user.emailId || "N/A"}
                  </Tooltip>
                </div>
                <div
                  class="{fromManagementScreen
                    ? 'w-[80px]'
                    : 'w-[88px]'} px-4 py-2 text-[#222222] flex items-center justify-center"
                >
                  {#if user.isActive}
                    <div
                      class="py-2 text-[#2C9F45] bg-[#98C43D1A] min-w-[72px] text-center leading-none rounded-[4px]"
                    >
                      Active
                    </div>
                  {:else}
                    <div
                      class="py-2 text-[#444444] bg-[#EEEEEE] min-w-[72px] text-center leading-none rounded-[4px]"
                    >
                      Inactive
                    </div>
                  {/if}
                </div>

                <div
                  class="{fromManagementScreen
                    ? 'w-[100px]'
                    : 'w-[140px]'} px-4 py-2 text-[#222222]"
                >
                  {convertDate(user.lastActivityDate as string) || "N/A"}
                </div>
                <div
                  class="{fromManagementScreen
                    ? 'w-[100px]'
                    : 'w-[140px]'} px-4 py-2 text-[#222222]"
                >
                  {convertDate(user.lastActivityDate as string) || "N/A"}
                </div>
                <div
                  class="{fromManagementScreen
                    ? 'w-[120px]'
                    : 'w-[140px]'} px-4 py-2 text-[#222222]"
                >
                  <Tooltip
                    content={user.roleNames}
                    position="bottom"
                    class="w-full block truncate"
                    checkOverflow
                  >
                    {user.roleNames || "N/A"}
                  </Tooltip>
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
<!-- <Pagination
  bind:totalRecords
  bind:currentPage
  bind:pageSize
  disabled={isLoading}
/> -->
