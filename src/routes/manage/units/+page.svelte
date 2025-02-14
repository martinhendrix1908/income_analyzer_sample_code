<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import NewEntityPopup from "$lib/components/group-management/popups/NewEntityPopup.svelte";
  import OrganizationSearchBar from "$lib/components/organization-management/OrganizationSearchBar.svelte";
  import PopupMessage from "$lib/components/organization-management/PopupMessage.svelte";
  import UnitsTable from "$lib/components/organization-management/UnitsTable.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let searchValue = $state<string>("");
  let isPopupOpen = $state(false);
  let isPopupMessageOpen = $state(true);
  const popupMessages = {
    units: {
      title: "Units:",
      message: `Units represent the primary operational entities within your organization, such as physical locations, online platforms, or service points. This is where your business activities happen and where customers interact with your services or products. Each application created is associated with a specific Unit to accurately track and manage business operations. As your organization grows, you can add more Units to reflect new locations or service expansions.`,
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
          <h3 class="text-black font-medium opacity-85">Manage Units</h3>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-2 md:gap-4">
        <OrganizationSearchBar bind:searchValue />
        <Button
          type="button"
          variant="primary"
          onclick={() => (isPopupOpen = true)}
        >
          <UnitIcon />
          Create New Unit
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <PopupMessage
      title={popupMessages.units.title}
      message={popupMessages.units.message}
      isOpen={isPopupMessageOpen}
      Icon={UnitIcon}
    />
    <UnitsTable bind:sortBy bind:sortOrder {searchValue} />
    </div>
  </div>
</SectionWrapper>
<NewEntityPopup type="Units" bind:isOpen={isPopupOpen} />
