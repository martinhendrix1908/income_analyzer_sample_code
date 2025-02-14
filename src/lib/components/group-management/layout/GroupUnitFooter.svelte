<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  let {
    onSaveClick,
    onCancelClick,
    disabled,
  }: {
    onSaveClick?: () => void;
    onCancelClick?: () => void;
    disabled?: boolean;
  } = $props();
</script>

<footer
  class="flex justify-end gap-2 items-center w-full pt-10 border-t border-solid border-neutral-400"
>
  <Button variant="primary" type="submit" outlined onclick={onCancelClick}
    >Cancel</Button
  >
  <Button
    variant="primary"
    type="submit"
    {disabled}
    onclick={!disabled ? onSaveClick : () => {}}>Apply Changes</Button
  >
</footer>
