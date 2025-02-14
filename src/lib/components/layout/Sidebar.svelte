<script lang="ts">
  import type { IMenuItems } from "$lib/types/types";
  import CloseIcon from "$lib/icons/CloseIcon.svelte";
  import BrandLogo from "$lib/icons/BrandLogo.svelte";
  import ChevronIcon from "$lib/icons/ChevronIcon.svelte";
  import DynamicIcon from "$lib/components/layout/DynamicIcon.svelte";
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { deepClone } from "$lib/utils/common-utils";

  let {
    isSidebarOpen = $bindable(false),
  }: {
    isSidebarOpen?: boolean;
  } = $props();
  let menuItems = $state<IMenuItems[]>([]);

  const toggleSidebar = () => {
    isSidebarOpen = !isSidebarOpen;
    if (!isSidebarOpen) {
      menuItems = deepClone(menuItems)?.map((item, i) => {
        return {
          ...item,
          isSubMenuActive: false,
          subMenuItems: item.subMenuItems.map((subItem) => ({
            ...subItem,
            isSubMenuActive: false,
          })),
        };
      });
    }
  };

  const onMenuItemClick = (index: number, item: IMenuItems) => {
    if (!item.hasSubMenu) {
      toggleSidebar();
      return;
    }

    menuItems[index].isSubMenuActive = !menuItems[index].isSubMenuActive;
    menuItems = [...menuItems];
  };

  const onSubMenuItemClick = (
    index: number,
    item: IMenuItems,
    parentMenuIndex: number
  ) => {
    if (!item.hasSubMenu) {
      toggleSidebar();
      return;
    }

    const updatedMenu = [...menuItems];
    const parentMenuItem = updatedMenu[parentMenuIndex];

    parentMenuItem.subMenuItems = parentMenuItem.subMenuItems.map(
      (subItem, subIndex) =>
        subIndex === index
          ? { ...subItem, isSubMenuActive: !subItem.isSubMenuActive }
          : subItem
    );

    menuItems = [...updatedMenu];
  };

  onMount(() => {
    getMainMenu();
  });

  async function getMainMenu() {
    const res = await fetch(`/api/menu-list`, {
      method: "GET",
    });
    const data = await res.json();
    menuItems = data?.map((item: IMenuItems) => ({
      ...item,
      isSubMenuActive: false, //added to toggle if it has any sub-menus
    }));
  }
</script>

<div
  role="none"
  class="fixed top-0 z-40 w-full h-screen bg-black/50 overflow-y-hidden {isSidebarOpen
    ? 'block'
    : 'hidden'}"
  onclick={toggleSidebar}
></div>
<div
  id="sidebar"
  class="sidebar fixed top-0 z-50 p-4 min-w-[320px] h-lvh bg-[#262626]
            flex flex-col overflow-y-auto transition-transform duration-300
            {isSidebarOpen
    ? 'translate-x-0 shadow-[4px_2px_4px_0px_rgba(0,0,0,0.24)]'
    : '-translate-x-full'}"
>
  <div class="flex items-center gap-2 pb-6 borderb borderb-[#374151]">
    <button class="flex items-center justify-center" onclick={toggleSidebar}>
      <CloseIcon height="24" width="24" fillColor="#FFFFFF" />
    </button>
    <a href="/" class="flex items-center gap-2 mt-0.5" onclick={toggleSidebar}>
      <BrandLogo />
      <span class="font-bold text-[20px] text-nowrap text-white">
        Income Analyzer
      </span>
    </a>
  </div>

  <div
    class="h-full overflow-y-auto scrollbar-hide border-y border-y-[#374151]"
  >
    <ul
      class="pb-10 pt-4 flex flex-col gap-2 font-normal leading-[21px] text-sm border-b border-b-[#374151]"
    >
      {#each menuItems as item, index}
        <li>
          <div
            class="rounded p-2 hover:bg-[#595959] {item.isSubMenuActive
              ? 'bg-[#595959]'
              : ''}"
          >
            <a
              href={item.link?.toLowerCase() || "/"}
              class="flex justify-between items-center text-white"
              onclick={(e) => {
                if (item.hasSubMenu) {
                  e.preventDefault();
                }
                onMenuItemClick(index, item);
              }}
            >
              <div class="flex justify-between items-center gap-2">
                {#if item.icon}
                  <DynamicIcon icon={item.icon || "settings"} />
                {/if}
                <span>{item.text}</span>
              </div>

              {#if item.hasSubMenu}
                <i
                  class="origin-center transition transform duration-500 {item.isSubMenuActive
                    ? 'rotate-180'
                    : 'rotate-0'}"
                >
                  <ChevronIcon direction="down" fillColor="#FFFFFF" /></i
                >
              {/if}
            </a>
          </div>
          {#if item.isSubMenuActive && item.subMenuItems}
            <ul class="flex flex-col ms-[29px] mt-1 gap-2" transition:slide>
              {#each item.subMenuItems as subMenuItem, subMenuIndex}
                <li>
                  <div
                    class="rounded p-2 hover:underline {subMenuItem.isSubMenuActive
                      ? ''
                      : ''}"
                  >
                    <a
                      href={subMenuItem.link?.toLowerCase() || "/"}
                      class="flex gap-1 items-center text-white"
                      onclick={() =>
                        onSubMenuItemClick(subMenuIndex, subMenuItem, index)}
                    >
                      <div class="flex justify-between items-center gap-2">
                        <span>{subMenuItem.text}</span>
                      </div>

                      {#if subMenuItem.hasSubMenu}
                        <ChevronIcon direction="down" fillColor="#FFFFFF" />
                      {/if}
                    </a>
                  </div>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
  <!-- Footer -->
  <div
    class="mt-auto pt-6 border-t-[1px] border-[#999999] font-normal leading-[21px] text-sm"
  >
    <div class="mt-2 py-2 px-4 rounded">
      <a class="text-white" href="#!"> User Manual </a>
    </div>

    <div class="mt-2 py-2 px-4 rounded">
      <a class="text-white" href="#!"> Release Notes </a>
    </div>
  </div>
</div>
