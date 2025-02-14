<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import LoadingHandIcon from "$lib/icons/LoadingHandIcon.svelte";
  import InfoDangerIcon from "$lib/icons/InfoDangerIcon.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";

  let {
    refresh = $bindable(),
    errorUploading,
    errorMessageForRefreshPopUp,
    errorTitleForRefreshPopUp,
  }: {
    refresh: boolean;
    errorUploading: boolean;
    errorMessageForRefreshPopUp: string;
    errorTitleForRefreshPopUp: string;
  } = $props();

  let fileProgress: number = $state(0);
  let progressInterval: ReturnType<typeof setInterval> | undefined =
    $state(undefined);

  const handleRefresh = async () => {
    fileProgress = 0;
    const predefinedProgress = [15, 30, 45, 60, 75, 90];
    let progressIndex = 0;
    const updateProgress = () => {
      fileProgress = predefinedProgress[progressIndex];
      progressIndex++;
      if (progressIndex >= predefinedProgress.length) {
        clearInterval(progressInterval);
      }
    };
    updateProgress();
    progressInterval = setInterval(() => {
      updateProgress();
    }, 800);
  };

  $effect(() => {
    if (errorUploading === true) {
      clearInterval(progressInterval);
      fileProgress = 100;
    }
  });

  onMount(() => {
    handleRefresh();
  });

  onDestroy(() => {
    clearInterval(progressInterval);
  });

  const reload = () => {
    refresh = false;
    goto(page.url.pathname, {
      invalidateAll: true,
    });
  };
</script>

<PopupWrapper
  isOpen={errorUploading}
  className="bg-gray-200 backdrop-blur-sm bg-opacity-0 drop-shadow-md"
>
  <div class="h-screen flex align-items" id="modalBody">
    <div
      class="flex flex-col w-416 p-6 gap-6 bg-white items-center rounded-md m-auto 2xl:container"
    >
      <div class="flex justify-between items-center">
        <span class="text-naro-600 text-[18px] font-medium leading-5">
          {errorTitleForRefreshPopUp}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <span
          class="text-naro-600 text-center font-roboto text-sm font-normal max-w-[350px] leading-6"
        >
          {errorMessageForRefreshPopUp}
        </span>
      </div>
      <button
        class="flex px-6 py-1.5 justify-center items-center gap-4 flex-1 rounded-[3px] bg-naro-600 text-white shadow-4xl text-sm font-normal leading-7 hover:opacity-70"
        onclick={reload}>OK</button
      >
    </div>
  </div>
</PopupWrapper>

<div class="bg-naro" id="refresh-loading-screen">
  <div class="flex items-center justify-center flex-col text-center">
    <LoadingHandIcon />
    <div class="flex items-center justify-center flex-col max-w-350px w-full">
      {#if !errorUploading}
        <div
          class="max-w-350px w-full h-2.5 bg-[#DDDDDD] rounded-lg overflow-hidden mb-5"
        >
          <div
            class="bg-[#09814A] h-2.5 rounded-lg transition-all ease-in"
            style="width: {fileProgress ?? 0}%"
          ></div>
        </div>
        {#if fileProgress === 15}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Getting ready
          </h1>
        {:else if fileProgress === 30}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Firing up the systems
          </h1>
        {:else if fileProgress === 45}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Contacting the bank
          </h1>
        {:else if fileProgress === 60}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Fetching data
          </h1>
        {:else if fileProgress === 75}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Compiling results
          </h1>
        {:else if fileProgress === 90}
          <h1
            class="text-black text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Generating insights
          </h1>
        {:else if fileProgress === 100}
          <h1
            class="text-[#09814A] text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Here We Go
          </h1>
        {/if}
      {/if}
      {#if errorUploading}
        <div
          class="flex items-center justify-center flex-col transition-all ease-in"
        >
          <div
            class="flex items-center justify-center mb-5 max-w-350px gap-1.5 w-full"
          >
            <div
              class="max-w-323px w-full h-2.5 bg-[#DDDDDD] rounded-lg overflow-hidden"
            >
              <div class="bg-red w-full h-2.5 transition-all ease-in"></div>
            </div>
            <span title="Some error occured.">
              <InfoDangerIcon />
            </span>
          </div>
          <h1
            class=" text-red text-[3xl] font-medium text-center leading-loose transition-all ease-in"
          >
            Unable to refresh
          </h1>

          <h1
            class="text-black text-base max-w-350px w-full leading-6 text-center mt-4"
          >
            We're having trouble retrieving new data at the moment. Please try
            again later.
          </h1>
        </div>
      {/if}
    </div>

    <div
      class="flex max-w-350px w-full justify-center align-items gap-2.5 md:mt-16 mt-4"
    >
      <button
        class="border border-black text-black rounded transition-colors max-w-155px w-full py-3 sm:px-6 px-3 text-sm font-medium hover:bg-naro-100"
        onclick={reload}
        >{errorTitleForRefreshPopUp === "Account Disconnected"
          ? "OK"
          : "Back"}</button
      >
    </div>
  </div>
</div>
