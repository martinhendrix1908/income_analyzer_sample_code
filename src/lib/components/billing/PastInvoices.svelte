<script lang="ts">
  import DownloadIcon from "$lib/icons/DownloadIcon.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { convertToFormatedDate } from "$lib/utils/date-utils";

  type HeaderProps = {
    key: string;
    label: string;
    width: string;
    textAlign: "left" | "center" | "right";
  };

  type TableDataProp = {
    date: string;
    new: number;
    active: number;
    disconnected: number;
    status: string;
    invoiceTotal: number;
    actions: string;
  };

  let {
    currentMonthIndex,
    isDataLoading = $bindable(),
  }: { currentMonthIndex: number; isDataLoading: boolean } = $props();
  let headers: HeaderProps[] = [
    {
      key: "date",
      label: "Date",
      width: "w-[150px]",
      textAlign: "left",
    },
    {
      key: "new",
      label: "New",
      width: "w-[100px]",
      textAlign: "left",
    },
    {
      key: "active",
      label: "Active",
      width: "w-[120px]",
      textAlign: "left",
    },
    {
      key: "disconnected",
      label: "Disconnected",
      width: "w-[150px]",
      textAlign: "left",
    },
    {
      key: "status",
      label: "Status",
      width: "w-[150px]",
      textAlign: "left",
    },
    {
      key: "invoiceTotal",
      label: "Invoice Total",
      width: "w-[150px]",
      textAlign: "right",
    },
    {
      key: "actions",
      label: "Actions",
      width: "w-[150px]",
      textAlign: "center",
    },
  ];

  let tableData: TableDataProp[] = [
    {
      //   date: "March 01, 2024",
      date: "2024-03-01T00:00:00.000Z",
      new: 3000,
      active: 23000,
      disconnected: 1000,
      status: "Outstanding",
      invoiceTotal: 2045,
      actions: "Download",
    },
    {
      date: "2024-03-02T00:00:00.000Z",
      new: 3000,
      active: 23000,
      disconnected: 1000,
      status: "Paid",
      invoiceTotal: 2045,
      actions: "Download",
    },
    // Additional rows...
  ];
</script>

<div
  class="w-full overflow-x-auto rounded-md shadow-[0_2px_8px_0px_rgba(0,0,0,0.25)]"
>
  <div class="min-w-[1000px] w-full">
    <div class="bg-white rounded-md relative overflow-auto">
      <div class="bg-white rounded-md w-full overflow-hidden">
        <div class="w-full text-sm leading-relaxed">
          <div class="bg-naro-600 leading-loose sticky top-0 left-0 z-10">
            <div class="flex items-center justify-between">
              {#each headers as header}
                <div
                  class="px-4 py-2 font-semibold text-white whitespace-nowrap text-sm cursor-pointer {header.width} text-left"
                >
                  {header.label}
                </div>
              {/each}
            </div>
          </div>
          <div class="divide-y divide-naro-200">
            {#if tableData.length > 0}
              {#each tableData as row}
                <div class="flex justify-between duration-100">
                  {#each headers as header}
                    <div class="text-naro-600 flex items-center gap-1">
                      <div
                        class="px-4 py-2 {header.width} text-{header.textAlign}"
                      >
                        {#if header.key === "invoiceTotal"}
                          {convertToUSD(row[header.key as keyof TableDataProp])}
                        {:else if header.key === "date"}
                          {convertToFormatedDate(row["date"])}
                        {:else if header.key === "actions"}
                          <a
                            href="#!"
                            class="flex items-center gap-1 text-blue-500 hover:underline"
                          >
                            <DownloadIcon />
                            <span>
                              {row[header.key as keyof TableDataProp]}
                            </span>
                          </a>
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
