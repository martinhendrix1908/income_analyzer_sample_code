<script lang="ts">
    import { onMount } from "svelte";
    let Lottie: any = $state(undefined);
    let {
        src,
        autoplay = true,
        loop = true,
        controls = false,
        renderer = "svg",
        background = "transparent",
        height,
        width,
        controlsLayout = {},
    } = $props();
    onMount(async () => {
        // @ts-ignore
        const module = await import("@lottiefiles/svelte-lottie-player");
        Lottie = module.LottiePlayer;
    });
</script>

{#if Lottie}
    <Lottie
        this={Lottie}
        {src}
        {autoplay}
        {loop}
        {controls}
        {renderer}
        {background}
        {height}
        {width}
        {controlsLayout}
    />
{/if}
