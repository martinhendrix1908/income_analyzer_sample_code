<script lang="ts">
  import ActivityTable from "$lib/components/cmp/tables/ActivityTable.svelte";
</script>

<div class="flex md:flex-row flex-col gap-2 -mb-7">
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
      Activity
    </h3>
  </div>
</div>
<ActivityTable />
