<script lang="ts">
  import CustomSwitch from "$lib/components/building-blocks/CustomSwitch.svelte";

  let switchState1 = false;
  let switchState2 = false;
  let switchState3 = false;

  function handleSwitch(isChecked: boolean, title: string) {
    console.log(`Switch ${title} is now ${isChecked ? "ON" : "OFF"}`);
  }
</script>

<div
  class="bg-white p-6 rounded-lg shadow-[0px_4px_4px_0px_#00000040] lg:col-span-1 col-span-2"
>
  <div class="flex justify-between items-center flex-wrap gap-3">
    <h2 class="text-lg font-semibold">Application Access</h2>
    <a href="/user_management" class="text-blue-500 hover:underline"
      >Suspend Access</a
    >
  </div>

  <div class="mt-4 space-y-4">
    <div class="flex justify-between items-center flex-wrap gap-3">
      <span class="min-w-[160px]">Marcus Application:</span>
      <div class="flex items-center">
        <CustomSwitch
          title="Application"
          toggle={switchState1}
          isTextVisible={true}
          {handleSwitch}
        />
        <span class="ml-2">Has Access</span>
      </div>
    </div>

    <div class="flex justify-between items-center flex-wrap gap-3">
      <span class="min-w-[160px]">Income Analyzer:</span>
      <div class="flex items-center">
        <CustomSwitch
          title="Income Analyzer"
          toggle={switchState2}
          isTextVisible={true}
          {handleSwitch}
        />
        <span class="ml-2">Has Access</span>
      </div>
    </div>

    <div class="flex justify-between items-center flex-wrap gap-3">
      <span class="min-w-[160px]">Installment Generator:</span>
      <div class="flex items-center">
        <CustomSwitch
          title="Installment Generator"
          toggle={switchState3}
          isTextVisible={true}
          {handleSwitch}
        />
        <span class="ml-2">Has Access</span>
      </div>
    </div>
  </div>
</div>
