<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import type { Bundle, Feature, Tier } from "$lib/types/organizations.types";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { addToast } from "$lib/store/toast-store";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import TierManagement from "$lib/components/building-blocks/TierManagement.svelte";
  import { areObjectsEqual, deepClone } from "$lib/utils/common-utils";
  import type { Option } from "$lib/types/types";
  import SaveIcon from "$lib/icons/SaveIcon.svelte";

  let id = $derived(page.params.id);

  // Default tier configuration
  const DEFAULT_TIER = {
    tierId: 0,
    minUnits: 0,
    maxUnits: null, // null represents unlimited
    pricePerUnit: 0,
    isDeleted: false,
  };

  let bundle = $state<Bundle>({
    bundleId: 0,
    bundleName: "",
    bundlePrice: 0,
    featuresList: "",
    description: "",
    created: "",
    updated: "",
    platformFee: 0,
    tiers: [{ ...DEFAULT_TIER }],
  });
  let features = $derived.by<Option[]>(() => {
    return (
      page?.data?.features?.map((feature: any) => ({
        value: `${feature.featureId}`,
        label: feature.featureName,
      })) || []
    );
  });

  let selectedFeatures = $state<Option[]>([]);
  let tiers = $state<Tier[]>([{ ...DEFAULT_TIER }]);
  let isUpdating = $state(false);
  let errorMessage = $state({
    bundleName: "",
    bundlePrice: "",
    featuresList: "",
    platformFee: "",
  });
  let trackChanges = $derived.by(() => {
    const isSame = areObjectsEqual(
      {
        ...bundle,
        platformFee: +bundle.platformFee,
        bundlePrice: +bundle.bundlePrice,
      },
      page?.data?.bundle,
      ["created", "updated", "createdBy", "updatedBy"]
    );
    return isSame;
  });
  const validateForm = () => {
    errorMessage = {
      bundleName: "",
      bundlePrice: "",
      featuresList: "",
      platformFee: "",
    };
    if (!bundle.bundleName.length) {
      errorMessage.bundleName = "Bundle name cannot be empty.";
    }
    if (!`${bundle.bundlePrice}`) {
      errorMessage.bundlePrice = "Please enter a valid price.";
    }
    if (!bundle.featuresList.length) {
      errorMessage.featuresList = "Please select at least one feature.";
    }

    if (!`${bundle.platformFee}`) {
      errorMessage.platformFee = "Please enter a valid platform fee.";
    }
    return Object.values(errorMessage).every((value) => value === "");
  };

  async function handleSave() {
    if (!validateForm()) return;
    isUpdating = true;
    try {
      if (bundle.tiers.length === 0) {
        bundle.tiers = [{ ...DEFAULT_TIER }];
      }

      const response = await fetch("/api/manage/bundles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bundle),
      });

      if (!response.ok) throw new Error("Failed to save bundle");
      const responseData = await response.json();

      addToast({
        type: responseData?.succeeded ? "success" : "error",
        message: responseData?.succeeded
          ? "Bundle saved successfully"
          : "Failed to save bundle",
      });

      if (responseData?.succeeded) goto("/manage/bundles");
      isUpdating = false;
    } catch (error) {
      console.error("Error saving bundle:", error);
      addToast({
        type: "error",
        message: "An error occurred while saving the bundle",
      });
    }
  }

  const updateTiers = (_tiers: Tier[]) => {
    tiers = _tiers;
  };

  $effect(() => {
    bundle.tiers = tiers;
  });

  $effect(() => {
    selectedFeatures = features?.filter((feature: Option) =>
      bundle.featuresList
        ?.split(",")
        .map((item) => item.trim())
        ?.includes(feature.value.toString())
    );
  });

  onMount(async () => {
    if (id !== "0") {
      bundle = deepClone(page?.data?.bundle);
      const featuresList = bundle?.featuresList.split(",");
      const totalPrice = featuresList?.reduce((acc, item) => {
        const price = page?.data?.features.find(
          (feature: Feature) => feature?.featureId === +item
        )?.basePrice;
        return acc + price;
      }, 0);
      if (!bundle?.tiers || !bundle?.tiers?.length) {
        bundle = {
          ...bundle,
          bundlePrice: totalPrice ?? 0,
          tiers: [
            {
              ...DEFAULT_TIER,
              pricePerUnit: totalPrice,
            },
          ],
        };
      }
      tiers = bundle?.tiers;
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
          {id === "0" ? "Add Bundle" : "Edit Bundle"}
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
      <h3 class="text-lg font-medium">Bundle Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Name
          </label>
          <InputField
            id="name"
            type="text"
            bind:value={bundle.bundleName}
            error={errorMessage.bundleName}
            required
          />
        </div>
        <div>
          <label
            for="selectedFeatures"
            class="block text-sm font-medium text-gray-700"
          >
            Select Features
          </label>
          <DynamicSelect
            id="selectedFeatures"
            mode="multi"
            options={features}
            bind:selectedValues={selectedFeatures}
            placeholder="Select your features"
            onChange={(value) => {
              const featuresList = value.map((item) => item.value).join(",");
              bundle.featuresList = featuresList;
              const totalPrice = value.reduce((acc, item) => {
                const price = page.data?.features.find(
                  (feature: Feature) => feature.featureId === +item.value
                )?.basePrice;
                return acc + price;
              }, 0);
              bundle.bundlePrice = totalPrice;
              if (tiers[0].tierId === 0) {
                tiers[0].pricePerUnit = bundle.bundlePrice;
              }
            }}
            errorMessage={errorMessage.featuresList}
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
            bind:value={bundle.platformFee}
            error={errorMessage.platformFee}
            isFloat
            isPriceField
          />
        </div>

        <div>
          <label
            for="bundlePrice"
            class="block text-sm font-medium text-gray-700"
          >
            Bundle Price (Sum of selected features in $)
          </label>
          <InputField
            id="bundlePrice"
            bind:value={bundle.bundlePrice}
            disabled
            error={errorMessage.bundlePrice}
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
          bind:value={bundle.description}
          rows="4"
          required
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
    </div>

    <!-- Tier Management -->
    <div class="pt-6 bg-white rounded-md shadow p-6">
      <TierManagement type="bundle" {tiers} {updateTiers} />
    </div>
  </div>
</div>
