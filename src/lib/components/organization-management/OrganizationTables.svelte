<script lang="ts">
  import AddUserIcon from "$lib/icons/AddUserIcon.svelte";
  import FilterIcon from "$lib/icons/FilterIcon.svelte";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import UsersTable from "$lib/components/user-management/UsersTable.svelte";
  import OrganizationSearchBar from "$lib/components/organization-management/OrganizationSearchBar.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  import PopupMessage from "$lib/components/organization-management/PopupMessage.svelte";
  import UnitsTable from "$lib/components/organization-management/UnitsTable.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import Tabs from "$lib/components/building-blocks/Tabs.svelte";
  import { goto } from "$app/navigation";
  import NewEntityPopup from "$lib/components/group-management/popups/NewEntityPopup.svelte";
  import RolesTable from "$lib/components/organization-management/RolesTable.svelte";
  import NestedGroupsTable from "$lib/components/organization-management/NestedGroupsTable.svelte";

  const popupMessages = {
    units: {
      title: "Units:",
      message: `Units represent the primary operational entities within your organization, such as physical locations, online platforms, or service points. This is where your business activities happen and where customers interact with your services or products. Each application created is associated with a specific Unit to accurately track and manage business operations. As your organization grows, you can add more Units to reflect new locations or service expansions.`,
    },
    groups: {
      title: "Groups:",
      message: `Groups serve as a flexible way to organize your Units into meaningful collections, such as regions, states, or districts, facilitating streamlined management and oversight. Use Groups to set collective policies, analyze performance data, and implement changes across multiple Units with ease. As your organization evolves, you can create new Groups or adjust existing ones to match your strategic goals, ensuring efficient administration and insightful analysis of your operations at any scale.`,
    },
  };
  let isPopupOpen = $state(false);
  let isPopupMessageOpen = $state(true);

  let activeTab = $state("User Roles");

  //member states
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let currentPage = $state<number>(1);
  let pageSize = $state(20);
  let totalRecords = $state(0);
  let searchValue = $state<string>("");

  const reset = () => {
    sortOrder = "desc";
    sortBy = "created";
    currentPage = 1;
    pageSize = 20;
    totalRecords = 0;
    searchValue = "";
  };
</script>

<div>
  <div
    class="flex lg:flex-row flex-col justify-between lg:items-center gap-5 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Manage Organization
        </h3>
      </div>
      <Tabs
        tabs={["User Roles", "Members", "Groups", "Units"]}
        variant="black"
        {activeTab}
        onTabClick={(tab) => {
          activeTab = tab;
          reset();
        }}
      />
    </div>
    <div class="flex md:flex-row flex-col gap-2 md:gap-4">
      <OrganizationSearchBar bind:searchValue />
      <Button
        type="button"
        variant="black"
        class="bg-transparent hover:bg-[#D9D9D9] shadow-none hidden"
      >
        <FilterIcon />
        <span class="text-[#222222]">Filter</span>
      </Button>
      {#if activeTab === "Groups"}
        <Button
          type="button"
          variant="primary"
          onclick={() => (isPopupOpen = true)}
        >
          <GroupIcon />
          Create New Group
        </Button>
      {:else if activeTab === "Units"}
        <Button
          type="button"
          variant="primary"
          onclick={() => (isPopupOpen = true)}
        >
          <UnitIcon filled={false} />
          Create New Unit
        </Button>
      {:else if activeTab === "Members"}
        <Button
          type="button"
          variant="primary"
          onclick={() => goto("/user_management/0")}
        >
          <AddUserIcon />
          Add New Member
        </Button>
      {:else if activeTab === "User Roles"}
        <Button type="button" variant="primary" onclick={() => {}}>
          <AddUserIcon />
          Create New User Role
        </Button>
      {/if}
    </div>
  </div>
  <div class="flex flex-col gap-4">
    {#if activeTab === "Units"}
      <PopupMessage
        title={popupMessages.units.title}
        message={popupMessages.units.message}
        isOpen={isPopupMessageOpen}
        Icon={UnitIcon}
      />
      <UnitsTable bind:sortBy bind:sortOrder {searchValue} />
    {:else if activeTab === "Groups"}
      <PopupMessage
        title={popupMessages.groups.title}
        message={popupMessages.groups.message}
        isOpen={isPopupMessageOpen}
        Icon={UnitIcon}
      />
      <NestedGroupsTable bind:sortBy bind:sortOrder {searchValue} />
    {:else if activeTab === "Members"}
      <UsersTable
        bind:sortBy
        bind:sortOrder
        bind:totalRecords
        bind:currentPage
        bind:pageSize
        {searchValue}
      />
    {:else if activeTab === "User Roles"}
      <RolesTable bind:sortBy bind:sortOrder {searchValue} />
    {/if}
  </div>
</div>
<NewEntityPopup type={activeTab} bind:isOpen={isPopupOpen} />
