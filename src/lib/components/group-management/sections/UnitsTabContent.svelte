<script>
  import UnitsTable from "$lib/components/organization-management/UnitsTable.svelte";
</script>

<div>
  <UnitsTable
    searchValue=""
    sortBy="created"
    sortOrder="desc"
    fromManagementScreen
  />
</div>
