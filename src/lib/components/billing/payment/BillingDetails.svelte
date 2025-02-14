<script lang="ts">
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import EditIcon from "$lib/icons/EditIcon.svelte";
  import VerifiedIcon from "$lib/icons/VerifiedIcon.svelte";

  let user=$state({
    firstName: "John",
    lastName: "Doe",
    emailId: "john.doe@gmail.com",
    mobile: 9876543210,
    ste: "12345",
    address: "51 Bankuity St, Florham park, NJ.", 
    companyName:"Acme Corp."   
  })

</script>

<div class="bg-white p-6 rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.30),_0px_2px_6px_2px_rgba(0,0,0,0.15)] flex-grow flex flex-col">
  <div class="">
    <div class="flex justify-between items-center gap-4 flex-wrap">
      <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">Billing Information</h3>
      <button
        type="button"
        class="text-blue-500 hover:underline flex gap-1"
      ><i><EditIcon /></i> Edit Billing Info</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <!-- Input Fields -->
      <div class="w-full">
        <label for="firstName" class="block text-sm font-medium mb-1 text-gray-700">First Name</label>
        <InputField id="firstName" name="firstName" bind:value={user.firstName} required />
      </div>
      <div class="w-full">
        <label for="lastName" class="block text-sm font-medium mb-1 text-gray-700">Last Name</label>
        <InputField id="lastName" name="lastName" bind:value={user.lastName} required />
      </div>
      <div class="w-full">
        <label for="companyName" class="block text-sm font-medium mb-1 text-gray-700">Company Name</label>
        <InputField id="companyName" name="companyName" bind:value={user.companyName} required />
      </div>
      <div class="w-full">
        <label for="address" class="block text-sm font-medium mb-1 text-gray-700">Address</label>
        <InputField id="address" name="address" bind:value={user.address} required />
      </div>
      <div class="w-full">
        <label for="ste" class="block text-sm font-medium mb-1 text-gray-700">Ste (Optional)</label>
        <InputField id="ste" name="ste" bind:value={user.ste} required />
      </div>
    </div>
  </div>

  <div class="py-10">
    <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">Contact Information</h3>
    <div class="flex justify-between flex-wrap gap-6 mt-6">
      <!-- Contact Information Fields -->
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label for="emailId" class="block text-sm mb-1 font-medium text-gray-700">Email:</label>
        <div class="relative mt-1">
          <InputField type="email" id="emailId" name="emailId" bind:value={user.emailId} required />
          <i class="absolute top-[50%] -translate-y-2/4 right-3"><VerifiedIcon /></i>
        </div>
      </div>
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label for="mobile" class="block text-sm mb-1 font-medium text-gray-700">Phone Number:</label>
        <InputField id="mobile" name="mobile" bind:value={user.mobile} validationName="phone2" numberOnly />
      </div>
    </div>
  </div>
</div>
