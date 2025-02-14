<script lang="ts">
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";
  import type { IBVConfigSetting } from "$lib/types/Ibv.types";
  import type { DropdownOption } from "$lib/types/types";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import { deepClone } from "$lib/utils/common-utils";

  let {
    isOpen = $bindable(),
    configuration,
    disabled,
    onCancelClick,
    onSaveClick,
  }: {
    isOpen: boolean;
    configuration: IBVConfigSetting;
    disabled: boolean;
    onCancelClick?: () => void;
    onSaveClick?: (updatedConfig: IBVConfigSetting) => void;
  } = $props();

  type IRenderType =
    | "Textbox"
    | "Multiselect"
    | "Singleselect"
    | "Checkbox"
    | "IntTextbox";

  const RenderType: { [key: number]: IRenderType } = {
    0: "Textbox",
    1: "Multiselect",
    2: "Singleselect",
    3: "Checkbox",
    4: "IntTextbox",
  };

  let popUpBody = $state<HTMLFormElement>();

  let localConfiguration = $state<IBVConfigSetting>(deepClone(configuration));

  $effect(() => {
    localConfiguration = deepClone(configuration);
  });

  const handleSave = () => {
    if (onSaveClick) {
      const updatedConfig = deepClone(localConfiguration);
      onSaveClick(updatedConfig);
    }
    isOpen = false;
  };

  const handleCancel = () => {
    if (onCancelClick) {
      onCancelClick();
    }
    isOpen = false;
  };
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <form
    class="bg-white border rounded-md p-6 max-w-[774px] max-h-[752px] w-full shadow-[0px_2px_8px_0px_#00000040] text-[#222222]"
    bind:this={popUpBody}
  >
    <div
      class="flex items-center justify-between gap-4 flex-wrap mt-3 md:mb-10 sm:mb-6 mb-4"
    >
      {#each localConfiguration.settingsFields.filter((item) => RenderType[item.renderType] !== "Checkbox") as field (field.id)}
        <div class="xl:max-w-[320px] md:max-w-[280px] w-full max-w-full">
          {#if RenderType[field.renderType] !== "Checkbox"}
            <label class="text-sm font-medium leading-[21px]" for={field.id}>
              {field.name}
            </label>
          {/if}
          {#if RenderType[field.renderType] === "Textbox" || RenderType[field.renderType] === "IntTextbox"}
            <InputField
              type={RenderType[field.renderType] === "IntTextbox"
                ? "number"
                : "text"}
              id={field.id}
              bind:value={field.value}
              {disabled}
            />
          {:else if RenderType[field.renderType] === "Singleselect"}
            <DynamicSelect
              selectedValues={[{ label: field.value, value: field.value }]}
              name={field.name}
              id={field.name}
              options={field.suggestedValues.map((item) => ({
                label: item,
                value: item,
              })) as DropdownOption[]}
              placeholder=""
              onChange={(e) => {
                field.value = e[0]?.value as string;
              }}
              mode="single"
            />
          {:else if RenderType[field.renderType] === "Multiselect"}
            <DynamicSelect
              selectedValues={[{ label: field.value, value: field.value }]}
              name={field.name}
              id={field.name}
              options={field.suggestedValues.map((item) => ({
                label: item,
                value: item,
              })) as DropdownOption[]}
              placeholder=""
              onChange={(e) => {
                field.value = e[0]?.value as string;
              }}
              mode="multi"
            />
          {/if}
        </div>
      {/each}
    </div>
    <div
      class="flex items-center justify-between gap-4 flex-wrap mt-3 md:mb-10 sm:mb-6 mb-4"
    >
      {#each localConfiguration.settingsFields.filter((item) => RenderType[item.renderType] === "Checkbox") as field (field.id)}
        <div
          class="flex gap-2 text-[#222222] items-center flex-wrap text-base w-full"
        >
          <CustomSwitch
            title={field.name}
            toggle={field.value.toLowerCase() === "true"}
            handleSwitch={(value) => {
              field.value = JSON.stringify(value);
            }}
            isTextVisible
          />
          {field.name}
        </div>
      {/each}
    </div>
    <div class="flex gap-2 sm:flex-row flex-col">
      <Button variant="black" class="w-full" {disabled} onclick={handleSave}>
        Save
      </Button>
      <Button variant="black" class="w-full" outlined onclick={handleCancel}>
        Cancel
      </Button>
    </div>
  </form>
</PopupWrapper>
