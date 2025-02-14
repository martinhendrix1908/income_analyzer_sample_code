import type { IBillingDetails, PlanOptions } from "$lib/types/billing.types";
import type { ChartData } from "chart.js";

// Chart datasets for each card when no data is available
export const datasets: ChartData<"line" | "doughnut">[] = [
  {
    labels:Array.from({ length: 30 }, (_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "New Customers",
        data: Array(30).fill(0),
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        fill: true,
        backgroundColor: "#3A9A6E33",
        borderColor: "#09814A",
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  },
  {
    labels:Array.from({ length: 30 }, (_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Active Customers",
        data: Array(30).fill(0),
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        fill: true,
        backgroundColor: "rgba(155, 89, 182, 0.2)",
        borderColor: "rgb(155, 89, 182)",
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  },
  {
    labels:Array.from({ length: 30 }, (_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Disconnects",
        data: Array(30).fill(0),
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        fill: true,
        backgroundColor: "#BE002733",
        borderColor: "#BE0027",
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  },
  {
    labels: ["No Data"],
    datasets: [
      {
        data: [1],
        backgroundColor: ["#d3d3d3"],
        hoverOffset: 0,
        borderWidth: 0,
      },
    ],
  }
];


export const pricingPlans: PlanOptions[] = [
  {
    title: "Starter",
    pricePerCustomer: 1.50,
    renewalRate: 0.20,
    description: "A cost-effective plan for small businesses. Bring your own IBV to get started.",
    features: [
      "Up to 10 Units",
      "Up to 5000 API calls per month",
      "Requires users to provide their own IBV data from BankIDs",
      "Enhanced support during business hours",
    ],
    isCurrentPlan: true,
    buttonStyle: "primary", // Indicate it's the active plan
    isBestPlan: false,
  },
  {
    title: "Pro",
    pricePerCustomer: 1.99,
    renewalRate: 0.30,
    description:
      "Includes advanced features like risk alerts and a lending guide to help you scale.",
    features: [
      "Up to 30 Units",
      "Up to 20,000 API calls per month",
      "Customer Risk Assessment",
      "Alerts & Insights",
      "Lending guide with suggestions",
      "Priority email support",
    ],
    isCurrentPlan: false,
    buttonStyle: "default",
    isRecommended: true,
    isBestPlan: false,
  },
  {
    title: "Pro + IBV",
    pricePerCustomer: 2.99,
    renewalRate: 0.50,
    description:
      "Combines Pro features with IBV tools for seamless financial data integration.",
    features: [
      "All Pro features",
      "Up to 40,000 API calls per month",
      "Bankruptcy & IBV with other Advanced Features",
      "Premium support with a dedicated account manager",
    ],
    isCurrentPlan: false,
    buttonStyle: "default",
    isBestPlan: false,
  },
  {
    title: "Pro + LMS + IBV",
    pricePerCustomer: 3.99,
    renewalRate: 0.75,
    description:
      "A complete solution with forms, Loan Management, IBV, and advanced analytics.",
    features: [
      "All Pro + IBV features",
      "Unlimited Units",
      "Unlimited API calls per month",
      "Integrated Smart Analytics System Lending guide",
      "Premium support with a dedicated account manager",
    ],
    isCurrentPlan: false,
    buttonStyle: "default",
    isBestPlan: true,
  },
];

export const createMonthlyData = (
  plan: PlanOptions,
  numberOfCustomers: number,
  numberOfMonths: number
) => {
  if (!plan || typeof numberOfCustomers !== "number" || typeof numberOfMonths !== "number") {
    throw new Error("Invalid inputs: plan, number of customers, or number of months provided.");
  }

  const monthlyData = [];

  for (let i = 1; i <= numberOfMonths; i++) {
    if (i === 1) {
      monthlyData.push({
        month: `Month ${i}`,
        newCustomers: {
          label: "New Customers",
          value: plan.pricePerCustomer,
          multiplier: numberOfCustomers,
          total: plan.pricePerCustomer * numberOfCustomers,
        },
        total: plan.pricePerCustomer * numberOfCustomers,
      });
    } else {
      monthlyData.push({
        month: `Month ${i}`,
        newCustomers: {
          label: "New Customers",
          value: plan.pricePerCustomer,
          multiplier: numberOfCustomers,
          total: plan.pricePerCustomer * numberOfCustomers,
        },
        activeCustomers: {
          label: "Active Customers",
          value: plan.renewalRate,
          multiplier: numberOfCustomers,
          total: plan.renewalRate * numberOfCustomers,
        },
        total:
          plan.pricePerCustomer * numberOfCustomers +
          plan.renewalRate * numberOfCustomers,
      });
    }
  }
  return monthlyData;
};

export function processCustomerDataForChart(
  billingDetails: IBillingDetails,

): ChartData<"line" | "doughnut">[] {
  if (!billingDetails?.customerChartDetails) {
    return datasets;
  }

  const customerChartDetails = billingDetails?.customerChartDetails;
  const totalNewCustomersArr = customerChartDetails?.map(item => item.totalNew);
  const totalActiveCustomersArr = customerChartDetails?.map(item => item.totalActive);
  const totalDisconnectedCustomersArr = customerChartDetails?.map(item => item.totalDisconnected);

  const totalNewCustomers = totalNewCustomersArr?.reduce((sum, item) => sum + item, 0) || 0;
  const totalActiveCustomers = totalActiveCustomersArr?.reduce((sum, item) => sum + item, 0) || 0;

  // Define colors
  const newCustomersColorForRefresh = "#09814A";
  const activeCustomersColorForRefresh = "#98C43D";

  const newCustomersColor = { background: "#3A9A6E33", border: "#09814A" };
  const activeCustomersColor = { background: "rgba(155, 89, 182, 0.2)", border: "rgb(155, 89, 182)" };
  const disconnectsColor = { background: "#BE002733", border: "#BE0027" };

  const datasetsArray: ChartData<"line" | "doughnut">[] = [
    {
      labels: customerChartDetails?.map(item => `Day ${item.day}`),
      datasets: [
        {
          label: "New Customers",
          data: totalNewCustomersArr,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          fill: true,
          backgroundColor: newCustomersColor?.background,
          borderColor: newCustomersColor?.border,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    {
      labels: customerChartDetails?.map(item => `Day ${item.day}`),
      datasets: [
        {
          label: "Active Customers",
          data: totalActiveCustomersArr,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          fill: true,
          backgroundColor: activeCustomersColor?.background,
          borderColor: activeCustomersColor?.border,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    {
      labels: customerChartDetails?.map(item => `Day ${item.day}`),
      datasets: [
        {
          label: "Disconnects",
          data: totalDisconnectedCustomersArr,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          fill: true,
          backgroundColor: disconnectsColor?.background,
          borderColor: disconnectsColor?.border,
          borderWidth: 2,
          tension: 0.2,
        },
      ],
    },
    {
      labels: ["New", "Active"],
      datasets: [
        {
          data: [totalNewCustomers, totalActiveCustomers],
          backgroundColor: [newCustomersColorForRefresh, activeCustomersColorForRefresh],
          hoverOffset: 0,
          borderWidth: 0,
        },
      ],
    }
  ];

  return datasetsArray;
}

export const createCardData = (billingDetails: IBillingDetails) => {
  const { customerChartDetails, customerIncomeDetails } = billingDetails;

  const totalNewCustomers = customerChartDetails?.reduce((sum, item) => sum + item.totalNew, 0);
  const totalActiveCustomers = customerChartDetails?.reduce((sum, item) => sum + item.totalActive, 0);
  const totalDisConnectedCustomers = customerChartDetails?.reduce((sum, item) => sum + item.totalDisconnected, 0);
  return [
    {
      title: "New Customers",
      value: totalNewCustomers,
      comparedValue: customerIncomeDetails?.totalNewDelta,
      comparedTrend: customerIncomeDetails?.newPrice, //Compare to last month
      trendIcon: customerIncomeDetails?.totalNewDelta >= 0 ? "up" : "down",
      billing: `${customerIncomeDetails?.newPrice}`,
      chartType: "line",
      footerText: "Billing for the New Connections :",
    },
    {
      title: "Active Customers",
      value: totalActiveCustomers,
      comparedValue: customerIncomeDetails?.totalActiveDelta,
      comparedTrend: customerIncomeDetails?.activePrice, //Compare to last month
      trendIcon: customerIncomeDetails?.totalActiveDelta >= 0 ? "up" : "down",
      billing: `${customerIncomeDetails?.activePrice}`,
      chartType: "line",
      footerText: "Billing for the New Connections :",
    },
    {
      title: "Disconnects",
      value: totalDisConnectedCustomers,
      comparedValue: customerIncomeDetails?.totalDisconnectedDelta,
      comparedTrend: customerIncomeDetails?.disconnectedPrice, //Compare to last month
      trendIcon: customerIncomeDetails?.totalDisconnectedDelta >= 0 ? "up" : "down",
      billing: `${customerIncomeDetails?.disconnectedPrice}`,
      chartType: "line",
      footerText: "Billing for the New Connections :",
    },
    {
      title: "Number of Refreshes",
      value: customerIncomeDetails?.totalRefreshes,
      comparedValue: customerIncomeDetails?.totalRefreshesDelta,
      comparedTrend: customerIncomeDetails?.refreshesPrice, //Compare to last month
      trendIcon: customerIncomeDetails?.totalRefreshesDelta >= 0 ? "up" : "down",
      billing: `${customerIncomeDetails?.refreshesPrice}`,
      chartType: "doughnut",
      footerText: "Billing for the Refreshes this Month :",
    },
  ];
};