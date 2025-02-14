<script lang="ts">
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  let {
    isOpen,
    message,
    title,
    Icon,
  }: { isOpen: Boolean; message: string; title: string; Icon?: any } = $props();
</script>

{#if isOpen}
  <div class=" bg-[#2F80ED1A] rounded-md border border-[#0A84FF] flex">
    <div class="p-4 flex md:flex-row flex-col-reverse">
      <div class="flex flex-col gap-2">
        <div
          class="text-[16px] leading-6 font-medium text-[#0A84FF] flex gap-2"
        >
          {#if Icon}
            <Icon />
          {/if}
          {title}
        </div>
        <p class="text-[16px] leading-[21px] font-normal text-[#222222]">
          {message}
        </p>
      </div>
      <button
        class="md:pr-[34px] md:ps-10 h-fit w-fit ms-auto px-4"
        onclick={() => (isOpen = !isOpen)}
      >
        <CloseIcon />
      </button>
    </div>
  </div>
{/if}
