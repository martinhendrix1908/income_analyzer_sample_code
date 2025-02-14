<script lang="ts">
  import { page } from "$app/state";
  import SortIcon from "$lib/icons/SortIcon.svelte";
  import { setLoaderText } from "$lib/store/loader-store";
  import type { RequestId } from "$lib/types/types";
  import { convertDateTime } from "$lib/utils/date-utils";

  let {
    requestIds,
    sortBy,
    sortDirection,
    toggleSortByColumn,
  }: {
    requestIds: RequestId[];
    toggleSortByColumn: (column: string) => void;
    sortBy: string;
    sortDirection: number;
  } = $props();
</script>

<div
  class="bg-white shadow-4xl shadow-b-0 rounded-md rounded-b-none relative overflow-auto"
>
  <div
    class="bg-white shadow-b-4xl rounded-md rounded-b-none w-full overflow-hidden min-w-[1023px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[1023px] xl:min-w-table-scroll-width overflow-x-hidden scrollbar-hide"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1023px]">
        <div class="bg-naro-600 leading-loose sticky top-0 left-0">
          <div class="flex items-center">
            <div
              class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Request ID</div>
            </div>
            <div
              class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Applicant Name</div>
            </div>
            <div
              class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <button
                class="flex cursor-pointer gap-1"
                onclick={() => toggleSortByColumn("SubscribedOn")}
              >
                Date Created
                <SortIcon
                  fillColor1={sortBy === "SubscribedOn" && sortDirection === 1
                    ? "#9C9C9C"
                    : "white"}
                  fillColor2={sortBy === "SubscribedOn" && sortDirection !== 1
                    ? "#9C9C9C"
                    : "white"}
                />
              </button>
            </div>
            <div
              class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <button
                class="flex cursor-pointer gap-1"
                onclick={() => toggleSortByColumn("SnapshotDate")}
              >
                Last Updated
                <SortIcon
                  fillColor1={sortBy === "SnapshotDate" && sortDirection === 1
                    ? "#9C9C9C"
                    : "white"}
                  fillColor2={sortBy === "SnapshotDate" && sortDirection !== 1
                    ? "#9C9C9C"
                    : "white"}
                />
              </button>
            </div>
            <div
              class="w-1/5 px-4 py-2 font-semibold text-left text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Unit</div>
            </div>
          </div>
        </div>
        <div class="divide-y divide-naro-200">
          {#if requestIds?.length > 0}
            {#each requestIds as item, i}
              <a
                class="flex justify-evenly duration-100 hover:bg-naro-100 hover:font-semibold"
                href={`/report/${item.requestId}`}
                onclick={() => {
                  setLoaderText(`Loading ${item?.requestCode}`);
                }}
              >
                <div
                  class="w-1/5 px-4 py-2 text-naro-600 flex items-center gap-1"
                >
                  <p>
                    {item?.requestCode ?? "N/A"}
                  </p>
                </div>
                <div class="w-1/5 px-4 py-2 text-naro-600">
                  {item?.customerName ?? "N/A"}
                </div>
                <div class="w-1/5 px-4 py-2 text-naro-600">
                  {convertDateTime(item?.subscribedOn).replace(" at", ",")}
                </div>
                <div class="w-1/5 px-4 py-2 text-naro-600">
                  {convertDateTime(item?.snapshotDate).replace(" at", ",")}
                </div>
                <div class="w-1/5 px-4 py-2 text-naro-600">
                  {item?.unitName || "N/A"}
                </div>
              </a>
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

<style>
  a,
  a:visited {
    color: #000;
  }
</style>
