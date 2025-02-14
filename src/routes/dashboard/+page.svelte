<script lang="ts">
  import { page } from "$app/state";
  import Pagination from "$lib/components/report/Pagination.svelte";
  import type { GetRequestIdsResponse, RequestId } from "$lib/types/types.js";
  import XlsxModal from "$lib/components/dashboard/XLSXModal.svelte";
  import AccountsTable from "$lib/components/dashboard/AccountsTable.svelte";
  import AccountsTableSearchBar from "$lib/components/dashboard/AccountsTableSearchBar.svelte";
  import ButtonGroup from "$lib/components/dashboard/ButtonGroup.svelte";
  import Welcome from "$lib/components/dashboard/Welcome.svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  import SectionWrapper from "$lib/components/building-blocks/SectionWrapper.svelte";
  import { hideLoader, showLoader } from "$lib/store/loader-store";

  let { data }: { data: GetRequestIdsResponse } = $props();

  let isUploadXlsxModalOpen = $state(false);
  let requestIds: RequestId[] = $state(data?.requestIds);
  let totalRecords: number = $state(data?.totalRequests);
  let pageSize: number = $state(data?.pageSize);
  let totalPage: number = $state(data?.totalPages);
  let currentPage: number = $state(data?.pageNumber);
  let loadingRequest = $state("");
  let searchValue: string = $state("");
  let sortBy: string = $state("SubscribedOn");
  let sortDirection: number = $state(-1);

  let clientId: string = $state(page?.data?.user?.id);
  let authToken: string = $state(page?.data?.user?.authToken);

  const toggleSortByColumn = (column: string) => {
    sortDirection = sortBy === column ? sortDirection * -1 : 1;
    sortBy = column;
    setCurrentPage(1);
  };

  const toggleOpenImportFilesModal = () => {
    isUploadXlsxModalOpen = true;
    document.body.style.overflowY = "hidden";
  };

  const toggleCloseImportFilesModal = () => {
    isUploadXlsxModalOpen = false;
    document.body.style.overflowY = "scroll";
  };
  onMount(() => {
    if (page?.data?.user?.name) {
      window._mfq = window._mfq || [];
      window._mfq.push([
        "setVariable",
        "StoreNumber",
        page?.data?.user?.name || "",
      ]);
    }
  });

  const setCurrentPage = async (page: number) => {
    const req = await fetch("/api/requestIds/searchValue", {
      method: "POST",
      body: JSON.stringify({
        authToken: authToken,
        clientId: clientId,
        sortBy: sortBy,
        sortDirection: sortDirection,
        searchValue: searchValue,
        currentPage: page,
      }),
    });

    const res: GetRequestIdsResponse = await req.json();

    if (res?.requestIds?.length === 1) {
      loadingRequest = res.requestIds[0]?.requestId;
      goto(`/report/${res?.requestIds[0]?.requestId}`);
    }

    requestIds = res.requestIds;
    totalPage = res.totalPages;
    totalRecords = res.totalRequests;
    currentPage = res.pageNumber;
    pageSize = res.pageSize;
  };
</script>

{#if isUploadXlsxModalOpen}
  <XlsxModal closeModal={toggleCloseImportFilesModal} />
{/if}
<SectionWrapper id="board">
  <div>
    <ButtonGroup {isUploadXlsxModalOpen} {toggleOpenImportFilesModal} />
    <Welcome />
  </div>

  <div>
    <div
      class="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 lg:mb-4"
    >
      <div class="pr-2 lg:border-r-4 border-parrot order-1">
        <h3 class="text-black font-medium opacity-85">Accounts</h3>
      </div>
      <AccountsTableSearchBar
        bind:currentPage
        bind:requestIds
        bind:totalPage
        bind:totalRecords
        bind:pageSize
        bind:searchValue
        {sortBy}
        {clientId}
        {sortDirection}
      />
      <div
        class=" mt-2 lg:mt-0 lg:ml-2 mr-auto flex gap-x-1 md:gap-x-2 order-3 lg:order-2 max-w-full overflow-auto whitespace-nowrap text-sm md:text-base"
      >
        <form
          method="POST"
          action="?/getFilteredRequestIdsWithPagination"
          use:enhance={() => {
            clientId = page?.data?.user?.id;
            currentPage = 1;
            showLoader();
            return async ({ update, result }) => {
              await update();
              if (result.type == "success") {
                const requestIdsResponse: GetRequestIdsResponse =
                  result.data as unknown as GetRequestIdsResponse;

                if (requestIdsResponse?.requestIds?.length === 1) {
                  goto(
                    `/report/${requestIdsResponse.requestIds[0]?.requestId}`
                  );
                }

                requestIds = requestIdsResponse.requestIds;
                totalRecords = requestIdsResponse.totalRequests;
                totalPage = requestIdsResponse.totalPages;
                currentPage = requestIdsResponse.pageNumber;
                pageSize = requestIdsResponse.pageSize;
              }
              hideLoader();
            };
          }}
        >
          <input
            type="hidden"
            id="clientId"
            name="clientId"
            value={page?.data?.user?.id}
          />
          <input type="hidden" id="sortBy" name="sortBy" value={sortBy} />
          <input
            type="hidden"
            id="sortDirection"
            name="sortDirection"
            value={sortDirection}
          />
          <input
            type="hidden"
            id="searchValue"
            name="searchValue"
            value={searchValue}
          />

          <button
            class={`py-1 px-2 text-sm rounded-[4px] ${
              clientId
                ? "text-white bg-naro-600"
                : "bg-transparent text-naro-600 hover:bg-naro-600 hover:text-white rounded-[4px]"
            }`}>My Unit</button
          >
        </form>

        <form
          method="POST"
          action="?/getFilteredRequestIdsWithPagination"
          use:enhance={() => {
            clientId = "";
            currentPage = 1;
            showLoader();
            return async ({ update, result }) => {
              await update();
              if (result.type == "success") {
                const requestIdsResponse: GetRequestIdsResponse =
                  result.data as unknown as GetRequestIdsResponse;

                if (requestIdsResponse?.requestIds?.length === 1) {
                  goto(
                    `/report/${requestIdsResponse?.requestIds[0]?.requestId}`
                  );
                }

                requestIds = requestIdsResponse.requestIds;
                totalRecords = requestIdsResponse.totalRequests;
                totalPage = requestIdsResponse.totalPages;
                currentPage = requestIdsResponse.pageNumber;
                pageSize = requestIdsResponse.pageSize;
              }
              hideLoader();
            };
          }}
        >
          <input type="hidden" id="clientId" name="clientId" value="" />
          <input type="hidden" id="sortBy" name="sortBy" value={sortBy} />
          <input
            type="hidden"
            id="sortDirection"
            name="sortDirection"
            value={sortDirection}
          />
          <input
            type="hidden"
            id="searchValue"
            name="searchValue"
            value={searchValue}
          />

          <button
            class={`py-1 px-2 text-sm rounded ${
              clientId
                ? "bg-transparent text-naro-600 hover:bg-naro-600 hover:text-white"
                : "text-white bg-naro-600"
            }`}>All Units</button
          >
        </form>
      </div>
    </div>
    <AccountsTable {requestIds} {sortBy} {sortDirection} {toggleSortByColumn} />

    {#key totalPage}
      <Pagination
        {pageSize}
        {currentPage}
        {setCurrentPage}
        {totalRecords}
        {totalPage}
      />
    {/key}
  </div>
</SectionWrapper>
