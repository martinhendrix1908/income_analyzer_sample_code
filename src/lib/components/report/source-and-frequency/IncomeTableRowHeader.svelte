<script lang="ts">
  import HelpIcon from "$lib/icons/HelpIcon.svelte";

  let {
    title,
    tooltipDescription,
  }: { title: string; tooltipDescription: string } = $props();
</script>

<tr class="bg-naro-800">
  <td colspan="6" class="px-6 py-2 text-black text-sm">
    <div class="flex">
      <span class="font-medium">{title}</span>
      <div class="ml-2 cursor-pointer relative group">
        <HelpIcon />
        <div
          class="absolute hidden group-hover:block text-black bottom-6 bg-white min-w-240px sm:min-w-350px shadow-3xl -left-12 text-sm font-normal not-italic p-2 rounded z-20"
        >
          {tooltipDescription}
        </div>
      </div>
    </div>
  </td>
</tr>
