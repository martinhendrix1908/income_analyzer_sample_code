<script lang="ts">
  import Button from "$lib/components/building-blocks/Button.svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";
  import InputField from "$lib/components/building-blocks/InputField.svelte";
  import { enhance } from "$app/forms";
  import { addToast } from "$lib/store/toast-store";

  let {
    isOpen = $bindable(),
    currentRole = $bindable(),
    isRoleChanged = $bindable(),
  }: {
    isOpen: boolean;
    currentRole: {
      name: string;
      roleId: string;
    };
    isRoleChanged?: boolean;
  } = $props();
  let popUpBody = $state<HTMLFormElement | undefined>(undefined);
  let isLoading = $state(false);
  let resetForm = () => {
    currentRole = { name: "", roleId: "" };
  };

  $effect(() => {
    if (!isOpen) resetForm();
  });
</script>

<PopupWrapper bind:isOpen {popUpBody}>
  <form
    class="flex flex-col p-6 bg-white rounded-lg shadow-sm max-w-[500px] max-md:px-5 w-full"
    bind:this={popUpBody}
    action="?/createUserRole"
    method="POST"
    use:enhance={(submitEvent) => {
      isLoading = true;
      submitEvent.formData.set("name", currentRole.name?.trim());
      return async ({ result, update }) => {
        isLoading = false;
        if (result.type !== "success" || !result.data?.succeeded) {
          addToast({
            type: "error",
            message: `Unable to ${currentRole?.roleId ? "update" : "create new"} role`,
          });
          return;
        }
        addToast({
          type: "success",
          message: "Role created successfully.",
        });
        update({ invalidateAll: true });
        isOpen = false;
      };
    }}
  >
    <h2 class="text-lg font-medium text-neutral-800 mb-4">
      Create New User Role
    </h2>
    <input type="hidden" name="roleId" value={currentRole.roleId || "0"} />
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium text-neutral-700">
          Role Name:
        </label>
        <InputField
          type="text"
          id="name"
          name="name"
          bind:value={currentRole.name}
          placeholder="Enter role name"
        />
      </div>
    </div>

    <!-- Footer -->
    <footer class="flex gap-2 items-start mt-6">
      <Button
        class="w-full whitespace-nowrap"
        variant="black"
        disabled={isLoading ||
          currentRole?.name?.trim()?.length === 0 ||
          (currentRole.roleId !== "" && !isRoleChanged)}
        type="submit"
      >
        {currentRole.roleId ? "Update" : "Create"}
      </Button>
      <Button
        class="w-full"
        variant="black"
        outlined
        onclick={() => {
          isOpen = false;
          currentRole = { name: "", roleId: "" };
        }}
        type="button"
      >
        Cancel
      </Button>
    </footer>
  </form>
</PopupWrapper>
