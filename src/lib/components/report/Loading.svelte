<script lang="ts">
  import { isLoading } from "$lib/store/loader-store";
  import { onDestroy, onMount } from "svelte";

  let { goBack = () => {} }: { goBack?: () => void } = $props();
  let fileProgress: number = $state(0);
  let progressInterval: ReturnType<typeof setInterval> | undefined =
    $state(undefined);

  onMount(() => {
    const predefinedProgress = [5, 20, 35, 45, 60, 75, 90, 100];
    let progressIndex = 0;
    const updateProgress = () => {
      fileProgress = predefinedProgress[progressIndex];
      progressIndex++;
      if (progressIndex >= predefinedProgress.length) {
        progressIndex = 0;
      }
    };
    updateProgress();
    progressInterval = setInterval(() => {
      updateProgress();
    }, 800);
  });
  onDestroy(() => {
    clearInterval(progressInterval);
  });
</script>

{#if !$isLoading}
  <div class="bg-naro conatiner h-calc flex items-center justify-center">
    <div class="flex items-center justify-center flex-col text-center gap-16">
      <div class="flex items-center justify-center">
        <div
          class="w-4 h-4 bg-[#09814A] rotate-[-45] rounded-[1px] animate-IA-switch-1"
        ></div>
        <div
          class="w-4 h-4 bg-[#98C43D] rotate-[-45] rounded-[1px] animate-IA-switch-2"
        ></div>
      </div>

      <div class="w-[160px] flex flex-col justify-center items-center">
        <div
          class="max-w-350px w-full h-[6px] bg-[#DDDDDD] rounded-lg overflow-hidden mb-5"
        >
          <div
            class="bg-[#09814A] h-[6px] rounded-lg transition-all ease-in"
            style="width: {fileProgress ?? 0}%"
          ></div>
        </div>
        <h1
          class="text-black text-base font-medium text-center leading-6 transition-all ease-in w-[58px] h-[24px]"
        >
          Loading
        </h1>
      </div>
      <button
        class="hidden border border-black text-black rounded transition-colors max-w-155px w-full py-3 sm:px-6 px-3 text-sm font-medium hover:bg-naro-100"
        onclick={goBack}>Go Back</button
      >
    </div>
  </div>
{/if}
