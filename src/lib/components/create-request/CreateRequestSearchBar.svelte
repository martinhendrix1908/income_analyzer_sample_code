<script lang="ts">
  import { page } from "$app/state";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import type { RequestId } from "$lib/types/types";
  import { onMount } from "svelte";
  import AccountsTableSearchBar from "$lib/components/dashboard/AccountsTableSearchBar.svelte";
  import { setLoaderText } from "$lib/store/loader-store";

  let requestIds: RequestId[] = $state([]);
  let searchValue: string = $state("");
  let clientId: string = $state(page.data.user.id);
  let isLoading: boolean = $state(false);
  let isSearchVisible: boolean = $state(false);

  $effect(() => {
    if (isLoading) {
      isSearchVisible = true;
    }
  });

  onMount(() => {
    document.body.addEventListener("click", (event: any) => {
      const modal = document.getElementById("SearchField");
      if (
        modal &&
        !modal?.contains(event.target) &&
        !event.target.classList.contains("search-icon")
      ) {
        isSearchVisible = false;
      } else {
        isSearchVisible = true;
      }
    });
  });
</script>

<div class="relative">
  <AccountsTableSearchBar
    bind:requestIds
    bind:searchValue
    bind:isLoading
    totalPage={0}
    totalRecords={0}
    currentPage={0}
    pageSize={20}
    sortBy="SubscribedOn"
    sortDirection={-1}
    {clientId}
    placeholder="Search"
  />
  {#if isSearchVisible && searchValue}
    <div
      class="absolute left-0 z-[5] shadow-lg overflow-auto bg-white text-naro-500 text-sm w-full border border-black rounded-b -translate-y-1 max-h-[300px]"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      {#if isLoading}
        <div class="h-[36px] w-5 flex items-center justify-center mx-auto">
          <LoaderIcon fillColor="#9C9C9C" height="9" width="9" />
        </div>
      {:else if requestIds?.length}
        {#each requestIds as result (result)}
          <a
            href="/report/{result.requestId}"
            class="flex px-8 py-2 hover:bg-naro-100 w-full min-h-[36px] items-center"
            onclick={() => {
              setLoaderText("Loading " + result.requestCode);
              isSearchVisible = true;
            }}
          >
            {result?.requestCode}
          </a>
        {/each}
      {:else}
        <span class="flex px-3 w-full min-h-[36px] items-center justify-center">
          No records found
        </span>
      {/if}
    </div>
  {/if}
</div>
