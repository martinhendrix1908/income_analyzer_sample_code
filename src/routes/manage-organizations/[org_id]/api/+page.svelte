<script lang="ts">
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import type { ApiSettingsConfiguration } from "$lib/types/types";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import { addToast } from "$lib/store/toast-store";
  import RefreshIcon from "$lib/icons/RefreshIcon.svelte";
  import CopyIcon from "$lib/icons/CopyIcon.svelte";
  import { page } from "$app/state";
  import { deepClone } from "$lib/utils/common-utils";

  let isLoading = $state(false);
  let error = $state("");
  let localConfiguration = $state<ApiSettingsConfiguration>();

  $effect(() => {
    localConfiguration = deepClone({
      ...page?.data?.apiSettings,
      organizationId: page?.params?.org_id,
    });
  });

  async function handleRegenerateSecrets() {
    error = "";
    try {
      isLoading = true;
      const response = await fetch(
        `/api/organization-settings/regenerate-secret`,
        {
          method: "POST",
          body: JSON.stringify(localConfiguration),
        }
      );
      const res = await response.json();
      if (res.succeeded) {
        localConfiguration = { ...res.data };
        addToast({
          message: "Successfully regenerated secret.",
          type: "success",
        });
      } else {
        addToast({
          message: "Failed to regenerate secret.",
          type: "error",
        });
      }
    } catch (e) {
      console.error("Error while submitting bundle:", e);
    } finally {
      isLoading = false;
    }
  }

  function copyToClipboard(value: string) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        addToast({
          message: "Copied to clipboard!",
          type: "success",
        });
      })
      .catch(() => {
        addToast({
          message: "Failed to copy to clipboard.",
          type: "error",
        });
      });
  }
</script>

<div class="flex md:flex-row flex-col gap-2 -mb-7">
  <div class="pr-2 md:border-r-4 border-parrot">
    <h3 class="text-black font-medium opacity-85 whitespace-nowrap">
      API Settings
    </h3>
  </div>
</div>

<div class="space-y-4 mb-6 bg-white p-6 rounded-md">
  <!-- Warning Message -->
  <div class="p-4 bg-yellow-50 rounded-md border border-yellow-100">
    <p class="text-sm text-yellow-700">
      <span class="font-medium">Important:</span> These credentials are sensitive.
      Please store them in a secure location and do not share them with others. Exposure
      of these credentials could compromise the security of your API and system.
    </p>
  </div>

  <div class="space-y-6">
    <!-- API Key Section -->
    <div class="">
      <div class="flex items-start mb-2">
        <div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700" for="apiKey"
              >API Key</label
            >
            <button
              type="button"
              class="text-[#0A84FF] text-sm font-medium flex items-center gap-2 hover:underline"
              onclick={() => copyToClipboard(localConfiguration?.apiKey || "")}
            >
              <CopyIcon />
            </button>
          </div>
          <p class="text-xs text-gray-500">
            Use this key to authenticate your API requests
          </p>
        </div>
      </div>
      <InputField
        id="apiKey"
        value={localConfiguration?.apiKey}
        readonly
        disabled
        class="bg-white select-none"
      />
    </div>

    <!-- Client ID Section -->
    <div class="">
      <div class="flex items-start mb-2">
        <div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700" for="clientId"
              >Client ID</label
            >
            <button
              type="button"
              class="text-[#0A84FF] text-sm font-medium flex items-center gap-2 hover:underline"
              onclick={() =>
                copyToClipboard(localConfiguration?.clientId || "")}
            >
              <CopyIcon />
            </button>
          </div>

          <p class="text-xs text-gray-500">Your unique client identifier</p>
        </div>
      </div>
      <InputField
        id="clientId"
        value={localConfiguration?.clientId}
        readonly
        disabled
        class="bg-white select-none"
      />
    </div>

    <!-- Secret Section -->
    <div class="">
      <div class="flex items-start justify-between mb-2">
        <div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium text-gray-700" for="secret"
              >Secret</label
            >
            <button
              type="button"
              class="text-[#0A84FF] text-sm font-medium flex items-center gap-2 hover:underline"
              onclick={() => copyToClipboard(localConfiguration?.secret || "")}
            >
              <CopyIcon />
            </button>
          </div>
          <p class="text-xs text-gray-500">
            Keep this secret secure and never share it
          </p>
        </div>
        <Button
          variant="blue"
          class="text-sm py-1"
          onclick={handleRegenerateSecrets}
          disabled={isLoading}
        >
          <i class={isLoading ? "animate-spin" : "animate-none"}>
            <RefreshIcon /></i
          >
          <span class="hidden lg:inline"
            >{isLoading ? "Regenerating..." : "Regenerate Secret"}</span
          >
        </Button>
      </div>
      <InputField
        id="secret"
        value={localConfiguration?.secret}
        readonly
        disabled
        class="bg-white select-none"
      />
    </div>
  </div>
</div>
