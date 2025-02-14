<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import ConfirmationPopup from "$lib/components/building-blocks/ConfirmationPopup.svelte";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";
  import type { ThirdPartyIntegration } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import { convertDate } from "$lib/utils/date-utils";

  let {
    handleManageClick,
  }: { handleManageClick: (v: ThirdPartyIntegration) => void } = $props();
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let thirdPartyData = $state<ThirdPartyIntegration[]>([]);
  let isLoading = $state(false);
  let isOpen = $state(false);
  let deleteItem = $state<ThirdPartyIntegration | null>(null);
  const headers = [
    {
      label: "Name",
      key: "name",
      columnWidth: "w-3/5",
    },
    {
      label: "Status",
      key: "isActive",
      columnWidth: "w-1/5",
    },
    {
      label: "Integration Type",
      key: "type",
      columnWidth: "w-2/5",
    },
    {
      label: "API",
      key: "api",
      columnWidth: "w-2/5",
    },

    {
      label: "Actions",
      key: "actions",
      columnWidth: "w-2/5",
    },
  ];

  const handleDelete = (item: ThirdPartyIntegration | null) => {
    let copy = [...thirdPartyData].filter((item) => item.id !== deleteItem?.id);
    thirdPartyData = copy;
  };

  const getThirdPartyData = async () => {
    try {
      isLoading = true;
      const res = await fetch(
        `/api/manage/organizations/third-party-integrations?orgId=${page.params.org_id}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      const data = await res.json();
      thirdPartyData = data as ThirdPartyIntegration[];
    } catch (e) {
      console.error("Error while fetching organization admins:", e);
    } finally {
      isLoading = false;
    }
  };
  $effect(() => {
    thirdPartyData = deepClone(page?.data?.thirdPartyData);
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
          {#if thirdPartyData.length > 0}
            {#each thirdPartyData as item, index}
              <div
                class="flex justify-between items-center duration-100 hover:bg-naro-100 px-3"
              >
                {#each headers as header (header)}
                  {#if header.key === "actions"}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      <div class="flex items-center gap-2">
                        <Button
                          variant="blue"
                          isLink
                          onclick={() => handleManageClick(item)}
                        >
                          <SettingsIcon fillColor="currentColor" />
                          Manage
                        </Button>
                        <Button
                          variant="red"
                          isLink
                          onclick={() => {
                            isOpen = true;
                            deleteItem = item;
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  {:else if ["created", "updated"].includes(header.key)}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {convertDate(item[header.key as "created" | "updated"])}
                    </div>
                  {:else if header.key === "isActive"}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      <div class="flex items-center">
                        <CustomSwitch
                          title="Active-{index}-{item.id}"
                          bind:toggle={item.isActive}
                          isTextVisible={false}
                          handleSwitch={(value) => {
                            let copy = [...thirdPartyData];
                            copy[index].isActive = value;
                            thirdPartyData = copy;
                          }}
                        />
                      </div>
                    </div>
                  {:else}
                    <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                      {item[header.key as keyof ThirdPartyIntegration]}
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

<ConfirmationPopup
  bind:isOpen
  confirmationMessage="Are you sure you want to delete this third party integration?"
  onClose={() => {
    deleteItem = null;
  }}
  onConfirm={() => handleDelete(deleteItem)}
/>
