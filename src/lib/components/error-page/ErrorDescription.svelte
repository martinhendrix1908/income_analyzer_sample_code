<script lang="ts">
    let { children }: { children: any } = $props();
</script>

<p class="text-[16px] font-normal leading-6 text-gray-500 w-full text-center whitespace-normal">
   {@render children()}
</p>
