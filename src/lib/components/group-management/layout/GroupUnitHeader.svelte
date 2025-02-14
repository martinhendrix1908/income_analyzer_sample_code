<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import type { Component } from "svelte";

  let {
    title,
    buttonLabel,
    ButtonIcon,
    onButtonClick,
    disabled = false,
  }: {
    title?: string;
    buttonLabel?: string;
    onButtonClick?: () => {};
    ButtonIcon?: Component;
    disabled?: boolean;
  } = $props();
</script>

<header>
  <div
    class="flex justify-between items-center gap-1 lg:gap-0 w-full pb-4 border-b border-solid border-neutral-400"
  >
    <div class="pr-2 md:border-r-4 border-parrot">
      <h3 class=" font-semibold leading-[21px] text-[20px] text-[#444444]">
        {title}
      </h3>
    </div>
    <!-- {#if buttonLabel}
      <Button variant="primary" {disabled}>
        {#if ButtonIcon}
          <ButtonIcon filled={false} />
        {/if}
        {buttonLabel}
      </Button>
    {/if} -->
  </div>
</header>
