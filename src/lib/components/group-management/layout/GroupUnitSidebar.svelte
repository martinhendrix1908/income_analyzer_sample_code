<script lang="ts">
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import type { Claim } from "$lib/types/types";
  import { OrganizationClaims } from "$lib/constants";
  import GearIcon from "$lib/icons/GearIcon.svelte";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  import UserManagementIcon from "$lib/icons/UserManagementIcon.svelte";

  let {
    menuItems = $bindable(),
    activeTab = $bindable(),
    tabs,
  }: { menuItems: Claim[]; activeTab: string; tabs: string[] } = $props();

  const TabIcons = {
    Settings: GearIcon,
    Groups: GroupIcon,
    Units: UnitIcon,
    Members: UserManagementIcon,
  };

  let activeMenu = $derived.by(() => page.url.searchParams.get("menu") || "");

  let orgType = $derived.by(() => {
    let type = page.url.searchParams.get("type") || "";
    if (type) return type?.charAt(0)?.toUpperCase() + type?.slice(1);
    return "";
  });

  const handleNavigation = (claimType: string, subClaimType?: string) => {
    const url = new URL(page.url);
    url.searchParams.set("menu", claimType);
    url.searchParams.delete("subMenu");
    goto(url.href);
  };
  const handleTabChange = (tab: string) => {
    activeTab = tab;
    const url = new URL(page.url);
    url.searchParams.delete("menu");
    if (tab === "Settings") {
      url.searchParams.set("menu", "Details");
    }
    url.searchParams.set("tab", tab);
    goto(url.href);
  };

  const getClaimNameByType = (claimType: string): string | undefined => {
    const claim = OrganizationClaims.find(
      (item) => item.claimType === claimType
    );
    return claim
      ? claim.claimName === "Details"
        ? orgType + " " + claim.claimName
        : claim.claimName
      : undefined;
  };
</script>

<nav
  class="flex flex-col gap-2 p-4 text-base font-medium text-gray-900 bg-white rounded-md border-b border-solid border-[#E5E7EB] md:max-w-[249px] min-w-[249px] max-h-fit"
>
  {#key activeTab}
    <Tabs
      {tabs}
      {activeTab}
      variant="black"
      class="bg-[#F5F5F5] p-1 rounded-[4px]"
      onTabClick={handleTabChange}
      tabIcons={TabIcons}
      hideTooltip={orgType === "Unit"}
    />
  {/key}

  <hr class="w-full border border-solid bg-neutral-400 border-neutral-400" />
  <div class="min-h-[200px]">
    {#if page.url.searchParams.get("tab") === "Settings"}
      <section class="flex flex-col gap-2">
        {#each menuItems.filter((item) => !(item.claimType === "SubscriptionDetails" && (orgType === "Group" || orgType === "Unit"))) as navItem, i}
          <section class="flex flex-col w-full">
            <button
              class="flex items-center px-2 py-1.5 w-full whitespace-nowrap {activeMenu ===
              navItem.claimType
                ? 'bg-gray-100 rounded-md'
                : ''}"
              onclick={() => handleNavigation(navItem.claimType)}
            >
              <span class="flex-1 text-start shrink gap-3 self-stretch my-auto">
                {getClaimNameByType(navItem.claimType)}
              </span>
              <!-- {#if navItem.subClaims?.length > 0}
              <ChevronIcon
                direction={!navItem.isSubClaimOpen ? "down" : "up"}
              />
            {/if} -->
            </button>

            <!-- {#if navItem.subClaims.length > 0 && navItem.isSubClaimOpen}
            <ul class="flex flex-col gap-4 mt-2 w-full pl-9" transition:slide>
              {#each navItem.subClaims as subNavItem}
                <li class="w-full">
                  <a
                    href={null}
                    class="cursor-pointer {activeSubMenu ===
                    subNavItem.claimType
                      ? 'text-blue-600'
                      : ''}"
                    onclick={() =>
                      handleNavigation(navItem.claimType, subNavItem.claimType)}
                  >
                    {subNavItem.claimName}
                  </a>
                </li>
              {/each}
            </ul>
          {/if} -->
          </section>
        {/each}
      </section>
    {/if}
  </div>
</nav>
