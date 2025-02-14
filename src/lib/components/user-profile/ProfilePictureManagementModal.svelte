<script lang="ts">
  import PersonIcon from "$lib/icons/PersonIcon.svelte";
  import ProgressBar from "./ProgressBar.svelte";
  import Cropper from "svelte-easy-crop";
  import { getCroppedImg, type PixelCrop } from "$lib/utils/canvas-utils";
  import { page } from "$app/state";
  import { invalidateAll } from "$app/navigation";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import { addToast } from "$lib/store/toast-store";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  let {
    imageResizerModalOpen = $bindable(),
    imageFiles = $bindable(),
    imageDetails = $bindable(),
  }: {
    imageResizerModalOpen: boolean;
    imageFiles: FileList | undefined;
    imageDetails: any;
  } = $props();

  let fileListCopy = $state(imageFiles);
  let pixelCrop = $state();
  let croppedImage = $state();
  let zoom = $state(1);
  let isLoading = $state(false);
  let invalidImage = $state(false);

  const previewCrop = (e: any) => {
    pixelCrop = e.detail.pixels;
  };

  const validateImageFile = (file: File): boolean => {
    if (!file) return false;
    // Check if file is PNG
    if (file.type !== "image/png") {
      addToast({
        message: "Please select a PNG image file only",
        type: "error",
      });
      return false;
    }

    // Set max size to 50KB
    const maxSize = 50 * 1024; // 50KB in bytes
    if (file.size > maxSize) {
      addToast({
        message: "Image size should be less than 50KB",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const handleFileChange = () => {
    zoom = 1;
    if (imageFiles && imageFiles?.length > 0) {
      const file = imageFiles[0];
      invalidImage = !validateImageFile(file);
      if (!!invalidImage) {
        imageFiles = undefined;
        return;
      }
    }
  };
  async function cropImage() {
    croppedImage = await getCroppedImg(
      imageDetails.previewUrl as string,
      pixelCrop as PixelCrop,
    );

    // imageDetails.previewUrl = croppedImage as string;
    const response = await fetch(croppedImage as string);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append("file", blob, "user-profile.png");
    formData.append("userId", page.data.userData.userId);
    formData.append("userName", page.data.userData.username);
    formData.append("firstName", page.data.userData.firstname);
    formData.append("lastName", page.data.userData.lastname);
    formData.append("mobile", page.data.userData.mobile);
    formData.append("emailId", page.data.userData.emailId);
    try {
      isLoading = true;
      let res = await fetch(
        "/api/users/set-user/" + page.data.userData.userId,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      if (data.succeeded) {
        addToast({
          message: "Profile picture updated successfully",
          type: "success",
        });
        await invalidateAll();
      } else {
        addToast({
          message: "Unable to update profile picture",
          type: "error",
        });
      }
      imageResizerModalOpen = false;
      imageDetails = undefined;
      imageFiles = undefined;
    } catch (e: any) {
      addToast({
        message: e.message || "Something went wrong",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  }
</script>

<PopupWrapper isOpen>
  <div
    class=" flex align-items justify-center shadow-[0px_4px_4px_0px_#00000040] rounded-md bg-white p-6 max-w-[514px] w-full"
    id="modalBody"
  >
    <div class="flex flex-col md:gap-12 gap-5 w-full">
      <h2 class="text-xl font-semibold text-left w-full">
        Change Profile Picture
      </h2>
      <div
        class="flex flex-col gap-6 justify-center items-center border-b border-[#9C9C9C]"
      >
        <div class="relative overflow-hidden h-[123px] w-[123px] rounded-[2px]">
          <Cropper
            cropSize={imageDetails.aspectRatio === "1:1" &&
            imageDetails.height > 107
              ? { height: 107, width: 107 }
              : null}
            image={imageDetails.previewUrl}
            aspect={1}
            maxZoom={2}
            minZoom={0.5}
            {zoom}
            showGrid={false}
            on:cropcomplete={previewCrop}
          />
        </div>
        <label
          for="profileImage"
          class="flex items-center justify-center gap-2 px-4 py-2 rounded border border-[#09814A] text-[#09814A] hover:bg-[#F5FFF4] cursor-pointer"
        >
          Upload Image
        </label>
        <input
          type="file"
          bind:files={imageFiles}
          accept=".png"
          class="hidden"
          id="profileImage"
          onchange={handleFileChange}
        />
        <input type="file" class="hidden" name="file" />
        <div class="flex items-center gap-2 justify-center w-full">
          <i><PersonIcon /></i>
          <div class="max-w-[316px] w-full">
            <ProgressBar bind:zoom />
          </div>
          <i class=""><PersonIcon size="" /></i>
        </div>
        <span class="text-center text-sm text-[#9C9C9C] mb-6"
          >Adjust the slider to zoom.</span
        >
      </div>
      <div class="flex justify-end sm:gap-6 flex-wrap gap-2">
        <Button
          variant="primary"
          outlined
          onclick={() => {
            imageResizerModalOpen = false;
            imageFiles = fileListCopy;
          }}
        >
          Cancel
        </Button>

        <Button
          onclick={() => {
            zoom = 1;
            cropImage();
          }}
          variant="primary"
          disabled={(!imageDetails.previewUrl.startsWith("blob:") &&
            zoom === 1) ||
            imageDetails.previewUrl === "/images/user-profile.jfif" ||
            invalidImage ||
            isLoading}
        >
          {isLoading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </div>
    </div>
  </div>
</PopupWrapper>
