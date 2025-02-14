<script lang="ts">
  import { onMount } from "svelte";
  import {
    Chart,
    DoughnutController,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    type ChartConfiguration,
    type ChartData,
    type ChartTypeRegistry,
  } from "chart.js";

  Chart.register(DoughnutController, ArcElement, Title, Tooltip, Legend);

  type LegendPosition = "right" | "bottom" | "left" | "top";

  let {
    chartData,
    legendPosition = "right",
  }: {
    chartData: ChartData<"doughnut">;
    legendPosition?: LegendPosition;
  } = $props();

  let chartRef = $state<HTMLCanvasElement | null>(null);
  let chartInstance = $state<Chart<"doughnut"> | null>(null);
  let legendItems = $state<{ label: string; color: string; hidden: boolean }[]>(
    []
  );

  // Update legend items when datasets change
  $effect(() => {
    if (chartData.labels && chartData.datasets[0]) {
      legendItems = chartData.labels.map((label: any, index: number) => {
        const backgroundColor = chartData.datasets[0].backgroundColor;
        const color =
          Array.isArray(backgroundColor) && backgroundColor[index]
            ? backgroundColor[index]
            : "#000";
        return {
          label,
          color,
          hidden: false,
        };
      });
    }
  });

  onMount(() => {
    if (!chartRef) return;

    const chartConfig: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: "right",
            labels: {
              usePointStyle: true,
              pointStyle: "rect",
            },
          },
          tooltip: {
            padding: 12,
            boxPadding: 8,
          },
        },
        cutout: "75%", // Controls the size of the hole in the middle
        radius: "90%", // Controls the overall size of the chart
        animation: {
          animateScale: true,
        },
      },
    };

    chartInstance = new Chart(chartRef, chartConfig);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  });

  function getLegendClasses(position: LegendPosition): string {
    const baseClasses = "flex gap-4";
    switch (position) {
      case "right":
        return `${baseClasses} flex-col absolute top-1/2 -translate-y-1/2 right-0`;
      case "left":
        return `${baseClasses} flex-col absolute top-1/2 -translate-y-1/2 left-0`;
      case "top":
        return `${baseClasses} flex-row justify-center absolute top-0 left-1/2 -translate-x-1/2`;
      case "bottom":
        return `${baseClasses} flex-row justify-center absolute bottom-0 left-1/2 -translate-x-1/2`;
      default:
        return `${baseClasses} flex-col absolute top-1/2 -translate-y-1/2 right-0`;
    }
  }

  function toggleDataset(index: number) {}
</script>

<div class="relative w-full h-full">
  <canvas bind:this={chartRef} class="w-full h-full m-0 p-0"></canvas>

  <div class={getLegendClasses(legendPosition ?? "right")}>
    {#each legendItems as item, index}
      <button
        class="flex items-center gap-2 px-2 py-1 transition-colors cursor-text"
        class:opacity-50={item.hidden}
        onclick={() => toggleDataset(index)}
      >
        <span class="w-3 h-3" style:background-color={item.color}
        ></span>
        <span class="text-sm whitespace-nowrap">
          {item.label}
        </span>
      </button>
    {/each}
  </div>
</div>
