<script lang="ts">
  import logo from "$lib/assets/logo.svg";
  import { enhance } from "$app/forms";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import LottiePlayer from "$lib/components/building-blocks/LottiePlayer.svelte";
  import lottie from "$lib/assets/lottie.json";
  import { addToast } from "$lib/store/toast-store";
  import NoticeIcon from "$lib/icons/NoticeIcon.svelte";

  let email = $state("");
  let loading = $state(false);
  let isMailResent = $state(false);
  let responsMessage = $state("");
</script>

<div class="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
  <div
    class="bg-white px-6 py-10 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col items-center justify-center"
  >
    <LottiePlayer src={lottie} height={280} width={280} />
    <p class="max-w-[456px] text-center text-[#222222] mt-2">
      Verify the financial health of applicants and your existing customers by
      leveraging our automated report.
    </p>
  </div>
  <form
    method="POST"
    class="px-6 py-10 flex items-center justify-center"
    id="reset-form"
    action="?/send_reset_password_link"
    use:enhance={() => {
      loading = true;
      return async ({ result }: { result: any }) => {
        loading = false;
        if (result.type === "success") {
          isMailResent = true;
          addToast({
            type: "success",
            message: "Password reset link sent to your email.",
          });
          return;
        }
        if (result?.data?.message?.toLowerCase()?.includes("email")) {
          responsMessage = result.data.message;
        } else {
          addToast({
            type: "error",
            message: result.data.message || "Something went wrong.",
          });
        }
      };
    }}
  >
    <input type="hidden" name="mailType" value="ConfirmResetPassword" />
    <div class="w-full max-w-320px flex flex-col gap-6">
      <div class="flex items-center gap-1">
        <a href="/">
          <img src={logo} alt="IA" />
        </a>
        <h1 class="h4 font-bold relative -top-1">Income Analyzer</h1>
      </div>
      {#if isMailResent}
        <div>
          A reset link has been sent to your email. Please check your inbox.
        </div>
      {:else}
        <div class="flex flex-col relative">
          <label for="email" class="text-sm text-naro-500 font-medium"
            >Username/Email</label
          >
          <input
            id="email"
            name="email"
            bind:value={email}
            placeholder="Enter your email"
            required
            class="bg-white p-3 text-[#222222] appearance-none rounded border border-gray outline outline-offset-0 outline-0 focus:border-black"
          />

          {#if responsMessage && email}
            <i
              class="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-black"
            >
              <NoticeIcon fillColor="#BE0027" />
            </i>
            <div class="text-[#BE0027] text-sm font-normal leading-[21px] pt-1">
              {responsMessage}
            </div>
          {/if}
        </div>
      {/if}

      <div class="flex flex-col gap-2">
        {#if isMailResent}
          <button
            type="button"
            class="w-full bg-[#222222] hover:bg-naro-400 text-center text-white py-[2px] px-[6px] rounded shadow-3xl font-medium"
            onclick={() =>
              window.open("https://mail.google.com/mail/u/0/#inbox")}
          >
            <span class="flex items-center justify-center py-1.5"
              >Check Mail</span
            >
          </button>
        {:else}
          <button
            type="submit"
            class="w-full bg-[#222222] hover:bg-naro-400 text-center text-white py-[2px] px-[6px] rounded shadow-3xl font-medium"
          >
            {#if loading}
              <span class="flex items-center justify-center py-1.5">
                <LoaderIcon fillColor="#9C9C9C" height="6" width="6" />
              </span>
            {:else}
              <span class="flex items-center justify-center py-1.5"
                >Send Reset Link</span
              >
            {/if}
          </button>
        {/if}
      </div>
      <p class="text-gray-500 text-sm text-center">
        This site uses 256 bit encryption
      </p>
    </div>
  </form>
</div>
