<script lang="ts">
    let { children }:{children:any} = $props();
</script>

<h1 class="font-semibold text-xl leading-6 w-full text-center">
    {@render children()}
</h1>
