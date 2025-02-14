<script lang="ts">
  import { enhance } from "$app/forms";
  import CopyIcon from "$lib/icons/CopyIcon.svelte";
  import VerifiedIcon from "$lib/icons/VerifiedIcon.svelte";
  import type { DropdownOption, Provider } from "$lib/types/types";
  import { copyToClipboard, showValidationMessage } from "./utils";
  import CreateRequestSearchBar from "$lib/components/create-request/CreateRequestSearchBar.svelte";
  import FormMessage from "$lib/components/building-blocks/FormMessage.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { addToast } from "$lib/store/toast-store";
  import DynamicSelect from "$lib/components/building-blocks/DynamicSelect.svelte";

  let { data }: { data: any } = $props();
  let form: HTMLFormElement;
  let providers = $state<Provider[]>(data.providerInfo);
  let IBVProviders = $state([
    { label: providers[0].providerName, value: providers[0].providerName },
  ]);
  let accountTypes: DropdownOption[] = $derived.by(() =>
    providers[0].accountType.map((item: string) => ({
      label: item,
      value: item,
    }))
  );
  let validRouting: boolean = $state(false);
  let isRoutVerified: boolean = $state(false);
  let bankName: string = $state("");
  let Url: string = $state("");
  let requestCode: string = $state("");
  let error: boolean = $state(false);
  let errorMessage: string = $state("");
  let successMessage: string = $state("");
  let cusAbaNumber = $state("");
  let cusAccTypes = $state<DropdownOption[]>([]);

  $effect(() => {
    cusAccTypes =
      accountTypes?.length > 0
        ? ([
            { label: accountTypes[0].value, value: accountTypes[0].value },
          ] as DropdownOption[])
        : [];
  });
  const validateRoutingNo = async () => {
    bankName = "";
    const response = await fetch(
      `/api/validate-routing-number?routingNumber=${cusAbaNumber}`,
      {
        method: "GET",
      }
    );
    if (response?.ok) {
      const responseData = await response.json();
      isRoutVerified = true;
      if (responseData?.status) {
        validRouting = true;
        bankName = responseData.bankName || "";
      } else {
        validRouting = false;
        document.getElementById("cusAbaNumber")?.focus();
      }
    } else {
      addToast({
        message: "Unable to validate routing number. Please try again later.",
        type: "error",
      });
    }
  };

  const onSubmit = (result: any) => {
    if (result.type === "success") {
      resetForm();
      isRoutVerified = false;
      validRouting = false;
      error = true;
      successMessage = result?.data.message || "Request created successfully";
      requestCode = result?.data.requestCode;
      Url = result?.data.verificationURL;
    } else {
      error = true;
      errorMessage = !result.data.message.includes("{")
        ? "Unable to create new request please refresh the page and try again!"
        : JSON.parse(result.data.message)?.ErrorDescription ||
          "Unable to create new request please try again!";
    }
  };

  const resetForm = async () => {
    form.reset();
    await new Promise((resolve) => setTimeout(resolve, 100));
    IBVProviders =
      providers?.length > 0
        ? [
            {
              label: providers[0].providerName,
              value: providers[0].providerName,
            },
          ]
        : [];
    cusAccTypes =
      accountTypes?.length > 0
        ? ([
            { label: accountTypes[0].value, value: accountTypes[0].value },
          ] as DropdownOption[])
        : [];
  };

  const validateForm = () => {
    let inputElements = Array.from(form.elements).filter(
      (element) =>
        element.tagName === "INPUT" && !(element as any).checkValidity()
    );
    if (inputElements.length > 0) {
      showValidationMessage(inputElements[0] as HTMLInputElement);
    }
    return form.checkValidity();
  };
</script>

<section class="py-10" id="board">
  <div
    class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto flex flex-col gap-2"
  >
    <div
      class="flex flex-col md:flex-row gap-3 md:justify-between md:items-center py-2 mb-1"
    >
      <div class="pr-2 md:border-r-4 border-parrot">
        <h3 class="text-black font-medium opacity-85">Create a New Request</h3>
      </div>
      <CreateRequestSearchBar />
    </div>
    <form
      bind:this={form}
      novalidate
      id="Create_New_Request"
      method="POST"
      action="?/create_request"
      use:enhance={async (submitEvent) => {
        error = false;
        errorMessage = "";
        successMessage = "";
        if (!validateForm()) {
          submitEvent.cancel();
        } else if (!validRouting) {
          await validateRoutingNo();
          if (!validRouting) {
            submitEvent.cancel();
          }
        }
        submitEvent.formData.set("IBVProvider", IBVProviders[0]?.value);
        submitEvent.formData.set("cusAccType", cusAccTypes[0]?.label);

        return async ({ result }) => {
          onSubmit(result);
        };
      }}
      class="w-full bg-white py-10 md:py-20 px-10 md:px-20 xl:px-[240px] rounded-md shadow-4xl"
    >
      <h4 class="text-[4xl] mb-6 font-medium">Personal Information</h4>
      <div class="md:pb-14 pb-6">
        <div class="flex flex-wrap justify-between gap-y-6 gap-x-4">
          <div class="lg:max-w-300px max-w-full w-full">
            <label class="text-sm font-medium" for="cusFirstName"
              >First Name</label
            >
            <InputField
              id="cusFirstName"
              name="cusFirstName"
              placeholder="First Name"
              maxlength={25}
              minlength={2}
              required
              autocomplete="off"
              aplphaOnly
            />
          </div>

          <div class="lg:max-w-300px max-w-full w-full">
            <label class="text-sm font-medium" for="cusLastName"
              >Last Name</label
            >
            <InputField
              id="cusLastName"
              name="cusLastName"
              placeholder="Last Name"
              maxlength={25}
              minlength={2}
              required
              autocomplete="off"
              aplphaOnly
            />
          </div>

          <div class="lg:max-w-300px max-w-full w-full">
            <label class="text-sm font-medium" for="middleName"
              >Middle Name (Optional)</label
            >
            <InputField
              id="middleName"
              name="middleName"
              placeholder="Middle Name"
              maxlength={25}
              autocomplete="off"
            />
          </div>
        </div>
      </div>
      <div class="h-px bg-naro-300 w-full md:mb-12 mb-6"></div>

      <h4 class="text-[4xl] mb-6 font-medium">Contact Information</h4>
      <div class="md:pb-14 pb-6">
        <div class="flex flex-wrap justify-between grid-cols-1 gap-y-6 gap-x-4">
          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="cusPhone"
              >Phone Number</label
            >
            <InputField
              id="cusPhone"
              type="text"
              name="cusPhone"
              placeholder="Phone Number"
              minlength={14}
              maxlength={14}
              required
              validationName="phone"
              numberOnly
            />
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="cusEmail"
              >Email Address</label
            >
            <InputField
              id="cusEmail"
              type="email"
              name="cusEmail"
              placeholder="Email Address"
              required
              validationName="email"
              maxlength={100}
            />
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="externalID"
              >External ID for Reference (Optional)</label
            >
            <InputField
              id="externalID"
              type="text"
              name="externalID"
              placeholder="External ID"
              maxlength={100}
            />
            <span class="text-sm font-normal"
              >E.g. LMS ID, customer ID from other systems</span
            >
          </div>
        </div>
      </div>
      <div class="h-px bg-naro-300 w-full md:mb-12 mb-6"></div>

      <h4 class="text-[4xl] mb-6 font-medium">Banking Information</h4>
      <div class="md:pb-14 pb-6">
        <div class="flex flex-wrap justify-between grid-cols-1 gap-y-6 gap-x-4">
          <div class="lg:max-w-320px max-w-full w-full">
            <div class="flex justify-between w-full">
              <label class="text-sm font-medium" for="cusAbaNumber"
                >Routing Number</label
              >
              <button
                type="button"
                class="text-[#0A84FF] text-sm font-medium flex items-center gap-3 hover:underline"
                onclick={validateRoutingNo}>Validate</button
              >
            </div>
            <div class="relative">
              {#if validRouting && cusAbaNumber}
                <i class="w-5 h-5 absolute top-[15px] right-2">
                  <VerifiedIcon />
                </i>
              {/if}
              <InputField
                id="cusAbaNumber"
                name="cusAbaNumber"
                bind:value={cusAbaNumber}
                placeholder="Routing Number"
                maxlength={9}
                numberOnly
                required
                error={isRoutVerified && !validRouting
                  ? "Invalid routing number."
                  : ""}
                oninput={() => {
                  isRoutVerified = false;
                }}
              />
            </div>
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="cusAccNumber"
              >Account Number</label
            >
            <InputField
              id="cusAccNumber"
              name="cusAccNumber"
              placeholder="Account Number"
              maxlength={20}
              minlength={10}
              numberOnly
              required
              validationName="accountNumber"
            />
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="bankName"
              >Bank Name (Auto Populated)</label
            >
            <InputField
              id="bankName"
              name="bankName"
              bind:value={bankName}
              placeholder="Bank Name"
              maxlength={100}
              minlength={10}
              autocomplete="off"
              readonly
            />
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="cusAccType"
              >Account Type</label
            >
            <DynamicSelect
              id="cusAccType"
              name="cusAccType"
              bind:selectedValues={cusAccTypes}
              options={accountTypes}
              placeholder="Select Account Type"
              mode="single"
            />
          </div>
        </div>
      </div>
      <div class="h-px bg-naro-300 w-full md:mb-12 mb-6"></div>

      <h4 class="text-[4xl] mb-6 font-medium">Bank Connectivity Provider</h4>
      <div class="md:pb-14 pb-6">
        <div class="flex flex-wrap justify-between grid-cols-1 gap-y-6 gap-x-4">
          <div class="lg:max-w-320px max-w-full w-full">
            <label class="text-sm font-medium" for="IBVProvider"
              >Select Provider</label
            >
            <DynamicSelect
              id="IBVProvider"
              name="IBVProvider"
              bind:selectedValues={IBVProviders}
              options={providers.map((item: Provider) => ({
                label: item.providerName,
                value: item.providerName,
              }))}
              placeholder="Select Provider"
              mode="single"
            />
          </div>

          <div class="lg:max-w-320px max-w-full w-full">
            <span class="text-sm font-normal opacity-0 md:block hidden"
              >&nbsp;</span
            >
            <button
              type="submit"
              class="bg-naro-600 hover:bg-naro-500 text-center w-full text-[#FFFFFF] p-3 rounded shadow-3xl font-medium"
              >Create Request</button
            >
            {#if error}
              {#if errorMessage !== "" && successMessage === ""}
                <FormMessage message={errorMessage} />
              {/if}
              {#if errorMessage === "" && successMessage !== ""}
                <FormMessage message={successMessage} type="Success" />
              {/if}
            {/if}
          </div>
        </div>
      </div>
      <div class="h-px bg-naro-300 w-full md:mb-12 mb-6"></div>

      <h4 class="text-[4xl] mb-6 font-medium">Share Request</h4>
      <div class="flex flex-wrap justify-between grid-cols-1 gap-y-6 gap-x-4">
        <div class="lg:max-w-320px max-w-full w-full">
          <div class="flex justify-between w-full">
            <label class="text-sm font-medium" for="routing-no-copy"
              >Request Link</label
            >
            <button
              type="button"
              class="text-[#0A84FF] text-sm font-medium flex items-center gap-2 hover:underline"
              onclick={() => copyToClipboard(Url)}
            >
              <CopyIcon fillColor="#0A84FF" />
              Copy</button
            >
          </div>
          <div id="routing-no-copy" class="w-full py-3" title={Url}>{Url}</div>
        </div>

        <div class="lg:max-w-320px max-w-full w-full">
          <div class="flex justify-between w-full">
            <label class="text-sm font-medium" for="request-Id"
              >IA Report ID</label
            >
            <button
              type="button"
              class="text-[#0A84FF] text-sm font-medium flex items-center gap-2 hover:underline"
              onclick={() => copyToClipboard(requestCode)}
            >
              <CopyIcon fillColor="#0A84FF" />
              Copy</button
            >
          </div>
          <div id="request-Id" class="w-full py-3" title={requestCode}>
            {requestCode}
          </div>
        </div>
      </div>
    </form>
  </div>
</section>
