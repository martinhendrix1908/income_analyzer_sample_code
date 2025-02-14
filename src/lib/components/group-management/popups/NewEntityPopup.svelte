<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import { showValidationMessage } from "../../../../routes/create-request/utils";
  import { addToast } from "$lib/store/toast-store";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import type { Option } from "$lib/types/types";

  let {
    isOpen = $bindable(),
    type = "Groups",
  }: { isOpen: boolean; type: string } = $props();

  let isPartOfGroup = $state<boolean>(false);

  let parentOrgUnitId = $state<number>(1);
  let selectedValues = $state<Option[]>([]);
  let form = $state<HTMLFormElement>();
  let organizationUnitTypeError = $state(false);
  let parentGroupError = $state(false);
  let isLoading = $state(false);
  const validateForm = () => {
    let inputElements = Array.from(
      form?.elements as HTMLFormControlsCollection,
    ).filter(
      (element) =>
        element.tagName === "INPUT" && !(element as any).checkValidity(),
    );
    if (inputElements.length > 0) {
      organizationUnitTypeError = inputElements.some(
        (element) => (element as HTMLInputElement).name === "ouType",
      );
      parentGroupError = isPartOfGroup && !parentOrgUnitId;
      showValidationMessage(
        inputElements[organizationUnitTypeError ? 2 : 0] as HTMLInputElement,
      );
    }
    return form?.checkValidity() && !parentGroupError;
  };
  $effect(() => {
    if (!isOpen) {
      parentGroupError = false;
      organizationUnitTypeError = false;
      parentOrgUnitId = 1;
    }
  });
  let options = $derived(
    page.data.groupLists?.map(
      (group: { name: string; orgUnitId: number; ouType: string }) => {
        return {
          label: group.name,
          value: group.orgUnitId,
          icon: group.ouType,
        };
      },
    ),
  );
</script>

<PopupWrapper bind:isOpen popUpBody={form}>
  <form
    bind:this={form}
    novalidate
    class="bg-white border rounded-md p-6 max-w-[344px] w-full shadow-[0px_2px_8px_0px_#00000040] text-[#222222]"
    action="?/updateOrganizationUnit"
    method="POST"
    use:enhance={(submitEvent) => {
      if (!validateForm()) {
        submitEvent.cancel();
      }
      isLoading = true;
      return async ({ update, result }) => {
        isLoading = false;
        if (result.type !== "success") {
          addToast({
            message: "Something went wrong",
            type: "error",
          });
          return;
        }
        if (!result.data?.succeeded) {
          addToast({
            message: (result.data?.message as string) || "Something went wrong",
            type: "error",
          });
          return;
        }
        addToast({
          message:
            (result.data?.message as string) ||
            type.slice(0, -1) + " created successfully",
          type: "success",
        });
        update({ invalidateAll: true });
        isOpen = false;
        isPartOfGroup = false;
        return;
      };
    }}
  >
    <input type="hidden" name="parentOrgUnitId" value={parentOrgUnitId} />
    <input type="hidden" name="ouType" value={type.slice(0, -1)} />
    <div class="flex flex-col gap-4">
      <div class="font-medium text-lg leading-[21px]">
        What is the name of this {type.slice(0, -1)}?
      </div>
      <div class="md:max-w-[320px] max-w-full">
        <label
          for="name"
          class="font-medium text-left text-sm leading-[21px] text-[#444444]"
        >
          {type.slice(0, -1)} Name
        </label>
        <InputField type="text" id="name" name="name" maxlength={50} required />
      </div>
    </div>

    <div class="flex flex-col gap-4 my-10">
      <div class="font-medium text-[18px] leading-[21px] text-left">
        Is this {type.slice(0, -1).toLowerCase()} part of {type === "Groups"
          ? "another"
          : "a"} group?
      </div>
      <div class="flex items-start gap-2">
        <div
          class="flex items-center gap-2 font-semibold leading-6 text-start text-[16px] flex-wrap"
        >
          <label for="yes" class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="isTrue"
              bind:group={isPartOfGroup}
              id="yes"
              value={true}
              required
            />
            Yes
          </label>
          <label for="no" class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="isTrue"
              bind:group={isPartOfGroup}
              id="no"
              value={false}
              required
            />
            No
          </label>
        </div>
      </div>

      {#if isPartOfGroup}
        <div class="md:max-w-[320px] max-w-full">
          <label
            for="unit"
            class="font-medium text-left text-sm leading-[21px] text-[#444444]"
          >
            Select the parent group.
          </label>

          <!-- <EntitySearchDropdown
            placeholder="Search"
            bind:selectedValue={parentOrgUnitId}
            id="unit"
            {options}
          /> -->
          <DynamicSelect
            mode="single"
            placeholder="Search"
            bind:selectedValues
            id="unit"
            {options}
            onChange={(value) => {
              parentOrgUnitId = +value[0].value;
            }}
          />

          {#if parentGroupError}
            <div class="text-red text-sm mt-2">This field is required.</div>
          {/if}
        </div>
      {/if}
    </div>

    <div class="flex gap-2 sm:flex-row flex-col">
      <Button variant="black" class="w-full" type="submit" disabled={isLoading}
        >Create</Button
      >
      <Button
        class="w-full"
        type="button"
        variant="black"
        outlined
        onclick={() => {
          isOpen = !isOpen;
          parentOrgUnitId = 1;
        }}
      >
        Cancel
      </Button>
    </div>
  </form>
</PopupWrapper>
