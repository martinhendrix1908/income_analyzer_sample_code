<script lang="ts">
  import HelpIcon from "$lib/icons/HelpIcon.svelte";
  import clsx from "clsx";
  import Tooltip from "$lib/components/building-blocks/Tooltip.svelte";
  let {
    content,
    children,
    class: customClass,
  }: { content?: string; children?: any; class?: string } = $props();
</script>

<Tooltip
  variant="light"
  position="top"
  class="inline-flex justify-center items-center"
>
  <i class="align-middle translate-y-[3px]"><HelpIcon /></i>
  {#snippet componentContent()}
    {#if content || children}
      <div
        class={clsx(
          "bg-[#ebf3fe] text-[#262626] p-2 rounded-md border border-[#0A84FF] shadow-md",
          customClass
        )}
      >
        {#if children}
          {@render children()}
        {:else}
          {#if (content?.split(":")?.length as number) > 1}
            <div class="font-bold text-[12px] leading-[18px]">
              {content?.split(":")[0]}:
            </div>
          {/if}
          <div class="font-normal italic text-[12px] leading-[18px]">
            {content?.split(":")[1] || content}
          </div>
        {/if}
      </div>
    {/if}
  {/snippet}
</Tooltip>
