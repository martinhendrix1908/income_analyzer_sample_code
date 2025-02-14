<script lang="ts">
  import SortIcon from "$lib/icons/SortIcon.svelte";

  let {
    sortOrder,
    sortApplied = false,
  }: { sortOrder: "asc" | "desc" | undefined; sortApplied: boolean } = $props();
</script>

<SortIcon
  fillColor1={sortApplied && sortOrder === "asc" ? "#9C9C9C" : "white"}
  fillColor2={sortApplied && sortOrder === "desc" ? "#9C9C9C" : "white"}
/>
