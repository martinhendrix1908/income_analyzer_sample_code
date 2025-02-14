<script lang="ts">
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import AppartmentIcon from "$lib/icons/AppartmentIcon.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  type $$Props = NodeProps;

  export let data: $$Props["data"];
  let orgData: { [key: string]: any } = {
    Organization: { color: "blue", Icon: AppartmentIcon },
    Group: { color: "primary", Icon: GroupIcon },
    Unit: { color: "secondary", Icon: UnitIcon },
  };

  $: Icon = orgData[data?.orgUnitType as string].Icon;
</script>

<Handle type="source" position={Position.Bottom} id="b" class="invisible" />
<Handle type="target" position={Position.Top} id="a" class="invisible" />

<Button
  title={data.label as string}
  variant={orgData[data?.orgUnitType as string].color}
  class="max-w-[320px] w-[180px] shadow-none flex items-center"
>
  <Icon filled={false} />
  <span class="w-full text-ellipsis overflow-hidden whitespace-nowrap">
    {data.label}
  </span>
</Button>
