<script lang="ts">
  import DownArrowHead from "$lib/icons/DownArrowHead.svelte";
  import UpArrowHead from "$lib/icons/UpArrowHead.svelte";

  let showHideAlert = $state(false);
</script>

<div class="border border-[#2C9F45] ... rounded bg-[#F7FFF9] overflow-hidden">
  <div>
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="justify-between lg:items-center text-[#2C9F45] inline-flex items-center w-full pl-8 sm:pl-12 pr-8 sm:pr-4 py-1 my-4 2xl:flex-nowrap flex-wrap"
      type="button"
      onclick={() => (showHideAlert = !showHideAlert)}
    >
      <h2 class="font-medium flex items-center order-1">
        <span class="relative flex h-2 w-2 mr-2 text-[#2C9F45]">
          <span
            class="animate-wiggle absolute inline-flex h-full w-full rounded-md bg-[#2C9F45] opacity-75"
          ></span>
          <span
            class="animate-wiggle1 absolute inline-flex h-full w-full rounded-md bg-[#2C9F45] opacity-75"
          ></span>
          <span
            class="animate-wiggle2 absolute inline-flex h-full w-full rounded-md bg-[#2C9F45] opacity-75"
          ></span>
          <span class="relative inline-flex rounded-md h-2 w-2 bg-[#2C9F45]"
          ></span>
        </span>
        <div>
          <span
            class="lg:ml-2 lg:mr-auto flex gap-x-1 md:gap-x-2 order-2 max-w-full overflow-auto whitespace-wrap flex-col sm:flex-row text-md ml-2"
          >
            <span
              class=" mr-2 ml-1 sm:ml-6 sm:text-[3xl] text-[6xl] font-medium"
              >Super Green Zone</span
            >
          </span>
        </div>
      </h2>
      <h4
        class="  sm:ml-10 ml-5 xl:ml-0 mr-0 xl:mr-auto flex gap-x-1 md:gap-x-2 xl:order-2 order-last max-w-full overflow-auto whitespace-wrap flex-col sm:flex-row xl:w-auto w-full"
      >
        <span class="text-left text-[6xl] text-naro-600 xl:mt-0.5">
          Applicant has strong financial health and stability, identified as low
          risk, allowing you to confidently extend a loan.</span
        >
      </h4>
      <div class="flex justify-end items-center order-3 font-medium">
        <span class="underline sm:block"
          >{showHideAlert ? "Close" : "Reasons"}</span
        >

        {#if showHideAlert}
          <UpArrowHead fillColor={"#2C9F45"} opacity={""} />
        {:else}
          <DownArrowHead fillColor={"#2C9F45"} opacity={""} />
        {/if}
      </div>
    </button>
    <div
      class="bg-[#F7FFF9] col-span-12 lg:col-span-7 xl:col-span-8 transition-max-height ease-in-out duration-500 {showHideAlert
        ? 'max-h-210px'
        : 'max-h-0'}"
    >
      <div class="mx-4 border-t border-naro-600 opacity-40"></div>
      <div class="min-h-full">
        <div
          class="text-naro-600 px-5 py-3 2xl:px-6 2xl:py-5 min-h-full max-h-210px xl:min-w-scroll-width min-w-scroll-width overflow-y-scroll text-[6xl]"
        >
          <div class="2xl:pr-2 py-3 ms-1 sm:pl-16 pl-6">
            This account has a high active monthly income.
          </div>
          <div class="2xl:pr-2 py-3 ms-1 sm:pl-16 pl-6">
            Historically, this person has paid off their loans on time.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
