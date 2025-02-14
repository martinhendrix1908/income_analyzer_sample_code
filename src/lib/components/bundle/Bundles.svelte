<script lang="ts">
  import { goto } from "$app/navigation";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import BundlesTable from "$lib/components/bundle/BundlesTable.svelte";

</script>

<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">Manage Bundles</h3>
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-2">
      <Button
        type="button"
        variant="primary"
        onclick={() => goto("/manage/bundles/0")}
      >
        <GroupIcon />
        Add Bundle
      </Button>
    </div>
  </div>
  <BundlesTable />
</div>
