<script lang="ts">

  let {
    children,
    popUpBody,
    isOpen = $bindable(),
    onClose,
    className,
  }: {
    children: any;
    popUpBody?: HTMLFormElement | HTMLElement | undefined;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
  } = $props();

  const handleClickOutside = (event: any) => {
    if (popUpBody && !popUpBody?.contains(event.target)) {
      onClose?.();
      isOpen = false;
    }
  };

  // $effect(() => {
  //   if (document?.body.style && isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // });
</script>

{#if isOpen}
  <div
    role="none"
    class="flex fixed top-0 left-0 h-screen w-screen backdrop-brightness-75 z-50 items-center justify-center {className}"
    onmousedown={handleClickOutside}
  >
    {@render children()}
  </div>
{/if}
