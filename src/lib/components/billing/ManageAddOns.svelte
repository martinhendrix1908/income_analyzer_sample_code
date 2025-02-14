<script lang="ts">
  import OfferIcon from "$lib/icons/OfferIcon.svelte";
  import RenewIcon from "$lib/icons/RenewIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";

  type HeaderProps = {
    key: string;
    label: string;
    width: string;
    textAlign: "left" | "center" | "right";
  };

  type TableDataProp = {
    adonName: string;
    status: boolean;
    cost: number;
  };

  let {
    currentMonthIndex,
    isDataLoading = $bindable(),
  }: { currentMonthIndex: number; isDataLoading: boolean } = $props();

  let headers: HeaderProps[] = [
    {
      key: "adonName",
      label: "Add-on",
      width: "w-[150px]",
      textAlign: "center",
    },
    {
      key: "status",
      label: "Status",
      width: "w-[150px]",
      textAlign: "left",
    },
    {
      key: "cost",
      label: "Cost",
      width: "w-[150px]",
      textAlign: "right",
    },
  ];

  let tableData: TableDataProp[] = [
    {
      adonName: "Add-on 1",
      status: true,
      cost: 2045,
    },
    {
      adonName: "Add-on 2",
      status: false,
      cost: 2045,
    },
    // Additional rows...
  ];

  let planData = {
    name: "Pro",
    description:
      "Upgrade to the Pro Plan and get 4 add-ons for free, saving money while enjoying enhanced features and greater flexibility.",
    price: 2.99,
    renewalRate: 0.25,
    buttonText: "Upgrade Now",
  };
</script>

<div
  class="w-full overflow-x-auto rounded-md shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)]"
>
  <div class="min-w-[1000px] w-full">
    <div class="bg-white rounded-md relative overflow-auto">
      <div class="bg-white rounded-md w-full overflow-hidden">
        <div class="w-full text-sm leading-relaxed">
          <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-10 px-3">
            <div class="flex items-center justify-between">
              {#each headers as header, index}
                <div
                  class="px-4 py-2 font-semibold text-white whitespace-nowrap text-sm cursor-pointer text-left w-auto {index !==
                  0
                    ? 'min-w-[200px]'
                    : 'flex-grow'}"
                >
                  {header.label}
                </div>
              {/each}
            </div>
          </div>
          <div class="divide-y divide-naro-200">
            {#if tableData.length > 0}
              {#each tableData as row}
                <div class="flex justify-between duration-100 px-3">
                  {#each headers as header, index}
                    <div
                      class="text-naro-600 flex items-center gap-1 w-auto {index !==
                      0
                        ? 'min-w-[200px]'
                        : 'flex-1 lg:flex-grow'}"
                    >
                      <div class="px-4 py-2 text-{header.textAlign}">
                        {#if header.key === "status"}
                          <div class="flex items-center gap-2">
                            <CustomSwitch
                              title={row.adonName}
                              isTextVisible={false}
                              toggle={row.status}
                              handleSwitch={() => {}}
                            />
                          </div>
                        {:else if header.key === "cost"}
                          {convertToUSD(row[header.key as keyof TableDataProp])}
                        {:else}
                          {row[header.key as keyof TableDataProp]}
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              {/each}
            {:else}
              <div>
                <div class="px-6 py-3 text-naro-600">No records found</div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div
  class="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 text-[#262626] bg-[#F3F9FF] rounded-md border border-[#87D0FD] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.10),0_2px_4px_-2px_rgba(0,0,0,0.05)] gap-4 lg:gap-6"
>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 items-center">
      <h1 class="text-xl font-semibold">{planData.name}</h1>
      <OfferIcon />
    </div>
    <p class="text-sm leading-[21px] font-normal text-[#404040]">
      {planData.description}
    </p>
    <h1 class="text-xl font-semibold mt-1">
      {convertToUSD(planData.price)}/Customer
    </h1>
  </div>

  <div
    class="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:max-w-[320px]"
  >
    <Button variant="black">{planData.buttonText}</Button>
    <div class="flex items-center text-sm">
      <RenewIcon />
      <span
        >Renews at <b>{convertToUSD(planData.renewalRate)}/mo</b> per customer</span
      >
    </div>
  </div>
</div>
