<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import AddThirdPartyIntgrationPopup from "$lib/components/cmp/popups/AddThirdPartyIntgrationPopup.svelte";
  import AddTicketPopup from "$lib/components/cmp/popups/AddTicketPopup.svelte";
  import ThirdPartyIntgrationsTable from "$lib/components/cmp/tables/ThirdPartyIntgrationsTable.svelte";
  import TicketsTable from "$lib/components/cmp/tables/TicketsTable.svelte";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";
  import type { ThirdPartyIntegration } from "$lib/types/organizations.types";

  let isOpen = $state(false);
  let intergrationData = $state<ThirdPartyIntegration | undefined>(undefined);

  const handleClick = (data: ThirdPartyIntegration | undefined) => {
    intergrationData = data;
    isOpen = true;
  };
</script>

<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Third-Party Integrations
        </h3>
      </div>
    </div>
    <Button variant="primary" onclick={() => handleClick(undefined)}>
      <SettingsIcon />
      Add New Integration</Button
    >
  </div>
  <ThirdPartyIntgrationsTable handleManageClick={handleClick} />
</div>
<AddThirdPartyIntgrationPopup
  bind:isOpen
  {intergrationData}
/>
