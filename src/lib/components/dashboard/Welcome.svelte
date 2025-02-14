<script lang="ts">
  import { page } from "$app/state";
  import { convertToDateMonth } from "$lib/utils/date-utils";
  import { onDestroy, onMount } from "svelte";
  import { formatSessionDuration } from "../../../routes/dashboard/utils";

  let sessionTimer: ReturnType<typeof setInterval> | undefined =
    $state(undefined);
  let sessionDuration: number = $state(0);
  let sessionStartTime: Date | undefined = $state(undefined);

  onMount(() => {
    sessionStartTime = new Date(page.data.user.timeStamps.sessionUpTime);
    sessionTimer = setInterval(updateSessionDuration, 1000);
  });

  onDestroy(() => {
    clearInterval(sessionTimer);
  });

  const updateSessionDuration = () => {
    if (!sessionStartTime) return;
    const currentTime: Date = new Date();
    sessionDuration = Math.floor(
      (currentTime.getTime() - sessionStartTime.getTime()) / 1000
    );
  };
</script>

<div class="grid grid-cols-12 gap-2 lg:gap-6">
  <div class="col-span-12">
    <div
      class="bg-naro-600 shadow-4xl rounded-md overflow-hidden px-6 py-4 text-white min-h-full"
    >
      <h1
        class="text-5xl md:text-3xl xl:text-1xl text-naro-100 font-normal mb-2 break-words"
      >
        Hello, {page?.data?.user?.name}
      </h1>
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between font-normal text-sm py-2 gap-2"
      >
        <p class="text-naro-100">
          Your last login was on {page?.data?.user?.last_login
            ? convertToDateMonth(page?.data?.user?.last_login).replaceAll(
                ", ",
                " "
              )
            : "--"}
        </p>
        <p class="text-naro-100">
          Current Session: {sessionDuration
            ? formatSessionDuration(sessionDuration)
            : "00:00:00"}
        </p>
      </div>
    </div>
  </div>
</div>
