<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";

  onMount(() => {
    goto("/manage-organizations/" + page.params.org_id + "/details");
  });
</script>

<div></div>
