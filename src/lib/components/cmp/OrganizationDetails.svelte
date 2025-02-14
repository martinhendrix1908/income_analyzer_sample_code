<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { page } from "$app/state";
  import SaveIcon from "$lib/icons/SaveIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type {
    Bundle,
    Feature,
    IOrganizationDetails,
  } from "$lib/types/organizations.types";
  import { onMount } from "svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { areObjectsEqual, deepClone } from "$lib/utils/common-utils";
  import type { Option } from "$lib/types/types";

  let errorMessage = $state({
    organizationName: "",
  });

  let isLoading = $state(false);
  let localOrgState = $state<IOrganizationDetails>({
    organizationName: "",
    isActive: true,
    bundleId: "",
    featureIds: "",
  } as IOrganizationDetails);

  let bundles: Option[] = $derived.by(() => {
    return (
      page?.data?.bundles
        ?.map((bundle: Bundle) => ({
          value: bundle.bundleId.toString(),
          label: bundle.bundleName,
        }))
        .sort((a: Option, b: Option) => a.label.localeCompare(b.label)) || []
    );
  });
  let features: Option[] = $derived.by(() => {
    const bundleData = page?.data?.bundles.find(
      (bundle: Bundle) => bundle.bundleId === +localOrgState.bundleId
    );

    const features: Feature[] = bundleData?.featuresList
      ? page?.data?.features.filter(
          (feature: Feature) =>
            !bundleData.featuresList
              .split(",")
              .map((item: string) => item.trim())
              .includes(feature.featureId.toString())
        )
      : [];

    return (
      features
        ?.map((feature: Feature) => ({
          value: feature.featureId.toString(),
          label: feature.featureName,
        }))
        .sort((a: Option, b: Option) => a.label.localeCompare(b.label)) || []
    );
  });

  let selectedBundle = $state<Option[]>([]);
  let selectedFeatures = $state<Option[]>([]);

  let isDataChanged = $derived.by(
    () => !areObjectsEqual(localOrgState, page?.data?.orgDetails)
  );

  const validateForm = (): boolean => {
    const newErrors = {
      organizationName: "",
      accessTypeIds: "",
    };

    if (!localOrgState.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }

    errorMessage = newErrors;
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      isLoading = true;
      const response = await fetch("/api/manage/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localOrgState),
      });

      const data = await response.json();

      addToast({
        message: data.succeeded
          ? "Organization added successfully."
          : data.message || "Failed to add organization.",
        type: data.succeeded ? "success" : "error",
      });
      if (data.succeeded) await invalidateAll();
    } catch (error) {
      console.error("Error while saving organization:", error);
      addToast({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  };

  $effect(() => {
    if (page.data.orgDetails) {
      localOrgState = deepClone(page.data.orgDetails);
    }
  });
  onMount(() => {
    selectedBundle = bundles?.filter((bundle) =>
      localOrgState?.bundleId
        ?.split(",")
        .map((item) => item.trim())
        .includes(bundle?.value.toString())
    );
    selectedFeatures = features.filter((feature) =>
      localOrgState?.featureIds
        ?.split(",")
        .map((item) => item?.trim())
        .includes(feature?.value?.toString())
    );
  });
</script>

<div>
  <div
    class="flex flex-row justify-between items-center mb-6 md:mb-4 gap-1 lg:gap-0"
  >
    <div class="pr-2 md:border-r-4 border-parrot">
      <h3 class="text-xl font-medium text-neutral-900">
        Manage {page?.data?.orgDetails?.organizationName || "Organization"}
      </h3>
    </div>
    <Button
      variant="primary"
      type="submit"
      disabled={isLoading || !isDataChanged}
      onclick={handleSubmit}
      class="flex items-center gap-2"
    >
      <SaveIcon fillColor={!isDataChanged ? "#A0A0A0" : "#fff"} />
      {isLoading ? "Saving..." : "Save"}
    </Button>
  </div>

  <div class="bg-white p-6 rounded-lg shadow-md">
    <form class="space-y-6" onsubmit={handleSubmit}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Organization Name -->
        <div class="space-y-2">
          <label
            for="orgNameInput"
            class="text-sm font-medium text-neutral-700"
          >
            Organization Name
          </label>
          <InputField
            type="text"
            id="orgNameInput"
            bind:value={localOrgState.organizationName}
            placeholder="Enter organization name"
            class="w-full"
            error={errorMessage.organizationName}
          />
        </div>

        <!-- Status -->
        <div class="space-y-2">
          <label for="" class="text-sm font-medium text-neutral-700"
            >Status</label
          >
          <div class="flex gap-4">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                bind:group={localOrgState.isActive}
                value={true}
                class="text-primary"
              />
              <span>Active</span>
            </label>
            <label class="flex items-center gap-2">
              <input
                type="radio"
                bind:group={localOrgState.isActive}
                value={false}
                class="text-primary"
              />
              <span>Inactive</span>
            </label>
          </div>
        </div>

        <!-- Bundle Selection -->
        <div class="space-y-2">
          <label
            for="bundleSelect"
            class="text-sm font-medium text-neutral-700"
          >
            Select Bundle
          </label>

          <DynamicSelect
            id="bundleSelect"
            mode="single"
            options={bundles}
            bind:selectedValues={selectedBundle}
            placeholder="Select a bundle"
            onChange={(value) => {
              localOrgState = {
                ...localOrgState,
                bundleId: value[0]?.value.toString() || "",
                featureIds: "",
              };
              selectedFeatures = [];
            }}
            enableRemoveOption
            disabled={page?.data?.user?.orgId !== "0"}
          />
        </div>

        <!-- Feature Selection -->
        <div class="space-y-2">
          <label
            for="featureSelect"
            class="text-sm font-medium text-neutral-700"
          >
            Select Features
          </label>

          <DynamicSelect
            id="featureSelect"
            mode="multi"
            options={features}
            bind:selectedValues={selectedFeatures}
            placeholder="Select your features"
            onChange={(value) => {
              localOrgState = {
                ...localOrgState,
                featureIds: value.map((item) => item.value).join(","),
              };
            }}
            disabled={page?.data?.user?.orgId !== "0"}
          />
        </div>
      </div>
    </form>
  </div>
</div>
