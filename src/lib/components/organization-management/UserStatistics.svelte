<script lang="ts">
  import { page } from "$app/state";

  let stats = $derived.by(() => {
    let organizationDetails = page.data?.organizationDetails;
    return [
      { label: "Total Users", value: organizationDetails?.totalUsers || "0" },
      { label: "Active Users", value: organizationDetails?.activeUsers || "0" },
      { label: "Total Groups", value: organizationDetails?.totalGroups || "0" },
      {
        label: "Total Active Groups",
        value: organizationDetails?.activeGroups || "0",
      },
      { label: "Total Units", value: organizationDetails?.totalUnits || "0" },
      {
        label: "Total Active Units",
        value: organizationDetails?.activeUnits || "0",
      },
    ];
  });
</script>

<section
  class="flex flex-wrap gap-10 xl:justify-between items-start font-medium"
>
  {#each stats as stat}
    <article class="flex flex-col w-[123px]">
      <h2 class="text-sm text-neutral-700">{stat.label}</h2>
      <p class="mt-2 text-2xl leading-loose text-emerald-700">{stat.value}</p>
    </article>
  {/each}
</section>
