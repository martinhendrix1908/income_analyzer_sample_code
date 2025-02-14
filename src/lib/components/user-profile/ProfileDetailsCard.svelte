<script lang="ts">
  import type { UserData } from "$lib/types/types";
  import { convertDateTime } from "$lib/utils/date-utils";

  let {
    user = $bindable(),
  }: {
    user: UserData;
  } = $props();

  // Add a timestamp to force browser to reload image
  let imagePreview = $derived.by(() => {
    return user?.imageData
      ? "data:image/png;base64," + user?.imageData
      : "/images/user-profile.jfif";
  });
</script>

<div
  class="bg-white rounded-md shadow-[0px_2px_8px_0px_#00000040] lg:max-w-[341px] max-w-full w-full overflow-hidden"
>
  <div class="flex lg:flex-col sm:flex-row flex-col">
    <div
      class="bg-[#222222] flex lg:justify-center sm:justify-start justify-center lg:items-center sm:items-start items-center w-full"
    >
      <div
        class="overflow-hidden lg:border border-[#98C43D] lg:mt-[31.5px] lg:mb-[-61.5px] sm:m-0 mt-[31.5px] mb-[-61.5px] z-0 sm:border-0 border lg:w-[123px] sm:w-full w-[123px] lg:h-[123px] sm:h-full h-[123px] lg:rounded-md sm:rounded-none rounded-md"
      >
        <img
          class="w-full h-full object-contain"
          height="123"
          width="123"
          alt="user"
          src={imagePreview}
        />
      </div>
    </div>
    <div
      class="bg-[#EEEEEE] p-4 lg:pt-[61.5px] sm:pt-4 pt-[61.5px] lg:w-auto w-full"
    >
      <h5
        class="font-bold text-center text-xl text-[#222222] lg:mt-5 sm:mt-0 mt-5"
      >
        {user.firstname}
        {user.lastname}
      </h5>
      <div class="py-4 border-b border-[#9C9C9C]">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">Phone Number:</span>
            <p class="font-semibold text-sm text-[#222222]">
              {user.mobile || "N/A"}
            </p>
          </div>
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">Email:</span>
            <p class="font-semibold text-sm text-[#222222]">
              {user.emailId || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div class="py-4 border-b border-[#9C9C9C]">
        <div class="flex flex-col gap-2">
          <div class="flex flex-wrap gap-2">
            <span class="text-sm text-[#222222] whitespace-nowrap"
              >Password Changed on :</span
            >
            <p class="font-semibold text-sm text-[#222222] whitespace-nowrap">
              {user.passwordChangedDate
                ? convertDateTime(user.passwordChangedDate)
                : "N/A"}
            </p>
          </div>
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">User Name:</span>
            <p class="font-semibold text-sm text-[#222222]">
              {user.username || "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div class="pt-4">
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">Roles:</span>
            <p class="font-semibold text-sm text-[#222222]">
              {user.roleNames || "N/A"}
            </p>
          </div>
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">Districts:</span>
            <p class="font-semibold text-sm text-[#222222]">N/A</p>
          </div>
          <div class="flex gap-2">
            <span class="text-sm text-[#222222]">Stores:</span>
            <p class="font-semibold text-sm text-[#222222]">N/A</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
