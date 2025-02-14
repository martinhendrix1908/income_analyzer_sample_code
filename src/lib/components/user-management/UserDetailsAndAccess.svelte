<script lang="ts">
  import { page } from "$app/state";
  import SaveIcon from "$lib/icons/SaveIcon.svelte";
  import VerifiedIcon from "$lib/icons/VerifiedIcon.svelte";
  import type { UserData } from "$lib/types/types";
  import { areObjectsEqual } from "$lib/utils/common-utils";
  import { flattenOrgUnits } from "../../../routes/manage/users/utils";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  let {
    user = $bindable(),
    isLoading,
  }: { user: UserData; isLoading: boolean } = $props();

  let fullname = $state(user.firstname + " " + user.lastname);
  let isDataChanged = $derived.by(() => {
    return !areObjectsEqual(
      {
        ...user,
        orgUnitList: flattenOrgUnits(user.orgUnitList),
        mobile: user.mobile.replace(/\D/g, ""),
      },
      page.data.userData,
      ["updated", "created"]
    );
  });
</script>

<input type="hidden" id="userId" name="userId" bind:value={user.userId} />
<div
  class="flex flex-row justify-between items-center mb-6 md:mb-4 gap-1 lg:gap-0"
>
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85">
      {#if page?.params?.user_id === "0"}
        Add
      {:else}
        Manage {fullname}
      {/if}
    </h3>
  </div>
  <Button
    variant="primary"
    type="submit"
    disabled={isLoading || !isDataChanged}
  >
    <SaveIcon fillColor={isLoading || !isDataChanged ? "#A0A0A0" : "#fff"} /> Save
  </Button>
</div>
<div class="w-full mx-auto">
  <!-- Container for both sections with responsive grid -->
  <div class="">
    <!-- Personal Information Section -->
    <div
      class="bg-white p-6 rounded-lg shadow-[0px_4px_4px_0px_#00000040] col-span-2"
    >
      <div class="border-b border-b[#9C9C9C] md:pb-[56px] pb-5">
        <div class="flex justify-between items-center gap-4 flex-wrap">
          <h2 class="text-2xl leading-9 font-medium text-[#000000D9]">
            Personal Information
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <label
              for="user-name"
              class="block text-sm mb-1 font-medium text-gray-700"
              >User Name</label
            >
            <InputField
              id="username"
              name="username"
              bind:value={user.username}
              disabled={page?.params?.user_id !== "0"}
              required
              maxlength={50}
            />
          </div>
          <div>
            <label
              for="first-name"
              class="block text-sm font-medium mb-1 text-gray-700"
              >First Name:</label
            >
            <InputField
              id="firstName"
              name="firstName"
              bind:value={user.firstname}
              required
              maxlength={50}
              aplphaOnly
            />
          </div>
          <div>
            <label
              for="last-name"
              class="block text-sm mb-1 font-medium text-gray-700"
              >Last Name:</label
            >
            <InputField
              id="lastName"
              name="lastName"
              bind:value={user.lastname}
              required
              maxlength={50}
              aplphaOnly
            />
          </div>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
          Contact Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-2">
          <div>
            <label
              for="phone-number"
              class="block text-sm mb-1 font-medium text-gray-700"
              >Phone Number:</label
            >
            <InputField
              id="mobile"
              name="mobile"
              bind:value={user.mobile}
              required
              validationName="phone2"
            />
          </div>
          <div>
            <label
              for="emailId"
              class="block text-sm mb-1 font-medium text-gray-700">Email:</label
            >
            <div class="relative mt-1">
              <InputField
                type="email"
                id="emailId"
                name="emailId"
                bind:value={user.emailId}
                disabled={page?.params?.user_id !== "0"}
                required
                validationName="email"
              />
              {#if user.isVerified}
                <i class="absolute top-3 lg:top-3.5 right-3"><VerifiedIcon /></i
                >
              {/if}
            </div>
          </div>
          <div>
            <label
              for="clientType"
              class="block text-sm mb-1 font-medium text-gray-700"
              >Reference Type:</label
            >
            <div class="relative mt-1">
              <InputField
                type="text"
                id="clientType"
                name="clientType"
                bind:value={user.clientType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
