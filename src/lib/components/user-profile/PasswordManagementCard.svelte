<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import CheckCircle from "$lib/icons/CheckCircle.svelte";
  import CrossCircle from "$lib/icons/CrossCircle.svelte";
  import VerifiedIcon from "$lib/icons/VerifiedIcon.svelte";
  import VisibilityIcon from "$lib/icons/VisibilityIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type { ApiResponse } from "$lib/types/types";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";

  let password = $state("");
  let confirmPassword = $state("");
  let passwordVisible = $state(false);
  let confirmVisible = $state(false);
  let isEditable = $state(false);
  let isValueChanged = $state(false);
  let userId = $state(page.params.user_id);
  let isConfirmPasswordMatching = $derived.by(
    () => password === confirmPassword,
  );

  let response = $state<ApiResponse<string>>();

  const passwordRequirements = $state({
    upperCase: { isValid: false, message: "1 Uppercase letter" },
    lowerCase: { isValid: false, message: "1 Lowercase letter" },
    number: { isValid: false, message: "1 Number" },
    specialChar: { isValid: false, message: "1 Special character" },
    length: { isValid: false, message: "8 Characters in length" },
  });

  let isPasswordValid = $derived.by(
    () =>
      passwordRequirements.upperCase.isValid &&
      passwordRequirements.lowerCase.isValid &&
      passwordRequirements.number.isValid &&
      passwordRequirements.specialChar.isValid &&
      passwordRequirements.length.isValid,
  );

  function togglePasswordVisibility() {
    passwordVisible = !passwordVisible;
  }

  function toggleConfirmVisibility() {
    if (confirmPassword === password) return;
    confirmVisible = !confirmVisible;
  }

  function enableEditing() {
    isEditable = !isEditable;
    if (!isEditable) {
      password = "";
      confirmPassword = "";
      isValueChanged = false;
    }
  }

  function checkPasswordRequirements() {
    passwordRequirements.upperCase.isValid = /[A-Z]/.test(password);
    passwordRequirements.lowerCase.isValid = /[a-z]/.test(password);
    passwordRequirements.number.isValid = /\d/.test(password);
    passwordRequirements.specialChar.isValid = /[!@#$%^&*(),.?":{}|<>]/.test(
      password,
    );
    passwordRequirements.length.isValid = password.length >= 8;
  }

  $effect(() => {
    checkPasswordRequirements();
  });

  const resetForm = () => {
    isValueChanged = false;
    isEditable = false;
    passwordVisible = false;
    confirmVisible = false;
  };
</script>

<div
  class="bg-white p-6 rounded-lg shadow-[0px_4px_4px_0px_#00000040] lg:max-w-[875px] max-w-full w-full lg:mt-12 mt-5"
>
  <form
    method="POST"
    action="?/updateUserPassword"
    use:enhance={() => {
      return async ({ update, result }) => {
        if (result.type !== "success") {
          return;
        }

        if (!result.data?.succeeded) {
          addToast({
            message:
              (result.data?.message as string) || "Unable to update password",
            type: "error",
          });
          return;
        }
        addToast({
          message:
            (result.data?.message as string) || "Password updated successfully",
          type: "success",
        });
        await update({ invalidateAll: true });
        response = (result as any)?.data;
        resetForm();
      };
    }}
  >
    <input type="hidden" name="userId" value={userId} />

    <div class="flex justify-between items-center gap-4 flex-wrap">
      <h3 class="text-2xl leading-9 font-medium text-[#000000D9]">
        Password Management
      </h3>
      <button
        type="button"
        class="text-blue-500 hover:underline flex gap-1"
        onclick={enableEditing}>Change Password</button
      >
    </div>

    <div class="flex justify-between flex-wrap gap-6 mt-6 mb-2">
      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="password"
          class="block text-sm mb-1 font-medium text-gray-700"
          >Enter New Password</label
        >
        <div class="relative mt-1">
          <InputField
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            bind:value={password}
            oninput={() => {
              checkPasswordRequirements();
              isValueChanged = true;
            }}
            disabled={!isEditable}
          />
          <button
            type="button"
            class="absolute top-[50%] -translate-y-2/4 right-3 cursor-pointer"
            onclick={togglePasswordVisibility}
            disabled={!isEditable}
          >
            <VisibilityIcon visible={passwordVisible} />
          </button>
        </div>
        {#if isValueChanged}
          <div class="mt-1">
            <p class="text-sm text-[#222222]">
              Your new password should at least:
            </p>
            <ul>
              {#each Object.entries(passwordRequirements) as [key, value]}
                <li class="text-sm text-[#222222] ps-7 relative">
                  <i class="absolute top-[50%] -translate-y-2/4 left-0">
                    {#if value.isValid}
                      <CheckCircle isFilled={false} />
                    {:else}
                      <CrossCircle isFilled={false} />{/if}
                  </i>
                  {value.message}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <div class="md:max-w-[320px] sm:min-w-[320px] w-full">
        <label
          for="confirm-password"
          class="block text-sm mb-1 font-medium text-gray-700"
          >Confirm New Password</label
        >
        <div class="relative mt-1">
          <InputField
            type={confirmVisible ? "text" : "password"}
            id="confirm-password"
            name="confirmPassword"
            bind:value={confirmPassword}
            disabled={!isEditable}
          />
          <button
            type="button"
            class="absolute top-[50%] -translate-y-2/4 right-3 cursor-pointer"
            onclick={toggleConfirmVisibility}
            disabled={!isEditable}
          >
            {#if confirmPassword === password && password !== "" && confirmPassword !== ""}
              <VerifiedIcon />
            {:else}
              <VisibilityIcon visible={confirmVisible} />
            {/if}
          </button>
        </div>
        {#if confirmPassword !== "" && confirmPassword !== password}
          <div class="text-red text-sm mt-1">Confirm password do not match</div>
        {/if}
      </div>
    </div>
    {#if isEditable}
      <div class="text-[#09814A] text-sm">
        {response?.message}
      </div>
      <div class="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={!(isPasswordValid && isConfirmPasswordMatching)}
          class="mt-6 w-full md:w-auto"
        >
          Change Password
        </Button>
      </div>
    {/if}
  </form>
</div>
