<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import SearchIcon from "$lib/icons/SearchIcon.svelte";
  import { setLoaderText } from "$lib/store/loader-store";
  import type { GetRequestIdsResponse, RequestId } from "$lib/types/types";

  let {
    currentPage = $bindable(),
    requestIds = $bindable(),
    totalPage = $bindable(),
    totalRecords = $bindable(),
    pageSize = $bindable(),
    searchValue = $bindable(),
    clientId,
    sortBy,
    sortDirection,
    isLoading = $bindable(),
    placeholder,
  }: {
    currentPage: number;
    requestIds: RequestId[];
    totalPage: number;
    totalRecords: number;
    pageSize: number;
    searchValue: string;
    clientId: string;
    sortBy: string;
    sortDirection: any;
    isLoading?: boolean;
    placeholder?: string;
  } = $props();

  let timeout: ReturnType<typeof setTimeout> | undefined = $state(undefined);
</script>

<div class="flex flex-col lg:flex-row lg:items-center order-2 lg:order-3">
  <form
    class="relative w:full md:w-64"
    method="POST"
    action="?/getRequestIdsViaSearchWithPagination"
  >
    <i class="w-5 h-5 absolute top-2.5 left-2 search-icon">
      <SearchIcon />
    </i>
    <input
      autocomplete="off"
      id="SearchField"
      type="text"
      class="bg-white appearance-none py-2 pr-2 pl-8 border border-naro-600 rounded text-sm outline outline-offset-0 outline-0 w-full"
      placeholder={placeholder ?? "Search by Request ID or Name"}
      oninput={(e) => {
        searchValue = e.currentTarget.value;
        clearTimeout(timeout);
        isLoading = true;
        timeout = setTimeout(async () => {
          try {
            const req = await fetch("/api/requestIds/searchValue", {
              method: "POST",
              body: JSON.stringify({
                authToken: page?.data?.user?.authToken,
                clientId: clientId,
                sortBy: sortBy,
                sortDirection: sortDirection,
                searchValue: searchValue,
                currentPage: currentPage,
              }),
            });

            const res: GetRequestIdsResponse = await req.json();

            if (res?.requestIds?.length === 1) {
              setLoaderText(`Loading ${res.requestIds[0]?.requestCode}`);
              goto(`/report/${res.requestIds[0]?.requestId}`);
            }

            requestIds = res.requestIds;
            totalPage = res.totalPages;
            totalRecords = res.totalRequests;
            currentPage = res.pageNumber;
            pageSize = res.pageSize;
          } catch (e) {
            console.log(`Something went wrong -- ${e}`);
          } finally {
            isLoading = false;
          }
        }, 350);
      }}
    />
  </form>
</div>
