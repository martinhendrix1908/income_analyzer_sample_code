<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import OrgStructureIcon from "$lib/icons/OrgStructureIcon.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import OrgStructurePopup from "$lib/components/group-management/popups/OrgStructurePopup.svelte";
  import UserStatistics from "$lib/components/organization-management/UserStatistics.svelte";
  let activeTab = $state("Overview");
  let isOrgStructurePopupOpen = $state(false);
</script>

<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">
          {page.data?.organizationDetails?.name || "N/A"}
        </h3>
      </div>
      <Tabs
        tabs={["Overview", "Billing", "Settings"]}
        variant="black"
        {activeTab}
        onTabClick={(tab) => {
          if (tab === "Settings") {
            goto(
              "/manage/organizations/1/?type=Organization&tab=Settings&menu=Details",
            );
          }
        }}
      />
    </div>
    <Button
      type="button"
      variant="black"
      onclick={() => {
        isOrgStructurePopupOpen = true;
      }}
    >
      <OrgStructureIcon />
      View Org Structure
    </Button>
  </div>
  <UserStatistics />
</div>
<OrgStructurePopup bind:isOpen={isOrgStructurePopupOpen} />
