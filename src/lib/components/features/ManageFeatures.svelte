<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { Feature, Tier } from "$lib/types/organizations.types";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { addToast } from "$lib/store/toast-store";
  import TierManagement from "$lib/components/building-blocks/TierManagement.svelte";
  import { areObjectsEqual } from "$lib/utils/common-utils";
  import SaveIcon from "$lib/icons/SaveIcon.svelte";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";

  let id = $derived(page.params.id);

  // Default tier configuration
  const DEFAULT_TIER = {
    tierId: 0,
    minUnits: 0,
    maxUnits: null, // null represents unlimited
    pricePerUnit: 0,
    isDeleted: false,
  };

  let feature = $state<Feature>({
    featureId: 0,
    featureName: "",
    basePrice: 0,
    description: "",
    platformFee: 0,
    code: "",
    tiers: [{ ...DEFAULT_TIER }],
  });
  let tiers = $state<Tier[]>([{ ...DEFAULT_TIER }]);
  let isUpdating = $state(false);
  let errorMessage = $state({
    featureName: "",
    basePrice: "",
    platformFee: "",
  });
  let trackChanges = $derived.by(() => {
    const basePrice = +feature.basePrice;
    const platformFee = +feature.platformFee;
    return areObjectsEqual(
      { ...feature, basePrice, platformFee },
      page?.data?.feature,
      ["created", "updated", "createdBy", "updatedBy"]
    );
  });

  const validateForm = () => {
    errorMessage = {
      featureName: "",
      basePrice: "",
      platformFee: "",
    };
    if (!feature.featureName.length) {
      errorMessage.featureName = "Feature name cannot be empty.";
    }
    if (!`${feature.basePrice}`) {
      errorMessage.basePrice = "Please enter a valid price.";
    }
    if (!`${feature.platformFee}`) {
      errorMessage.platformFee = "Please enter a valid platform fee.";
    }
    return Object.values(errorMessage).every((value) => value === "");
  };

  async function handleSave() {
    if (!validateForm()) return;
    isUpdating = true;
    try {
      if (feature.tiers.length === 0) {
        feature.tiers = [{ ...DEFAULT_TIER }];
      }

      const response = await fetch("/api/manage/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feature),
      });

      if (!response.ok) throw new Error("Failed to save feature");
      const responseData = await response.json();

      addToast({
        type: responseData?.succeeded ? "success" : "error",
        message: responseData?.succeeded
          ? "Feature saved successfully"
          : "Failed to save feature",
      });

      if (responseData?.succeeded) goto("/manage/features");
      isUpdating = false;
    } catch (error) {
      console.error("Error saving feature:", error);
      isUpdating = false;
      addToast({
        type: "error",
        message: "An error occurred while saving the feature",
      });
    }
  }

  const updateTiers = (_tiers: Tier[]) => {
    tiers = _tiers;
  };

  $effect(() => {
    feature.tiers = tiers;
  });

  onMount(async () => {
    if (id !== "0") {
      feature = page.data.feature;
      if (!feature.tiers || !feature.tiers.length) {
        feature = {
          ...feature,
          tiers: [
            {
              ...DEFAULT_TIER,
              pricePerUnit: feature.basePrice ?? 0,
            },
          ],
        };
      }
      tiers = [...feature.tiers];
    }
  });
</script>

<div class="">
  <div
    class="flex md:flex-row flex-col justify-between md:items-center gap-2 lg:gap-0 py-2 mb-4"
  >
    <div class="flex md:flex-row flex-col gap-2">
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">
          {id === "0" ? "Add Feature" : "Edit Feature"}
        </h3>
      </div>
    </div>
    <div class="flex md:flex-row flex-col gap-2">
      <Button
        type="submit"
        variant="primary"
        onclick={handleSave}
        disabled={trackChanges || isUpdating}
      >
        <SaveIcon />Save
      </Button>
    </div>
  </div>

  <div class="space-y-8">
    <!-- Basic Information -->
    <div class="space-y-4 bg-white rounded-md shadow p-6">
      <h3 class="text-lg font-medium">Feature Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <InputField
            id="name"
            type="text"
            bind:value={feature.featureName}
            required
            error={errorMessage.featureName}
          />
        </div>

        <div>
          <label
            for="basePrice"
            class="block text-sm font-medium text-gray-700"
          >
            Base Price ($)
          </label>
          <InputField
            id="basePrice"
            bind:value={feature.basePrice}
            oninput={(e) => {
              const inputValue = (e.target as HTMLInputElement).value;
              tiers = feature.tiers.map((tier, index) =>
                index === 0 && tier.tierId === 0
                  ? { ...tier, pricePerUnit: parseFloat(inputValue) }
                  : tier
              );
            }}
            isFloat
            error={errorMessage.basePrice}
            isPriceField
          />
        </div>

        <div>
          <label
            for="platformFee"
            class="block text-sm font-medium text-gray-700"
          >
            Platform Fee ($/month)
          </label>
          <InputField
            id="platformFee"
            bind:value={feature.platformFee}
            isFloat
            error={errorMessage.platformFee}
            isPriceField
          />
        </div>
      </div>

      <div>
        <label
          for="description"
          class="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          bind:value={feature.description}
          rows="4"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>

    <!-- Tier Management -->
    <div class="pt-6 bg-white rounded-md shadow p-6">
      <TierManagement type="feature" {tiers} {updateTiers} />
    </div>
  </div>
</div>
