<script lang="ts">
  import { goto } from "$app/navigation";
  import Star from "$lib/icons/Star.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import FeaturesTable from "$lib/components/features/FeaturesTable.svelte";
</script>

<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">Manage Features</h3>
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-2">
      <Button
        type="button"
        variant="primary"
        onclick={() => goto("/manage/features/0")}
      >
        <Star fillColor="#FFFFFF" />
        Add Feature
      </Button>
    </div>
  </div>
  <FeaturesTable />
</div>
