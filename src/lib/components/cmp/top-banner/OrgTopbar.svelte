<script lang="ts">
  import { page } from "$app/state";
  import DetailsComponent from "$lib/components/report/top-banner/DetailsComponent.svelte";
  import type { DetailsTopBanner } from "$lib/types/report.types";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { formatPhoneNumber } from "$lib/utils/number-format";
  import ProductAccessDetails from "./ProductAccessDetails.svelte";

  let primaryContact = $derived.by<DetailsTopBanner>(() => {
    const contactDetails = page?.data?.orgDetails?.primaryContact;

    return {
      heading: "Primary Contact",
      details: [
        {
          label: "Full Name",
          value: contactDetails?.name || "N/A",
          isVisible: true,
        },
        {
          label: "Type",
          value: contactDetails?.type || "N/A",
          isVisible: true,
        },
        {
          label: "Email",
          value: contactDetails?.email || "N/A",
          isVisible: true,
        },
        {
          label: "Phone Number",
          value: formatPhoneNumber(contactDetails?.phonenumber) || "N/A",
          isVisible: true,
        },
        {
          label: "Client Rep",
          value: contactDetails?.clientReps || "N/A",
          isVisible: true,
        },
      ],
    };
  });
  let clientInfo = $derived({
    companyName: page?.data?.orgDetails?.organizationName || "N/A",
    plan: "LMS + IBV",
    apiUsage: "1000",
    totalApis: "10000",
    usagePercentage: "70",
    nextBillDate: "10/10/2023",
    lastBillDue: 24654,
    lastBillDueDate: "10/10/2023",
  });

</script>

<section class="bg-naro-600 py-12 cursor-default">
  <div class="2xl:container px-4 md:px-10 2xl:px-[72px] mx-auto">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-11 2xl:grid-cols-12 gap-x-2 gap-y-6"
    >
      <div
        class="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-5 2xl:col-span-6 text-[#9C9C9C] gap-y-6 leading-6"
      >
        <div class="space-y-6">
          <!-- Company Name  -->
          <div>
            <span class="text-sm">Client Company Name:</span>
            <h2 class="text-[#EEEEEE] text-xl font-medium">
              {clientInfo.companyName}
            </h2>
          </div>

          <div>
            <!-- Plan Details  -->
            <div class="text-sm">
              <span>Plan:</span>
              <span class="text-[#98C43D] font-semibold">{clientInfo.plan}</span
              >
            </div>

            <!-- API Usage  -->
            <div class="text-sm">
              <div>
                <span>API Usage: </span>
                <span class="text-[#EEEEEE]"
                  >{clientInfo.apiUsage}/{clientInfo.totalApis}</span
                >
              </div>
              <div class="flex items-center gap-2">
                <div class="bg-white h-2 rounded-full w-[160px]">
                  <div
                    class="bg-[#98C43D] h-2 rounded-full"
                    style="width: {clientInfo.usagePercentage}%"
                  ></div>
                </div>
                <span class="text-[#EEEEEE]">{clientInfo.usagePercentage}%</span
                >
              </div>
            </div>

            <!-- Billing Info  -->
            <div class="text-sm">
              <span>Next Bill:</span>
              <span class="text-[#EEEEEE]"
                >{clientInfo.nextBillDate} (in 14 days)</span
              >
            </div>
          </div>

          <!-- Billing Info  -->
          <div>
            <div class="text-sm">
              <span>Last Bill:</span>
              <span class="text-[#EEEEEE]"
                >{convertToUSD(clientInfo.lastBillDue).split(".")[0]} due on {clientInfo.lastBillDueDate}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-span-2 lg:col-span-8 xl:col-span-6 flex flex-col md:flex-row lg:justify-end gap-6 md:gap-20"
      >
        <ProductAccessDetails />
        <DetailsComponent data={primaryContact} />
      </div>
    </div>
  </div>
</section>
