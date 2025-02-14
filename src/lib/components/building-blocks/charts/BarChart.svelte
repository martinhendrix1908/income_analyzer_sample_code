<script lang="ts">
    import { onMount } from "svelte";
    import {
      Chart,
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend,
      type ChartConfiguration,
    } from "chart.js";
    import { convertToUSD } from "$lib/utils/currency-utils";
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  
    let chartRef = $state<HTMLCanvasElement | null>(null);
  
    onMount(() => {
      if (!chartRef) return;
      new Chart(chartRef, {
        type: "bar",
        data: {
          labels: [
            "Rent",
            "Groceries",
            "Loans",
            "Expense 4",
            "Expense 5",
            "Expense 6",
            "Expense 7",
          ],
          datasets: [
            {
              data: [1900, 1300, 1100, 900, 800, 700, 600],
              backgroundColor: "#09814A",
              borderWidth: 0,
              barPercentage: 0.69,
            },
          ],
        },
        options: {
          indexAxis: "y",
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
              text: "Spending Overview",
              color: "white",
              font: {
                size: 18,
                weight: "bold",
              },
            },
          },
          scales: {
            x: {
              position: "top",
              display: true,
              ticks: {
                color: "white",
                font: {
                  size: 12,
                },
                callback: function (value) {
                  return convertToUSD(value).split(".")[0];
                },
              },
              grid: {
                color: "#9C9C9C4A",
              },
              border: {
                dash: [2, 2],
              },
            },
            y: {
              display: true,
              ticks: {
                color: "white",
                font: {
                  size: 12,
                },
              },
              grid: {
                color: "#9C9C9C4A",
              },
              border: {
                dash: [2, 2],
              },
              clip: true,
            },
          },
          responsive: true,
        },
      } as ChartConfiguration<"bar">);
    });
  </script>
  
  <div class="flex items-center min-h-full">
    <div class=" rounded-lg p-6 w-full h-full">
      <canvas bind:this={chartRef} class="w-full h-full"></canvas>
    </div>
  </div>
  