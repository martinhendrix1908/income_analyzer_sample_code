<script lang="ts">
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type {
    Bundle,
    Feature,
    IOrganizationDetails,
  } from "$lib/types/organizations.types";
  import { onMount } from "svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  interface OptionProps {
    value: string | number;
    label: string;
  }
  interface OrgPopupProps {
    isOpen: boolean;
    orgData: IOrganizationDetails | undefined;
    handleFormSubmit: (data: IOrganizationDetails) => void;
  }

  let {
    isOpen = $bindable(),
    orgData,
    handleFormSubmit,
  }: OrgPopupProps = $props();

  let localOrgState = $state<IOrganizationDetails>({} as IOrganizationDetails);
  let popUpBody = $state<HTMLDivElement | undefined>(undefined);
  let isLoading = $state(false);
  let selectedFeatures = $state<OptionProps[]>([]);
  let selectedBundle = $state<OptionProps[]>([]);
  let errorMessage = $state({
    organizationName: "",
  });

  let bundles: OptionProps[] = $derived.by(() => {
    return (
      page?.data?.bundles
        ?.map((bundle: Bundle) => {
          return {
            value: `${bundle.bundleId}`,
            label: bundle.bundleName,
          };
        })
        .sort((a: OptionProps, b: OptionProps) =>
          a.label.localeCompare(b.label)
        ) || []
    );
  });

  let features: OptionProps[] = $derived.by(() => {
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
        .sort((a: OptionProps, b: OptionProps) =>
          a.label.localeCompare(b.label)
        ) || []
    );
  });

  const validateForm = () => {
    if (!localOrgState.organizationName.trim()) {
      errorMessage.organizationName = "Organization name is required";
      return false;
    }

    errorMessage = {
      organizationName: "",
    };
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      isLoading = true;
      const res = await fetch(`/api/manage/organizations`, {
        method: "POST",
        body: JSON.stringify(localOrgState),
      });
      const data = await res.json();
      addToast({
        type: data?.succeeded ? "success" : "error",
        message: data?.succeeded
          ? "Organization added successfully."
          : data?.message || "Failed to add organization.",
      });
      if (data?.succeeded) {
        isOpen = false;
        handleFormSubmit(localOrgState);
      }
    } catch (e) {
      console.error("Error while fetching organizations:", e);
      addToast({
        message: "An unexpected error occurred. Please try again.",
        type: "error",
      });
    } finally {
      isLoading = false;
    }
  };

  const resetForm = () => {
    localOrgState = {
      organizationId: 0,
      organizationName: "",
      isActive: true,
      createdBy: "",
      created: null,
      updatedBy: "",
      updated: null,
      apiKey: "",
      clientId: "",
      secret: "",
      ownerAccountId: 0,
      settings: "",
      bundleId: "",
      featureIds: "",
    };
    errorMessage = {
      organizationName: "",
    };
  };

  $effect(() => {
    if (!isOpen) {
      resetForm();
    }
  });

  onMount(() => {
    resetForm();
  });
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <div
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[603px] max-md:px-5 w-full"
    bind:this={popUpBody}
  >
    <h2 class="text-lg font-medium text-neutral-800 mb-4">Add Organization</h2>

    <div class="flex flex-col gap-4">
      <!-- Organization Name -->
      <div class="flex flex-col gap-2">
        <label for="orgNameInput" class="text-sm font-medium text-neutral-700">
          Organization Name:
        </label>
        <InputField
          type="text"
          id="orgNameInput"
          bind:value={localOrgState.organizationName}
          placeholder="Enter organization name"
          error={errorMessage.organizationName}
          errorClass="!p-0"
        />
      </div>

      <!-- Bundle Selection -->
      <div class="flex flex-col gap-2">
        <label for="orgNameInput" class="text-sm font-medium text-neutral-700">
          Select Bundle:
        </label>
        <DynamicSelect
          mode="single"
          options={bundles}
          bind:selectedValues={selectedBundle}
          placeholder="Select a bundle"
          onChange={(value) => {
            localOrgState = {
              ...localOrgState,
              bundleId: value[0].value.toString(),
            };
          }}
        />
      </div>

      <!-- Features Selection -->
      <div class="flex flex-col gap-2">
        <label for="orgNameInput" class="text-sm font-medium text-neutral-700">
          Select Features:
        </label>
        <DynamicSelect
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
        />
      </div>

      <!-- Status -->
      <div class="flex flex-col items-start justify-start gap-2">
        <label for="statusGroup" class="text-sm font-medium text-neutral-700"
          >Status:</label
        >
        <div class="flex flex-wrap gap-4" id="statusGroup">
          <label for="statusActive" class="flex items-center gap-2">
            <input
              type="radio"
              id="statusActive"
              bind:group={localOrgState.isActive}
              value={true}
              name="isActive"
              onchange={() => {
                localOrgState = { ...localOrgState, isActive: true };
              }}
            />
            Active
          </label>
          <label for="statusInactive" class="flex items-center gap-2">
            <input
              type="radio"
              id="statusInactive"
              bind:group={localOrgState.isActive}
              value={false}
              name="isActive"
              onchange={() => {
                localOrgState = { ...localOrgState, isActive: false };
              }}
            />
            Inactive
          </label>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="flex gap-2 items-start mt-6">
      <Button
        class="w-full whitespace-nowrap"
        variant="black"
        onclick={handleSubmit}
        disabled={isLoading}
      >
        Add
      </Button>
      <Button
        class="w-full"
        variant="black"
        outlined
        onclick={() => {
          isOpen = false;
          resetForm();
        }}
      >
        Cancel
      </Button>
    </footer>
  </div>
</PopupWrapper>
