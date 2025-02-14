import type { Chart } from "chart.js";
import { months } from "./date-utils";
import type { HistoricalAccountInfo } from "$lib/types/report.types";

export const legends = [
    { label: "High(H)", color: "#BE0027", name: "High" },
    { label: "Acceptable(A)", color: "#2C9F45", name: "Acceptable" },
];
export const tabs = [
    { value: "7D", label: "7D" },
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "6M", label: "6M" },
    { value: "9M", label: "9M" },
    { value: "1Y", label: "1Y" }
];
export const hoverLine = {
    id: "hoverLine",
    afterDatasetsDraw(
        chart: Chart,
        args: any,
        options: any,
        cancelable: false
    ): void {
        const {
            ctx,
            tooltip,
            chartArea: { top, bottom, left, right, width, height },
            scales: { x, y },
        } = chart;
        const elements = tooltip?.getActiveElements();
        if (elements && elements.length && tooltip) {
            if (tooltip?.dataPoints[0]?.raw === 51 || isNaN(tooltip?.dataPoints[0]?.raw as number)) {
                chart.data.datasets[0].hoverBackgroundColor = "transparent";
            } else {
                chart.data.datasets[0].hoverBackgroundColor = "#0A84FF"

            }
            chart.update();
            const mouseX = tooltip.caretX;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#666666";
            ctx.setLineDash([5, 5]);
            ctx.moveTo(mouseX, top);
            ctx.lineTo(mouseX, bottom);
            ctx.stroke();
            ctx.closePath();
            ctx.setLineDash([]);
            ctx.restore();
        }
    },
};

export const chartLabelValue = (tabName: string) => {
    const currentDate = new Date();
    let startDate = new Date();
    let labels: string[] = [];
    let values: number[] = [];
    switch (tabName) {
        case "7D":
            const arr7D = [];
            startDate.setUTCDate(currentDate.getUTCDate() - 6);
            for (let i = 0; i <= 6; i++) {
                const date = new Date(currentDate);
                date.setUTCDate(currentDate.getUTCDate() - i);
                arr7D.push(date.toISOString().split('T')[0])
            }
            labels = arr7D;
            values = Array(labels?.length || 7).fill(NaN);
            break;
        case "1M":
            const arr1M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getUTCDate() - 1)) {
                arr1M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr1M;
            values = Array(labels?.length || 30).fill(NaN);
            break;
        case "3M":
            const arr3M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 3);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr3M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr3M;
            values = Array(labels?.length || 90).fill(NaN);
            break;
        case "6M":
            const arr6M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 6);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr6M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr6M;
            values = Array(labels?.length || 180).fill(NaN);
            break;
        case "9M":
            const arr9M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 9);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr9M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr9M;
            values = Array(labels?.length || 270).fill(NaN);
            break;
        case "1Y":
            const arr1Y = [];
            startDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr1Y.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr1Y;
            values = Array(labels?.length || 365).fill(NaN);
            break;
        default:
            startDate = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
            break;
    }
    labels = labels.reverse();
    values = values.reverse();
    return { labelArr: labels, valueArr: values, date: startDate }
}

export const getMinMax = (datasetVisibility: boolean[], high: number, moderate: number, low: number) => {
    let maxVal = high;
    let minVal = 0;
    if (
        datasetVisibility[4] &&
        !datasetVisibility[3] &&
        !datasetVisibility[2]
    ) {
        maxVal = high;
        minVal = moderate + 1;
    } else if (
        datasetVisibility[3] &&
        !datasetVisibility[2] &&
        !datasetVisibility[4]
    ) {
        maxVal = moderate;
        minVal = low + 1;
    } else if (
        datasetVisibility[2] &&
        !datasetVisibility[3] &&
        !datasetVisibility[4]
    ) {
        maxVal = low;
        minVal = 0;
    } else if (
        !datasetVisibility[2] &&
        datasetVisibility[3] &&
        datasetVisibility[4]
    ) {
        maxVal = high;
        minVal = low + 1;
    } else if (
        datasetVisibility[2] &&
        !datasetVisibility[3] &&
        datasetVisibility[4]
    ) {
        maxVal = high;
        minVal = 0;
    } else if (
        datasetVisibility[2] &&
        datasetVisibility[3] &&
        !datasetVisibility[4]
    ) {
        maxVal = moderate;
        minVal = 0;
    }



    return { maxVal, minVal }
}

export const getTooltipData = (
    historicalReportArr: HistoricalAccountInfo[],
    label: string
) => {
    const data = historicalReportArr.find((item: HistoricalAccountInfo) => {
        const [year, month, day] = item?.snapshotDate.split("T")[0]?.split("-");
        const reportLabel = `${months[+month - 1]} ${day.replace(
            /^0+/,
            ""
        )}, ${year}`;
        if (reportLabel === label) {
            return true;
        }
        return false;
    });
    return data;
};

export const determineTabVisibility = (historicalReportArr: HistoricalAccountInfo[]) => {
    const visibility = {
        "7D": false,
        "1M": false,
        "3M": false,
        "6M": false,
        "9M": false,
        "1Y": false,
    };

    if (historicalReportArr.length === 0) {
        return visibility;
    }

    const startDate = new Date(historicalReportArr[historicalReportArr.length - 1]?.snapshotDate);
    const currentDate = new Date();
    const diffInTime = currentDate.getTime() - startDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));

    if (diffInDays > 270) {
        visibility["1Y"] = true;
        visibility["9M"] = true;
        visibility["6M"] = true;
        visibility["3M"] = true;
        visibility["1M"] = true;
        visibility["7D"] = true;
    } else if (diffInDays > 180 && diffInDays <= 270) {
        visibility["9M"] = true;
        visibility["6M"] = true;
        visibility["3M"] = true;
        visibility["1M"] = true;
        visibility["7D"] = true;
    } else if (diffInDays > 90 && diffInDays <= 180) {
        visibility["6M"] = true;
        visibility["3M"] = true;
        visibility["1M"] = true;
        visibility["7D"] = true;
    } else if (diffInDays > 30 && diffInDays <= 90) {
        visibility["3M"] = true;
        visibility["1M"] = true;
        visibility["7D"] = true;
    } else if (diffInDays > 7 && diffInDays <= 30) {
        visibility["1M"] = true;
        visibility["7D"] = true;
    } else if (diffInDays >= 7) {
        visibility["7D"] = true;
    }
    return visibility;
};


export const removeDuplicates = (array: HistoricalAccountInfo[]): HistoricalAccountInfo[] => {
    const uniqueByDate = new Map<string, HistoricalAccountInfo>();

    array.forEach((item: HistoricalAccountInfo) => {
        const date = item?.snapshotDate.split('T')[0];
        const existingItem = uniqueByDate.get(date);

        if (!existingItem || new Date(item?.snapshotDate) > new Date(existingItem?.snapshotDate)) {
            uniqueByDate.set(date, item);
        }
    });

    return Array.from(uniqueByDate.values());
};