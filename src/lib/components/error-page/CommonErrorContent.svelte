<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import LottiePlayer from "$lib/components/building-blocks/LottiePlayer.svelte";
  import ErrorDescription from "$lib/components/error-page/ErrorDescription.svelte";
  import ErrorTitle from "$lib/components/error-page/ErrorTitle.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  const { isAuthLayout = false } = $props();
  import lottie from "$lib/assets/ia_error.lottie";
  import errorGif from "$lib/assets/error.gif";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let letters = $derived.by(() => {
    return page?.status === 404
      ? "Page Not Found".split("")
      : "Forbidden".split("");
  });
  let visibleCount = $state(0);

  const revealLetters = () => {
    const interval = setInterval(() => {
      if (visibleCount < letters.length) {
        visibleCount += 1;
      } else {
        clearInterval(interval);
      }
    }, 50);
  };

  onMount(revealLetters);
</script>

<SectionWrapper>
  {#if page?.status === 404 || page?.status === 403}
    <div
      class="flex flex-col items-center justify-center p-4"
      style="min-height: 50vh;"
    >
      <div class="flex items-center justify-center space-x-4">
        <h1
          class="text-4xl font-bold text-gray-800 border-r border-gray-800 pr-8 animate-fade-in"
        >
          <span in:fly={{ y: 50, duration: 500 }}>{page?.status}</span>
        </h1>
        <div class="flex items-center justify-center">
          <div class="flex space-x-1">
            {#each letters as letter, i}
              <span
                class="text-lg font-semibold transition-all duration-300"
                style:opacity={i < visibleCount ? 1 : 0}
                style:transform={i < visibleCount
                  ? "translateY(0)"
                  : "translateY(1rem)"}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="flex flex-col justify-start items-center gap-2">
      <!-- <LottiePlayer src={lottie} height={400} width={400} /> -->
      <img src={errorGif} alt="error" height="400" width="400" />
      {#if !isAuthLayout && !page.data.user?.authToken}
        <ErrorTitle>You've been logged out.</ErrorTitle>
        <Button variant="black" onclick={() => goto("/login")}>Login</Button>
      {:else}
        <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
        <ErrorDescription>
          We couldn’t process your request at this time. Please try again later
          or contact support if the problem persists.
        </ErrorDescription>
      {/if}
    </div>
  {/if}
</SectionWrapper>
