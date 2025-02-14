<script lang="ts">
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import Button from "./Button.svelte";
  type ConfirmationPopupProps = {
    isOpen: boolean;
    // children?: any;
    title?: string;
    confirmationMessage?: string;
    onConfirm?: () => void;
    onClose?: () => void;
  };

  let {
    isOpen = $bindable(),
    // children,
    confirmationMessage = "Are you sure you want to perform this action?",
    onConfirm,
    onClose,
  }: ConfirmationPopupProps = $props();
  let popUpBody = $state<HTMLDivElement | undefined>(undefined);

  function handleConfirm() {
    onConfirm?.();
    isOpen = false;
  }

  function handleClose() {
    isOpen = false;
    onClose?.();
  }
</script>

<!-- {@render children()} -->
<PopupWrapper bind:isOpen {popUpBody} onClose={handleClose}>
  <div
    class="flex relative flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 gap-6"
    bind:this={popUpBody}
  >
    <h4
      class="w-full text-lg font-semibold leading-none text-neutral-800 max-md:max-w-full"
    >
      Confirm
    </h4>
    <h2
      class="w-full text-base font-medium leading-none text-neutral-800 max-md:max-w-full"
    >
      {confirmationMessage}
    </h2>
    <footer class="flex gap-2  item-end w-full justify-end">
      <Button class="whitespace-nowrap" variant="black" onclick={handleConfirm}>
        Yes
      </Button>
      <Button class="" variant="black" outlined onclick={handleClose}>
        No
      </Button>
    </footer>
  </div>
</PopupWrapper>
