<script lang="ts">
  import { page } from "$app/state";
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";

  let data = $state({
    heading: "Product Access",
    details: [
      {
        title: "API Only Client",
        toggle: true,
        visible: true,
      },
      {
        title: "Bankuity Web App",
        toggle: false,
        visible: false,
      },
      {
        title: "Retro Study",
        toggle: false,
        visible: false,
      },
      {
        title: "Shadow Project",
        toggle: false,
        visible: false,
      },
    ],
  });
</script>

<div
  class="col-span-2 lg:col-span-8 xl:col-span-6 flex flex-col md:flex-row lg:justify-end gap-6 md:gap-20"
>
  <div class="">
    <h6 class="text-[#98c43d] mb-2 font-semibold">{data?.heading}</h6>
    <div class="text-naro-300 flex flex-col gap-y-3">
      {#each data?.details as item (item)}
        {#if item.visible}
          <div class="flex whitespace-nowrap">
            <CustomSwitch
              title={item.title}
              bind:toggle={item.toggle}
              handleSwitch={() => {}}
              isTextVisible
              color="#0A84FF"
              disabled
            />
            <span class="sm:ms-1 text-white text-wrap max-w-[185px]">
              {item?.title ?? "N/A"}
            </span>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>
