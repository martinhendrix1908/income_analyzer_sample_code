<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Chart from "chart.js/auto";
  import ChartDataLabels from "chartjs-plugin-datalabels";
  import type {
    ChartItem,
    TooltipData,
    MonthlyBreakdown,
    ChartDataset,
    IncomeEvent,
    CanvasBackgroundColorPlugin,
    BarAvatarPlugin,
    IncomeSourceProp,
  } from "$lib/types/report.types";
  import LeftScrollButton from "$lib/icons/LeftScrollButton.svelte";
  import RightScrollButton from "$lib/icons/RightScrollButton.svelte";
  import { convertToUSD } from "$lib/utils/currency-utils";
  import IncomeTrendsTooltip from "$lib/components/report/income-trends/IncomeTrendsTooltip.svelte";
  import {
    ChartLegendColors,
    IncomeTypes,
    Months,
    SeriesTypeToIndex,
  } from "$lib/constants";

  let {
    chartDatas,
    navMonth = $bindable(),
    navYear = $bindable(),
    yearDropdown,
    activeEvent = $bindable(),
    activeMonth = $bindable(),
    incomeSources,
  }: {
    chartDatas: MonthlyBreakdown[];
    navMonth: number;
    navYear: number;
    yearDropdown: number[];
    clickIndex: number;
    activeEvent: any;
    activeMonth: any;
    incomeSources: IncomeSourceProp[];
  } = $props();
  const months = Months.map((month) => month.slice(0, 3));
  let tootipDatas = $state<TooltipData[]>([]);
  let tooltipDate = $state<string>("");
  let chart = $state<any>();
  let uniqueMonths: string[] = [];
  let monthArrLength = $state<number>(0);
  let chartData = $state<ChartDataset[]>([]);
  let pointerX: number = -1;
  let pointerY: number = -1;
  let data: { labels: string[]; datasets: ChartDataset[] };

  let datasetVisibility = $state<boolean[]>([]);
  let isLeftEnd = $state<boolean>(false);
  let isRightEnd = $state<boolean>(true);

  const image = new Image();
  image.src = "/images/navigation.svg";

  const processChartData = () => {
    const uniqueMonthsSet = new Set<string>();

    // Step 1: Collect unique months and initialize chart data
    chartDatas?.forEach(({ month, year, series }) => {
      const newYear = year % 100;
      const monthName = `${months[month - 1]}-${newYear}`;
      uniqueMonthsSet.add(monthName);
    });

    let _uniqueMonths = [...uniqueMonthsSet];
    monthArrLength = _uniqueMonths.length;

    // Initialize chart data
    let _chartData = Object.entries(ChartLegendColors).map(([key, value]) => ({
      label: key,
      data: Array(monthArrLength + 1).fill(0),
      backgroundColor: value,
      borderWidth: 0,
      borderRadius: 5,
      barPercentage: 0.5,
      pointStyle: "circle",
      maxBarThickness: 40,
    }));

    // Step 2: Assign data to the datasets in the chart
    chartDatas?.forEach(({ month, year, series }) => {
      const monthsName = months[month - 1];
      const yearName = year % 100;
      const monthIndex = _uniqueMonths.indexOf(`${monthsName}-${yearName}`);

      series?.forEach(({ type, amount }) => {
        const dataIndex = SeriesTypeToIndex[type];
        _chartData[dataIndex].data[monthIndex] += amount;
      });
    });
    // Step 3: Update the data property with the updated chart data
    uniqueMonths = _uniqueMonths;
    chartData = _chartData;
    return { _chartData, _uniqueMonths };
  };

  const updateActiveMonthAndEvent = (type: string, month: number) => {
    activeEvent = IncomeTypes[type];
    activeMonth = month - 1;
  };
  const initializeChart = () => {
    const { _chartData, _uniqueMonths } = processChartData();
    data = {
      labels: _uniqueMonths,
      datasets: _chartData,
    };
    const CanvasBackgroundColor: CanvasBackgroundColorPlugin = {
      id: "CanvasBackgroundColor",
      beforeDraw: ({ config: { options }, ctx }) => {
        if (options.chartArea?.backgroundColor) {
          ctx.save();
          ctx.fillStyle = options.chartArea.backgroundColor;
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.restore();
        }
      },
    };
    const barAvatar: BarAvatarPlugin = {
      id: "barAvatar",
      afterDatasetDraw: ({ ctx }) => {
        ctx.save();
        ctx.drawImage(image, pointerX - 8, pointerY - 25);
      },
    };

    const config = {
      type: "bar",
      data,
      options: {
        onClick: function (event: any, elements: any) {
          if (elements.length > 0) {
            var clickedIndex = elements[0].index;
            var clickedLabel = chart.data.labels[clickedIndex];
            const month = clickedLabel.split("-")[0];
            navMonth = months.indexOf(month);
            const twoDigitYear = clickedLabel?.split("-")[1];
            navYear =
              yearDropdown?.find((item) => {
                const yearString = "" + item;
                return yearString.endsWith(twoDigitYear);
              }) ?? 0;
            if (
              pointerX === elements[0].element.height &&
              pointerY === elements[0].element.y
            ) {
              return;
            }
            pointerX = elements[0].element.height;
            pointerY = elements[0].element.y;
            chart.update();
            updateNavigatorPosition(navMonth, navYear);
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 50 } }, // Adjust the top padding value as needed
        scales: {
          x: {
            min: 0,
            max: 5,
            stacked: true,
            grid: { color: "#fafff0" },
            border: { display: false },
            ticks: { color: "#222222" },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: "#f3f3f3" },
            border: { display: false },
            ticks: {
              color: "#222222",
              callback: (value: number) => "$" + value, // Format the y-axis ticks with a dollar sign
            },
            min: 0,
          },
        },
        chartArea: { backgroundColor: "#FFFFFF" },
        plugins: {
          datalabels: {
            anchor: "end",
            align: "top",
            color: "#222222",
            formatter: (
              value: number,
              context: {
                chart: { data: { datasets: ChartDataset[] } };
                dataIndex: number;
                datasetIndex: number;
              }
            ) => {
              const dataSetArray = context.chart.data.datasets
                .filter((dataset) => {
                  return (
                    dataset.data[context.dataIndex] !== undefined &&
                    !dataset.hidden
                  );
                })
                .map((dataset) => dataset.data[context.dataIndex]);

              function totalSum(total: number, datapoint: number) {
                return total + datapoint;
              }

              let sum = dataSetArray.reduce(totalSum, 0);

              if (context.datasetIndex === 5) {
                return convertToUSD(sum);
              } else {
                return "";
              }
            },
            clip: true,
          },
          legend: {
            position: "bottom",
            display: false,
            labels: {
              borderColor: "transparent",
              boxWidth: 10,
              boxHeight: 10, // Set a custom legend height
              useBorderRadius: true,
              borderRadius: 5,
              borderWidth: 0,
            },
          },
          tooltip: {
            // Disable the on-canvas tooltip
            enabled: false,
            position: "nearest",
            external: customTooltip,
          },
        },
      },
      plugins: [barAvatar, ChartDataLabels, CanvasBackgroundColor],
    };
    const chartElement = document.getElementById("chart");

    if (chartElement) {
      chart = new Chart(chartElement as ChartItem, config as any);
      //scroll the chart to the end
      chart.options.scales.x.min = _chartData[0].data.length - 7;
      chart.options.scales.x.max = _chartData[0].data.length + 0;
      isLeftEnd = chart.options.scales.x.min <= 0;
      isRightEnd = chart.options.scales.x.max >= _chartData[0].data.length;
      chart.update();
    } else {
      console.error("Could not find the chart element with ID 'chart'");
    }
    datasetVisibility = chart.data.datasets.map(() => true);
  };

  const onScrollButtonClick = (direction: string) => {
    if (direction === "left") {
      if (isLeftEnd) return;
      chart.options.scales.x.min -= 2;
      chart.options.scales.x.max -= 2;
      if (chart.options.scales.x.min <= 0) {
        chart.options.scales.x.min = 0;
        chart.options.scales.x.max = 5;
        isLeftEnd = true;
      }
      isRightEnd = false;
    } else if (direction === "right") {
      if (isRightEnd) return;
      chart.options.scales.x.min += 2;
      chart.options.scales.x.max += 2;
      if (chart.options.scales.x.max >= chartData[0].data.length) {
        chart.options.scales.x.min = chartData[0].data.length - 5;
        chart.options.scales.x.max = chartData[0].data.length;
        isRightEnd = true;
      }
      isLeftEnd = false;
    }
    chart.update();
    updateNavigatorPosition(navMonth, navYear);
  };

  //updates the position of navigator above the bar of chart
  const updateNavigatorPosition = (selectedMonth: number, navYear: number) => {
    if (selectedMonth === null) return;
    const newYear = navYear % 100;
    const monthName = months[selectedMonth] + "-" + newYear;
    const monthIndex = uniqueMonths.indexOf(monthName);
    if (!chart || monthIndex < 0) return;
    const totalHeight = chart.data.datasets.reduce(
      (sum: number, dataset: ChartDataset) => {
        if (!dataset.hidden) {
          return sum + dataset.data[monthIndex];
        }
        return sum;
      },
      0
    ); //calculate the total height of selected bar
    const xScale = chart.scales["x"];
    const yScale = chart.scales["y"];
    pointerX = xScale.getPixelForValue(monthIndex);
    pointerY = yScale.getPixelForValue(totalHeight);
    chart.update(); // Update the chart to reflect the changes
  };

  const setTooltipData = (date: string, type: string) => {
    tooltipDate = date;
    const month = date.split("-")[0];
    const monthIndex = months.indexOf(month) + 1;
    updateActiveMonthAndEvent(type, monthIndex);
    const year = date.split("-")[1];

    const foundData = chartDatas.find(
      (item) => item.month === monthIndex && item.year % 100 === +year
    );

    const data = foundData ? foundData.incomeEvents : [];
    const finalData = data.filter((item: IncomeEvent) => {
      if (type === "Transfers/Deposits") {
        return item.amount !== 0 && (item.type == "3" || item.type == "4");
      }
      return item.amount !== 0 && item.type === IncomeTypes[type];
    });
    const result: IncomeEvent[] = finalData.reduce(
      (acc: IncomeEvent[], obj: IncomeEvent) => {
        const existingObject = acc.find(
          (item) => item.sourceID === obj.sourceID
        );

        if (existingObject) {
          // If the object already exists, add the amount to it
          existingObject.amount += obj.amount;
        } else {
          // If the object doesn't exist, push a new object to the accumulator
          acc.push({
            type: obj.type,
            sourceID: obj.sourceID,
            amount: obj.amount,
            date: obj.date,
          });
        }

        return acc;
      },
      []
    );
    result.sort((a, b) => b.amount - a.amount);
    return result as TooltipData[];
  };

  const customTooltip = (context: any) => {
    const tooltipDiv = document.getElementById("custom-tooltip");
    if (tooltipDiv) {
      const tooltipModel = context.tooltip;
      tootipDatas = setTooltipData(
        tooltipModel?.title[0],
        tooltipModel?.dataPoints[0]?.dataset.label
      );
      if (!tooltipModel.opacity) {
        tooltipDiv.style.display = "none";
        return;
      }
      const chartCanvas = document.getElementById("chart");
      if (chartCanvas) {
        const chartPosition = chartCanvas.getBoundingClientRect();
        const left =
          tooltipModel.caretX + chartPosition.left + window.pageXOffset + 30;
        const top =
          tooltipModel.caretY + chartPosition.top + window.pageYOffset;

        tooltipDiv.style.left = left + "px";
        tooltipDiv.style.top = top + "px";
        tooltipDiv.style.display = "block";
      }
    }
  };
  const toggleDatasetVisibility = (datasetIndex: number) => {
    datasetVisibility[datasetIndex] = !datasetVisibility[datasetIndex];
    chart.data.datasets[datasetIndex].hidden = !datasetVisibility[datasetIndex];
    chart.update();
    updateNavigatorPosition(navMonth, navYear);
  };
  $effect(() => {
    updateNavigatorPosition(navMonth, navYear);
  });
  onMount(() => {
    initializeChart();
  });
  onDestroy(() => {
    if (chart) {
      chart.destroy();
    }
  });
</script>

<div
  role="figure"
  class="bg-white px-4 pb-4 rounded-md w-full overflow-auto flex flex-col gap-2"
  onmouseenter={() => updateActiveMonthAndEvent("null", navMonth)}
  onmouseleave={() => updateActiveMonthAndEvent("null", navMonth)}
>
  <div>
    <canvas
      id="chart"
      bind:this={chart}
      class="w-full"
      onmouseleave={() => updateActiveMonthAndEvent("null", navMonth)}
    >
    </canvas>
  </div>
  <div class="flex flex-wrap gap-6 justify-center">
    <div
      class={`flex gap-2 items-center justify-center ${
        monthArrLength > 6 ? "" : "hidden"
      }`}
    >
      <button
        onclick={() => onScrollButtonClick("left")}
        id="left-button"
        class={`py-1.5 px-2 bg-gray-200 rounded border border-solid border-gray-800 ${
          isLeftEnd ? "opacity-50" : ""
        }`}
      >
        <LeftScrollButton />
      </button>
      <button
        onclick={() => onScrollButtonClick("right")}
        id="right-button"
        class={`py-1.5 px-2 bg-gray-200 rounded border border-solid border-gray-800 ${
          isRightEnd ? "opacity-50" : ""
        }`}
      >
        <RightScrollButton />
      </button>
    </div>
    {#if chart}
      {#each chart?.data?.datasets as item, index}
        {#if item.label !== "Loan"}
          <button
            class="flex items-center gap-1 font-medium text-sm cursor-default {datasetVisibility[
              index
            ]
              ? ''
              : 'line-through decoration-2'}"
            onclick={() => toggleDatasetVisibility(index)}
          >
            <i
              class="w-[10px] h-[10px] rounded-md"
              style={`background-color: ${item.backgroundColor};`}
            ></i>{item.label}
          </button>
        {/if}
      {/each}
    {/if}
  </div>
</div>

<!-- Chart tooltip  -->
<IncomeTrendsTooltip
  title={tooltipDate}
  {tootipDatas}
  {incomeSources}
  fromChart={true}
/>
