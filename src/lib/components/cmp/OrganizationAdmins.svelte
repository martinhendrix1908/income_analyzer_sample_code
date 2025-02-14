<script lang="ts">
  import AddUserIcon from "$lib/icons/AddUserIcon.svelte";
  import type { IAdminDetails } from "$lib/types/organizations.types";
  import AdminsTable from "$lib/components/cmp/tables/AdminsTable.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import ManageAdminModal from "$lib/components/cmp/popups/ManageAdminModal.svelte";
  import { page } from "$app/state";

  let isOpen = $state(false);
  let revalidate = $state(false);
  let selectedAdmin = $state<IAdminDetails | undefined>(undefined);

  const handleAddAdmin = () => {
    selectedAdmin = undefined;
    isOpen = true;
  };

  const handleEditAdmin = (admin: IAdminDetails) => {
    selectedAdmin = { ...admin };
    isOpen = true;
  };

  const handleFormSubmit = (updatedAdmin: IAdminDetails) => {
    isOpen = false;
    revalidate = !revalidate;
  };
</script>

<div>
  <div
    class="flex flex-row justify-between items-center mb-6 md:mb-4 gap-1 lg:gap-0"
  >
    <div class="pr-2 md:border-r-4 border-parrot">
      <h3 class="text-xl font-medium text-neutral-900">Manage Administrator</h3>
    </div>
    <Button
      variant="primary"
      type="button"
      onclick={handleAddAdmin}
      class="flex items-center gap-2"
    >
      <AddUserIcon />
      Add Administrator
    </Button>
  </div>
  {#key revalidate}
    <AdminsTable onManageClick={handleEditAdmin} id={+page.params.org_id} />
  {/key}
</div>
<ManageAdminModal bind:isOpen adminData={selectedAdmin} {handleFormSubmit} />
