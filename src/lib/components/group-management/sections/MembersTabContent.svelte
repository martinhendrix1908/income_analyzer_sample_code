<script lang="ts">
  import UsersTable from "$lib/components/user-management/UsersTable.svelte";
  let currentPage = $state(1);
  let pageSize = $state(20);
  let sortBy = $state("created");
  let sortOrder = $state<"asc" | "desc">("desc");
  let searchValue = $state("");
  let totalRecords = $state(1);
</script>

<div>
  <UsersTable
    bind:currentPage
    bind:pageSize
    bind:sortBy
    bind:sortOrder
    bind:searchValue
    bind:totalRecords
    fromManagementScreen
  />
</div>
