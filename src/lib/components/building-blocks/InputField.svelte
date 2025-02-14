<script lang="ts">
  import { ValiationMessage, ValidationRegex } from "$lib/constants";
  import clsx from "clsx";
  import { formatPhoneNumberAsYouType } from "../../../routes/create-request/utils";
  import FormMessage from "$lib/components/building-blocks/FormMessage.svelte";
  import type { FullAutoFill } from "svelte/elements";

  type InputProps = {
    error?: string;
    name?: string;
    placeholder?: string;
    type?: string;
    id?: string;
    value?: string | number | null;
    minlength?: number;
    maxlength?: number;
    max?: number;
    min?: number;
    autocomplete?: FullAutoFill;
    required?: boolean;
    readonly?: boolean;
    validationName?: string;
    numberOnly?: boolean;
    aplphaOnly?: boolean;
    isFloat?: boolean;
    isPriceField?: boolean;
    oninput?: (e: Event) => void;
    disabled?: boolean;
    onblur?: (e: Event) => void;
    class?: string;
    errorClass?: string;
  };
  
  let {
    error,
    name,
    placeholder,
    type = "text",
    id,
    value = $bindable(),
    required,
    autocomplete,
    validationName,
    minlength,
    maxlength,
    numberOnly,
    aplphaOnly,
    isFloat,
    isPriceField = false,
    readonly,
    oninput,
    disabled,
    onblur,
    class: customClass,
    errorClass,
  }: InputProps = $props();
  
  let errorMessage = $state(error);
  const nameFields = ["firstName", "lastName", "middleName"];
  let inputElement = $state();

  const checkInputValidity = (e: Event) => {
    let input = e.target as HTMLInputElement;
    if (numberOnly) {
      input.value = input.value.replace(/\D/g, "");
    }
    if (isFloat || isPriceField) {
      input.value = input.value.replace(/[^\d.]/g, ""); 
      const parts = input.value.split('.');
      if (parts.length > 2) {
        input.value = parts[0] + '.' + parts.slice(1).join('');
      }
      // Limit to 2 decimal places for price
      if (isPriceField && parts[1]?.length > 2) {
        input.value = parts[0] + '.' + parts[1].slice(0, 2);
      }
    }
    if (aplphaOnly) {
      input.value = input.value.replace(/[^a-zA-Z ]/g, "");
    }
    if (validationName === "phone") {
      input.value = formatPhoneNumberAsYouType(input.value);
    }
    if (validationName === "phone2") {
      input.value = formatPhoneNumberAsYouType(input.value, "000-000-0000");
    }
    value = input.value;
    checkValidation(input.name, input.value);
  };

  const handleOnInput = (e: Event) => {
    checkInputValidity(e);
    oninput?.(e);
  };

  const handleOnBlur = (e: Event) => {
    let input = e.target as HTMLInputElement;
    if (["text", "password", "email"].includes(type)) {
      input.value = input.value.trim();
    }
    onblur?.(e);
    checkInputValidity(e);
  };

  const checkValidation = (name: string, value: string) => {
    const isNameField = nameFields.includes(name);
    if (required && value?.length === 0) {
      errorMessage = ValiationMessage.required;
    } else if (
      minlength &&
      value.length &&
      value.length < minlength &&
      isNameField
    ) {
      errorMessage = ValiationMessage.minLength;
    } else if (
      maxlength &&
      value.length &&
      value.length > maxlength &&
      isNameField
    ) {
      errorMessage = ValiationMessage.maxLength;
    } else if (validationName && !ValidationRegex[validationName].test(value)) {
      errorMessage = ValiationMessage[validationName];
    } else {
      errorMessage = "";
    }
    (inputElement as HTMLInputElement).setCustomValidity(errorMessage);
  };
</script>

<div class="relative">
  {#if isPriceField}
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-current">$</span>
  {/if}
  <input
    bind:this={inputElement}
    bind:value
    {name}
    {placeholder}
    {type}
    {id}
    {required}
    {autocomplete}
    {minlength}
    {maxlength}
    {readonly}
    {disabled}
    class={clsx(
      "block w-full border border-[#9C9C9C] rounded p-3 focus:outline-none focus:border-[#222222] disabled:bg-[#EEEEEE] disabled:cursor-not-allowed",
      isPriceField && "pl-5",
      customClass
    )}
    onblur={handleOnBlur}
    oninput={handleOnInput}
  />
</div>
<FormMessage message={(errorMessage || error) as string} {errorClass} />