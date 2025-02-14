<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import { Priority, Status } from "$lib/constants";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";
  import type { Ticket } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import { convertDate } from "$lib/utils/date-utils";

  let { handleManageClick }: { handleManageClick: (v: Ticket) => void } =
    $props();
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let tickets = $state<Ticket[]>([]);
  let isLoading = $state(false);
  const headers = [
    {
      label: "Ticket ID",
      key: "id",
      columnWidth: "w-1/5",
    },
    {
      label: "Subject",
      key: "subject",
      columnWidth: "w-3/5 text-left",
    },
    {
      label: "Priority",
      key: "priority",
      columnWidth: "w-1/5",
    },
    {
      label: "Status",
      key: "status",
      columnWidth: "w-1/5",
    },
    {
      label: "Created By",
      key: "createdBy",
      columnWidth: "w-2/5",
    },
    {
      label: "Created On",
      key: "created",
      columnWidth: "w-1/5",
    },
    {
      label: "Actions",
      key: "actions",
      columnWidth: "w-1/5",
    },
  ];

  const getTickets = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/organizations/tickets?orgId=${page.params.org_id}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data = await res.json();
      tickets = data as Ticket[];
    } catch (e) {
      console.error("Error while fetching organization admins:", e);
    } finally {
      isLoading = false;
    }
  };
  $effect(() => {
    tickets = deepClone(page?.data?.tickets);
  });
</script>

<div
  class="Zones-table bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[970px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[970px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[970px]">
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 px-3">
          <div class="flex items-center justify-between">
            {#each headers as header (header)}
              <div
                class="px-4 py-2 font-semibold flex text-white whitespace-nowrap text-sm {header.columnWidth}"
              >
                {header.label}
              </div>
            {/each}
          </div>
        </div>

        <div class="divide-y divide-naro-200">
          {#if tickets.length > 0}
            {#each tickets as ticket, index}
              <div
                role="none"
                class="flex justify-between items-center duration-100 hover:bg-naro-100 px-3"
              >
                {#each headers as header (header)}
                  {#if header.key === "actions"}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      <Button
                        variant="blue"
                        isLink
                        onclick={() => handleManageClick(ticket)}
                      >
                        <SettingsIcon fillColor="currentColor" />
                        Manage
                      </Button>
                    </div>
                  {:else if ["created", "updated"].includes(header.key)}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {convertDate(ticket[header.key as "created" | "updated"])}
                    </div>
                  {:else if header.key === "status"}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {Status[
                        ticket[header.key as "status"] as keyof typeof Status
                      ]}
                    </div>
                  {:else if header.key === "priority"}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {Priority[
                        ticket[header.key as "status"] as keyof typeof Priority
                      ]}
                    </div>
                  {:else}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {ticket[header.key as keyof Ticket]}
                    </div>
                  {/if}
                {/each}
              </div>
            {/each}
          {:else}
            <div
              class="flex justify-between items-center duration-100 hover:bg-naro-100 px-3 cursor-move touch-none"
            >
              <div class="px-4 py-2 text-[#222222]">No records found</div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
