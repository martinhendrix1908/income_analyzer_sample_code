<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import RolesAndAccessTable from "$lib/components/user-management/RolesAndAccessTable.svelte";
  import UserDetailsAndAccess from "$lib/components/user-management/UserDetailsAndAccess.svelte";
  import { addToast } from "$lib/store/toast-store";

  import type { UserData } from "$lib/types/types";
  import {
    formatPhoneNumberAsYouType,
    showValidationMessage,
  } from "../../../create-request/utils";
  import { findModifiedUnits, flattenOrgUnits } from "../utils";

  let {
    data,
  }: {
    data: any;
  } = $props();
  let manageType = $derived(page?.params?.user_id);
  let user = $state<UserData>({
    ...data.userData,
    mobile: formatPhoneNumberAsYouType(data.userData.mobile, "000-000-0000"),
  });

  let form = $state<HTMLFormElement | null>(null);
  let isLoading = $state(false);

  const validateForm = () => {
    let inputElements = Array.from(
      form?.elements as HTMLFormControlsCollection
    ).filter(
      (element) =>
        element.tagName === "INPUT" && !(element as any).checkValidity()
    );
    if (inputElements.length > 0) {
      showValidationMessage(inputElements[0] as HTMLInputElement);
    }
    return form?.checkValidity();
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const fieldsToTrim = ["firstname", "lastname", "emailId", "mobile"];
    const userCopy = { ...user } as { [key: string]: any };
    fieldsToTrim.forEach((field) => {
      userCopy[field] = userCopy[field].trim();
    });

    const modifiedOrgUnitList = findModifiedUnits(
      page.data.userData.orgUnitList,
      flattenOrgUnits(user.orgUnitList)
    );

    user = userCopy as UserData;
    if (!validateForm()) {
      return;
    }
    let userMobile = user.mobile.replace(/\D/g, "");
    try {
      isLoading = true;
      const res = await fetch(`/api/users/manage-role/${user.userId || 0}`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            ...user,
            mobile: userMobile,
            orgUnitList: modifiedOrgUnitList,
          },
        }),
      });
      const response = await res.json();
      if (response.succeeded) {
        addToast({
          type: "success",
          message: `User ${manageType === "add" ? "added" : "updated"} successfully.`,
        });
        goto("/manage/users");
      } else {
        addToast({
          type: "error",
          message: response.message + "." || `Unable to ${manageType} user.`,
        });
      }
    } catch (e) {
      addToast({
        type: "error",
        message: `Unable to ${manageType} user.`,
      });
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="border-t-2 border-white" id="allDiv">
  <SectionWrapper>
    <form bind:this={form} novalidate method="POST" onsubmit={handleSubmit}>
      <div class="flex flex-col gap-2">
        <UserDetailsAndAccess bind:user {isLoading} />

        <RolesAndAccessTable bind:user />
      </div>
    </form>
  </SectionWrapper>
</main>
