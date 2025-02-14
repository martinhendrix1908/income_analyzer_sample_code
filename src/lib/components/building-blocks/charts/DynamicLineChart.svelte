<script lang="ts">
  import { onMount } from "svelte";
  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
    type ChartConfiguration,
    type ChartDataset,
    type ChartData,
  } from "chart.js";

  Chart.register(
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  let { chartData }: { chartData: ChartData<"line"> } = $props();
  let chartRef: HTMLCanvasElement | null = null;

  onMount(() => {
    if (!chartRef) return;

    const chartConfig: ChartConfiguration<"line"> = {
      type: "line",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        layout: {
          padding: 0,
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          x: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            },
          },
        },
      },
    };

    new Chart(chartRef, chartConfig);
  });
</script>

<canvas bind:this={chartRef} class="h-full w-full p-0 m-0"></canvas>
