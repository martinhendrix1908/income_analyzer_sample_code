<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import logo from "$lib/assets/logo.svg";
  import { enhance } from "$app/forms";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import LottiePlayer from "$lib/components/building-blocks/LottiePlayer.svelte";
  import lottie from "$lib/assets/lottie.json";
  import VisibilityIcon from "$lib/icons/VisibilityIcon.svelte";
  import type { ActionData } from "../../../routes/login/$types";

  let { form }: { form: ActionData } = $props();

  let loading = $state(false);
  let returnURL = $state(page.url.searchParams.get("returnURL") || "/");
  let showPassword = $state(false);
  let userId = $state("");
  let password = $state("");
  let rememberCheckbox = $state(true);

  function decodePassword(encodedPassword: string, shift: number): string {
    return encodedPassword
      .split("")
      .map((char: string) => {
        const charCode: number = char.charCodeAt(0);
        const decodedCharCode: number = charCode - shift;
        return String.fromCharCode(decodedCharCode);
      })
      .join("");
  }

  onMount(() => {
    if (page?.data?.loginCred) {
      let loginCred = JSON.parse(page?.data?.loginCred);
      if (loginCred.userId) {
        userId = loginCred.userId;
        password = decodePassword(loginCred.password, 3);
        if (loginCred.remember == "on") {
          rememberCheckbox = true;
        }
      }
    }
  });
  $effect(() => {
    if (form?.credentials || form?.invalid) loading = false;
  });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
  <div
    class="bg-white px-6 py-10 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col items-center justify-center"
  >
    <LottiePlayer src={lottie} height={280} width={280} />
    <p class="max-w-[456px] text-center text-[#222222] mt-2">
      Verify the financial health of applicants and your existing customers by
      leveraging our automated reports.
    </p>
  </div>

  <form
    method="POST"
    class="px-6 py-10 flex items-center justify-center"
    id="loginForm"
    action="?/login"
    use:enhance={() => {
      loading = true; // will automatically get reset by rerender if credentials fail
      return async ({ update }) => {
        await update();
      };
    }}
  >
    <div class="w-full max-w-320px flex flex-col gap-6">
      <div class="flex items-center gap-1">
        <a href="/">
          <img src={logo} alt="IA" />
        </a>
        <h1 class="h4 font-bold relative -top-1">Income Analyzer</h1>
      </div>
      <input type="hidden" name="returnURL" id="returnURL" value={returnURL} />
      <div class="flex flex-col">
        <label for="userId" class="text-sm text-naro-500 font-medium"
          >Email/username</label
        >
        <input
          id="userId"
          name="userId"
          placeholder="Email/username"
          bind:value={userId}
          autocomplete="off"
          class="bg-white p-3 text-[#222222] appearance-none rounded border border-gray outline outline-offset-0 outline-0 focus:border-black"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="password" class="text-sm text-naro-500 font-medium">
          Password
        </label>
        <div class="relative">
          <input
            id="password"
            name="password"
            bind:value={password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autocomplete="off"
            class="bg-white w-full p-3 pr-10 text-[#222222] appearance-none rounded border border-gray outline outline-offset-0 outline-0 focus:border-black"
            required
          />
          <button
            type="button"
            class="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
            onclick={() => (showPassword = !showPassword)}
            aria-label="Toggle password visibility"
          >
            <VisibilityIcon visible={showPassword} />
          </button>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <div class="flex justify-start items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            bind:checked={rememberCheckbox}
            class="appearance-none bg-center bg-cover border-2 border-current w-4 h-4 checked:border-black checked:bg-checkbox mt-0.5"
          />
          <label for="remember" class="text-black cursor-pointer"
            >Remember Me</label
          >
        </div>
        <a href="?forgotPassword=true" class="text-[#2f80ed] hover:underline"
          >Forgot Password</a
        >
      </div>
      <button
        class="bg-[#222222] hover:bg-naro-400 text-center text-white py-[2px] px-[6px] rounded shadow-3xl font-medium"
      >
        {#if loading}
          <span class="flex items-center justify-center py-1.5">
            <LoaderIcon fillColor="#9C9C9C" height="6" width="6" />
          </span>
        {:else}
          <span class="flex items-center justify-center py-1.5">Login</span>
        {/if}
      </button>

      {#if form?.invalid}
        <p class="text-sm text-red">Username and password are required!</p>
      {/if}
      {#if form?.credentials}
        <p class="text-sm text-red">Wrong credentials.</p>
      {/if}
      <p class="text-gray-500 text-sm text-center">
        This site uses 256 bit encryption
      </p>
    </div>
  </form>
</div>
