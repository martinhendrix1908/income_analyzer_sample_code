<script lang="ts">
  import type { AssessmentZone } from "$lib/types/types";
  import { generateUniqueId } from "$lib/utils/common-utils";
  import PlusIcon from "$lib/icons/PlusIcon.svelte";
  import AddZonePopup from "../popups/AddZonePopup.svelte";
  import Button from "$lib/components/building-blocks/Button.svelte";
  import ConfirmationPopup from "$lib/components/building-blocks/ConfirmationPopup.svelte";

  let {
    zones = $bindable(),
    claimValue,
  }: { zones: AssessmentZone[]; claimValue: string } = $props();

  let currentZone = $state<AssessmentZone>({
    color: "black",
    description: "",
    id: "",
    name: "",
    position: zones[zones.length - 2]?.position + 1,
    editing: false,
  });

  let draggedIndex = $state<number | null>(null);
  let dragOverIndex = $state<number | null>(null);
  let touchStartY = $state<number | null>(null);
  let currentTouchY = $state<number | null>(null);
  let draggedElement = $state<HTMLElement | null>(null);

  let zoneList = $derived.by(() => getZoneRange(zones));
  let isOpen = $state(false);
  let isDeletePopupOpen = $state(false);
  let deleteZoneIndex = $state(-1);

  function getZoneRange(sortedZones: AssessmentZone[]) {
    return sortedZones.map((zone, index, array) => {
      const rangeStart = index === 0 ? 0 : array[index - 1].position + 1;
      const rangeEnd = zone.position;
      return { ...zone, range: `${rangeStart} - ${rangeEnd}` };
    });
  }

  // Mouse event handlers
  function handleDragStart(index: number, e: DragEvent) {
    draggedIndex = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  }

  function handleDragOver(index: number, e: DragEvent) {
    e.preventDefault();
    dragOverIndex = index;
  }

  // Touch event handlers
  function handleTouchStart(index: number, e: TouchEvent) {
    e.preventDefault();
    draggedIndex = index;
    touchStartY = e.touches[0].clientY;
    draggedElement = e.currentTarget as HTMLElement;

    if (draggedElement) {
      draggedElement.style.opacity = "0.5";
      draggedElement.style.position = "relative";
      draggedElement.style.zIndex = "1000";
    }
  }

  function handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (draggedIndex === null || !draggedElement) return;

    currentTouchY = e.touches[0].clientY;

    // Move the dragged element
    if (touchStartY !== null) {
      const deltaY = currentTouchY - touchStartY;
      draggedElement.style.transform = `translateY(${deltaY}px)`;
    }

    // Find the element we're currently hovering over
    const elements = document.elementsFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    const droppableElement = elements.find((el) =>
      el.hasAttribute("data-index")
    );

    if (droppableElement) {
      const newIndex = parseInt(
        droppableElement.getAttribute("data-index") || "-1"
      );
      if (newIndex !== -1 && newIndex !== draggedIndex) {
        dragOverIndex = newIndex;
      }
    }
  }

  function handleTouchEnd() {
    if (draggedElement) {
      draggedElement.style.opacity = "1";
      draggedElement.style.transform = "";
      draggedElement.style.position = "";
      draggedElement.style.zIndex = "";
    }

    handleDragEnd();
  }

  function handleDragEnd() {
    if (
      draggedIndex !== null &&
      dragOverIndex !== null &&
      draggedIndex !== dragOverIndex
    ) {
      const newZones = [...zones];
      const draggedZone = { ...newZones[draggedIndex] };
      const targetZone = { ...newZones[dragOverIndex] };

      // Preserve the position values
      const draggedPosition = draggedZone.position;
      const targetPosition = targetZone.position;

      // Swap all other properties
      newZones[draggedIndex] = { ...targetZone, position: draggedPosition };
      newZones[dragOverIndex] = { ...draggedZone, position: targetPosition };

      zones = newZones;
    }

    draggedIndex = null;
    dragOverIndex = null;
    touchStartY = null;
    currentTouchY = null;
    draggedElement = null;
  }

  function addZone() {
    if (claimValue !== "Edit" || zones.length >= 5) return;
    isOpen = true;
    currentZone = {
      color: getRandomColor(zoneList),
      description: "",
      id: generateUniqueId(),
      name: "",
      position: zones[zones.length - 2]?.position + 1,
      editing: false,
    };
  }

  function getRandomColor(zoneList: AssessmentZone[]) {
    const colors = ["#98C43D", "#FFCC00", "#FF8400", "#98C43D", "#BE0027"];
    let usedColors = zoneList.map((i) => i.color);
    let unusedColors = colors.filter((color) => !usedColors.includes(color));
    return unusedColors.length > 0
      ? unusedColors[Math.floor(Math.random() * unusedColors.length)]
      : colors[Math.floor(Math.random() * colors.length)];
  }

  const headers = [
    {
      label: "Color",
      key: "color",
      columnWidth: "w-1/5",
    },
    {
      label: "Zone Name",
      key: "name",
      columnWidth: "w-2/5 text-left",
    },
    {
      label: "Zone Description",
      key: "description",
      columnWidth: "w-3/5",
    },
    {
      label: "Range",
      key: "range",
      columnWidth: "w-2/5",
    },
    {
      label: "Actions",
      key: "actions",
      columnWidth: "w-1/5",
    },
  ];
</script>

<div
  class="Zones-table bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-md relative overflow-auto mt-10"
>
  <div
    class="bg-white shadow-[0px_4px_4px_0px_#00000040] rounded-b-none w-full overflow-hidden min-w-[970px]"
  >
    <div
      class="w-full overflow-auto max-h-[500px] min-w-[970px] xl:min-w-table-scroll-width overflow-x-hidden"
    >
      <div class="w-full text-sm leading-relaxed min-w-[970px]">
        <div class="bg-naro-600 leading-loose sticky top-0 left-0 px-3">
          <div class="flex items-center justify-between">
            {#each headers as header (header)}
              <div
                class="px-4 py-2 font-semibold flex text-white whitespace-nowrap text-sm {header.columnWidth}"
              >
                {header.label}
              </div>
            {/each}
          </div>
        </div>

        <div class="divide-y divide-naro-200">
          {#each zoneList as zone, index}
            <div
              role="none"
              class="flex justify-between items-center duration-100 hover:bg-naro-100 px-3 cursor-move touch-none"
              draggable={true}
              data-index={index}
              ondragstart={(e) => handleDragStart(index, e)}
              ondragover={(e) => handleDragOver(index, e)}
              ondragend={handleDragEnd}
              ontouchstart={(e) => handleTouchStart(index, e)}
              ontouchmove={handleTouchMove}
              ontouchend={handleTouchEnd}
              ontouchcancel={handleTouchEnd}
              style={dragOverIndex === index
                ? "border: 2px dashed #0A84FF;"
                : ""}
            >
              {#each headers as header (header)}
                {#if header.key === "actions"}
                  <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                    <Button
                      variant="red"
                      isLink
                      onclick={() => {
                        isDeletePopupOpen = true;
                        deleteZoneIndex = index;
                      }}
                      disabled={zones.length === 2 ||
                        index === zones.length - 1}
                    >
                      Delete
                    </Button>
                  </div>
                {:else if header.key === "color"}
                  <div
                    class="px-4 py-2 text-[#222222] flex {header.columnWidth}"
                  >
                    <div
                      class="rounded-full h-[25px] w-[25px]"
                      style="background-color: {zone.color};"
                    ></div>
                  </div>
                {:else if header.key === "name"}
                  <button
                    class="text-[#0a84ff] hover:underline px-4 py-2 {header.columnWidth}"
                    onclick={() => {
                      currentZone = zone;
                      isOpen = true;
                    }}>{zone.name}</button
                  >
                {:else}
                  <div class="px-4 py-2 text-[#222222] {header.columnWidth}">
                    {zone[header.key as keyof AssessmentZone]}
                  </div>
                {/if}
              {/each}
            </div>
          {/each}
          <div class="divide-y h-[44px] px-6 flex items-center divide-naro-200">
            <Button
              variant="blue"
              isLink
              onclick={addZone}
              disabled={zoneList.length === 5}
            >
              <PlusIcon fillColor="#0A84FF" />
              Add New Zone
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<AddZonePopup
  isEdit={zoneList.findIndex((i) => i.id === currentZone.id) !== -1}
  bind:isOpen
  bind:currentZone
  onAddClick={() => {
    let zoneIndex = zoneList.findIndex((i) => i.id === currentZone.id);
    if (zoneIndex === -1) {
      zones = [
        ...zoneList,
        { ...currentZone, position: +currentZone.position },
      ].toSorted((a, b) => a.position - b.position);
    } else {
      zones[zoneIndex] = { ...currentZone, position: +currentZone.position };
      zones = zones.toSorted((a, b) => a.position - b.position);
    }
    isOpen = false;
  }}
  bind:zones
/>
<ConfirmationPopup
  bind:isOpen={isDeletePopupOpen}
  confirmationMessage="Are you sure want to delete this zone?"
  onConfirm={() => {
    zones = zones.filter((item, index) => deleteZoneIndex !== index);
  }}
  onClose={() => {}}
/>
