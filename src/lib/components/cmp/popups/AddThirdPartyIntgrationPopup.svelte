<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type { ThirdPartyIntegration } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { invalidateAll } from "$app/navigation";
  import { enhance } from "$app/forms";

  interface IntegrationPopupProps {
    isOpen: boolean;
    intergrationData: ThirdPartyIntegration | undefined;
  }

  let {
    isOpen = $bindable(),
    intergrationData,
  }: IntegrationPopupProps = $props();

  let localState = $state<ThirdPartyIntegration>({} as ThirdPartyIntegration);
  let popUpBody = $state<HTMLFormElement | undefined>(undefined);
  let isLoading = $state(false);
  let isEdit = $derived(localState.id === "0" ? false : true);


  let errorMessage = $state({
    name: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
    };

    let isValid = true;
    errorMessage = newErrors;
    return isValid;
  };

  const resetForm = () => {
    localState = {
      id: "0",
      name: "",
      api: "",
      type: "",
      isActive: false,
      createdBy: "",
      created: "",
      updatedBy: "",
      updated: "",
    };

    errorMessage = {
      name: "",
    };
  };

  $effect(() => {
    if (!isOpen) resetForm();
  });

  $effect(() => {
    if (intergrationData) {
      localState = deepClone(intergrationData);
    } else {
      resetForm();
    }
  });
</script>

<PopupWrapper bind:isOpen {popUpBody} onClose={resetForm}>
  <form
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 w-full"
    bind:this={popUpBody}
    action="?/setThirdPartyIntegration"
    method="POST"
    use:enhance={(submitEvent) => {
      if (!validateForm()) {
        submitEvent.cancel();
      }
      submitEvent.formData.set("data", JSON.stringify(localState));
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
      {isEdit ? "Edit" : "Add"} Third-Party Integration
    </h2>
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Name -->
        <div class="flex flex-col gap-2">
          <label for="name" class="text-sm font-medium text-neutral-700">
            Name:
          </label>
          <InputField
            type="text"
            id="name"
            bind:value={localState.name}
            placeholder="Enter name"
            error={errorMessage.name}
            errorClass="!p-0"
            required
          />
        </div>
        <!-- Integration Type -->
        <div class="flex flex-col gap-2">
          <label for="type" class="text-sm font-medium text-neutral-700">
            Integration Type:
          </label>
          <InputField
            type="text"
            id="type"
            bind:value={localState.type}
            placeholder="Enter integration type"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4">
        <!-- API -->
        <div class="flex flex-col gap-2">
          <label for="api" class="text-sm font-medium text-neutral-700">
            API:
          </label>
          <InputField
            type="text"
            id="api"
            bind:value={localState.api}
            placeholder="Enter API"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Status -->
        <div class="flex flex-col items-start justify-start gap-2">
          <label for="statusGroup" class="text-sm font-medium text-neutral-700">
            Status:
          </label>
          <div class="flex flex-wrap gap-4" id="statusGroup">
            <label for="statusActive" class="flex items-center gap-2">
              <input
                type="radio"
                id="statusActive"
                bind:group={localState.isActive}
                value={true}
                name="isActive"
              />
              Active
            </label>
            <label for="statusInactive" class="flex items-center gap-2">
              <input
                type="radio"
                id="statusInactive"
                bind:group={localState.isActive}
                value={false}
                name="isActive"
              />
              Inactive
            </label>
          </div>
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
