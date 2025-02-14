<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import AddContactPopup from "$lib/components/cmp/popups/AddContactPopup.svelte";
  import ContactsTable from "$lib/components/cmp/tables/ContactsTable.svelte";
  import GroupAddIcon from "$lib/icons/GroupAddIcon.svelte";

  let isOpen = $state(false);
  let type = $state<"client" | "admin">("client");
  let revalidate = $state(false);

</script>

<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Priority Contacts
        </h3>
      </div>
    </div>
    <Button
      variant="primary"
      onclick={() => {
        isOpen = true;
        type = "client";
      }}
    >
      <GroupAddIcon />
      Add Contact</Button
    >
  </div>
  {#key revalidate && type === "client"}<ContactsTable type="client" />{/key}
</div>
<div>
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
          Client Services Reps
        </h3>
      </div>
    </div>
    <Button
      variant="primary"
      onclick={() => {
        isOpen = true;
        type = "admin";
      }}
    >
      <GroupAddIcon />Add Contact</Button
    >
  </div>
  {#key revalidate && type === "admin"}<ContactsTable type="admin" />{/key}
</div>

{#key revalidate}<AddContactPopup bind:isOpen {type} bind:revalidate />{/key}
