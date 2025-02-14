<script lang="ts">
  import { page } from "$app/state";
  import type { ClaimConfiguration, IBVConfiguration } from "$lib/types/types";
  import type { IBVConfigSetting, IBVProviderList } from "$lib/types/Ibv.types";
  import OverrideLock from "$lib/components/group-management/sections/OverrideLock.svelte";
  import InformationTooltip from "$lib/components/building-blocks/InformationTooltip.svelte";
  import { HelpTexts } from "$lib/constants";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import IbvConfigPopup from "$lib/components/group-management/popups/IBVConfigPopup.svelte";
  import { onMount } from "svelte";
  import { deepClone } from "$lib/utils/common-utils";

  let {
    configuration,
    setConfiguration,
    claimValue,
  }: {
    configuration: IBVConfiguration;
    setConfiguration: (config: ClaimConfiguration) => void;
    claimValue: string;
  } = $props();

  let configurationState = $state<IBVConfiguration>(deepClone(configuration));

  let availableProviders = $state<IBVProviderList[]>([]);
  let selectedProviders = $state<IBVConfigSetting[]>(
    deepClone(configuration.ibvList),
  );

  let newProviderPopupState = $state({
    isOpen: false,
    isLoading: false,
  });

  let providerConfigState = $state({
    selectedProvider: null as IBVConfigSetting | null,
    mode: "" as "add" | "delete" | "",
    isOpen: false,
  });

  const PROVIDER_TABLE_HEADERS = ["Provider", "Status", "Settings"];

  const capitalizeFirstLetter = (str: string) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const updatedConfig = () => {
    let newConfiguration = deepClone(configurationState);
    newConfiguration.ibvList = [...selectedProviders];
    configurationState = deepClone(newConfiguration);
  };

  const handleProviderToggle = (
    provider: IBVConfigSetting,
    isEnabled: boolean,
  ) => {
    const providerIndex = selectedProviders.findIndex(
      (p) => p.dataSourceName === provider.dataSourceName,
    );
    if (providerIndex !== -1) {
      selectedProviders[providerIndex].isChecked = isEnabled;
      updatedConfig();
    }
  };

  const handleAddNewProvider = async (provider: IBVProviderList) => {
    newProviderPopupState.isLoading = true;
    try {
      const response = await fetch(
        `/api/ibv-provider?providerName=${provider.providerName}&unitId=${page.params.id}`,
      );
      const newProvider = await response.json();
      if (newProvider) {
        selectedProviders = [
          ...selectedProviders,
          { ...newProvider, isChecked: false },
        ];
        updatedConfig();
      }
    } catch (error) {
      console.error("Failed to add new provider:", error);
    } finally {
      newProviderPopupState.isLoading = false;
      newProviderPopupState.isOpen = false;
    }
  };

  const openProviderConfiguration = (provider: IBVConfigSetting) => {
    if (
      !configurationState.bankuityOptimizationDisabled &&
      claimValue === "Edit"
    ) {
      providerConfigState = {
        selectedProvider: provider,
        mode: "add",
        isOpen: true,
      };
    }
  };

  const setProviderConfiguration = (providerConfig: IBVConfigSetting) => {
    let providerIndex = selectedProviders.findIndex(
      (provider) => provider.dataSourceName === providerConfig.dataSourceName,
    );

    if (providerIndex !== -1) {
      selectedProviders = [
        ...selectedProviders.slice(0, providerIndex),
        providerConfig,
        ...selectedProviders.slice(providerIndex + 1),
      ];
      updatedConfig();
    }
  };

  $effect(() => {
    setConfiguration(deepClone(configurationState));
  });

  onMount(async () => {
    try {
      const response = await fetch("/api/ibv-provider");
      availableProviders = await response.json();
      if (availableProviders?.length > 0) {
        availableProviders.forEach((provider) => {
          const isProviderSelected = selectedProviders.some(
            (selectedProvider) =>
              selectedProvider.dataSourceName === provider.providerName,
          );
          if (!isProviderSelected) {
            handleAddNewProvider(provider);
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch IBV providers:", error);
      console.log(error);
    }
  });
</script>

<div class="flex flex-col gap-4">
  <!-- Bankuity Optimization Section -->
  <div class="flex flex-col gap-6 text-[#404040]">
    <h3 class="text-[#404040] font-semibold text-xl leading-[21px]">
      Use Bankuity's Connectivity Provider
      <InformationTooltip
        content={HelpTexts.UseBankuitysConnectivityProvider}
      />
    </h3>
    <div class="w-fit flex gap-2">
      <CustomSwitch
        isTextVisible
        handleSwitch={() => {}}
        title="bankuity-optimizations"
        bind:toggle={configurationState.bankuityOptimizationDisabled}
        disabled={claimValue !== "Edit"}
      />
      <label
        for="bankuity-optimizations"
        class="leading-6 text-[16px] text-[#262626]"
      >
        {configurationState.bankuityOptimizationDisabled
          ? "Bankuity Optimizations Enabled"
          : "Bankuity Optimizations Disabled"}
      </label>
    </div>
  </div>

  <!-- Providers Table -->
  <div
    class="grid grid-cols-3 max-w-[505px] gap-4 {configurationState.bankuityOptimizationDisabled
      ? 'opacity-50 cursor-not-allowed'
      : ''}"
  >
    {#each PROVIDER_TABLE_HEADERS as header}
      <div class="font-semibold leading-6 text-[16px]">{header}</div>
    {/each}

    {#if selectedProviders.length > 0}
      {#each selectedProviders as provider, index}
        <!-- Provider Name -->
        <span> {capitalizeFirstLetter(provider.dataSourceName || "N/A")}</span>

        <!-- Provider Status Toggle -->
        <div class="w-fit">
          <CustomSwitch
            disabled={configurationState.bankuityOptimizationDisabled ||
              claimValue !== "Edit"}
            title={provider.dataSourceName || ""}
            toggle={provider.isChecked}
            handleSwitch={(isChecked) =>
              handleProviderToggle(provider, isChecked)}
            isTextVisible
          />
        </div>

        <!-- Configuration Popup -->
        {#if providerConfigState.selectedProvider?.dataSourceName === provider.dataSourceName && providerConfigState.mode === "add"}
          <IbvConfigPopup
            bind:isOpen={providerConfigState.isOpen}
            configuration={provider}
            disabled={claimValue !== "Edit"}
            onSaveClick={(provider) => setProviderConfiguration(provider)}
            onCancelClick={() => {
              providerConfigState.isOpen = false;
            }}
          />
        {/if}

        <!-- Configure Button -->
        <button
          class="flex gap-1 text-[#0A84FF] font-medium text-sm leading-[21px]
                 {configurationState.bankuityOptimizationDisabled
            ? 'text-[#d3d3d3] cursor-not-allowed'
            : 'cursor-pointer'}"
          title="configure"
          onclick={() => openProviderConfiguration(provider)}
        >
          Configure
        </button>
      {/each}
    {:else}
      <div class="col-span-4">No providers selected.</div>
    {/if}
  </div>

  <!-- Override Lock Section -->
  {#if page.data.unitList.length > 0}
    <hr />
    <OverrideLock {configuration} {setConfiguration} {claimValue} />
  {/if}
</div>
