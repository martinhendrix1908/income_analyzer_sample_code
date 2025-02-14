<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Chart from "chart.js/auto";
  import type {
    HistoricalAccountInfo,
    ChartProp,
    DatasetVisibility,
    TabVisibility,
  } from "$lib/types/report.types";
  import {
    chartLabelValue,
    determineTabVisibility,
    getTooltipData,
    hoverLine,
    legends,
    removeDuplicates,
    tabs,
  } from "$lib/utils/chart-utils";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import "chartjs-adapter-date-fns";

  let { historicalReportArr }: { historicalReportArr: HistoricalAccountInfo[] } =
    $props();

  let canvas: HTMLCanvasElement;
  let tooltipElement: HTMLDivElement;
  let chart: Chart;
  let activeTab = $state("7D");
  let labels = $state<string[]>([]);
  let dataPointBackground = $state<string[]>([]);
  let isDatasetVisible = $state<boolean[]>(Array(5).fill(true));
  const datasetVisibility = $state<DatasetVisibility>({
    High: true,
    Acceptable: true,
  });

  const tooltipData = $state({
    label: "",
    activeIncome: 0,
    availableBalance: 0,
    riskScore: 0,
    accountGuid: "",
    riskAssessment: "",
  });

  const historicalReports = $derived.by(() => {
    return historicalReportArr.filter((item: HistoricalAccountInfo) => {
      const text = item?.riskAssessmentData;
      return datasetVisibility[text as keyof DatasetVisibility];
    });
  });

  const tabVisibility = $derived.by(() =>
    determineTabVisibility(historicalReportArr)
  );

  let chartValues: number[] = [];
  let chartData: ChartProp[] = [];

  // Chart initialization
  function initializeChart(ctx: CanvasRenderingContext2D) {
    getData("7D");

    chartData = [
      {
        label: "Risk Assessment",
        data: chartValues,
        borderColor: "#0A84FF",
        borderWidth: 1.5,
        tension: 0,
        backgroundColor: dataPointBackground,
        pointBorderColor: "rgba(0,0,0,0)",
        pointHoverRadius: 4,
        pointHoverBorderWidth: 5,
      },
      {
        label: "Risk Assessment Clone",
        data: chartValues.map((item) => item + 0.5),
        borderColor: "#E1E1E1",
        borderWidth: 2,
        tension: 0,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
      },
      {
        label: "Fill Red",
        data: Array(chartValues?.length).fill(50),
        borderColor: "#BE0027",
        tension: 0.1,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointRadius: 0,
        borderWidth: 0.5,
        borderDash: [4, 3],
        fill: {
          target: "origin",
          below: "#FFF0F4",
        },
      },
      {
        label: "Fill Green",
        data: Array(chartValues?.length).fill(100),
        borderColor: "#F0FFF4",
        tension: 0.1,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointRadius: 0,
        borderWidth: 0.5,
        borderDash: [4, 3],
        fill: {
          target: "origin",
          below: "#F0FFF4",
        },
      },
    ];

    const config: import("chart.js").ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: labels,
        datasets: chartData,
      },
      options: {
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            position: "nearest",
            external: customTooltip,
          },
        },
        scales: {
          y: {
            reverse: true,
            offset: false,
            grid: {
              display: true,
              tickWidth: 196,
              tickLength: 4,
              tickColor: (ticks) => {
                if (ticks.tick.label === "R-A") return "#2C9F45";
                if (ticks.tick.label === "R-H") return "#BE0027";
              },
            },
            border: {
              display: false,
            },
            max: 100,
            min: 0,
            ticks: {
              align: "center",
              stepSize: 1,
              color: (ticks) => {
                if (ticks?.tick?.label == "A" || ticks?.tick?.label == "H") {
                  return "#222222";
                }
                return "transparent";
              },
              callback: function (value: number | string) {
                if (+value === 0) return "H";
                if (+value === 25) return "R-H";
                if (+value === 51) return "A";
                if (+value === 75) return "R-A";
              },
            },
          },
          x: {
            type: "time",
            bounds: "data",
            time: {
              unit: "day",
            },
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              align: "center",
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
      plugins: [hoverLine],
    };

    chart = new Chart(ctx, config);
  }

  // Custom tooltip handler
  function customTooltip(context: any) {
    if (!tooltipElement) return;

    const tooltipModel = context.tooltip;
    if (
      tooltipModel?.dataPoints[0]?.dataset.label !== "Risk Assessment" ||
      tooltipModel?.dataPoints[0]?.raw === 51
    ) {
      tooltipElement.style.display = "none";
      return;
    }

    if (!tooltipModel.opacity) {
      tooltipElement.style.display = "none";
      return;
    }

    const dateParts = tooltipModel?.title[0].split(",");
    const label = dateParts[0] + "," + dateParts[1];
    const data = getTooltipData(historicalReports, label);

    if (!data) {
      tooltipElement.style.display = "none";
      tooltipModel.dataPoints[0].raw = NaN;
      return;
    }

    tooltipElement.style.display = "block";

    // Update tooltip data
    Object.assign(tooltipData, {
      label,
      activeIncome: data.activeMonthlyIncome || 0,
      availableBalance: data.availableBalance || 0,
      riskScore: data.riskScore || 0,
      accountGuid: data.accountGuid || "",
      riskAssessment: data.riskAssessmentData || "",
    });

    // Position tooltip
    if (canvas) {
      const chartPosition = canvas.getBoundingClientRect();
      const left =
        tooltipModel.caretX + chartPosition.left + window.pageXOffset - 60;
      const top =
        tooltipModel.caretY + chartPosition.top + window.pageYOffset - 100;

      Object.assign(tooltipElement.style, {
        left: `${left}px`,
        top: `${top}px`,
        display: "block",
      });
    }
  }

  // Data processing function
  function getData(tabName: string) {
    const currentDate = new Date();
    const currentUTCDate = new Date(
      Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate()
      )
    )
      .toISOString()
      .split("T")[0];

    const { labelArr, valueArr, date } = chartLabelValue(tabName);

    labels = labelArr;
    chartValues = valueArr;
    const startDate = date.toISOString().split("T")[0];

    let filteredArr = removeDuplicates(historicalReports).filter(
      (item) => item.status !== "Error"
    );

    if (filteredArr?.length) {
      const filteredData = filteredArr.filter((report) => {
        const reportDate = report?.snapshotDate.split("T")[0];
        return reportDate >= startDate && reportDate <= currentUTCDate;
      });

      if (filteredData?.length) {
        filteredData.forEach((report) => {
          const label = report?.snapshotDate.split("T")[0];
          const riskScore = report?.riskAssessmentData;
          const score =
            riskScore === "High" ? 25 : riskScore === "Acceptable" ? 75 : NaN;
          chartValues[labels.indexOf(label)] = score;
        });
      } else {
        chartValues = Array(labels?.length).fill(51);
      }
    } else {
      chartValues = Array(labels?.length).fill(51);
    }

    // Process background colors and data points
    const arr: string[] = [];
    chartValues.forEach((item) => {
      arr.push(!isNaN(item) && item !== 51 ? "#0A84FF" : "transparent");
    });

    // Fill NaN values for continuous line
    let previousValidValue = NaN;
    chartValues.forEach((item, index) => {
      if (!isNaN(item)) {
        previousValidValue = item;
      } else {
        chartValues[index] = previousValidValue;
      }
    });

    dataPointBackground = arr.reverse();
    labels = labels?.reverse();
    chartValues = chartValues?.reverse();

    // Fill remaining NaN values
    previousValidValue = NaN;
    chartValues.forEach((item, index) => {
      if (!isNaN(item)) {
        previousValidValue = item;
      } else {
        chartValues[index] = previousValidValue;
      }
    });
  }

  function handleClick(tabName: string) {
    if (activeTab === tabName) return;
    activeTab = tabName;
    getData(tabName);

    if (chart) {
      chart.data.datasets[0].backgroundColor = dataPointBackground;
      if (chart.options.scales?.x) {
        (chart.options.scales.x as any).time.unit =
          tabName !== "7D" && tabName !== "1M" ? "month" : "day";
      }

      chart.data.labels = labels;
      chart.data.datasets[0].data = chartValues;
      chart.data.datasets[1].data = chartValues?.map((item) => item + 0.5);

      const arrLength = labels?.length;
      chart.data.datasets[2].data = Array(arrLength).fill(50);
      chart.data.datasets[3].data = Array(arrLength).fill(100);

      chart.update();
    }
  }

  function toggleDatasetVisibility(datasetName: string) {
    datasetVisibility[datasetName as keyof DatasetVisibility] =
      !datasetVisibility[datasetName as keyof DatasetVisibility];

    const index = datasetName === "Acceptable" ? 3 : 2;
    isDatasetVisible[index] = !isDatasetVisible[index];

    getData(activeTab);

    if (chart) {
      chart.data.datasets[0].backgroundColor = dataPointBackground;
      chart.data.labels = labels;
      chart.data.datasets[0].data = chartValues;
      chart.data.datasets[1].data = chartValues?.map((item) => item + 0.5);

      const arrLength = labels?.length;
      chart.data.datasets[2].data = Array(arrLength).fill(50);
      chart.data.datasets[3].data = Array(arrLength).fill(100);

      chart.update();
    }
  }

  function getVisibility(tabName: string) {
    if (tabName === "All") {
      return (
        tabVisibility["1M"] ||
        tabVisibility["3M"] ||
        tabVisibility["6M"] ||
        tabVisibility["9M"] ||
        tabVisibility["1Y"]
      );
    }
    return tabVisibility[tabName as keyof TabVisibility];
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      initializeChart(ctx);
    }
  });

  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div>
  <div
    class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 md:mb-4"
  >
    <div class="pr-2 md:border-r-4 border-parrot mr-2">
      <h3 class="text-black font-medium opacity-85">Risk Assessment History</h3>
    </div>
    <div
      class="flex items-center justify-center order-2 lg:order-3 lg:gap-2 mb-0"
    >
      <div
        id="buttonContainer"
        class="lg:ml-2 mr-auto flex gap-x-1 md:gap-x-2 order-3 lg:order-2 max-w-full overflow-auto whitespace-nowrap text-sm md:text-base p-1"
      >
        {#if getVisibility("All")}
          {#each tabs as tab (tab)}
            {#if getVisibility(tab.value)}
              <button
                class={`py-1 px-2 text-sm font-medium z-1 rounded ${
                  activeTab === tab.value
                    ? "bg-naro-600 text-white"
                    : "bg-transparent text-naro-600 hover:bg-naro-100 hover:-translate-y-0.5"
                }`}
                onclick={() => handleClick(tab.value)}
              >
                {tab.label}
              </button>
            {/if}
          {/each}
        {/if}
      </div>
    </div>
  </div>

  <div
    class="w-full bg-white p-8 flex flex-col gap-10 shadow-4xl shadow-b-0 rounded relative overflow-auto"
  >
    <div class="bg-white rounded-md w-full overflow-auto flex flex-col gap-2">
      <div class="h-[431px]">
        <canvas id="chart" class="w-full" bind:this={canvas}></canvas>
      </div>
      <div class="flex flex-wrap gap-6 justify-center">
        {#each legends as legend, index (legend)}
          <button
            class={`flex items-center gap-1 font-medium text-sm cursor-default  ${
              datasetVisibility[index == 1 ? "Acceptable" : "High"]
                ? ""
                : "line-through decoration-2"
            }`}
            onclick={() => toggleDatasetVisibility(legend?.name)}
          >
            <i class="w-[24px] h-[4px] rounded-md bg-[{legend?.color}]"></i>
            {legend.label}
          </button>
        {/each}
      </div>
    </div>
  </div>
</div>
<div
  id="lineChart-tooltip"
  bind:this={tooltipElement}
  class="tooltip bg-white z-1 absolute shadow-3xl text-sm rounded text-start leading-none min-w-[129px] max-w-250px p-2"
  style="display:none;"
>
  <span class="flex items-center gap-1 font-medium text-naro-500 text-xs mb-2">
    <i
      class={`w-2 min-w-8px h-2 border-1 rounded-md ${
        tooltipData?.riskAssessment === "Acceptable"
          ? "bg-[#2C9F45]"
          : tooltipData?.riskAssessment === "High"
            ? "bg-[#BE0027]"
            : "bg-[#222222]"
      }`}
    ></i>
    <span class="font-bold text-[#222222]"
      >{tooltipData?.label || "Risk Assessment"}</span
    ></span
  >
  <ul class="flex-col gap-2 text-xs flex-wrap text-black">
    <li class="text-wrap px-1 mb-2">
      Income - {convertToUSD(tooltipData?.activeIncome) || "$0"}
    </li>
    <li class="text-wrap px-1">
      Balance - {convertToUSD(tooltipData?.availableBalance) || "$0"}
    </li>
  </ul>
</div>
