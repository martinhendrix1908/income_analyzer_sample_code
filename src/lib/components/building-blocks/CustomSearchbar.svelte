<script lang="ts">
  import SearchIcon from "$lib/icons/SearchIcon.svelte";

  let {
    value = $bindable(""),
    placeholder = "Search",
    debounceTime = 350,
    onSearch = (searchTerm: string) => {},
    className = "",
    inputClassName = "",
    iconClassName = "",
  }: {
    value?: string;
    placeholder?: string;
    debounceTime?: number;
    onSearch?: (searchTerm: string) => void;
    className?: string;
    inputClassName?: string;
    iconClassName?: string;
  } = $props();

  let timeout: ReturnType<typeof setTimeout> | undefined = $state(undefined);

  function handleInput(e: Event) {
    const searchTerm = (e.currentTarget as HTMLInputElement).value;
    value = searchTerm;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);
  }
</script>

<div class="relative {className}">
  <div class="absolute top-1/2 -translate-y-1/2 left-3 {iconClassName}">
    <SearchIcon fillColor="currentColor" />
  </div>

  <input
    type="text"
    bind:value
    oninput={handleInput}
    {placeholder}
    autocomplete="off"
    class="w-full py-2 pl-10 pr-3 border rounded text-sm outline-none border-[#4B5563] focus:shadow-[0px_0px_2px_0px_var(--Brand-Colors-primary,#09814A)] {inputClassName}"
  />
</div>
