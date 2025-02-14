<script lang="ts">
  import { enhance } from "$app/forms";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import type { AssessmentZone } from "$lib/types/types";
  import { showValidationMessage } from "../../../../routes/create-request/utils";

  let {
    isEdit,
    isOpen = $bindable(),
    currentZone = $bindable(),
    onAddClick,
    zones = $bindable(),
  }: {
    isOpen: boolean;
    isEdit: boolean;
    currentZone: AssessmentZone;
    onAddClick: () => void;
    zones: AssessmentZone[];
  } = $props();

  let form = $state<HTMLFormElement>();
  let rangeError = $state("");
  const validateForm = () => {
    let inputElements = Array.from(
      form?.elements as HTMLFormControlsCollection
    ).filter(
      (element) =>
        element.tagName === "INPUT" && !(element as any).checkValidity()
    );
    if (inputElements.length > 0) {
      showValidationMessage(inputElements[0] as HTMLInputElement);
    }
    return form?.checkValidity();
  };

  $effect(() => {
    if (!isOpen) rangeError = "";
  });
</script>

<PopupWrapper bind:isOpen popUpBody={form}>
  <form
    bind:this={form}
    novalidate
    class="bg-white border rounded-md p-6 max-w-[500px] w-full shadow-[0px_2px_8px_0px_#00000040] text-[#222222]"
  >
    <h3 class="text-xl font-semibold text-[#000000] mb-2">
      {isEdit ? "Edit" : "Add"} Zone
    </h3>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <div class="w-full">
          <label class="text-sm font-medium leading-[21px]" for="zone-name">
            Zone Name
          </label>
          <InputField
            id="zone-name"
            name="name"
            required
            minlength={1}
            placeholder="Enter name"
            bind:value={currentZone.name}
          />
        </div>
        <div class="w-full">
          <label class="text-sm font-medium leading-[21px]" for="zone-value">
            Zone Value
          </label>
          <InputField
            placeholder="Enter value"
            id="zone-value"
            min={1}
            max={1000}
            bind:value={currentZone.position}
            numberOnly
            required
            error={rangeError}
            oninput={(e) => {
              const value = +(e.target as HTMLInputElement)?.value;
              if (!(value > 0 && value < 1000)) {
                rangeError = "Value should be in range 1 to 999";
              } else if (zones.some((z) => z.position == value)) {
                rangeError = "This zone value is already taken.";
              } else {
                rangeError = "";
              }
            }}
            disabled={currentZone.position === 1000}
          />
        </div>
      </div>
      <div class="">
        <label
          class="text-sm font-medium leading-[21px]"
          for="zone-description"
        >
          Zone Description
        </label>
        <textarea
          class="mt-1 block w-full border border-[#9C9C9C] rounded p-3 focus:outline-none focus:border-[#222222] disabled:bg-[#EEEEEE] disabled:cursor-not-allowed"
          name="description"
          id="zone-description"
          placeholder="Enter description"
          bind:value={currentZone.description}
        ></textarea>
      </div>

      <div class="">
        <label
          class="text-sm font-medium leading-[21px] flex gap-2 items-center w-fit"
          for="zone-color"
        >
          Color: <div
            class="rounded-full h-[25px] w-[25px] outline outline-2 outline-offset-2 outline-[#9C9C9C]"
            style="background-color: {currentZone.color};"
          ></div>
        </label>
        <input
          type="color"
          id="zone-color"
          class="invisible"
          bind:value={currentZone.color}
        />
      </div>
    </div>

    <div class="flex gap-2 sm:flex-row flex-col">
      <Button
        variant="black"
        class="w-full"
        type="button"
        onclick={() => {
          if (!validateForm() || rangeError) return;
          onAddClick();
        }}
      >
        {isEdit ? "Update" : "Add"}
      </Button>
      <Button
        class="w-full"
        type="button"
        variant="black"
        outlined
        onclick={() => (isOpen = false)}
      >
        Cancel
      </Button>
    </div>
  </form>
</PopupWrapper>
