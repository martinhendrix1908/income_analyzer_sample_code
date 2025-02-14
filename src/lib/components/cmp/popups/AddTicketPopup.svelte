<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type { Ticket } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import type { Option } from "$lib/types/types";
  import { invalidateAll } from "$app/navigation";
  import { Priority, Status } from "$lib/constants";
  import { enhance } from "$app/forms";

  interface TicketPopupProps {
    isOpen: boolean;
    ticket: Ticket | undefined;
  }

  let { isOpen = $bindable(), ticket }: TicketPopupProps = $props();

  let localState = $state<Ticket>({} as Ticket);
  let popUpBody = $state<HTMLFormElement | undefined>(undefined);
  let isLoading = $state(false);
  let isEdit = $derived(localState.id === "0" ? false : true);
  let priorityOptions = $derived.by<Option[]>(() => {
    return Object.entries(Priority).map(([key, value]) => ({
      label: value,
      value: +key,
    }));
  });

  let statusOptions = $derived.by<Option[]>(() => {
    return Object.entries(Status).map(([key, value]) => ({
      label: value,
      value: +key,
    }));
  });
  let selectedPriority = $state<Option[]>([]);
  let selectedStatus = $state<Option[]>([]);

  let errorMessage = $state({
    subject: "",
    priority: "",
    status: "",
  });

  const validateForm = () => {
    const newErrors = {
      subject: "",
      priority: "",
      status: "",
    };

    let isValid = true;
    errorMessage = newErrors;
    return isValid;
  };

  const resetForm = () => {
    localState = {
      id: "0",
      subject: "",
      priority: 0,
      status: 0,
      createdBy: "",
      created: "",
      updatedBy: "",
      updated: "",
    };

    errorMessage = {
      subject: "",
      priority: "",
      status: "",
    };
  };

  $effect(() => {
    if (!isOpen) resetForm();
  });

  $effect(() => {
    if (ticket) {
      localState = deepClone(ticket);
      selectedPriority = priorityOptions.filter(
        (option) => +option.value === +ticket.priority
      );
      selectedStatus = statusOptions.filter(
        (option) => +option.value === +ticket.status
      );
    } else {
      resetForm();
      selectedPriority = [priorityOptions[0]];
      selectedStatus = [statusOptions[0]];
    }
  });
</script>

<PopupWrapper bind:isOpen {popUpBody} onClose={resetForm}>
  <form
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 w-full"
    bind:this={popUpBody}
    action="?/setTicket"
    method="POST"
    use:enhance={(submitEvent) => {
      if (!validateForm()) {
        submitEvent.cancel();
      }
      submitEvent.formData.set("ticket", JSON.stringify(localState));
      isLoading = true;
      return async ({ update, result }) => {
        isLoading = false;
        if (result.type !== "success") {
          addToast({
            message: "Something went wrong",
            type: "error",
          });
          return;
        }
        addToast({
          type: result.data?.succeeded ? "success" : "error",
          message: result.data?.succeeded
            ? `Administrator ${isEdit ? "updated" : "added"} successfully.`
            : (result.data?.message as string) ||
              `Failed to ${isEdit ? "update" : "add"} administrator.`,
        });
        if (result.data?.succeeded) await invalidateAll();
      };
    }}
  >
    <h2 class="text-lg font-medium text-neutral-800 mb-4">
      {isEdit ? "Edit" : "Add"} Ticket
    </h2>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-4">
        <!-- Subject -->
        <div class="flex flex-col gap-2">
          <label for="subject" class="text-sm font-medium text-neutral-700">
            Subject:
          </label>
          <InputField
            type="text"
            id="subject"
            bind:value={localState.subject}
            placeholder="Enter subject"
            error={errorMessage.subject}
            errorClass="!p-0"
            aplphaOnly
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Priority -->
        <div class="flex flex-col gap-2">
          <label for="priority" class="text-sm font-medium text-neutral-700">
            Priority:
          </label>
          <DynamicSelect
            id="ticket-priority"
            options={priorityOptions}
            bind:selectedValues={selectedPriority}
            mode="single"
            placeholder="Select priority"
            onChange={(options) => {
              localState.priority = +options[0].value;
            }}
          />
        </div>

        <!-- Status -->
        <div class="flex flex-col gap-2">
          <label for="status" class="text-sm font-medium text-neutral-700">
            Status:
          </label>
          <DynamicSelect
            id="ticket-status"
            options={statusOptions}
            bind:selectedValues={selectedStatus}
            mode="single"
            placeholder="Select status"
            onChange={(options) => {
              localState.status = +options[0].value;
            }}
          />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="flex gap-2 items-start mt-6">
      <Button
        class="w-full whitespace-nowrap"
        variant="black"
        type="submit"
        disabled={isLoading}
      >
        {#if isLoading}
          <i class="animate-spin"><RefreshIcon /></i>
          <span>
            {isEdit ? "Updating..." : "Saving..."}
          </span>
        {:else}
          {isEdit ? "Update" : "Save"}
        {/if}
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
  </form>
</PopupWrapper>
