<script lang="ts">
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import SvelteFlow from "$lib/components/svelte-flow/SvelteFlow.svelte";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  let popUpBody = $state<HTMLDivElement>();
  let { isOpen = $bindable() }: { isOpen: boolean } = $props();
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <div
    class="max-w-[1084px] w-[1084px] px-8 py-4 flex flex-col gap-8 bg-[#FFFFFF] rounded-2xl"
    bind:this={popUpBody}
  >
    <div class="flex justify-between items-center gap-4">
      <h3 class="text-xl font-semibold leading-[32px] text-[#000000]">
        Organization Structure
      </h3>
      <button onclick={() => (isOpen = false)}>
        <CloseIcon />
      </button>
    </div>
    <div style="height:80vh;">
      <SvelteFlow />
    </div>
  </div>
</PopupWrapper>
