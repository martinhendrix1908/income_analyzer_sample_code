<script lang="ts">
  import AppartmentIcon from "$lib/icons/AppartmentIcon.svelte";
  import type { IOrganizationDetails } from "$lib/types/organizations.types";
  import Button from "$lib/components/building-blocks/Button.svelte";

  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import OrganizationsTable from "$lib/components/cmp/tables/OrganizationsTable.svelte";
  import OrganizationModal from "$lib/components/cmp/popups/OrganizationModal.svelte";

  let isOpen = $state(false);
  let revalidate = $state(false);
  let orgData = $state<IOrganizationDetails | undefined>(undefined);

  const handleClick = (data: IOrganizationDetails | undefined) => {
    orgData = data ? { ...data } : undefined;
    isOpen = true;
  };

  const handleFormSubmit = (data: IOrganizationDetails) => {
    revalidate = !revalidate;
  };
</script>

<SectionWrapper>
  <div>
    <div
      class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
    >
      <div class="flex md:flex-row flex-col gap-2">
        <div class="pr-2 md:border-r-4 border-parrot">
          <h3 class="text-black font-medium opacity-85">
            Manage Organizations
          </h3>
        </div>
      </div>
      <div class="flex md:flex-row flex-col gap-2">
        <Button
          type="button"
          variant="primary"
          onclick={() => handleClick(undefined)}
        >
          <AppartmentIcon />
          Add Organization
        </Button>
      </div>
    </div>
    {#key revalidate}<OrganizationsTable onClick={handleClick} />{/key}
  </div>
</SectionWrapper>

<OrganizationModal bind:isOpen {orgData} {handleFormSubmit} />
