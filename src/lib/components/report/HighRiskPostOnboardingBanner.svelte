<script lang="ts">
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import UpArrowHead from "$lib/icons/UpArrowHead.svelte";

  let showHideAlert = $state(false);
</script>

<div class="border border-[#BE0027] ... rounded bg-[#FFF7F9] overflow-hidden">
  <div>
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="justify-between lg:items-center text-[#BE0027] inline-flex items-center w-full pl-8 sm:pl-12 pr-8 sm:pr-4 py-1 my-4 2xl:flex-nowrap flex-wrap"
      type="button"
      onclick={() => (showHideAlert = !showHideAlert)}
    >
      <h2 class="font-medium flex items-center order-1">
        <span class="relative flex h-2 w-2 mr-2 text-[#BE0027]">
          <span
            class="animate-wiggle absolute inline-flex h-full w-full rounded-md bg-[#BE0027] opacity-75"
          ></span>
          <span
            class="animate-wiggle1 absolute inline-flex h-full w-full rounded-md bg-[#BE0027] opacity-75"
          ></span>
          <span
            class="animate-wiggle2 absolute inline-flex h-full w-full rounded-md bg-[#BE0027] opacity-75"
          ></span>
          <span class="relative inline-flex rounded-md h-2 w-2 bg-[#BE0027]"
          ></span>
        </span>
        <div>
          <span
            class="lg:ml-2 lg:mr-auto flex gap-x-1 md:gap-x-2 order-2 max-w-full overflow-auto whitespace-wrap flex-col sm:flex-row text-md ml-2"
          >
            <span
              class=" mr-2 ml-1 sm:ml-6 sm:text-[3xl] text-[6xl] font-medium"
              >Payment Risk Forecast: High</span
            >
          </span>
        </div>
      </h2>
      <h4
        class="  sm:ml-10 ml-5 xl:ml-0 mr-0 xl:mr-auto flex gap-x-1 md:gap-x-2 xl:order-2 order-last max-w-full overflow-auto whitespace-wrap flex-col sm:flex-row xl:w-auto w-full"
      >
        <span class="text-left text-[6xl] text-naro-600 xl:mt-0.5">
          Potential Payment risk identified in the next 3 days.</span
        >
      </h4>
      <div class="flex justify-end items-center order-3 font-medium">
        <span class="underline sm:block"
          >{showHideAlert ? "Close" : "Reasons"}</span
        >

        {#if showHideAlert}
          <UpArrowHead fillColor={"#BE0027"} opacity={""} />
        {:else}
          <DownArrowHead fillColor={"#BE0027"} opacity={""} />
        {/if}
      </div>
    </button>
    <div
      class="bg-[#FFF7F9] col-span-12 lg:col-span-7 xl:col-span-8 transition-max-height ease-in-out duration-500 {showHideAlert
        ? 'max-h-210px'
        : 'max-h-0'}"
    >
      <div class="mx-4 border-t border-naro-600 opacity-40"></div>
      <div class="min-h-full">
        <div
          class="text-naro-600 px-5 py-3 2xl:px-6 2xl:py-5 min-h-full max-h-210px xl:min-w-scroll-width min-w-scroll-width overflow-y-scroll text-[6xl]"
        >
          <div class="2xl:pr-2 py-3 ms-1 sm:pl-16 pl-6">
            The customer is now showing a drop in income of 20%, which puts them
            at risk for their next payment.
          </div>
          <div class="2xl:pr-2 py-3 ms-1 sm:pl-16 pl-6">
            Cannot make a payment arrangement in the next 7 days.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
