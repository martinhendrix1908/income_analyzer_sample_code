<script lang="ts">
  import { page } from "$app/state";
  import { enhance } from "$app/forms";
  import { addToast } from "$lib/store/toast-store";

  // Import assets and components
  import logo from "$lib/assets/logo.svg";
  import lottie from "$lib/assets/lottie.json";
  import LoaderIcon from "$lib/icons/LoaderIcon.svelte";
  import VisibilityIcon from "$lib/icons/VisibilityIcon.svelte";
  import CheckCircle from "$lib/icons/CheckCircle.svelte";
  import CrossCircle from "$lib/icons/CrossCircle.svelte";
  import LottiePlayer from "$lib/components/building-blocks/LottiePlayer.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import { goto } from "$app/navigation";

  type FormType = "reset" | "setup";
  type ResponseStatus = "success" | "invalid" | "pending";

  const SUCCESS_MESSAGES: Record<FormType, string> = {
    reset: "Your Password has been successfully reset.",
    setup: "Your account set up is successful. Please Login to continue.",
  };

  let isLoading = $state(false);
  let userEmail = $state("");
  let userPassword = $state("");
  let userConfirmPassword = $state("");
  let isPasswordInputChanged = $state(false);
  let isMailResent = $state(false);

  const resetCode = $derived(page.url.searchParams.get("resetCode") || "");
  const formType = $derived<FormType>(
    (page.url.searchParams.get("type") as FormType) || "reset"
  );
  let responseStatus = $state<ResponseStatus>("pending");

  let isPasswordVisible = $state(false);
  let isConfirmPasswordVisible = $state(false);

  const passwordValidation = $state({
    hasUpperCase: { isValid: false, message: "1 Uppercase letter" },
    hasLowerCase: { isValid: false, message: "1 Lowercase letter" },
    hasNumber: { isValid: false, message: "1 Number" },
    hasSpecialChar: { isValid: false, message: "1 Special character" },
    meetsMinLength: { isValid: false, message: "8 Characters in length" },
  });

  const isPasswordValid = $derived.by(() =>
    Object.values(passwordValidation).every(
      (requirement) => requirement.isValid
    )
  );

  function validatePasswordStrength() {
    const password = userPassword;
    passwordValidation.hasUpperCase.isValid = /[A-Z]/.test(password);
    passwordValidation.hasLowerCase.isValid = /[a-z]/.test(password);
    passwordValidation.hasNumber.isValid = /\d/.test(password);
    passwordValidation.hasSpecialChar.isValid = /[!@#$%^&*(),.?":{}|<>]/.test(
      password
    );
    passwordValidation.meetsMinLength.isValid = password.length >= 8;
  }

  async function requestPasswordResetEmail() {
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          mailType: "SetPasswordOnSignUp",
        }),
      });
      const result = await response.json();
      if (result.success) {
        isMailResent = true;
        addToast({
          message: "Password reset link sent to your email.",
          type: "success",
        });
        return true;
      } else {
        addToast({
          message:
            result.message || "Something went wrong. Please try again later.",
          type: "error",
        });
        return false;
      }
    } catch (error) {
      console.error("Email verification error:", error);
      addToast({
        message: "Something went wrong. Please try again later.",
        type: "error",
      });
      return false;
    }
  }

  function togglePasswordVisibility(type: "password" | "confirmPassword") {
    if (type === "password") {
      isPasswordVisible = !isPasswordVisible;
    } else {
      isConfirmPasswordVisible = !isConfirmPasswordVisible;
    }
  }

  function handlePasswordInput() {
    validatePasswordStrength();
    isPasswordInputChanged = userPassword.length > 0;
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 w-full min-h-screen">
  <div
    class="bg-white px-6 py-10 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col items-center justify-center"
  >
    <LottiePlayer src={lottie} height={280} width={280} />
    <p class="max-w-[456px] text-center text-[#222222] mt-2">
      Welcome! Set up your password to secure your account and get started with
      our services.
    </p>
  </div>

  <form
    method="POST"
    class="px-6 py-10 flex items-center justify-center"
    action="?/set_password"
    use:enhance={() => {
      isLoading = true;
      return async ({ result }: { result: any }) => {
        isLoading = false;

        if (result.type === "success") {
          responseStatus = "success";
          addToast({
            type: "success",
            message: result.data.message || "Password set successfully.",
          });
          return;
        }

        const errorMessage =
          result.data.message === "InvalidToken"
            ? `This ${formType} password link has expired. Please request a new one.`
            : result.data.message || "Something went wrong.";

        addToast({
          type: "error",
          message: errorMessage,
        });

        if (result.data.message === "InvalidToken") {
          userEmail = result.data.data;
          responseStatus = "invalid";
        }
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

      <input type="hidden" name="code" value={resetCode} />

      {#if responseStatus === "pending"}
        <!-- Password Input -->
        <div class="flex flex-col relative">
          <label for="password" class="text-sm text-naro-500 font-medium">
            {formType === "reset" ? "Enter Your New Password" : "Password"}
          </label>
          <div class="relative">
            <input
              id="password"
              name="password"
              bind:value={userPassword}
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              required
              class="bg-white p-3 text-[#222222] appearance-none rounded border border-gray outline outline-offset-0 outline-0 focus:border-black w-full pr-10"
              oninput={handlePasswordInput}
            />
            <button
              type="button"
              class="absolute top-[50%] -translate-y-2/4 right-3 cursor-pointer"
              onclick={() => togglePasswordVisibility("password")}
            >
              <VisibilityIcon visible={isPasswordVisible} />
            </button>

            {#if !isPasswordValid && isPasswordInputChanged}
              <div
                class="absolute top-[50px] left-0 z-50 bg-white shadow-md rounded p-2 w-full"
              >
                <p class="text-sm text-[#222222]">
                  Your new password should at least:
                </p>
                <ul>
                  {#each Object.entries(passwordValidation) as [key, value]}
                    {#if !value.isValid}
                      <li class="text-sm text-[#222222] ps-7 relative">
                        <i class="absolute top-[50%] -translate-y-2/4 left-0">
                          {#if value.isValid}
                            <CheckCircle isFilled={false} />
                          {:else}
                            <CrossCircle isFilled={false} />
                          {/if}
                        </i>
                        {value.message}
                      </li>
                    {/if}
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        </div>

        <!-- Confirm Password Input -->
        <div class="flex flex-col relative">
          <label
            for="confirmPassword"
            class="text-sm text-naro-500 font-medium"
          >
            Confirm Password
          </label>
          <div class="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              bind:value={userConfirmPassword}
              placeholder="Confirm Password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              required
              class="bg-white p-3 text-[#222222] appearance-none rounded border border-gray outline outline-offset-0 outline-0 focus:border-black w-full pr-10"
            />
            <button
              type="button"
              class="absolute top-[50%] -translate-y-2/4 right-3 cursor-pointer"
              onclick={() => togglePasswordVisibility("confirmPassword")}
            >
              <VisibilityIcon visible={isConfirmPasswordVisible} />
            </button>
          </div>
        </div>
      {:else if responseStatus === "invalid"}
        {#if isMailResent}
          <div>
            A reset link has been sent to your email. Please check your inbox.
          </div>
        {:else}
          <div class="">
            The link you are trying to access is invalid. Please request a
            <a
              href="/login?forgotPassword=true"
              class="text-[#2f80ed] hover:underline text-end w-fit"
              onclick={requestPasswordResetEmail}
            >
              new {formType} password link!
            </a>
          </div>
        {/if}
      {:else}
        <div class="flex">
          <span>{SUCCESS_MESSAGES[formType]}</span>
        </div>
      {/if}

      <!-- Password Mismatch Warning -->
      {#if userConfirmPassword && userPassword !== userConfirmPassword}
        <p class="text-sm text-red">Passwords do not match!</p>
      {/if}

      <!-- Submit Button -->
      <div class="flex flex-col gap-2 items-end">
        {#if responseStatus === "success"}
          <Button
            type="button"
            variant="black"
            class="w-full bg-[#222222] text-center text-white py-[2px] px-[6px] font-medium"
            onclick={() => goto("/login")}
          >
            <span class="flex items-center justify-center py-1.5">Login</span>
          </Button>
        {:else}
          <Button
            type="submit"
            variant="black"
            class="w-full bg-[#222222] text-center text-white py-[2px] px-[6px] font-medium"
            disabled={responseStatus === "invalid"}
          >
            {#if isLoading}
              <span class="flex items-center justify-center py-1.5">
                <LoaderIcon fillColor="#9C9C9C" height="6" width="6" />
              </span>
            {:else}
              <span class="flex items-center justify-center py-1.5">
                {formType === "reset" ? "Reset Password" : "Set Up Account"}
              </span>
            {/if}
          </Button>
        {/if}
      </div>
      <p class="text-gray-500 text-sm text-center">
        This site uses 256 bit encryption
      </p>
    </div>
  </form>
</div>
