<script lang="ts">
  let {
    totalRecords,
    currentPage,
    setCurrentPage,
    pageSize,
    totalPage,
  }: {
    totalRecords: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    pageSize: number;
    totalPage: number;
  } = $props();

  const itemsPerPage: number = pageSize;
  let pagesToShow: number = 5;
  let totalPages: number = totalPage;

  const startIndex = $derived(
    totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  );
  const endIndex = $derived(Math.min(currentPage * itemsPerPage, totalRecords));

  const getPaginationList = (totalRecord: number) => {
    const totalPages = totalPage ?? Math.ceil(totalRecord / itemsPerPage);
    if (totalPages <= pagesToShow) {
      // If total pages are less than or equal to the desired pages to show,
      // return all pages.
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftOffset = Math.floor(pagesToShow / 2);
    let startPage = Math.max(1, currentPage - leftOffset);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    // If the current page is near the end, adjust the startPage accordingly.
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
    // Adjust the page numbers if needed
    if (currentPage < getPaginationList(totalRecords)[0]) {
      setCurrentPage(getPaginationList(totalRecords)[0]);
    }
  };

  const goToNextPage = () => {
    const totalPages = totalPage ?? Math.ceil(totalRecords / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
    }
    // Adjust the page numbers if needed
    if (
      currentPage >
      getPaginationList(totalRecords)[
        getPaginationList(totalRecords).length - 1
      ]
    ) {
      setCurrentPage(
        getPaginationList(totalRecords)[
          getPaginationList(totalRecords).length - 1
        ]
      );
    }

    setTimeout(
      () => {
        setCurrentPage(currentPage);
      },
      currentPage === totalPages ? 2000 : 1000
    );
  };

  const goToFirstPage = (e: Event) => {
    e.preventDefault();
    if (currentPage !== 1) {
      currentPage = 1;
      setCurrentPage(1);
    }
  };

  const goToLastPage = (e: Event) => {
    e.preventDefault();
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
    }
  };
</script>

<div
  class="bg-white shadow-4xl shadow-t-0 rounded-b-md relative overflow-hidden"
>
  <div class="bg-white shadow-b-4xl rounded-b-md w-full overflow-hidden">
    <div
      class="flex flex-col md:flex-row p-5 items-center justify-center sm:justify-between border-t overflow-auto"
    >
      <div
        class="flex items-center md:text-sm text-xs mb-2 md:mb-0 ms-1 md:ms-0"
      >
        <span class=""
          >Showing {startIndex ?? 0} to {endIndex ?? 0} out of {totalRecords ??
            0} records</span
        >
      </div>

      <nav class="">
        <ul class="inline-flex -space-x-px md:text-sm text-xs">
          <li>
            <button
              class="flex items-center justify-center px-1 h-6 sm:px-2 sm:h-8 ms-0 leading-tight text-gray-600 bg-white border border-e-0 border-gray-400 rounded-s-lg {currentPage ===
              1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'}"
              onclick={goToFirstPage}>First</button
            >
          </li>
          <li>
            <button
              class="flex items-center justify-center px-1 h-6 sm:px-2 sm:h-8 ms-0 leading-tight text-gray-600 bg-white border border-e-0 border-gray-400 {currentPage ===
              1
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'}"
              onclick={goToPreviousPage}>Previous</button
            >
          </li>

          {#each getPaginationList(totalRecords) as page (page)}
            <li>
              <button
                class="flex items-center justify-center px-1 h-6 sm:px-2 sm:h-8 ms-0 leading-tight border border-e-0 border-gray-400 hover:bg-gray-100 hover:text-gray-700 {currentPage ===
                page
                  ? 'text-gray-700 bg-naro-100'
                  : 'text-gray-600  bg-white'} min-w-35px lg:min-w-42px"
                onclick={() => setCurrentPage(page)}>{page}</button
              >
            </li>
          {/each}
          <li>
            <button
              class="flex items-center justify-center px-1 h-6 sm:px-2 sm:h-8 ms-0 leading-tight bg-white border border-e-0 border-gray-400 {currentPage ===
              totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'}"
              onclick={goToNextPage}>Next</button
            >
          </li>
          <li>
            <button
              class="flex items-center justify-center px-1 h-6 sm:px-2 sm:h-8 ms-0 leading-tight text-gray-600 bg-white border border-gray-400 {currentPage ===
              totalPages
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-gray-100 text-gray-600 hover:text-gray-700'} rounded-e-lg"
              onclick={goToLastPage}>Last</button
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</div>
