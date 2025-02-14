<script lang="ts">
  import { page } from "$app/state";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import OrgActionNavigationBar from "$lib/components/cmp/top-banner/OrgActionNavigationBar.svelte";
  import OrgTopbar from "$lib/components/cmp/top-banner/OrgTopbar.svelte";

  let { children }: { children: any } = $props();
</script>

{#if page?.data?.user?.orgId === "0"}
  <OrgTopbar />
{/if}
<OrgActionNavigationBar />

<SectionWrapper>
  {@render children()}
</SectionWrapper>
