<script lang="ts">
  import { page } from "$app/state";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import InformationTooltip from "$lib/components/building-blocks/InformationTooltip.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { HelpTexts } from "$lib/constants";
  import type { DetailsConfiguration, Option } from "$lib/types/types";

  let {
    configuration = $bindable(),
    setConfiguration,
    claimValue,
  }: {
    configuration: DetailsConfiguration;
    setConfiguration: (config: DetailsConfiguration) => void;
    claimValue: string;
  } = $props();

  let config = $state<DetailsConfiguration>({
    name: configuration?.name || "",
    timeZone: configuration?.timeZone || "",
    currency: configuration?.currency || "USD",
    currencyList: configuration?.currencyList || [],
    reportShared: configuration?.reportShared || false,
    timeZoneList: configuration?.timeZoneList || [],
  });
  let currencyOptions = $derived.by(() =>
    config.currencyList.map((item) => {
      return {
        label: item.Name,
        value: item.Id,
        icon: item.Id == "USD" ? "us-flag" : "canada-flag",
      };
    })
  );
  let timeZoneOptions = $derived.by(() =>
    config.timeZoneList.map((item) => {
      return {
        label: item.Name,
        value: item.Id,
      };
    })
  );
  let selectedCurrency = $state<Option[]>([]);
  let selectedTimeZone = $state<Option[]>([]);

  $effect(() => setConfiguration(JSON.parse(JSON.stringify(config))));
  $effect(() => {
    selectedCurrency = currencyOptions.filter(
      (item) => config?.currency === item.value
    );
    selectedTimeZone = timeZoneOptions.filter((item) =>
      config?.timeZone?.includes(item.value)
    );
  });
</script>

<div class="py-2 w-fit">
  <label class="text-sm font-medium leading-[21px]" for="name">
    {page.url.searchParams.get("type") || ""} Name
  </label>
  <InputField
    placeholder="Enter {page.url.searchParams.get('type') || ''} Name"
    type="text"
    id="name"
    bind:value={config.name}
    disabled={claimValue !== "Edit"}
  />
</div>
<hr class="w-full border border-solid bg-neutral-400 border-neutral-400" />
<div class="flex flex-col gap-4">
  <h4 class="text-[#493d3d] text-[20px] font-semibold leading-[21px]">
    Timezone and Currency
    <InformationTooltip content={HelpTexts.TimezoneAndCurrency} />
  </h4>
  <div class="flex sm:flex-row flex-col md:gap-16 gap-10 py-2">
    <div class="md:w-1/3 sm:w-2/5 w-full">
      <label class="text-sm font-medium leading-[21px]" for="timeZone"
        >Time Zone</label
      >
      <DynamicSelect
        mode="single"
        options={timeZoneOptions}
        placeholder="Select Time Zone"
        bind:selectedValues={selectedTimeZone}
        onChange={(value) => {
          config = {
            ...config,
            timeZone: value[0].value as string,
          };
        }}
        disabled={claimValue !== "Edit"}
      />
    </div>
    <div class="md:w-1/3 sm:w-2/5 max-w-[160px]">
      <label class="text-sm font-medium leading-[21px]" for="currency"
        >Currency</label
      >
      <DynamicSelect
        mode="single"
        options={currencyOptions}
        bind:selectedValues={selectedCurrency}
        onChange={(value) => {
          config = {
            ...config,
            currency: value[0].value as string,
          };
        }}
        placeholder="Select Currency"
        disabled={claimValue !== "Edit"}
      />
    </div>
  </div>
</div>
<hr class="w-full border border-solid bg-neutral-400 border-neutral-400" />
<div class="flex flex-col gap-4">
  <h4 class="text-[#404040] text-[20px] font-semibold leading-[21px]">
    Reports <InformationTooltip content={HelpTexts.ShareCustomerReports} />
  </h4>
  <div class="flex gap-2 py-2">
    <CustomSwitch
      disabled={claimValue !== "Edit"}
      toggle={config.reportShared}
      handleSwitch={() => (config.reportShared = !config.reportShared)}
      isTextVisible
      title="application-visibility"
    />
    <label for="application-visibility"> Share customer reports </label>
  </div>
</div>
