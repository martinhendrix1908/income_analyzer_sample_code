<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";

  let {
    isOpen = $bindable(),
    title,
    description,
    onRemoveClick,
    onCancelClick,
  }: {
    isOpen: boolean;
    title: string;
    description: string;
    onRemoveClick: () => void;
    onCancelClick?: () => void;
  } = $props();
  let popUpBody = $state<HTMLDivElement>();
</script>

{#if isOpen}
  <PopupWrapper bind:isOpen {popUpBody}>
    <div
      class="max-w-[438px] p-6 flex flex-col gap-10 bg-[#FFFFFF] rounded-md"
      bind:this={popUpBody}
    >
      <div class="flex flex-col gap-2">
        <h3 class="text-[18px] leading-[21px] font-medium text-[#262626]">
          {title}
        </h3>
        <p class="font-normal leading-[21px] text-[#595959] text-sm">
          {description}
        </p>
      </div>
      <div class="flex gap-2">
        <Button variant="red" class="w-full" onclick={onRemoveClick}>
          Remove
        </Button>
        <Button
          class="w-full"
          variant="black"
          outlined
          onclick={() => {
            onCancelClick?.();
            isOpen = false;
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  </PopupWrapper>
{/if}
