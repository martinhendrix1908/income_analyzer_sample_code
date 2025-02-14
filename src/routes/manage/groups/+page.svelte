<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import NewEntityPopup from "$lib/components/group-management/popups/NewEntityPopup.svelte";
  import NestedGroupsTable from "$lib/components/organization-management/NestedGroupsTable.svelte";
  import OrganizationSearchBar from "$lib/components/organization-management/OrganizationSearchBar.svelte";
  import PopupMessage from "$lib/components/organization-management/PopupMessage.svelte";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let searchValue = $state<string>("");
  let isPopupOpen = $state(false);
  let isPopupMessageOpen = $state(true);
  const popupMessages = {
    
    groups: {
      title: "Groups:",
      message: `Groups serve as a flexible way to organize your Units into meaningful collections, such as regions, states, or districts, facilitating streamlined management and oversight. Use Groups to set collective policies, analyze performance data, and implement changes across multiple Units with ease. As your organization evolves, you can create new Groups or adjust existing ones to match your strategic goals, ensuring efficient administration and insightful analysis of your operations at any scale.`,
    },
  };
</script>

<SectionWrapper>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
    >
      <div class="flex md:flex-row flex-col gap-2">
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">Manage Groups</h3>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-2 md:gap-4">
        <OrganizationSearchBar bind:searchValue />
        <Button
          type="button"
          variant="primary"
          onclick={() => (isPopupOpen = true)}
        >
          <GroupIcon />
          Create New Group
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <PopupMessage
        title={popupMessages.groups.title}
        message={popupMessages.groups.message}
        isOpen={isPopupMessageOpen}
        Icon={UnitIcon}
      />
      <NestedGroupsTable bind:sortBy bind:sortOrder {searchValue} />
    </div>
  </div>
</SectionWrapper>
<NewEntityPopup type="Groups" bind:isOpen={isPopupOpen} />
