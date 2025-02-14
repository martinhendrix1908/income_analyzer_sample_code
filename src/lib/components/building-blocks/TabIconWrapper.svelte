<script lang="ts">
  import type { Component } from "svelte";

  let {
    tabIcons,
    tab,
    fillColor = "currentColor",
  }: {
    tabIcons: { [key: string]: Component };
    tab: string;
    fillColor?: string;
  } = $props();
  const TabIcon = (tabIcons || {})[tab];
</script>

{#if TabIcon}
  <TabIcon {fillColor} filled={false} />
{/if}
