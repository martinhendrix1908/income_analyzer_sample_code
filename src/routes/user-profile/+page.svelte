<script lang="ts">
  import { page } from "$app/state";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import PasswordManagementCard from "$lib/components/user-profile/PasswordManagementCard.svelte";
  import PersonalInfoCard from "$lib/components/user-profile/PersonalInfoCard.svelte";
  import ProfileDetailsCard from "$lib/components/user-profile/ProfileDetailsCard.svelte";
  import ProfilePictureManagementModal from "$lib/components/user-profile/ProfilePictureManagementModal.svelte";
  import type { UserData } from "$lib/types/types";
  import { formatPhoneNumberAsYouType } from "../create-request/utils";
  interface ImageDetails {
    width: number;
    height: number;
    aspectRatio: string;
    previewUrl: string;
  }

  let imageResizerModalOpen = $state(false);

  let user = $state<UserData>({
    userId: "0",
    username: "",
    firstname: "",
    lastname: "",
    emailId: "",
    mobile: "",
    createdBy: "",
    updatedBy: "",
    imageData: "",
    clientType: "",
    lastActivityDate: null,
    isActive: false,
    isVerified: false,
    roleList: [],
    roleNames: "",
    passwordChangedDate: "",
    orgUnitList: [],
    organizationId: 0,
    updated: null,
    created: null,
  });
  const setUserData = () => {
    user = {
      ...page.data.userData,
      mobile: formatPhoneNumberAsYouType(
        page.data.userData.mobile,
        "000-000-0000"
      ),
    };
  };

  $effect(() => {
    setUserData();
  });

  let imageFiles = $state<FileList | undefined>();
  let imageDetails = $state<ImageDetails | null>(null);

  const setImageDetails = (imageFiles: FileList | undefined) => {
    let imageUrl = "";
    if ((imageFiles as FileList)?.length > 0) {
      imageUrl = URL.createObjectURL(imageFiles![0]);
    } else {
      imageUrl = user?.imageData
        ? "data:image/png;base64," + user?.imageData
        : "/images/user-profile.jfif";
    }
    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = function () {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        // Calculate the greatest common divisor (GCD) for simplification
        const gcd = (a: number, b: number): number =>
          b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(width, height);

        const aspectRatio = `${width / divisor}:${height / divisor}`;

        // Resolve with the image details
        imageDetails = {
          width,
          height,
          aspectRatio,
          previewUrl: imageUrl,
        };
      };

      img.onerror = function () {
        imageDetails = {
          width: 108,
          height: 108,
          aspectRatio: "1:1",
          previewUrl: "/images/user-profile.jfif",
        };
      };
    }
  };

  $effect(() => {
    setImageDetails(imageFiles);
  });
</script>

<main class="border-t-2 border-white" id="allDiv">
  <SectionWrapper>
    <div>
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap-1 lg:gap-0"
      >
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">Profile & Settings</h3>
        </div>
      </div>
      <div class="w-full mx-auto md:mb-12 mb-5">
        <div class="flex lg:flex-nowrap flex-wrap 2xl:gap-20 gap-6 items-start">
          <div class="lg:max-w-[875px] max-w-full w-full">
            <!-- Personal Information Section -->
            <PersonalInfoCard
              bind:imageResizerModalOpen
              bind:user
              bind:imageFiles
            />
            <!-- Password Section -->
            <PasswordManagementCard />
          </div>
          <!-- Profile Details Card -->
          <ProfileDetailsCard bind:user />
        </div>
      </div>
    </div>
  </SectionWrapper>
</main>

{#if imageResizerModalOpen}
  <ProfilePictureManagementModal
    bind:imageResizerModalOpen
    bind:imageFiles
    bind:imageDetails
  />
{/if}
