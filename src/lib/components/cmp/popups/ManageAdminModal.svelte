<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type { IAdminDetails } from "$lib/types/organizations.types";
  import { deepClone } from "$lib/utils/common-utils";
  import { formatPhoneNumberAsYouType } from "../../../../routes/create-request/utils";
  import InputField from "$lib/components/building-blocks/InputField.svelte";

  interface AdminPopupProps {
    isOpen: boolean;
    adminData: IAdminDetails | undefined;
    handleFormSubmit: (data: IAdminDetails) => void;
  }

  let {
    isOpen = $bindable(),
    adminData,
    handleFormSubmit,
  }: AdminPopupProps = $props();

  let localAdminState = $state<IAdminDetails>({} as IAdminDetails);
  let popUpBody = $state<HTMLFormElement | undefined>(undefined);
  let isLoading = $state(false);
  let isEdit = $derived(localAdminState.userId === "0" ? false : true);

  let errorMessage = $state({
    username: "",
    firstname: "",
    lastname: "",
    emailId: "",
    mobile: "",
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      firstname: "",
      lastname: "",
      emailId: "",
      mobile: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!localAdminState.username.trim()) {
      newErrors.username = "User name is required";
      isValid = false;
    }
    if (!localAdminState.firstname.trim()) {
      newErrors.firstname = "First name is required";
      isValid = false;
    }

    if (!localAdminState.lastname.trim()) {
      newErrors.lastname = "Last name is required";
      isValid = false;
    }

    if (!localAdminState.emailId.trim()) {
      newErrors.emailId = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localAdminState.emailId)) {
      newErrors.emailId = "Please enter a valid email address";
      isValid = false;
    }

    if (!localAdminState.mobile.trim()) {
      newErrors.mobile = "Phone number is required";
      isValid = false;
    } else if (!/^\+?[\d\s-()]+$/.test(localAdminState.mobile)) {
      newErrors.mobile = "Please enter a valid phone number";
      isValid = false;
    }

    errorMessage = newErrors;
    return isValid;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      isLoading = true;
      const res = await fetch(`/api/manage/organization-admins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...localAdminState,
          mobile: localAdminState.mobile.replaceAll(/[^0-9]/g, ""),
        }),
      });

      const response = await res.json();

      addToast({
        type: response?.succeeded ? "success" : "error",
        message: response?.succeeded
          ? `Administrator ${isEdit ? "updated" : "added"} successfully.`
          : response.message ||
            `Failed to ${isEdit ? "update" : "add"} administrator.`,
      });
      if (response?.succeeded) handleFormSubmit(localAdminState);
    } catch (e) {
      console.error("Error while processing administrator:", e);
      addToast({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  };

  const handlePhoneChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
    localAdminState = {
      ...localAdminState,
      mobile: formatPhoneNumberAsYouType(value),
    };
  };

  const resetForm = () => {
    localAdminState = {
      userId: "0",
      organizationId: +page.params.org_id || 0,
      firstname: "",
      lastname: "",
      emailId: "",
      mobile: "",
      isActive: true,
      createdBy: "",
      created: null,
      updatedBy: "",
      updated: null,
      imageData: "",
      isVerified: false,
      lastActivityDate: null,
      orgUnitList: [],
      passwordChangedDate: null,
      username: "",
      roleNames: "",
      roleList: [],
      clientType: "",
    };

    errorMessage = {
      username: "",
      firstname: "",
      lastname: "",
      emailId: "",
      mobile: "",
    };
  };

  $effect(() => {
    if (!isOpen) resetForm();
  });

  $effect(() => {
    if (adminData) {
      localAdminState = deepClone({
        ...adminData,
        mobile: formatPhoneNumberAsYouType(adminData.mobile),
      });
    } else {
      resetForm();
    }
  });
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <form
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 w-full"
    bind:this={popUpBody}
    onsubmit={handleSubmit}
  >
    <h2 class="text-lg font-medium text-neutral-800 mb-4">
      {isEdit ? "Edit" : "Add"} Administrator
    </h2>

    <!-- Name Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- User Name -->
      <div class="flex flex-col gap-2">
        <label for="usernameInput" class="text-sm font-medium text-neutral-700">
          User Name:
        </label>
        <InputField
          type="text"
          id="usernameInput"
          bind:value={localAdminState.username}
          placeholder="Enter user name"
          error={errorMessage.username}
          errorClass="!p-0"
          aplphaOnly
          disabled={isEdit}
        />
      </div>
      <!-- First Name -->
      <div class="flex flex-col gap-2">
        <label
          for="firstnameInput"
          class="text-sm font-medium text-neutral-700"
        >
          First Name:
        </label>
        <InputField
          type="text"
          id="firstnameInput"
          bind:value={localAdminState.firstname}
          placeholder="Enter first name"
          error={errorMessage.firstname}
          errorClass="!p-0"
          aplphaOnly
        />
      </div>

      <!-- Last Name -->
      <div class="flex flex-col gap-2">
        <label for="lastnameInput" class="text-sm font-medium text-neutral-700">
          Last Name:
        </label>
        <InputField
          type="text"
          id="lastnameInput"
          bind:value={localAdminState.lastname}
          placeholder="Enter last name"
          error={errorMessage.lastname}
          errorClass="!p-0"
          aplphaOnly
        />
      </div>

      <!-- Contact Information -->
      <!-- Email -->
      <div class="flex flex-col gap-2">
        <label for="emailInput" class="text-sm font-medium text-neutral-700">
          Email:
        </label>
        <InputField
          type="email"
          id="emailInput"
          bind:value={localAdminState.emailId}
          placeholder="Enter email address"
          autocomplete="email"
          error={errorMessage.emailId}
          errorClass="!p-0"
          disabled={isEdit}
        />
      </div>

      <!-- Phone -->
      <div class="flex flex-col gap-2">
        <label for="phoneInput" class="text-sm font-medium text-neutral-700">
          Phone Number:
        </label>
        <InputField
          type="tel"
          id="phoneInput"
          bind:value={localAdminState.mobile}
          placeholder="Enter phone number"
          oninput={handlePhoneChange}
          error={errorMessage.mobile}
          errorClass="!p-0"
        />
      </div>

      <!-- Client Type -->
      <div class="flex flex-col gap-2">
        <label for="clientType" class="text-sm font-medium text-neutral-700">
          Reference Type:
        </label>
        <InputField
          type="tel"
          id="clientType"
          bind:value={localAdminState.clientType}
          placeholder="Enter reference type"
          errorClass="!p-0"
        />
      </div>

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
              bind:group={localAdminState.isActive}
              value={true}
              name="isActive"
            />
            Active
          </label>
          <label for="statusInactive" class="flex items-center gap-2">
            <input
              type="radio"
              id="statusInactive"
              bind:group={localAdminState.isActive}
              value={false}
              name="isActive"
            />
            Inactive
          </label>
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
