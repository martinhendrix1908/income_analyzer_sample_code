<script lang="ts">
  import DynamicIcon from "$lib/components/layout/DynamicIcon.svelte";
  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import CardDetailsModal from "$lib/components/billing/payment/CardDetailsModal.svelte";


  let isOpen = $state(false);
  const paymentMethods = [
    {
      type: "Visa",
      fullName: "John Doe",
      cardNumber: 120934523247658,
      lastDigits: 7658,
      expiry: "10/2024",
      logo: "visa-logo.png",
      isDefault: true,
      icon: "visa",
      paymentMethod: "creditCard",
      cvc: 123,
    },
    {
      type: "Mastercard",
      fullName: "Jane Smith",
      cardNumber: 120934523242239,
      lastDigits: 2239,
      expiry: "04/2026",
      logo: "mastercard-logo.png",
      isDefault: false,
      icon: "master-card",
      paymentMethod: "creditCard",
      cvc: 456,
    },
    {
      type: "Checking",
      cardNumber: null,
      fullName: "Jane Smith",
      accountNumber: 123456789,
      lastDigits: 8429,
      details: "JP Morgan Chase NA",
      logo: "bank-icon.png",
      isDefault: false,
      icon: "bank",
      paymentMethod: "bankAccount",
      cvc: null,
    },
    {
      type: "Paypal Account",
      fullName: "Jane Smith",
      accountNumber: 123456789,
      cardNumber: null,
      lastDigits: null,
      logo: "paypal-logo.png",
      isDefault: false,
      icon: "paypal",
      paymentMethod: "bankAccount",
      cvc: null,
    },
  ];

  let paymentMethodDetails = $state({});

  function setCardDetails(cardDetails: any) {
    isOpen = true;
    const details = {
      paymentMethod: cardDetails.paymentMethod,
      fullName: cardDetails.fullName,
      cardNumber: cardDetails.cardNumber,
      cvc: cardDetails.cvc,
      expiry: cardDetails.expiry,
    };
    paymentMethodDetails = details;
  }

  function addPaymentMethod() {
    isOpen = true;
    const details = {
      paymentMethod: "bankAccount",
      fullName: "",
      cardNumber: "",
      cvc: "",
      expiry: "",
    };
    paymentMethodDetails = details;
  }
</script>

<div
  class="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_2px_6px_2px_rgba(0,0,0,0.15)] sm:min-w-[452px] flex-grow overflow-hidden"
>
  <div class="flex justify-between items-center gap-4 flex-wrap">
    <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
      Payment Methods
    </h3>
    <button
      type="button"
      onclick={addPaymentMethod}
      class="text-blue-500 hover:underline flex items-center gap-1"
    >
      <i><PlusIcon fillColor="currentColor" /></i> Add Payment Source
    </button>
  </div>
  <div
    class="flex flex-col gap-4 overflow-y-auto custom-scrollbar max-h-[525px]"
  >
    {#each paymentMethods as paymentMethod}
      <div
        class="flex justify-between items-center p-4 border bg-[#F9FAFB] border-[#E5E7EB] text-[#111928] rounded-md"
      >
        <div class="flex items-center gap-4">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-1">
              <span class="font-medium leading-4 gap-1">
                {paymentMethod.type}
                {#if paymentMethod.lastDigits}
                  <span class="text-[#6B7280]"
                    >xx{paymentMethod?.lastDigits}</span
                  >
                {/if}
              </span>
              {#if paymentMethod.expiry}
                <span class="text-xs text-[#6B7280]">
                  Expiry {paymentMethod.expiry}
                </span>
              {:else if paymentMethod.details}
                <span class="text-xs text-[#6B7280]"
                  >{paymentMethod.details}</span
                >
              {/if}
            </div>
            <div class="flex items-center gap-2 text-sm mt-1">
              <span
                class="font-medium hover:underline {paymentMethod?.isDefault
                  ? 'text-[#1C64F2]'
                  : 'text-[#6B7280]'}"
              >
                {paymentMethod.isDefault ? "Default" : "Make default"}
              </span>
              <div class="h-3 w-[1px] bg-[#E5E7EB]"></div>
              <a href="#!" class="text-[#6B7280] hover:underline">Delete</a>
              <div class="h-3 w-[1px] bg-[#E5E7EB]"></div>
              <button
                class="text-[#6B7280] hover:underline"
                onclick={() => setCardDetails(paymentMethod)}>Edit</button
              >
            </div>
          </div>
        </div>
        <DynamicIcon icon={paymentMethod.icon} />
      </div>
    {/each}
  </div>
</div>

<CardDetailsModal bind:isOpen {paymentMethodDetails} />
