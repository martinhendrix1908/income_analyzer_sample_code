<script lang="ts">
  import type { UnitCustomerDetails } from "$lib/types/billing.types";
  import { convertToUSD } from "$lib/utils/currency-utils";

  type HeaderProps = {
    key: string;
    label: string;
    width: string;
    textAlign: "left" | "center" | "right";
  };
  let { unitCustomerDetails }: { unitCustomerDetails: UnitCustomerDetails[] } =
    $props();

  let headers: HeaderProps[] = [
    {
      key: "unitName",
      label: "Unit Name",
      width: "w-[280px]",
      textAlign: "left",
    },
    {
      key: "totalNew",
      label: "New Customers",
      width: "w-[120px]",
      textAlign: "left",
    },
    {
      key: "totalActive",
      label: "Active Customers",
      width: "w-[150px]",
      textAlign: "left",
    },
    {
      key: "totalDisconnected",
      label: "Disconnected",
      width: "w-[120px]",
      textAlign: "left",
    },
    {
      key: "totalRefreshes",
      label: "Refreshed",
      width: "w-[120px]",
      textAlign: "left",
    },
    {
      key: "totalPrice",
      label: "Total Price",
      width: "w-[150px]",
      textAlign: "right",
    },
  ];
</script>

<div>
  <div
    class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4 gap-1 lg:gap-0"
  >
    <div class="pr-2 md:border-r-4 border-parrot">
      <h3 class="text-black font-medium opacity-85">Breakdown By Units</h3>
    </div>
  </div>

  <div class="w-full overflow-x-auto rounded-md">
    <div class="min-w-[1000px] w-full">
      <div
        class="bg-white shadow-4xl shadow-b-0 rounded-md relative overflow-auto"
      >
        <div class="bg-white shadow-b-4xl rounded-md w-full overflow-hidden">
          <div class="w-full text-sm leading-relaxed">
            <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-10">
              <div class="flex items-center justify-between">
                {#each headers as header}
                  <div
                    class="px-4 py-2 font-semibold text-white whitespace-nowrap text-sm cursor-pointer {header?.width} text-left"
                  >
                    {header?.label}
                  </div>
                {/each}
              </div>
            </div>
            <div class="divide-y divide-naro-200">
              {#if unitCustomerDetails?.length > 0}
                {#each unitCustomerDetails as row}
                  <div class="flex justify-between duration-100">
                    {#each headers as header}
                      <div class="text-naro-600 flex items-center gap-1">
                        <div
                          class="px-4 py-2 {header?.width} text-{header?.textAlign} {![
                            'unitName',
                            'totalPrice',
                          ].includes(header?.key) &&
                          +row[header?.key as keyof UnitCustomerDetails] < 0
                            ? 'text-red-500'
                            : ''} "
                        >
                          {#if header?.key === "totalPrice"}
                            {convertToUSD(
                              row[header?.key as keyof UnitCustomerDetails]
                            ) ?? "$0"}
                          {:else}
                            {row[header?.key as keyof UnitCustomerDetails] ??
                              "N/A"}
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
</div>
