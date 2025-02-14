<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import OrgStructurePopup from "$lib/components/group-management/popups/OrgStructurePopup.svelte";
  import ArrowOutwardIcon from "$lib/icons/ArrowOutwardIcon.svelte";
  import HubspotIcon from "$lib/icons/HubspotIcon.svelte";
  import JiraIcon from "$lib/icons/JiraIcon.svelte";
  import ReleaseAlertIcon from "$lib/icons/ReleaseAlertIcon.svelte";

  interface TabProps {
    label: string;
    value: string;
    icon?: string;
  }
  const allTabs = [
    { label: "Details", value: "details" },
    { label: "Notes", value: "notes" },
    { label: "Activity", value: "activity" },
    { label: "Billing", value: "billing" },
    { label: "Errors", value: "errors", icon: "release-alert-icon" },
    { label: "API", value: "api" },
    { label: "Contacts", value: "contacts" },
    { label: "Subscription", value: "subscription" },
    { label: "Third-Party Integrations", value: "third-party-integrations" },
    { label: "Tickets", value: "tickets" },
    { label: "Settings", value: "settings" },
  ];
  let tabs = $state<TabProps[]>([]);
  let isOrgStructurePopupOpen = $state(false);
  $effect(() => {
    const client = [
      "details",
      "billing",
      "subscription",
      "api",
      "contacts",
      "settings",
    ];
    const excludeAdmin = ["settings"];
    tabs = allTabs.filter((tab) => !excludeAdmin.includes(tab.value));
    if (page?.data?.user.orgId !== "0") {
      tabs = allTabs.filter((tab) => client.includes(tab.value));
    }
  });
</script>

<div
  class="bg-naro-600 py-4 shadow-3xl sticky z-10 top-[60px] lg:top-[72px] left-0 border-t border-[#595959]"
>
  <div
    class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto gap-6 flex flex-wrap justify-between"
  >
    <Tabs
      variant="secondary"
      class="gap-x-4"
      tabs={tabs.map((tab) => tab.label)}
      tabIcons={{ Errors: ReleaseAlertIcon, Settings: ArrowOutwardIcon }}
      activeTab={allTabs.find(
        (item) => item.value === page?.url?.pathname?.split("/")?.pop()
      )?.label}
      showTabNames={true}
      onTabClick={(tab) => {
        if (tab === "Settings") {
          goto(
            `/manage/organizations/${page?.data?.orgDetails?.orgUnitId}?type=Organization&tab=Settings&menu=Details`,
            { noScroll: true }
          );
        } else {
          goto(
            `/manage-organizations/${page?.params?.org_id}/${allTabs.find((item) => item.label === tab)?.value}`,
            { noScroll: true }
          );
        }
      }}
    />

    <div class="flex justify-between flex-wrap gap-4 w-full xl:w-fit">
      <div class="flex gap-4">
        <Button
          variant="blue"
          class="whitespace-nowrap"
          onclick={() => (isOrgStructurePopupOpen = true)}
          >View Org Structure</Button
        >
        {#if page?.data?.user?.orgId === "0"}
          <Button variant="blue" class="whitespace-nowrap"
            >Login as Client</Button
          >
        {/if}
      </div>
      <div class="flex gap-4 cursor-pointer">
        <HubspotIcon />
        <JiraIcon />
      </div>
    </div>
  </div>
</div>
<OrgStructurePopup bind:isOpen={isOrgStructurePopupOpen} />
