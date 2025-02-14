<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Loader from "$lib/components/building-blocks/Loader.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    goto(`/manage-organizations/${page?.data?.user?.orgId}/details`);
  });
</script>

<Loader message="Loading..." />
