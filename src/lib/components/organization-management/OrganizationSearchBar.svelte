<script lang="ts">
  import SearchIcon from "$lib/icons/SearchIcon.svelte";
  interface SearchBarProps {
    placeholder?: string;
    searchValue?: string;
  }
  let { placeholder, searchValue = $bindable() }: SearchBarProps = $props();
  let timeout: ReturnType<typeof setTimeout> | undefined = $state(undefined);
</script>

<div class="flex flex-col lg:flex-row lg:items-center">
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
      placeholder={placeholder ?? "Search"}
      value={searchValue}
      oninput={(e) => {
        clearTimeout(timeout);
        let value = e.currentTarget.value;
        timeout = setTimeout(() => {
          searchValue = value;
        }, 300);
      }}
    />
  </form>
</div>
