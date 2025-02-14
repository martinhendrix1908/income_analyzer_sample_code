export type LineChartDetailsProps = {
  values: number[];
  labels: string[];
  backgroundColor: string;
  borderColor: string;
};

export type PlanOptions = {
  title: string;
  pricePerCustomer: number;
  renewalRate: number;
  description: string;
  features: string[];
  isCurrentPlan: boolean;
  buttonStyle: string;
  isBestPlan: boolean;
  isRecommended?: boolean;
}

export type BillingResponse = {
  succeeded: boolean;
  message: string;
  data: IBillingDetails;
};

export type IBillingDetails = {
  month: number;
  year: number;
  customerIncomeDetails: CustomerIncomeDetails;
  unitCustomerDetails: UnitCustomerDetails[];
  customerChartDetails: CustomerChartDetails[];
};

export type CustomerIncomeDetails = {
  totalNew: number;
  totalNewDelta: number;
  newPrice: number;
  totalActive: number;
  totalActiveDelta: number;
  activePrice: number;
  totalDisconnected: number;
  totalDisconnectedDelta: number;
  disconnectedPrice: number;
  totalRefreshes: number;
  totalRefreshesDelta: number;
  refreshesPrice: number;
};

export type UnitCustomerDetails = {
  unitId: number;
  unitName: string;
  totalNew: number;
  totalActive: number;
  totalDisconnected: number;
  totalRefreshes: number;
  totalPrice: number;
};

export type CustomerChartDetails = {
  day: number;
  totalNew: number;
  totalActive: number;
  totalDisconnected: number;
};
