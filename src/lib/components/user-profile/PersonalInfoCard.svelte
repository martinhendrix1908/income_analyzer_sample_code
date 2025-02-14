<script lang="ts">
  import EditIcon from "$lib/icons/EditIcon.svelte";
  import VerifiedIcon from "$lib/icons/VerifiedIcon.svelte";
  import type { UserData } from "$lib/types/types";
  import InputField from "$lib/components/building-blocks/InputField.svelte";

  let {
    imageResizerModalOpen = $bindable(),
    user = $bindable(),
    imageFiles = $bindable(),
  }: {
    imageResizerModalOpen: boolean;
    user: UserData;
    imageFiles: FileList | undefined;
  } = $props();

  function openImageResizerModal() {
    imageResizerModalOpen = true;
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-[0px_4px_4px_0px_#00000040]">
  <input type="hidden" id="userId" name="userId" bind:value={user.userId} />
  <input type="file" name="file" bind:files={imageFiles} class="hidden" />
  <div class="border-b border-b[#9C9C9C] md:pb-[56px] pb-5">
    <div class="flex justify-between items-center gap-4 flex-wrap">
      <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
        Profile Information
      </h3>
      <button
        type="button"
        onclick={openImageResizerModal}
        class="text-blue-500 hover:underline flex gap-1"
        ><i><EditIcon /></i> Edit Profile Picture</button
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="username"
          class="block text-sm font-medium mb-1 text-gray-700">User Name:</label
        >
        <InputField
          id="username"
          name="username"
          bind:value={user.username}
          required
          disabled
        />
      </div>
    </div>
  </div>

  <div class="border-b border-b[#9C9C9C] md:pb-[56px] pb-5 md:mt-12 mt-5">
    <div class="flex justify-between items-center gap-4 flex-wrap">
      <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
        Personal Information
      </h3>
    </div>

    <div class="flex justify-between flex-wrap gap-6 mt-6">
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="firstName"
          class="block text-sm font-medium mb-1 text-gray-700"
          >First Name:</label
        >
        <InputField
          id="firstName"
          name="firstName"
          bind:value={user.firstname}
          required
          disabled
        />
      </div>
      <!-- <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="middlename"
          class="block text-sm font-medium mb-1 text-gray-700"
          >Middle Name: (Optional)</label
        >
        <InputField id="middlename" bind:value={user.lastname} />
      </div> -->

      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="lastName"
          class="block text-sm font-medium mb-1 text-gray-700">Last Name:</label
        >
        <InputField
          id="lastName"
          name="lastName"
          bind:value={user.lastname}
          required
          disabled
        />
      </div>
    </div>
  </div>

  <div class="md:mt-12 mt-5">
    <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
      Contact Information
    </h3>

    <div class="flex justify-between flex-wrap gap-6 mt-6 mb-2">
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label for="mobile" class="block text-sm mb-1 font-medium text-gray-700"
          >Phone Number:</label
        >
        <InputField
          id="mobile"
          name="mobile"
          bind:value={user.mobile}
          validationName="phone2"
          numberOnly
          disabled
        />
      </div>

      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
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
            required
            disabled
          />
          {#if user.isVerified}
            <i class="absolute top-[50%] -translate-y-2/4 right-3">
              <VerifiedIcon />
            </i>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
