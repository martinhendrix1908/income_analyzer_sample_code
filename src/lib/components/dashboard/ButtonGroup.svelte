<script lang="ts">
  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import { page } from "$app/state";
  import FileUploadIcon from "$lib/icons/FileUploadIcon.svelte";

  let {
    toggleOpenImportFilesModal,
    isUploadXlsxModalOpen,
  }: {
    toggleOpenImportFilesModal: () => void;
    isUploadXlsxModalOpen: boolean;
  } = $props();
</script>

<div
  class="flex flex-row lg:items-center gap-6 order-2 lg:order-3 mb-4 lg:mb-4 justify-end flex-wrap"
>
  {#if false}
    <button
      onclick={toggleOpenImportFilesModal}
      class={`flex border border-black p-2 text-sm rounded shadow-3xl items-center gap-1 cursor-pointer 
  ${isUploadXlsxModalOpen ? "bg-[#222222] text-white" : "bg-gray-200 text-[#222222] hover:bg-[#222222] hover:text-white"}`}
    >
      <i><FileUploadIcon /></i>
      <span>Import files</span>
    </button>
  {/if}
  {#if page?.data?.user?.panelConfig?.ShowCreateRequest}
    <a
      class="bg-parrot text-naro-600 p-2 text-sm rounded shadow-3xl flex items-center gap-1"
      href="/create-request"
    >
      <i class="w-5 h-5">
        <PlusIcon />
      </i>
      Create a New Request
    </a>
  {/if}
</div>
