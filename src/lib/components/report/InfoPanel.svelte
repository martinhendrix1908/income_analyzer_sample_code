<script lang="ts">
  import InfoPanelIcon from "$lib/icons/InfoPanelIcon.svelte";

  let { title, body }: { title: string; body: string } = $props();
</script>

<div class="border border-[#2F80ED] ... rounded bg-[#2F80ED1A] overflow-hidden">
  <div
    class="lg:items-center text-[#2F80ED] inline-flex items-center w-full pl-8 sm:pr-4 py-1 my-4 2xl:flex-nowrap flex-wrap gap-2"
  >
    <InfoPanelIcon />

    <span class="sm:ml-2 sm:text-[24px] text-[20px] font-medium">{title}</span>

    <span
      class="text-left text-[16px] text-naro-600 xl:mt-0.5 ml-7 sm:ml-9 xl:ml-0"
    >
      {body}</span
    >
  </div>
</div>
