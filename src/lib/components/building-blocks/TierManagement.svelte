<script lang="ts">
  import RecycleBin from "$lib/icons/RecycleBin.svelte";
  import EditIcon from "$lib/icons/EditIcon.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import SaveIcon from "$lib/icons/SaveIcon.svelte";
  import type { Tier } from "$lib/types/organizations.types";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import CrossCircle from "$lib/icons/CrossCircle.svelte";
  import ConfirmationPopup from "$lib/components/building-blocks/ConfirmationPopup.svelte";
  import { deepClone } from "$lib/utils/common-utils";

  let {
    type,
    tiers,
    updateTiers,
  }: { type: string; tiers: Tier[]; updateTiers: (tiers: Tier[]) => void } =
    $props();

  let localTierState = $state<Tier[]>([]);
  let editingTierIndex = $state<number | null>(null);
  let editingTier = $state<Partial<Tier> | null>(null);
  let editingDiv = $state<HTMLElement | null>(null);
  let isOpen = $state<boolean>(false);
  let removeTierIndex = $state<number | null>(null);

  function startEditing(index: number) {
    editingTierIndex = index;
    editingTier = {
      minUnits: localTierState[index].minUnits,
      maxUnits: localTierState[index].maxUnits,
      pricePerUnit: localTierState[index].pricePerUnit,
      isDeleted: localTierState[index].isDeleted,
    };
  }

  function startAddingTier() {
    const lastTier = localTierState[localTierState.length - 1];
    const newTier: Tier = {
      tierId: 0, // Set to 0 as specified
      minUnits: lastTier
        ? lastTier.maxUnits
          ? lastTier.maxUnits + 1
          : lastTier.minUnits + 1
        : 0,
      maxUnits: null,
      pricePerUnit: 0,
      isDeleted: false,
    };

    localTierState = [...localTierState, newTier];
    startEditing(localTierState.length - 1);
    // updateTiers(localTierState);
  }

  function cancelEditing() {
    if (
      editingTierIndex !== null &&
      localTierState[editingTierIndex].tierId === 0
    ) {
      const tierCopy = localTierState.filter(
        (_, index) => index !== editingTierIndex
      );
      localTierState = tierCopy;
    }
    // updateTiers(localTierState);
    editingTierIndex = null;
    editingTier = null;
  }

  function saveTier() {
    if (editingTierIndex === null || !editingTier) return;

    localTierState = localTierState
      .map((tier, index) =>
        index === editingTierIndex
          ? {
              ...tier,
              minUnits: Number(editingTier?.minUnits),
              maxUnits: !editingTier?.maxUnits
                ? null
                : Number(editingTier?.maxUnits),
              pricePerUnit: Number(editingTier?.pricePerUnit),
              isDeleted: false,
            }
          : tier
      )
      .sort((a, b) => a.minUnits - b.minUnits);

    // Update the tiers in the parent component
    updateTiers(localTierState);
    editingTierIndex = null;
    editingTier = null;
  }

  function removeTier(index: number | null) {
    if (index === null) return;
    if (localTierState.length <= 1) return;
    if (localTierState[index].tierId === 0) {
      localTierState = localTierState.filter((_, i) => i !== index);
    } else {
      const tierList = localTierState.map((tier, i) => {
        if (i === index) {
          return {
            ...tier,
            isDeleted: true,
          };
        } else {
          return tier;
        }
      });
      localTierState = tierList;
    }
    updateTiers(localTierState);
  }

  $effect(() => {
    localTierState = deepClone(tiers);
  });
</script>

<div class="space-y-6">
  <div
    class="flex flex-col md:flex-row justify-between md:items-center gap-2 lg:gap-0"
  >
    <h3 class="text-lg font-medium text-gray-900 capitalize">
      {type} Pricing Tiers
    </h3>
    <Button type="button" variant="blue" onclick={startAddingTier}>
      <GroupIcon fillColor="#FFFFFF" />
      <span>Add Tier</span>
    </Button>
  </div>

  <!-- Tiers Table -->
  <div class="space-y-4">
    {#if localTierState.length === 0}
      <p class="text-gray-500 italic">No {type} pricing tier defined</p>
    {:else}
      <div
        class="grid grid-cols-4 gap-4 font-medium text-sm text-gray-600 px-3"
      >
        <div>Min Units</div>
        <div>Max Units</div>
        <div>Price($)/Unit</div>
        <div class="text-right">Actions</div>
      </div>

      {#each localTierState as tier, index (index)}
        {#if !tier?.isDeleted}
          <div
            class="grid grid-cols-4 gap-4 items-start bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors"
            bind:this={editingDiv}
          >
            {#if editingTierIndex === index && editingTier}
              <!-- Editing Mode -->
              <div>
                <InputField
                  bind:value={editingTier.minUnits}
                  class="w-full"
                  numberOnly
                />
              </div>
              <div>
                <InputField
                  bind:value={editingTier.maxUnits}
                  min={editingTier?.minUnits || 0 + 1}
                  placeholder="Leave empty for unlimited"
                  class="w-full"
                  numberOnly
                />
              </div>
              <div>
                <InputField
                  bind:value={editingTier.pricePerUnit}
                  class="w-full"
                  isFloat
                  error={editingTier.pricePerUnit === 0
                    ? "Price cannot be 0"
                    : ""}
                  isPriceField
                />
              </div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="default"
                  class="border-none !bg-transparent !hover:bg-transparent"
                  onclick={saveTier}
                >
                  <SaveIcon fillColor={true ? "#16a34a" : "#CCCCCC"} />
                </Button>
                <Button
                  type="button"
                  variant="default"
                  class="border-none !bg-transparent !hover:bg-transparent disabled:opacity-50"
                  onclick={cancelEditing}
                >
                  <CrossCircle fillColor="#BE0027" />
                </Button>
              </div>
            {:else}
              <!-- Display Mode -->
              <div>{tier.minUnits.toLocaleString()}</div>
              <div>
                {!tier.maxUnits
                  ? "Unlimited"
                  : tier?.maxUnits?.toLocaleString()}
              </div>
              <div>{convertToUSD(tier.pricePerUnit)}</div>
              <div class="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="default"
                  class="border-none !bg-transparent !hover:bg-transparent"
                  onclick={() => startEditing(index)}
                >
                  <EditIcon fillColor="#0a84ff" />
                </Button>

                <Button
                  variant="default"
                  class="border-none !bg-transparent !hover:bg-transparent disabled:opacity-50"
                  onclick={() => {
                    removeTierIndex = index;
                    isOpen = true;
                  }}
                  disabled={localTierState.length <= 1}
                >
                  <RecycleBin fillColor="#BE0027" />
                </Button>
              </div>
            {/if}
          </div>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<ConfirmationPopup
  bind:isOpen
  onConfirm={() => removeTier(removeTierIndex)}
  confirmationMessage="Are you sure you want to delete this tier?"
  onClose={() => {
    isOpen = false;
    removeTierIndex = null;
  }}
/>
