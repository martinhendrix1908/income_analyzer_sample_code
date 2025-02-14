<script lang="ts">
  import { page } from "$app/state";
  import { PUBLIC_NODE_ENV } from "$env/static/public";
  import CommentIcon from "$lib/icons/CommentIcon.svelte";
  import ExistIcon from "$lib/icons/ExistIcon.svelte";
  import MenuIcon from "$lib/icons/MenuIcon.svelte";
  import NotificationIcon from "$lib/icons/NotificationIcon.svelte";
  import CustomSearchbar from "$lib/components/building-blocks/CustomSearchbar.svelte";

  let {
    isSidebarOpen = $bindable(false),
  }: {
    isSidebarOpen?: boolean;
  } = $props();
  let isMenuOpen = $state(false);
  let mobileMenuRef = $state<HTMLElement | null>(null);
  let menuButtonRef = $state<HTMLElement | null>(null);

  function handleOutsideClick(e: Event) {
    const target = e.target as Node;
    if (
      mobileMenuRef &&
      !mobileMenuRef.contains(target) &&
      menuButtonRef &&
      !menuButtonRef.contains(target)
    ) {
      isMenuOpen = false;
    }
  }
  let shouldSidebarVisible = $derived.by(() => {
    return page?.data?.user?.panelConfig?.ShowMenu ?? true;
  });
</script>

<svelte:window onclick={handleOutsideClick} />
<header
  class="bg-naro-600 py-4 sticky z-30 top-0 left-0 border-b border-[#f7f6f0] select-none"
>
  <div class="px-4 mx-auto flex justify-between items-center">
    <div class="flex items-center gap-4">
      <i
        role="none"
        class={shouldSidebarVisible ? "block" : "hidden"}
        onclick={() => {
          isSidebarOpen = true;
        }}><MenuIcon /></i
      >
      <!-- Brand Logo -->
      <a href="/dashboard" class="flex items-center gap-2 mt-1">
        <img src="/images/brand-logo.svg" alt="Brand Logo" class="h-8 w-auto" />
        <sub class="text-red-500 text-sm px-2 py-1 rounded">
          {PUBLIC_NODE_ENV}
        </sub>
      </a>
    </div>

    <!-- Desktop Menu -->
    <nav class="hidden md:flex gap-4 items-center justify-between">
      <CustomSearchbar
        className="min-w-[288px] me-0 md:me-10"
        iconClassName="text-[#9CA3AF]"
        inputClassName="bg-[#595959] text-white border-[#4B5563] rounded-md"
      />

      <div class="hidden lg:flex items-center gap-4 text-white font-medium">
        <!-- <a href="/user-profile" class="w-full">
          <img
            src="/images/user-profile.jfif"
            class="w-8 h-8 rounded-md"
            alt="user-avatar"
            onerror={(e) => {
              (e.target as HTMLImageElement).src = "/images/user-profile.jfif";
            }}
          />
        </a>
        <i class="px-2"><NotificationIcon /></i>
        <i class="px-2"><CommentIcon /></i> -->
        <form action="/login?/logout" method="POST">
          <button
            class="text-[#98C43D] p-2 flex items-center gap-2 hover:underline"
          >
            <ExistIcon fillColor="currentColor" />
            <span class="text-nowrap">Log Out</span>
          </button>
        </form>
      </div>
    </nav>

    <!-- Mobile Menu Button -->
    <button
      bind:this={menuButtonRef}
      class="w-8 h-8 flex lg:hidden items-center justify-center"
      onclick={() => (isMenuOpen = !isMenuOpen)}
      aria-label="Toggle Menu"
      aria-expanded="false"
    >
      <img src="/images/icon-menu.svg" alt="Menu Icon" class="h-6 w-6" />
    </button>
    {#if isMenuOpen}
      <!-- Mobile Menu -->
      <div
        bind:this={mobileMenuRef}
        class="absolute top-14 right-4 bg-white shadow-lg rounded-md w-48 lg:hidden flex flex-col items-center gap-4 p-4"
      >
        <!-- <a
          href="#notifications"
          class="text-naro-600 hover:underline"
          onclick={() => (isMenuOpen = !isMenuOpen)}
        >
          Notifications
        </a>
        <a
          href="#chats"
          class="text-naro-600 hover:underline"
          onclick={() => (isMenuOpen = !isMenuOpen)}
        >
          Chats
        </a>
        <a
          href="/user-profile"
          class="text-naro-600 hover:underline"
          onclick={() => (isMenuOpen = !isMenuOpen)}
        >
          My Account
        </a> -->
        <form action="/login?/logout" method="POST">
          <button
            class="text-[#98C43D] p-2 flex items-center gap-2 hover:underline"
          >
            <ExistIcon fillColor="currentColor" />
            <span>Log Out</span>
          </button>
        </form>
      </div>
    {/if}
  </div>
</header>
