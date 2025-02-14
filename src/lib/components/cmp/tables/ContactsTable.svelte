<script lang="ts">
  import SortButton from "$lib/components/building-blocks/SortButton.svelte";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { page } from "$app/state";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import ConfirmationPopup from "$lib/components/building-blocks/ConfirmationPopup.svelte";
  import type { Contacts } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import { addToast } from "$lib/store/toast-store";

  let { type }: { type: "admin" | "client" } = $props();

  let sortBy = $state("name");
  let sortOrder = $state<"asc" | "desc">("desc");
  let isOpen = $state(false);
  let confirmationType = $state<"remove" | "set-primary">("remove");
  let confirmationIndex = $state<number | null>(null);
  let contacts = $state<Contacts[]>([]);
  let isLoading = $state(true);

  let confirmationMessage = $state(
    "Are you sure you want perform this action?"
  );

  const onSortButtonClick = (sortByName: string) => {
    if (sortBy === sortByName) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortBy = sortByName;
      sortOrder = "asc";
    }
  };

  const getContacts = async () => {
    try {
      isLoading = true;
      const response = await fetch(
        `/api/manage/organizations/contacts?usersType=support&orgId=${page.params.org_id}&type=${type}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      contacts = await response.json();
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      isLoading = false;
    }
  };

  const removeContact = async (contactId: string) => {
    try {
      const response = await fetch(
        `/api/manage/organizations/contacts?userId=${contactId}&organizationId=${page.params.org_id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      addToast({
        message: responseData.succeeded
          ? "Primary contact set successfully."
          : responseData.message || "Failed to set primary contact.",
        type: responseData.succeeded ? "success" : "error",
      });

      if (responseData.succeeded) {
        contacts = contacts.filter((contact) => contact.userId !== contactId);
        confirmationIndex = null;
      }
    } catch (error) {
      console.error("Failed to remove contact:", error);
    }
  };

  const setPrimaryContact = async (contactId: string) => {
    try {
      const response = await fetch(`/api/manage/organizations/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizationId: page.params.org_id,
          userId: contactId,
          isPrimary: true,
          type,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      addToast({
        message: responseData.succeeded
          ? "Primary contact set successfully."
          : responseData.message || "Failed to set primary contact.",
        type: responseData.succeeded ? "success" : "error",
      });

      if (responseData.succeeded) {
        await getContacts();
        confirmationIndex = null;
      }
    } catch (error) {
      console.error("Failed to set primary contact:", error);
    }
  };

  const handleConfirmation = async () => {
    if (confirmationIndex === null || confirmationIndex < 0) return;

    const contact = contacts[confirmationIndex];

    if (confirmationType === "remove") {
      await removeContact(contact.userId);
    } else {
      await setPrimaryContact(contact.userId);
    }
  };

  const columns = [
    {
      name: "Name",
      sortable: false,
      key: "name",
      customWidth: "min-w-[150px] max-w-[150px]",
    },
    {
      name: "Type",
      sortable: false,
      key: "type",
      customWidth: "min-w-[120px] max-w-[120px]",
    },
    {
      name: "Primary",
      sortable: false,
      key: "isPrimary",
      customWidth: "min-w-[100px] max-w-[100px]",
    },
    {
      name: "Email ID",
      sortable: false,
      key: "emailId",
      customWidth: "min-w-[200px] max-w-[200px]",
    },
    {
      name: "Phone Number",
      sortable: false,
      key: "phone",
      customWidth: "min-w-[150px] max-w-[150px]",
    },
    {
      name: "Actions",
      sortable: false,
      key: "actions",
      customWidth: "min-w-[150px] max-w-[150px]",
    },
  ];

  $effect(() => {
    getContacts();
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
        <div class="bg-naro-600 leading-loose sticky top-0 left-0">
          <div class="flex items-center justify-evenly">
            {#each columns as column}
              <div
                class="{column.customWidth} px-4 py-3 font-semibold text-right text-white whitespace-nowrap text-sm"
              >
                <div class="flex cursor-pointer">
                  {#if column.sortable}
                    <button
                      class="flex items-center gap-2"
                      onclick={() => onSortButtonClick(column.key)}
                    >
                      {column.name}
                      <SortButton
                        sortApplied={sortBy === column.key}
                        {sortOrder}
                      />
                    </button>
                  {:else}
                    {column.name}
                  {/if}
                </div>
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
          {:else if contacts.length > 0}
            {#each contacts as contact, index}
              <div
                class="flex justify-evenly items-center duration-100 hoverbg-[#EEEEEE]"
              >
                {#each columns as column}
                  {#if column.key === "actions"}
                    <div class="{column.customWidth} px-6 py-2 cursor-pointer">
                      <button
                        type="button"
                        class="p-0 text-[#BE0027] outline-none border-none hover:bg-transparent disabled:opacity-50 disabled:bg-transparent"
                        disabled={contact.isPrimary ||
                          (type === "admin" && page?.data?.user?.orgId !== "0")}
                        onclick={() => {
                          isOpen = true;
                          confirmationType = "remove";
                          confirmationIndex = index;
                          confirmationMessage = `Are you sure you want to remove ${contact.name}?`;
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  {:else if column.key === "isPrimary"}
                    <div class="{column.customWidth} px-4 py-2 text-[#222222]">
                      <button
                        type="button"
                        class="flex items-center gap-2"
                        onclick={() => {
                          isOpen = true;
                          confirmationType = "set-primary";
                          confirmationIndex = index;
                          if (contact.isPrimary) {
                            confirmationMessage = `Are you sure you want to remove ${contact.name} as primary?`;
                          } else {
                            confirmationMessage = `Are you sure you want to set ${contact.name} as primary?`;
                          }
                        }}
                        disabled={contact.isPrimary ||
                          (type === "admin" && page?.data?.user?.orgId !== "0")}
                      >
                        <CustomSwitch
                          title="Primary-{type}-{contact.userId}"
                          bind:toggle={contact.isPrimary}
                          handleSwitch={() => {}}
                          isTextVisible={false}
                          disabled={contact.isPrimary ||
                            (type === "admin" &&
                              page?.data?.user?.orgId !== "0")}
                        />
                      </button>
                    </div>
                  {:else}
                    <div class="{column.customWidth} px-4 py-2 text-[#222222]">
                      {contact[column.key as keyof Contacts] || "N/A"}
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

<ConfirmationPopup
  {confirmationMessage}
  onConfirm={handleConfirmation}
  onClose={() => {
    if (confirmationType === "set-primary") {
      contacts = deepClone(contacts).map((i, index) =>
        index === confirmationIndex ? { ...i, isPrimary: !i.isPrimary } : i
      );
    }
    confirmationIndex = null;
  }}
  bind:isOpen
/>
