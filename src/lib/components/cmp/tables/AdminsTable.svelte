<script lang="ts">
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type {
    IAdminDetails,
    TableHeaderProps,
  } from "$lib/types/organizations.types";
  import { convertDate } from "$lib/utils/date-utils";
  import { formatPhoneNumberAsYouType } from "../../../../routes/create-request/utils";
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";

  let {
    id,
    onManageClick,
  }: { id?: number; onManageClick?: (admin: IAdminDetails) => void } = $props();
  let sortOrder = $state<"asc" | "desc">("asc");
  let sortBy = $state("firstname");

  const tableHeaders: TableHeaderProps[] = [
    {
      key: "fullName",
      label: "Full Name",
      width: "w-[200px]",
      sortable: true,
    },
    {
      key: "emailId",
      label: "Email",
      width: "w-[250px]",
      sortable: true,
    },
    {
      key: "mobile",
      label: "Phone Number",
      width: "w-[150px]",
      sortable: true,
    },
    {
      key: "isActive",
      label: "Status",
      width: "w-[200px]",
      sortable: true,
    },
    {
      key: "createdBy",
      label: "Created By",
      width: "w-[200px]",
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "Updated Date",
      width: "w-[150px]",
      sortable: true,
    },
    {
      key: "action",
      label: "Action",
      width: "w-[150px]",
      sortable: false,
    },
  ];

  let admins: IAdminDetails[] = $state([]);
  let isLoading = $state(true);

  const onSortButtonClick = (sortByName: string) => {
    if (sortByName === "fullName") {
      sortBy = "firstname"; // Sort by firstname when fullName is clicked
    } else {
      sortBy = sortByName;
    }
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    getAdmins();
  };

  $effect(() => {
    getAdmins();
  });

  const getAdmins = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/organization-admins?id=${id || ""}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();

      admins = data as IAdminDetails[];
    } catch (e) {
      console.error("Error while fetching organization admins:", e);
    } finally {
      isLoading = false;
    }
  };

  const getFullName = (firstname: string, lastname: string): string => {
    return `${firstname || ""} ${lastname || ""}`.trim() || "N/A";
  };

  const handleManageClick = (admin: IAdminDetails) => {
    onManageClick?.(admin);
  };
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div class="bg-white w-full overflow-hidden min-w-[1000px]">
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[1000px] overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1000px]">
        <!-- Table Header -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-[2]">
          <div
            class="flex items-center justify-between border-s-4 border-s-[#222222]"
          >
            {#each tableHeaders as header}
              <div
                class="{header.width} px-4 py-3.5 text-left text-white whitespace-nowrap text-sm"
              >
                {#if header.sortable}
                  <button
                    class="flex items-center"
                    onclick={() => onSortButtonClick(header.key)}
                  >
                    {header.label}
                    <SortButton
                      sortApplied={sortBy ===
                        (header.key === "fullName" ? "firstname" : header.key)}
                      {sortOrder}
                    />
                  </button>
                {:else}
                  {header.label}
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Table Body -->
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if admins?.length > 0}
            {#each admins as admin}
              <div
                class="flex justify-between duration-100 hover:bg-naro-100 items-center border-s-4 !border-s-white hover:!border-s-[#98c43d]"
              >
                {#each tableHeaders as header}
                  {#if header.key === "action"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      <button
                        class="text-[#0a84ff] hover:underline transition-all duration-200 flex items-center gap-1"
                        onclick={() => handleManageClick(admin)}
                      >
                        <i><GearIcon /></i>
                        <span>Manage</span>
                      </button>
                    </div>
                  {:else if header.key === "isActive"}
                    <div
                      class="{header.width} px-4 py-2 text-[#222222] flex items-center"
                    >
                      {#if admin.isActive}
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
                  {:else if header.key === "fullName"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      <Tooltip
                        content={getFullName(admin.firstname, admin.lastname)}
                        position="bottom"
                        class="w-full block truncate"
                        checkOverflow
                      >
                        {getFullName(admin.firstname, admin.lastname)}
                      </Tooltip>
                    </div>
                  {:else if header.key === "mobile"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      {formatPhoneNumberAsYouType(admin.mobile)}
                    </div>
                  {:else if header.key === "created" || header.key === "updated"}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      {convertDate(admin[header.key] || "") || "N/A"}
                    </div>
                  {:else}
                    <div class="{header.width} px-4 py-2 text-[#222222]">
                      <Tooltip
                        content={admin[
                          header.key as keyof IAdminDetails
                        ] as string}
                        position="bottom"
                        class="w-full block truncate"
                        checkOverflow
                      >
                        {admin[header.key as keyof IAdminDetails] || "N/A"}
                      </Tooltip>
                    </div>
                  {/if}
                {/each}
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
