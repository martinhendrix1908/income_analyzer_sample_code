<script lang="ts">
  import "../app.css";
  import { page } from "$app/state";
  import Header from "$lib/components/layout/Header.svelte";
  import SessionTimeoutModal from "$lib/components/layout/SessionTimeoutModal.svelte";
  import Toasts from "$lib/components/toast/Toasts.svelte";
  import { beforeNavigate, afterNavigate } from "$app/navigation";
  import {
    hideLoader,
    isLoading,
    loaderText,
    setLoaderText,
    showLoader,
  } from "$lib/store/loader-store";
  import Loader from "$lib/components/building-blocks/Loader.svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";

  let { children } = $props();
  let isSidebarOpen = $state(false);
  beforeNavigate(() => {
    showLoader();
  });

  afterNavigate(() => {
    hideLoader();
    setLoaderText("");
  });
</script>

<SessionTimeoutModal />

{#if page?.data?.user?.authToken && !page?.route?.id?.includes("/login")}
  <Header bind:isSidebarOpen />
  <Sidebar  bind:isSidebarOpen />
{/if}

<Toasts position="bottom-left" />

{@render children()}

{#if $isLoading}
  <Loader message={$loaderText || "Loading..."} />
{/if}