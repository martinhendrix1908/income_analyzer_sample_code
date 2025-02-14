<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import { deepClone } from "$lib/utils/common-utils";

  let {
    isOpen = $bindable(),
    paymentMethodDetails,
  }: { isOpen: boolean; paymentMethodDetails: any } = $props();

  let cardDetails = $state(deepClone(paymentMethodDetails));
  let popUpBody = $state<HTMLDivElement | undefined>(undefined);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
  };

  $effect(() => {
    cardDetails = deepClone(paymentMethodDetails);
  });
</script>

<PopupWrapper {isOpen} {popUpBody} onClose={() => (isOpen = false)}>
  <div
    bind:this={popUpBody}
    class="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8 w-full max-w-[90%] sm:max-w-[704px] mx-auto"
  >
    <h2 class="text-xl font-semibold text-[#404040]">Card Details</h2>

    <form class="flex flex-col gap-4 mt-4">
      <!-- Payment Method Selection -->
      <div class="flex flex-col gap-4 text-[#262626]">
        <label class="flex items-center gap-2" for="bankAccount">
          <input
            type="radio"
            name="paymentMethod"
            class="w-5 h-5"
            bind:group={cardDetails.paymentMethod}
            id="bankAccount"
            value="bankAccount"
            required
          />
          <span class="text-[16px] font-semibold">Bank Account</span>
        </label>
        <label class="flex items-center gap-2" for="creditCard">
          <input
            type="radio"
            name="paymentMethod"
            class="w-5 h-5"
            bind:group={cardDetails.paymentMethod}
            id="creditCard"
            value="creditCard"
            required
          />
          <span class="text-[16px] font-semibold">Credit/Debit Card</span>
        </label>
      </div>

      <!-- Card Details Form -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Full Name -->
        <div class="w-full">
          <label
            for="fullName"
            class="block text-sm font-medium mb-1 text-gray-700"
          >
            Full name (as displayed on card)
          </label>
          <InputField
            id="fullName"
            name="fullName"
            placeholder="Enter your First Name"
            bind:value={cardDetails.fullName}
            required
          />
        </div>

        <!-- Card Number -->
        <div class="w-full">
          <label
            for="cardNumber"
            class="block text-sm font-medium mb-1 text-gray-700"
          >
            Card number
          </label>
          <InputField
            id="cardNumber"
            name="cardNumber"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            bind:value={cardDetails.cardNumber}
            numberOnly
            required
          />
        </div>

        <!-- CVC -->
        <div class="w-full">
          <label for="cvc" class="block text-sm font-medium mb-1 text-gray-700">
            CVC
          </label>
          <InputField
            id="cvc"
            name="cvc"
            placeholder="XXX"
            bind:value={cardDetails.cvc}
            numberOnly
            required
          />
        </div>

        <!-- Expiry Date -->
        <div class="w-full">
          <label
            for="expiry"
            class="block text-sm font-medium mb-1 text-gray-700"
          >
            Expiry date
          </label>
          <InputField
            id="expiry"
            name="expiry"
            placeholder="MM/YY"
            bind:value={cardDetails.expiry}
            required
          />
        </div>
      </div>

      <!-- Footer -->
      <Button variant="black" type="submit" class="w-full"
        >Add Payment Source</Button
      >
    </form>
  </div>
</PopupWrapper>
