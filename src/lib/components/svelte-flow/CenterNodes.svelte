<script lang="ts">
  import { useSvelteFlow } from "@xyflow/svelte";
  import type { Node } from "@xyflow/svelte";
  import { onDestroy, onMount } from "svelte";

  const { getNode, setCenter } = useSvelteFlow();
  let timeout: ReturnType<typeof setTimeout>;

  onMount(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate offset based on screen height
    const yOffset = screenHeight < 600 ? 200 : screenHeight < 900 ? 300 : 400;

    timeout = setTimeout(() => {
      const node = getNode("1") as Node;
      if (node) {
        setCenter(node.position.x + 60, node.position.y + yOffset, {
          zoom: screenWidth < 768 ? 0.6 : 0.8,
          duration: 1500,
        });
      }
    }, 50);
  });

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>
