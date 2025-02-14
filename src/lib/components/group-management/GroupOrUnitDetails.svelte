<script lang="ts">
  import { page } from "$app/state";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import GroupUnitSection from "$lib/components/group-management/layout/GroupUnitSection.svelte";
  import GroupUnitSidebar from "$lib/components/group-management/layout/GroupUnitSidebar.svelte";
  import { OrganizationClaims } from "$lib/constants";
  import type { Claim } from "$lib/types/types";

  let claims = $state<Partial<Claim>[]>([...OrganizationClaims]);
  let allTabs = $state(["Settings", "Groups", "Units", "Members"]);
  let activeTab = $state("Settings");

  let tabs = $derived.by(() => {
    const type = (page.url.searchParams.get("type") || "").toLowerCase();
    // if (type === "group") return allTabs.filter((tab) => tab !== "Groups");
    if (type === "unit")
      return allTabs.filter((tab) => !(tab === "Units" || tab === "Groups"));
    // if (type === "organization")
    //   return allTabs.filter((tab) => !(tab === "Units"));
    return allTabs;
  });
  $effect(() => {
    activeTab = page.url.searchParams.get("tab") || "";
  });
</script>

<SectionWrapper>
  <div class="flex flex-col md:flex-row gap-6">
    <GroupUnitSidebar menuItems={claims as Claim[]} {tabs} bind:activeTab />
    <GroupUnitSection {activeTab} />
  </div>
</SectionWrapper>
