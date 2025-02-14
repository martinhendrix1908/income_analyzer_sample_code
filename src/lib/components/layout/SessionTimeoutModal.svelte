<script lang="ts">
  import { page } from "$app/state";
  import { onMount, onDestroy } from "svelte";
  import PopupWrapper from "$lib/components/building-blocks/PopupWrapper.svelte";

  const SessionState = {
    ACTIVE: "active",
    WARNING: "warning",
    EXPIRED: "expired",
    ERROR: "error",
  } as const;

  type SessionStateType = (typeof SessionState)[keyof typeof SessionState];

  let sessionState = $state<SessionStateType>(SessionState.ACTIVE);
  let timeRemaining = $state(2 * 60); // Initial time in seconds
  let timer: ReturnType<typeof setInterval> | null = null;
  let remainingTimer: ReturnType<typeof setInterval> | null = null;
  let modalBody: HTMLDivElement | undefined = $state(undefined);
  let shouldIgnoreTimeout = $state(false);
  let isCloseRequested = $state(false);

  const formatTime = (seconds: number): string => {
    if (seconds < 0) return "0m 0s";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
  };

  const startTimer = () => {
    sessionState = SessionState.ACTIVE;
    if (!page?.data?.user?.timeStamps?.expires) {
      sessionState = SessionState.ERROR;
      return;
    }

    try {
      const expireTime = new Date(page.data.user.timeStamps.expires).getTime();
      if (isNaN(expireTime) || expireTime <= Date.now()) {
        sessionState = SessionState.EXPIRED;
        return;
      }
      stopTimers();
      timer = setInterval(() => {
        // If timeout should be ignored, stop checking
        if (shouldIgnoreTimeout) {
          stopTimers();
          return;
        }

        // If modal is explicitly closed, ignore timeout
        if (isCloseRequested) {
          stopTimers();
          return;
        }

        const currentTime = Date.now();
        const timeDifference = Math.max(
          0,
          Math.floor((expireTime - currentTime) / 1000)
        );

        if (timeDifference <= 0) {
          sessionState = SessionState.EXPIRED;
          stopTimers();
          return;
        }

        if (timeDifference <= 2 * 60) {
          sessionState = SessionState.WARNING;
          startRemainingTimer(timeDifference);
        }
      }, 1000);
    } catch (error) {
      console.error("Timer initialization failed:", error);
      sessionState = SessionState.ERROR;
    }
  };

  const startRemainingTimer = (initialTime: number) => {
    if (remainingTimer) stopTimers();

    timeRemaining = initialTime;
    remainingTimer = setInterval(() => {
      // If timeout should be ignored, stop checking
      if (shouldIgnoreTimeout || isCloseRequested) {
        stopTimers();
        return;
      }

      timeRemaining = Math.max(0, timeRemaining - 1);

      if (timeRemaining <= 0) {
        sessionState = SessionState.EXPIRED;
        stopTimers();
      }
    }, 1000);
  };

  const stopTimers = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (remainingTimer) {
      clearInterval(remainingTimer);
      remainingTimer = null;
    }
  };

  onMount(() => {
    startTimer();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopTimers();
    } else {
      startTimer();
    }
  };

  onDestroy(() => {
    stopTimers();
  });

  const handleClose = () => {
    // When the modal is closed from inside the component
    isCloseRequested = true;
    shouldIgnoreTimeout = true;
    sessionState = SessionState.ACTIVE;
    stopTimers();
  };

  const handleOutsideClose = () => {
    isCloseRequested = true;
    shouldIgnoreTimeout = true;
    sessionState = SessionState.ACTIVE;
    stopTimers();
  };
</script>

<PopupWrapper
  isOpen={sessionState !== SessionState.ACTIVE &&
    sessionState !== SessionState.ERROR}
  popUpBody={modalBody}
  onClose={handleOutsideClose}
  className="bg-gray-200 backdrop-blur-sm bg-opacity-0 drop-shadow-md !z-[999999]"
>
  <div class="h-screen flex align-items" id="modalBody" bind:this={modalBody}>
    <div
      class="flex flex-col w-416 p-6 gap-6 bg-white items-center rounded-md m-auto 2xl:container"
    >
      {#if sessionState === SessionState.WARNING}
        <div class="flex flex-col items-center gap-4">
          <span class="text-[#222222] text-[18px] font-medium leading-5">
            Heads up! Your session is ending soon.
          </span>
          <span class="text-[#222222] text-[18px] font-medium leading-5">
            Time remaining: {formatTime(timeRemaining)}
          </span>
          <div
            class="text-[#222222] text-center font-roboto text-sm font-normal max-w-[368px] leading-6"
          >
            Click "Stay Logged In" to continue working or "Log Out" to leave
            now. Inaction will result in automatic logout when the time runs
            out.
          </div>
          <form method="POST" class="flex w-full gap-2">
            <button
              formaction="/login?/logout"
              class="flex p-2 justify-center items-center gap-4 flex-1 rounded-[3px] border border-[#222222] hover:bg-[#222222] hover:text-white shadow-4xl text-sm font-normal leading-7"
            >
              Log Out
            </button>
            <button
              formaction="/login?/refreshToken"
              class="flex p-2 justify-center items-center gap-4 flex-1 rounded-[3px] bg-[#222222] text-white shadow-4xl text-sm leading-6 hover:opacity-70"
            >
              Stay Logged In
            </button>
          </form>
        </div>
      {:else if sessionState === SessionState.EXPIRED}
        <div class="flex flex-col items-center gap-4">
          <span class="text-[#222222] text-[18px] font-medium leading-5">
            Session Ended
          </span>
          <span
            class="text-[#222222] text-center font-roboto text-sm font-normal max-w-[368px] leading-6"
          >
            You have been automatically logged out as your session expired.
            Please log back in to continue.
          </span>
          <form method="post" class="flex w-full" action="/login?/logout">
            <button
              class="flex p-2 justify-center items-center gap-4 flex-1 rounded-[3px] bg-[#222222] text-white shadow-4xl text-sm font-normal leading-7 hover:opacity-70"
            >
              Close
            </button>
          </form>
        </div>
      {:else if sessionState === SessionState.ERROR}
        <div class="flex flex-col items-center gap-4">
          <span class="text-[#222222] text-[18px] font-medium leading-5">
            Session Error
          </span>
          <span
            class="text-[#222222] text-center font-roboto text-sm font-normal max-w-[368px] leading-6"
          >
            There was an issue with your session. Please log in again.
          </span>
          <form method="post" class="flex w-full" action="/login?/logout">
            <button
              class="flex p-2 justify-center items-center gap-4 flex-1 rounded-[3px] bg-[#222222] text-white shadow-4xl text-sm font-normal leading-7 hover:opacity-70"
            >
              Refresh
            </button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</PopupWrapper>
