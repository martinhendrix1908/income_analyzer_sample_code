<script lang="ts">
  import type { ActionData } from "./$types";
  import { page } from "$app/state";
  import Login from "$lib/components/auth/Login.svelte";
  import ForgetPassword from "$lib/components/auth/ForgetPassword.svelte";

  let { form }: { form: ActionData } = $props();
  let forgotPasswordEnabled = $derived(
    page.url.searchParams.get("forgotPassword") === "true"
  );
</script>

{#if !forgotPasswordEnabled}
  <Login {form} />
{:else}
  <ForgetPassword />
{/if}
