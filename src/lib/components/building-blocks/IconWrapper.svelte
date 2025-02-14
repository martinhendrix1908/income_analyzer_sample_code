<script lang="ts">
  import type { Component } from "svelte";

  let {
    Icon,
    fillColor = "currentColor",
    height,
    width,
  }: {
    Icon: Component;
    fillColor?: string;
    height?: string;
    width?: string;
  } = $props();
</script>

<Icon {fillColor} {height} {width} />
