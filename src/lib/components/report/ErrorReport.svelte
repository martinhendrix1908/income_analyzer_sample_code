<script lang="ts">
  import { page } from "$app/state";
  import { onDestroy, onMount } from "svelte";
  import Loading from "$lib/components/report/Loading.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import LottiePlayer from "$lib/components/building-blocks/LottiePlayer.svelte";
  import ErrorTitle from "$lib/components/error-page/ErrorTitle.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import { goto } from "$app/navigation";
  import ErrorDescription from "$lib/components/error-page/ErrorDescription.svelte";
  import lottie from "$lib/assets/ia_error.lottie";
  import errorGif from "$lib/assets/error.gif";

  let reloadTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
  let errorUploading: boolean = $state(false);
  let errorType: string = $state("");
  let fileProgress: number = 0;
  let errorMessage: string = $state("");
  onMount(async () => {
    if (page.error?.message.includes(" $@$ ")) {
      const splitMessage = page.error?.message.split(" $@$ ");
      errorMessage = splitMessage[1];
      errorType = splitMessage[0];
    } else {
      errorType = page.error?.message || "";
    }
    errorUploading = false;
    if (page?.error?.message === "Processing") {
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
      const progressInterval = setInterval(() => {
        updateProgress();
      }, 800);
      const res = await fetch("/api/report/" + page.params.id);
      const response = await res.json();
      if (response.success || response.data === "Error") {
        goto(page.url.pathname, {
          invalidateAll: true,
        });
      } else {
        errorType = response.data;
        if (response.data === "NotFound") return;
        errorUploading = true;
      }
      errorMessage = response?.message;
    }
  });
  const goBack = () => {
    clearTimeout(reloadTimeout);
    history.back();
  };
  onDestroy(() => {
    clearTimeout(reloadTimeout);
    errorUploading = false;
  });
</script>

<SectionWrapper>
  <div class="flex flex-col justify-start items-center gap-5">
    {#if errorUploading && errorType === "Processing"}
      <ErrorTitle>
        Data still processing please try again after some time.
      </ErrorTitle>
      <Button onclick={goBack}>Go Back</Button>
    {/if}
    {#if errorType !== "Pending" && errorType !== "Processing"}
      <!-- <LottiePlayer src={lottie} height={400} width={400} /> -->
      <img src={errorGif} alt="error" height="400" width="400" />
    {/if}
    {#if !page.data.user?.authToken}
      <ErrorTitle>You've been logged out.</ErrorTitle>
      <Button onclick={() => goto("/login")}>Login</Button>
    {:else if errorType === "Processing"}
      <Loading {goBack} />
    {:else if errorType === "NotFound"}
      <ErrorTitle>Report Not Found</ErrorTitle>
      <ErrorDescription>
        <p>
          {`Sorry, the requested report was not found. Please check your request and
          try again.`}
        </p>
      </ErrorDescription>
    {:else}
      <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
      <ErrorDescription>
        We couldn’t process your request at this time. Please try again later or
        contact support if the problem persists.
      </ErrorDescription>
      <!-- <Button onclick={goBack}>Go Back</Button> -->
    {/if}
  </div>
</SectionWrapper>
