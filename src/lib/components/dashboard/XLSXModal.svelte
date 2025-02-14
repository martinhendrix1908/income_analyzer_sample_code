<script lang="ts">
  import { page } from "$app/state";
  import type { UploadStatus } from "$lib/types/types";
  import RemoveIcon from "$lib/icons/RemoveIcon.svelte";
  import FileUploadIcon from "$lib/icons/FileUploadIcon.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";

  let { closeModal }: { closeModal: () => void } = $props();

  let fileProgress: any = $state({});
  let fileStatus: UploadStatus = $state({});
  let selectedFiles: File[] = $state([]);
  let successfulUploads: number = $state(0);
  let importButtonVisible: boolean = $state(true);
  let changeUploadColor: any = $state({});

  const totalFiles = $derived(
    selectedFiles.filter((file) => file !== null && file !== undefined).length,
  );

  const isUploading = $derived(
    Object.values(fileStatus).some((status) => status === "Uploading"),
  );

  const allEmpty = $derived(
    selectedFiles.every((file) => file === null || file === undefined),
  );
  $effect(() => {
    if (selectedFiles.length > 0) {
      importButtonVisible = true;
    }
  });
  $effect(() => {
    if (allEmpty) {
      selectedFiles = [];
    }
  });

  const handleUpload = async () => {
    fileProgress = {}; // Flag to track upload progress
    for (const [index, file] of selectedFiles.entries()) {
      if (
        fileStatus[index] !== "Successful" &&
        fileStatus[index] !== "Uploading" &&
        file
      ) {
        fileStatus[index] = "Uploading";
        const formData = new FormData();
        formData.append("fileXLSX", file);

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        fileProgress[index] = 0;

        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            fileProgress[index] = (event.loaded / event.total) * 100;
          }
        });

        xhr.onreadystatechange = async () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              fileStatus[index] = "Successful";
              successfulUploads = Object.values(fileStatus).filter(
                (status) => status === "Successful",
              ).length;
              //const response = JSON.parse(xhr.responseText);
            } else {
              fileProgress[index] = 100;
              fileStatus[index] = "Failed";
            }
            checkStatus();
          }
        };

        xhr.open(
          "POST",
          `${"SERVER_URL"}/TransDetails/ProcessTransactionsXLSX?product=Incomes`,
          true,
        );
        xhr.setRequestHeader(
          "Authorization",
          "bearer " + page.data.user.authToken,
        );
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "API_KEY");
        xhr.send(formData);
        importButtonVisible = false;
      }
    }
  };

  const removeItemByIndex = (index: any) => {
    delete fileProgress[index];
    delete selectedFiles[index];
    delete fileStatus[index];
    delete changeUploadColor[index];
    selectedFiles = selectedFiles;
    successfulUploads = Object.values(fileStatus).filter(
      (status) => status === "Successful",
    ).length;
    checkStatus();
  };

  const checkStatus = () => {
    const isUploading = Object.values(fileStatus).some(
      (status) => status === "Uploading",
    );
    const hasFailed = Object.values(fileStatus).some(
      (status) => status === "Failed",
    );
    const allSuccessful = Object.values(fileStatus).every(
      (status) =>
        status === "Successful" || status === null || status === undefined,
    );

    if (isUploading) {
      importButtonVisible = false;
    } else if (hasFailed) {
      importButtonVisible = true;
    } else if (allSuccessful) {
      importButtonVisible = false;
    }
  };

  const uploadViaBrowse = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx";
    input.multiple = true; // Allow multiple files to be selected
    input.onchange = () => {
      if (!input.files || input.files.length === 0) return;

      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        selectedFiles.push(file);
        fileStatus[selectedFiles.length - 1] = "Pending";
      }
    };

    input.click();
  };

  const handleFileDrop = (event: DragEvent) => {
    event.preventDefault();
    if (event.dataTransfer === null) return;
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      selectedFiles.push(event.dataTransfer.files[i]);
      fileStatus[selectedFiles.length - 1] = "Pending";
    }
  };

  //drag and drop
  const handleDragOver = (event: Event) => {
    event.preventDefault();
  };
</script>

<PopupWrapper
  isOpen
  className="bg-gray-200 backdrop-blur-sm bg-opacity-0 drop-shadow-md"
>
  <div class="h-screen flex align-items center" id="modalBody">
    <div
      class=" w-[55vw] bg-white rounded-md bg-opacity-100 p-6 flex flex-col justify-start items-center gap-2 min-w-288px m-auto 2xl:container"
    >
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 w-full"
      >
        <div class="pr-2 md:border-r-4 border-parrot mr-2">
          <h3 class="text-black font-medium opacity-85">File Import</h3>
        </div>
        <div class="flex flex-col md:flex-row md:items-center mr-auto">
          <span class="text-sm"
            >Drag and drop files in the drop zone below. Or, click "Browse" to
            select files from your computer.</span
          >
        </div>
      </div>
      <div
        role="button"
        tabindex={0}
        ondrop={handleFileDrop}
        ondragover={handleDragOver}
        onmousedown={uploadViaBrowse}
        class="group w-full p-2 bg-gray-200 border border-dashed border-black hover:border-blue-500 rounded-md flex flex-col justify-center items-center gap-3 transition-color duration-100 ease-in-out"
      >
        <i
          class="aspect-square text-gray-400 mt-10 transition-color duration-100 ease-in-out group-hover:text-blue-500"
        >
          <FileUploadIcon size="large" />
        </i>
        <p>
          Drag and drop files here, or <button
            onclick={uploadViaBrowse}
            class="text-blue-500 underline">Browse</button
          > from your computer.
        </p>
        <div class="w-[25%] h-0 border border-gray-500"></div>
        <p class="text-sm text-gray-400">Maximum allowed file size: 10MB</p>
        <p class="text-sm text-gray-400 mb-10">Allowed formats: XLS</p>
      </div>
      {#if selectedFiles.length > 0}
        <div class="w-full flex flex-col gap-2">
          <div
            class="flex items-center justify-between text-black text-md leading-none p-2 mt-6"
          >
            <span>Uploaded files:</span>
            <span>{successfulUploads ?? 0}/{totalFiles ?? 0}</span>
          </div>
          <div class="max-h-full overflow-hidden pr-1">
            <div
              class="w-full min-h-full max-h-210px flex flex-col gap-2 overflow-y-scroll 2xl:min-w-scroll-width"
            >
              {#each selectedFiles as f, index}
                {#key f}
                  {#if f}
                    <div
                      class=" bg-white relative border border-gray-500 rounded-md w-full flex-shrink-0 p-2 max-w-720px"
                    >
                      <div class="flex items-center gap-4">
                        <div class="text-sm w-full truncate">
                          {f.name}
                          <span
                            class="text-sm text-gray-400 relative w-full block"
                            >.{f.name.split(".")[1]} | {(
                              f.size /
                              (1024 * 1024)
                            ).toFixed(2)}MB
                            {#if fileStatus[index] !== "Successful"}
                              <span
                                class="absolute text-sm right-0 text-gray-400"
                              >
                                {fileStatus[index] === "Uploading"
                                  ? fileProgress[index].toFixed(2) + "%"
                                  : fileStatus[index]}
                              </span>
                            {/if}
                          </span>
                          {#if fileStatus[index] !== "Successful"}
                            <div
                              class=" bg-gray-200 relative w-full rounded-full h-2 dark:bg-gray-700"
                            >
                              <div
                                class={fileStatus[index] === "Failed"
                                  ? "bg-red h-2 rounded-full"
                                  : "bg-parrot h-2 rounded-full"}
                                style="width: {fileProgress[index] ?? 0}%"
                              ></div>
                            </div>
                          {/if}
                        </div>
                        {#if fileStatus[index] !== "Uploading"}
                          <button
                            type="button"
                            onclick={() => removeItemByIndex(index)}
                          >
                            <RemoveIcon />
                          </button>
                        {/if}
                      </div>
                    </div>
                  {/if}
                {/key}
              {/each}
            </div>
          </div>
        </div>
      {/if}
      <div class="w-full flex justify-end items-center gap-6">
        <button
          onclick={() => {
            if (!isUploading) closeModal();
          }}
          class="bg-white justify-center border border-black text-naro-600 px-6 py-2 text-sm rounded shadow-3xl flex items-center gap-1 cursor-pointer {importButtonVisible
            ? ''
            : 'xl:w-4/12 sm:w-6/12  '}  {isUploading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-naro-600 hover:text-white'}"
        >
          Close
        </button>
        {#if importButtonVisible}
          <button
            onclick={handleUpload}
            class={selectedFiles.length > 0
              ? "bg-parrot text-naro-600 px-6 py-2 text-sm rounded shadow-3xl flex items-center gap-1 cursor-pointer transition-color duration-200 ease-in-out"
              : "bg-parrot text-naro-600 px-6 py-2 text-sm rounded shadow-3xl flex items-center gap-1 cursor-pointer opacity-50 transition-color duration-200 ease-in-out"}
          >
            Import
          </button>
        {/if}
      </div>
    </div>
  </div>
</PopupWrapper>
