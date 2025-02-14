<script lang="ts">
  let {
    title,
    toggle = $bindable(),
    isTextVisible,
    handleSwitch,
    color = "#09814A",
    disabled,
  }: {
    title: string;
    toggle: boolean;
    isTextVisible: boolean;
    handleSwitch: (toggle: boolean, title: string, e?: Event) => void;
    color?: string;
    disabled?: boolean;
  } = $props();
  $effect(() => {
    disabled;
  });
</script>

<div
  style="background-color:{toggle ? color : '#EEEEEE'}"
  class="relative overflow-hidden rounded-[100px] min-w-[56px] h-[24px] flex items-center px-1 gap-[7px] {disabled
    ? '!cursor-not-allowed opacity-50'
    : 'cursor-pointer'}"
>
  <label
    for={title}
    class="flex items-center text-xs text-center overflow-hidden w-full h-full relative {disabled
      ? 'cursor-not-allowed'
      : 'cursor-pointer'}"
  >
    <input
      type="checkbox"
      bind:checked={toggle}
      name={title}
      onchange={(e) => handleSwitch(toggle, title, e)}
      id={title}
      class="absolute opacity-0"
      {disabled}
    />
    <span
      class={` inline-block h-[18px] w-[18px] font-medium rounded-full relative transition-transform duration-300 ease-in-out  ${toggle ? "bg-[#FFFFFF] transform translate-x-[29px] shadow-[-2px_1px_4px_0px_#0000004D]" : "bg-[#222222] transform translate-x-0 shadow-[2px_0px_4px_0px_#0000004D]"}`}
    >
      &nbsp;
    </span>

    <span
      class={`absolute left-6 text-[#222222] leading-4 transition ${toggle ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in-out`}
    >
      {isTextVisible ? "Off" : ""}
    </span>
    <span
      class={`absolute left-1 text-[#FFFFFF] leading-4 transition ${toggle ? "opacity-100" : "opacity-0"} transition-opacity duration-300 ease-in-out`}
    >
      {isTextVisible ? "On" : ""}
    </span>
  </label>
</div>
