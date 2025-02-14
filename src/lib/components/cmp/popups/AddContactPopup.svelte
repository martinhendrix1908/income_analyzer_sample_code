<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import { addToast } from "$lib/store/toast-store";
  import { onMount } from "svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import type { Option } from "$lib/types/types";

  interface OrgPopupProps {
    isOpen: boolean;
    type: "admin" | "client";
    revalidate: boolean;
  }

  let {
    isOpen = $bindable(),
    type,
    revalidate = $bindable(),
  }: OrgPopupProps = $props();

  let popUpBody = $state<HTMLDivElement | undefined>(undefined);
  let isLoading = $state(false);
  let availableUsers = $state<Option[]>([]);
  let selectedUsers = $state<Option[]>([]);
  let errorMessage = $state({
    user: "",
  });

  const validateForm = () => {
    if (selectedUsers.length === 0) {
      errorMessage.user = "Please select a user.";
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      isLoading = true;
      const res = await fetch(`/api/manage/organizations/contacts`, {
        method: "POST",
        body: JSON.stringify({
          organizationId: page.params.org_id,
          userId: selectedUsers[0].value,
          isPrimary: false,
          type,
        }),
      });
      const data = await res.json();
      addToast({
        type: data?.succeeded ? "success" : "error",
        message: data?.succeeded
          ? "Organization added successfully."
          : data?.message || "Failed to add organization.",
      });
      if (data?.succeeded) {
        isOpen = false;
        revalidate = !revalidate;
      }
    } catch (e) {
      console.error("Error while fetching organizations:", e);
      addToast({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  };

  const resetForm = () => {
    errorMessage = {
      user: "",
    };
    selectedUsers = [];
  };

  $effect(() => {
    if (!isOpen) {
      resetForm();
    }
  });
  const getAvailableUsers = async () => {
    availableUsers = [];
    try {
      const req = await fetch(
        `/api/manage/organizations/contacts?usersType=available&orgId=${page.params.org_id}&type=${type}`,
        {
          method: "GET",
        }
      );
      const res: { Id: string; Name: string }[] = await req.json();
      if (res?.length) {
        availableUsers = res.map((user) => ({
          value: user.Id,
          label: user.Name,
        }));
      }
    } catch (e) {
      console.log(`Something went wrong -- ${e}`);
    }
  };

  $effect(() => {
    if (!isOpen) return;
    getAvailableUsers();
  });

  onMount(() => {
    resetForm();
  });
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <div
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 w-full"
    bind:this={popUpBody}
  >
    <h2 class="text-lg font-medium text-neutral-800 mb-4">
      Add {type === "admin" ? "Client Services Reps" : "Priority Contact"}
    </h2>

    <div class="flex flex-col gap-4">
      <!-- User Dropdown -->
      <div class="flex flex-col gap-2">
        <label for="orgNameInput" class="text-sm font-medium text-neutral-700">
          Contact Name:
        </label>

        <DynamicSelect
          options={availableUsers}
          bind:selectedValues={selectedUsers}
          placeholder="Select a user"
          mode="single"
        />
      </div>
      {#if errorMessage.user}
        <p class="text-sm text-red-500">{errorMessage.user}</p>
      {/if}
    </div>

    <!-- Footer -->
    <footer class="flex gap-2 items-start mt-6">
      <Button
        class="w-full whitespace-nowrap"
        variant="black"
        onclick={handleSubmit}
        disabled={isLoading}
      >
        Add
      </Button>
      <Button
        class="w-full"
        variant="black"
        outlined
        onclick={() => {
          isOpen = false;
          resetForm();
        }}
      >
        Cancel
      </Button>
    </footer>
  </div>
</PopupWrapper>
