<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import OrganizationSearchBar from "$lib/components/organization-management/OrganizationSearchBar.svelte";
  import RolesTable from "$lib/components/organization-management/RolesTable.svelte";
  import AddRolePopup from "$lib/components/roles-management/AddRolePopup.svelte";
  import AddUserIcon from "$lib/icons/AddUserIcon.svelte";
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let searchValue = $state<string>("");
  let isOpen = $state(false);
  let currentRole = $state<{ roleId: string; name: string }>({
    roleId: "",
    name: "",
  });
  let isRoleChanged = $state(false);
</script>

<SectionWrapper>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
    >
      <div class="flex md:flex-row flex-col gap-2">
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">Manage User Roles</h3>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-2 md:gap-4">
        <OrganizationSearchBar bind:searchValue />
        <Button
          type="button"
          variant="primary"
          onclick={() => (isOpen = !isOpen)}
        >
          <AddUserIcon />
          Create New User Role
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <RolesTable
        bind:sortBy
        bind:sortOrder
        {searchValue}
        bind:currentRole
        bind:isOpen
        bind:isRoleChanged
      />
    </div>
  </div>
</SectionWrapper>
<AddRolePopup bind:currentRole bind:isOpen bind:isRoleChanged />
