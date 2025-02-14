<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import OrganizationSearchBar from "$lib/components/organization-management/OrganizationSearchBar.svelte";
  import UsersTable from "$lib/components/user-management/UsersTable.svelte";
  import AddUserIcon from "$lib/icons/AddUserIcon.svelte";
  let sortOrder = $state<"asc" | "desc">("desc");
  let sortBy = $state<string>("created");
  let searchValue = $state<string>("");
  let currentPage = $state<number>(1);
  let pageSize = $state(20);
  let totalRecords = $state(0);
</script>

<SectionWrapper>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
    >
      <div class="flex md:flex-row flex-col gap-2">
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">Manage Users</h3>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-2 md:gap-4">
        <OrganizationSearchBar bind:searchValue />
        <Button
          type="button"
          variant="primary"
          onclick={() => goto("/manage/users/0")}
        >
          <AddUserIcon />
          Add New User
        </Button>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <UsersTable
        bind:sortBy
        bind:sortOrder
        bind:totalRecords
        bind:currentPage
        bind:pageSize
        {searchValue}
      />
    </div>
  </div>
</SectionWrapper>
