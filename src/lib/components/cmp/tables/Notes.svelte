<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import FormMessage from "$lib/components/building-blocks/FormMessage.svelte";
  import IconWrapper from "$lib/components/building-blocks/IconWrapper.svelte";
  import FollowupIcon from "$lib/icons/FollowupIcon.svelte";
  import InfoDangerIcon from "$lib/icons/InfoDangerIcon.svelte";
  import { addToast } from "$lib/store/toast-store";
  import type { Notes } from "$lib/types/organizations.types";
  import { getMonthDate, getTime } from "$lib/utils/date-utils";

  let notes = $state<Notes[]>([]);
  let isLoading = $state(false);
  let error = $state<string>("");
  const currentUserName = $derived(
    page.data.user.name.charAt(0).toUpperCase() + page.data.user.name.slice(1)
  );

  let newNoteFlag = $state("1");
  let newNoteContent = $state("");

  const flagOptions: {
    [key: string]: {
      label: string;
      icon: any;
      color: string;
      backgroundColor: string;
    };
  } = {
    "1": {
      label: "Urgent",
      icon: InfoDangerIcon,
      color: "#BE0027",
      backgroundColor: "#F8E5E9",
    },
    "2": {
      label: "Follow-up Needed",
      icon: FollowupIcon,
      color: "#F54100",
      backgroundColor: "#FEECE5",
    },
  };

  const toggleFlag = (flag: string) => {
    newNoteFlag = flag;
  };

  $effect(() => {
    notes = page.data.notes;
  });
</script>

<div
  class=" bg-white rounded-lg shadow-sm pt-[29px] pb-6 pr-6 pl-6 sm:pr-10 lg:pr-24 lg:pl-[22px]"
>
  <div class="flex flex-col text-sm text-neutral-700">
    <div class="relative w-full">
      <!-- Vertical timeline line -->
      <div
        class="absolute flex justify-center z-0 left-[75.5px] sm:left-[111.5px] md:left-[129.5px] -top-[29px] w-px h-full bg-neutral-700"
      ></div>

      <!-- Timeline items -->
      <div class="flex flex-col gap-4 w-full">
        {#each notes as { createdBy, created, content, flag }, i}
          <div class="flex items-center w-full gap-2">
            <!-- Right-aligned name before timeline dot -->
            <div
              class="flex items-center justify-end w-[60px] sm:w-24 md:w-28 font-semibold shrink-0"
            >
              <span class="">{createdBy || "User " + i + 1}</span>
            </div>

            <!-- Timeline dot -->
            <div class="relative shrink-0">
              <div
                class="w-4 h-4 md:w-5 md:h-5 bg-neutral-700 rounded-full"
              ></div>
            </div>

            <!-- Date, time, and description -->
            <div class="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
              <div
                class="flex flex-col justify-center items-center w-[42px] shrink-0"
              >
                <div class="whitespace-nowrap">
                  {getMonthDate(created)}
                </div>
                <div class="whitespace-nowrap">
                  {getTime(created)}
                </div>
              </div>
              <div
                class="relative flex-1 p-3 md:p-4 bg-[#EEEEEE] rounded-lg font-semibold min-w-0 items-center flex justify-between"
              >
                <div class="max-w-[80%]">{content}</div>

                <div
                  class="absolute top-[15px] right-2 text-xs font-normal rounded-full px-0.5 md:px-1.5 py-0.5 flex items-center gap-1"
                  style="color: {flagOptions[flag].color};
                    background-color:{flagOptions[flag].backgroundColor}"
                >
                  <IconWrapper
                    Icon={flagOptions[flag].icon}
                    fillColor={flagOptions[flag].color}
                    height="16"
                    width="16"
                  />
                  <span class="hidden md:inline">
                    {flagOptions[flag].label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <form
    class="flex flex-col text-sm text-neutral-700 {notes.length > 0
      ? 'mt-10'
      : ''}"
    action="?/setNotes"
    method="POST"
    use:enhance={(submitEvent) => {
      if (
        submitEvent.formData.get("content")?.toString().trim().length === 0 ||
        isLoading
      ) {
        submitEvent.cancel();
      }
      isLoading = true;
      return async ({ update, result }) => {
        isLoading = false;
        if (result.type !== "success" || !result.data?.succeeded) {
          addToast({
            message: "Unable to add notes.",
            type: "error",
          });
          return;
        }
        addToast({
          message:
            (result.data?.message as string) || "Notes created successfully",
          type: "success",
        });
        update({ invalidateAll: true });
        return;
      };
    }}
  >
    <div class="flex gap-4 w-full">
      <div
        class="flex justify-end w-[60px] sm:w-24 md:w-28 font-semibold shrink-0"
      >
        <span class="mt-2">{currentUserName}</span>
      </div>
      <div class="w-full">
        <textarea
          bind:value={newNoteContent}
          id="content"
          name="content"
          rows="2"
          placeholder="Add a new note."
          class="mt-1 block w-full px-[18px] py-[13px] border border-gray-300 rounded-md shadow-sm"
          onkeydown={(e) => {
            error = "";
            if (e.key === "Enter") {
              if (!e.shiftKey) {
                e.preventDefault();
                const form = (e.target as any)?.closest("form");

                if (form && (e.target as any)?.value.trim().length > 0) {
                  form.requestSubmit();
                } else {
                  error = "Field can not be empty";
                }
              }
            }
          }}
        ></textarea>
        <FormMessage message={error} />
      </div>
      <input type="hidden" name="noteId" value="0" />
      <input type="hidden" name="organizationId" value={page?.params?.org_id} />
      <input type="hidden" name="flag" value={newNoteFlag} />
    </div>
    <div class="flex gap-4 w-full mt-3 justify-between">
      <div class="w-[60px] sm:w-24 md:w-28 font-semibold shrink-0"></div>
      <div class="flex justify-between w-full">
        <div class="flex flex-wrap gap-2">
          {#each Object.keys(flagOptions) as flag}
            <button
              onclick={() => toggleFlag(flag)}
              class="flex items-center h-fit p-1 rounded text-xs border bg-gray-100 text-naro-400"
              style="color: {flagOptions[flag]
                .color}; background-color: {flagOptions[flag]
                .backgroundColor}; border-color: {flag === newNoteFlag
                ? flagOptions[flag].color
                : `${flagOptions[flag].color}00`}"
              type="button"
            >
              <IconWrapper
                Icon={flagOptions[flag].icon}
                fillColor={flagOptions[flag].color}
                height="16"
                width="16"
              />
              <span class="ml-1 whitespace-nowrap"
                >{flagOptions[flag].label}</span
              >
            </button>
          {/each}
        </div>
        <Button
          class="h-fit sm:h-full"
          variant="primary"
          disabled={isLoading || !newNoteContent.length}
          type="submit">Save</Button
        >
      </div>
    </div>
  </form>
</div>
