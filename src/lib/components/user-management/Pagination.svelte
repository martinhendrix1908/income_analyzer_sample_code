<script lang="ts">
  let {
    totalRecords = $bindable(),
    currentPage = $bindable(),
    pageSize = $bindable(),
    disabled,
  }: {
    totalRecords: number;
    currentPage: number;
    pageSize: number;
    disabled?: boolean;
  } = $props();

  const itemsPerPage: number = $state(pageSize);
  let pagesToShow: number = $state(7);
  let totalPages: number = $derived(Math.ceil(totalRecords / pageSize));

  const startIndex = $derived(
    totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  );
  const endIndex = $derived(Math.min(currentPage * itemsPerPage, totalRecords));

  const getPaginationList = (totalRecord: number) => {
    if (totalPages <= pagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftOffset = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - leftOffset);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - pagesToShow + 1);
    }
    const arr = Array.from({ length: pagesToShow }, (_, i) => i + startPage);
    return arr;
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      currentPage--;
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      currentPage++;
    }
  };

  const goToFirstPage = (e: Event) => {
    e.preventDefault();
    if (currentPage !== 1) {
      currentPage = 1;
    }
  };

  const goToLastPage = (e: Event) => {
    e.preventDefault();
    if (currentPage !== totalPages) {
    }
  };
</script>

<div
  class="flex flex-col lg:flex-row items-center justify-between p-4 space-y-4"
>
  <div class="text-[14px] font-normal text-[#9C9C9C]">
    <span class="text-black">{startIndex ?? 0}</span> -
    <span class="text-black">{endIndex ?? 0}</span>
    of
    <span class="text-black">{totalRecords ?? 0}</span>
  </div>

  <nav class="flex items-center space-x-0">
    <button
      class="px-[13px] py-[7px] me-1 text-sm font-semibold text-gray-500 hover:bg-[#EEEEEE] hover:text-black disabled:opacity-50 {currentPage ===
      1
        ? 'cursor-not-allowed'
        : ''}"
      onclick={goToPreviousPage}
      disabled={currentPage === 1 || disabled}
    >
      &lt;
    </button>

    {#each getPaginationList(totalRecords) as page, index (page)}
      {#if index < 4}
        <button
          class="px-[13px] py-[7px] text-xs ] font-semibold rounded {currentPage ===
          page
            ? 'bg-black text-white '
            : 'text-gray-600 hover:bg-[#EEEEEE]'}"
          onclick={() => (currentPage = page)}
          {disabled}
        >
          {page}
        </button>
      {:else if index === 4 || index === 5}
        <span
          class=" px-[13px] py-[7px] text-xs hover:bg-[#EEEEEE] font-semibold text-gray-500"
          >.</span
        >
      {:else if index === getPaginationList(totalRecords).length - 1}
        <button
          class="px-[13px] py-[7px] text-xs hover:bg-[#EEEEEE] font-semibold rounded {currentPage ===
          page
            ? 'bg-black text-white'
            : 'text-gray-600'}"
          onclick={() => (currentPage = page)}
          {disabled}
        >
          {page}
        </button>
      {/if}
    {/each}

    <button
      class="px-[13px] py-[7px] ms-1 text-sm font-semibold text-gray-500 hover:bg-[#EEEEEE] hover:text-black disabled:opacity-50 {currentPage ===
      totalPages
        ? 'cursor-not-allowed'
        : ''}"
      onclick={goToNextPage}
      disabled={currentPage === totalPages || disabled}
    >
      &gt;
    </button>
  </nav>
</div>
