<script lang="ts">
  import { page } from "$app/state";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import { convertToMonthDateTime } from "$lib/utils/date-utils";
  interface Activity {
    organizationAuditLogId: number;
    logMessage: string;
    updatedBy: string;
    updated: string;
  }
  let activities = $state<Activity[]>(page?.data?.activities || []);
  let isLoading = $state(false);
  $effect(() => {
    activities = page.data.activities || [];
  });
</script>

<div
  class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[1023px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[1023px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[1023px]">
        <!-- Table Header  -->
        <div class="bg-naro-600 leading-loose sticky top-0 left-0">
          <div class="px-3 flex gap-2 items-center">
            <div
              class="w-[12%] py-2 px-4 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">
                <button class="flex">
                  Time Stamp
                  <!-- <SortButton sortApplied={sortBy === "name"} {sortOrder} /> -->
                </button>
              </div>
            </div>
            <div
              class="w-[12%] py-2 px-4 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Done By</div>
            </div>

            <div
              class="w-1/3 py-2 px-4 font-semibold text-right text-white whitespace-nowrap text-sm"
            >
              <div class="flex cursor-pointer">Activity</div>
            </div>
          </div>
        </div>

        <!-- Table Body-->
        <div class="divide-y divide-naro-200">
          {#if isLoading}
            <div
              class="bg-white text-[#222222] h-10 flex items-center justify-center"
            >
              <LoaderIcon fillColor="#222222" height="6" width="6" />
            </div>
          {:else if activities.length > 0}
            {#each activities as activity}
              <div
                class="px-3 flex gap-2 items-center duration-100 hover:bg-naro-100"
              >
                <div class="w-[12%] py-2 px-4 text-[#222222]">
                  {convertToMonthDateTime(activity.updated)}
                </div>
                <div class="w-[12%] py-2 px-4 text-[#222222]">
                  {activity.updatedBy}
                </div>
                <div class="w-1/3 py-2 px-4 text-[#222222]">
                  <div
                    contenteditable="false"
                    bind:innerHTML={activity.logMessage}
                  ></div>
                </div>
              </div>
            {/each}
          {:else}
            <div
              class="bg-white text-[#222222] flex items-center justify-start px-4 py-2"
            >
              No records found
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
