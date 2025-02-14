import type { Chart } from "chart.js";

export type IncomeAnalyzerData = {
    requestId: string;
    availableProducts: string[];
    processingResult: ProcessingResult;
    historicalReports: HistoricalReport[];
    errors: string[];
    application?: ApplicationData;
    ibvStatusInfo: IBVStatusInfo;
};

export type ProcessingResult = {
    product: string;
    extOptions: ExtensionOptions;
    status: string;
    productProcessingResult: ProductProcessingResult;
    message?: string;
    statusDescription: string;
};

export type HistoricalReport = {
    requestId: string;
    updated: string;
    snapshotDate: string;
    status: string;
    additionalInfo: {
        accounts: {
            accountGuid: string;
            isPrimary: boolean;
            activeMonthlyIncome: number;
            riskScore: number;
            minLoan: number;
            maxLoan: number;
            availableBalance: number;
        }[];
    };
    unitName: string;
    refreshedBy: string;
}

export type IBVStatusInfo = {
    ibvStatus: string;
    unsubscribedOn: string;
    lastRequestId: string;
    requestCodeStatus: string;
    refreshedOn: string;
    subscribedOn: string;
}

export interface ProductProcessingResult {
    id: string;
    sourceType: string;
    metadata: Metadata;
    customerInfo: CustomerInfo;
    accounts: Account[];
    posResponse: PosResponse | null;
    modelVersion: string;
}

export type ExtensionOptions = {
    averageIncomeThreshold: number;
    riskZoneScore: {
        threshold1: number;
        threshold2: number;
    },
    extZoneScore: {
        threshold1: number;
        threshold2: number;
    },
    lendingGuideThresholdPercentage: {
        minLoanAmount: number;
        maxLoanAmount: number;
    },
    postOnboardingThreshold: {   //missing in the response
        threshold1: number;
        threshold2: number;
    },
};

export interface Metadata {
    lastUpdated: string;
    requestCode: string;
    asOfDate: string;
    snapshotDate: string;
}

export interface ApplicationData {
    PreAppID: number;
    TransactionType: string;
    IPAddress: string;
    PreviousCust: string;
    PdLoanrcvdfrom: string;
    MktCodes: string;
    Universal_LeadiD: string;
    RateType: string;
    UserId: string;
    Password: string;
    CustSSN: string;
    CustFName: string;
    CustLName: string;
    CustDOB: string;
    CustAdd1: string;
    CustAdd2: string;
    CustState: string;
    CustCity: string;
    CustCountry: string;
    CustZip: string;
    CustDLState: string;
    CustDLNo: string;
    HomeStatus: string;
    IdType: string;
    PrefLang: string;
    YrsAtCurrAdd: string;
    MnthsAtCurrAdd: string;
    CustHomePhone: string;
    CustMobilePhone: string;
    CustWorkPhone: string;
    CustWorkPhoneExt: string;
    CustEmail: string;
    RefFName: string;
    RefLName: string;
    RefMobilePhone: string;
    RefRelation: string;
    RefFName2: string;
    RefLName2: string;
    RefMobilePhone2: string;
    RefRelation2: string;
    PayBankruptcy: string;
    TypeOfIncome: string;
    TypeOfPayroll: string;
    EmpType: string;
    EmpField: string;
    EmpName: string;
    EmpAdd1: string;
    EmpAdd2: string;
    EmpState: string;
    EmpCity: string;
    EmpZip: string;
    EmpPhone: string;
    EmpPhoneExt: string;
    ContactName: string;
    JobTitle: string;
    Periodicity: string;
    MonthlyIncome: string | number;
    AvgSalary: string;
    NextPayDate: string;
    SecondPayDate: string;
    BenefitStartDate: string;
    LoanType: string;
    BankTransit: string;
    InstitutionNumber: string;
    CustBankName: string;
    CustAcctNo: string;
    CustAcctType: string;
    CustDebitCard: string;
    CardExpDate: string;
    CardCVV: string;
    RequestedAmount: number;
    IsMilitary: string;
    CustomField1: string;
    CustomField2: string;
    CustomField3: string;
    Price: string;
    AppGuid: string;
    Status: string;
    WinPrice: string;
    ConflictTier: string;
    AffiliateID: string;
    AccountNumber: number | string;
    DateMovedAddr: string;
}

export interface CustomerInfo {
    names: string[];
    contact: IContact;
    recommendedBankAccount: string;
    riskAnalysisCustomer: RiskAnalysisCustomer;
    assessmentReasonsCustomer: any[];
    lendingGuideCustomer: LendingGuideCustomer;
    employerValidation: EmployerValidation;
}

export interface IContact {
    email: string;
    phone: string;
    address: string;
}

export interface RiskAnalysisCustomer {
    riskBehavior: string;
    riskScore: number;
}

export interface LendingGuideCustomer {
    customerIncomeType: string;
    debitDate: string;
    debitFrequency: string;
    maxDebitAmount: number;
    maxLoanAmount: number;
    minDebitAmount: number;
    minLoanAmount: number;
    nextPaymentOnHoliday: string;
    paymentNearHoliday: string;
    repeatOpportunity: string;
}

export interface EmployerValidation {
    employerName: string;
}

export interface Account {
    accountGuid: string;
    primaryIncomeAccount: boolean;
    currentBalance: null | number;
    availableBalance: null | number;
    banking: Banking;
    lendingGuide: LendingGuideCustomer;
    activeIncome: ActiveIncome;
    monthlyIncome: MonthlyIncome;
    allTime: TimePeriodData;
    threeMonth: TimePeriodData;
    sixMonth: TimePeriodData;
    incomeSources: IncomeSource[];
    loanSources: LoanSource[];
    overdraftIncidents: any[];
    cashFlow: CashFlow;
    inflowExcludingLoans: number;
    assessmentReasons: any[];
    riskAnalysis: RiskAnalysis;
    incomeBreakdown: IncomeBreakdown;
    predictedPaydays: PredictedPayday[];
    transactionsRange: TransactionsRange;
    transactions: Transaction[];
}

export interface PosResponse {
    alerts: {
        IncomeAvalability: string[];
        IncomeQuality: any[];
        NewIncomeSources: any[];
        debitCard: any[];
    };
    incomeChange: {
        dominantIncomeChanges: {
            accountGuid: string;
            dominantIncomeChange: string;
        }[];
        incomeAvailability: {
            accountGuid: string;
            expectedPayday: string | null;
            incomeAmountDrop: string;
            incomeNotShowing: string;
            incomeNotShowingOnPredPayday: string;
            monthlyIncome: number;
            sourceID: string;
            sourceName: string;
        }[];
        newSources: any[];
        reappearedIncome: any[];
    };
    loanChange: {
        newLoanOrig: any[];
        newLoanPayments: any[];
        newSources: {
            accountGuid: string;
            debitType: string;
            errorCode: number;
            errorMessage: string;
            frequency: string;
            interestRate: number;
            lastPayDay: string | null;
            loanType: string;
            numOfOrigination: number;
            numOfPay: number;
            originationAmount: number;
            paymentAmount: number;
            regularPayDay: string | null;
            sourceID: string;
            sourceName: string;
        }[];
    };
    riskScore: number;
    summaryInfo: {
        runError: number;
        runMsg: string;
    }[];
    summaryInfoChange: {
        newAccounts: any[];
        newDebitCards: {
            accountID: string;
            newDebitCards: any[];
        }[];
    };
    version: string;
}

export interface Banking {
    accountNumber: string;
    routingNumber: string;
    debitCard: string;
    card: any[];
    ibv: string;
    accountType: string;
    bankName: string;
}

export interface ActiveIncome {
    activePayrollIncome: number;
    activePayrollIncomeSources: number;
    activeBenefitIncome: number;
    activeBenefitIncomeSources: number;
}

export interface MonthlyIncome {
    activeMonthlyIncome: number;
    recurringMonthlyIncome: number;
    stableMonthlyIncome: number;
}

export interface TimePeriodData {
    avgMonthlyBalance: number;
    overdraftIncidents: number;
    avgMonthlyIncome: number;
    numIncomeSources: number;
    numMonthsIncomeHistory: number;
    amountPaidInLoans: number;
    numLoans: number;
    cashflow: number;
}

export interface IncomeSource {
    activeScore: number;
    depositMethod: string;
    frequency: string;
    pastDeposits: string[];
    incomeType: string;
    lastPayday: string;
    missingPayDay: any[];
    estimatedMonthlyIncome: number;
    numOfPay: number;
    numOfPayMonthly: number;
    perPayCheck: number;
    recurringScore: number;
    regularPayDay: string;
    sameDayFreq: number;
    sourceChannel: string;
    sourceID: string;
    incomeSource: string;
    sourceType: string;
    stabilityScore: number;
    stableMonthlyIncome: number;
    isDominant: number;
    nextPayDay: string;
    paymentNearHoliday: string;
    nextPayDayOnHoliday: string;
    errorCode: number;
    errorMessage: string;
    totalAmount: number;
    transactionsCount: number;
    // ------Below are not in response added to support logic
    shades?: Shades;
    sortedDates?: any;
    mostFrequentDay?: string;
    groupedDates?: string[][];
}

export type Shades = {
    [key: string | number]: string;
}

export interface LoanSource {
    sourceID: string;
    lenderName: string;
    numOfOrigination: number;
    numOfPay: number;
    frequency: string;
    amountObserved: number;
    monthlyPayment: number;
    interestRate: number;
    schedule: string;
    latestTransaction: string;
    loanType: string;
    debitType: string;
    errorCode: number;
    errorMessage: string;
}

export interface CashFlow {
    totalCredits: number;
    totalDebits: number;
    netCashFlow: number;
    spending: number;
}

export interface RiskAnalysis {
    riskBehavior: string;
    riskScore: number;
}

export interface IncomeBreakdown {
    highestMonthlyIncome: number;
    highestMonthlyIncomeDate: string;
    lowestMonthlyIncome: number;
    lowestMonthlyIncomeDate: string;
    monthlyBreakdown: MonthlyBreakdown[];
}

export interface MonthlyBreakdown {
    month: number;
    year: number;
    incomeEvents: IncomeEvent[];
    overview: Overview;
    series: Series[];
}

export interface IncomeEvent {
    type: string;
    date: string;
    amount: number;
    sourceID: string;
}

export interface Overview {
    totalIncome: number;
    totalIncomeDelta: number;
    primarySource: string;
    totalTransactions: number;
    latestCredit: string;
    cashFlow: number;
    cashFlowDelta: number;
    totalSpending: number;
    endingBalance: number;
}

export interface Series {
    type: string;
    amount: number;
    amountDelta: number;
    mainSource: string;
    transactionsCount: number;
}

export interface PredictedPayday {
    incomeType: string;
    incomeSource: string;
    incomePredictedPaydays: PredictedPaydayDetail[];
}

export interface PredictedPaydayDetail {
    date: string;
    day: string;
    amount: number;
}

export interface TransactionsRange {
    start: string;
    end: string;
}

export interface Transaction {
    date: string;
    day: string;
    incomeType: string;
    description: string;
    depositType: string;
    amount: number;
    sourceID: string;
    transactionType: string;
    ibvCategory: string;
}

// export type AdditionalInfo = {
//     alertsAndInsightsCustomer: {
//         alerts: string[];
//         insights: string[];
//         assessmentReasons: string[];
//     }[];
//     recommendedBankAccount: string;
//     redZoneBehaviorCustomer: {
//         riskBehavior: string,
//         riskScore: number;
//     }[];
// }

//------------Additional types added to support logic------------
export interface HistoricalAccountInfo {
    accountGuid: string;
    isPrimary: boolean;
    activeMonthlyIncome: number;
    // riskAssessment: number;
    // riskAssessmentText: string;
    riskScore: number;
    // extendedScoresAccountValue: number;
    minLoan: number;
    maxLoan: number;
    availableBalance: number;
    unitName: string;
    requestId: string;
    updated: string;
    refreshedBy: string;
    snapshotDate: string;
    riskAssessmentData?: string | null;
    status: string;
}

export type CheckboxProp = {
    name: string;
    checked: boolean;
}

export type FilteredPaydays = {
    date: string;
    day: string;
    incomeType: string;
    incomeSource: string;
    amount: number;
}

export type IncomeSourceProp = {
    sourceID: string;
    sourceName: string;
    incomeType: string;
    type: string;
}

export type TooltipData = {
    type: string;
    sourceID: string;
    amount: number;
}

export type ChartDataset = {
    label: string;
    data: number[];
    backgroundColor: string;
    borderWidth: number;
    borderRadius: number;
    barPercentage: number;
    pointStyle: string;
    maxBarThickness: number;
    hidden?: boolean;
}

export declare type ChartItem =
    | string
    | CanvasRenderingContext2D
    | HTMLCanvasElement
    | { canvas: HTMLCanvasElement }
    | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>;

export interface DetailsTopBanner {
    heading: string;
    details: {
        label: string;
        value: string;
        isVisible?: boolean;
    }[];
}


export type RefreshResponse = {
    type: 'success' | 'failure' | 'redirect';
    status: number;
    errorCode: number;
    errorTitle: string;
    location?: string;
    data?: {
        errorUploading?: boolean;
        errorMessage?: string;
        [key: string]: any;
    };
}

export type TransactionDropDownNames = {
    transactionTypeName: string;
    monthName: string;
    depositDayName: string;
    depositTypeName: string;
    incomeTypeName: string;
    incomeSourceName: string;
}

export type TransactionDropDowns = {
    transactionDropdown: boolean;
    monthDropdown: boolean;
    depositDayDropdown: boolean;
    depositTypeDropdown: boolean;
    incomeTypeDropdown: boolean;
    incomeSourceDropdown: boolean;
}

export type TransactionDropDown = {
    label: string;
    selectedName: string;
    isOpen: boolean;
    items: Array<{ name: string; checked: boolean }>;
    handleButtonClick: () => void;
    handleCheckboxChange: (
        event: Event,
        index: number,
        category: Array<{ name: string; checked: boolean }>,
        categoryName: string
    ) => void;
    checkOnlyOne: (
        event: Event,
        index: number,
        category: Array<{ name: string; checked: boolean }>,
        categoryName: string
    ) => void;
    getSelectedCheckboxNames: (
        category: Array<{ name: string; checked: boolean }>,
        categoryName: string
    ) => void;
    convertIncomeType: (type: any, toConvertBack?: boolean) => any;
    category: Array<{ name: string; checked: boolean }>;
    categoryName: string;
    checkOnlyOneCategory: string;
    ariaLabelledBy: string;
    visibility: boolean;
    incomeSources: IncomeSourceProp[];
}

//chart 
export type CanvasBackgroundColorPlugin = {
    id: string;
    beforeDraw: (context: any, options: any) => void;
};
export interface BarAvatarPlugin {
    id: string;
    beforeDatasetDraw?: (args: {
        ctx: CanvasRenderingContext2D;
        chart: Chart;
    }) => void;
    afterDatasetDraw?: (args: {
        ctx: CanvasRenderingContext2D;
        chart: Chart;
    }) => void;
}

export type ChartProp = {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    tension: number;
    backgroundColor?: string[];
    pointBackgroundColor?: string;
    pointHoverBackgroundColor?: string;
    pointBorderColor: string;
    pointHoverRadius?: number;
    pointHoverBorderWidth?: number;
    pointRadius?: number;
    fill?: {
        target: string;
        below: string;
    };
    borderDash?: number[];
}

export type DatasetVisibility = {
    High: boolean;
    Acceptable: boolean;
}

export type TabVisibility = {
    "7D": boolean;
    "1M": boolean;
    "3M": boolean;
    "6M": boolean;
    "9M": boolean;
    "1Y": boolean;
}

//Assessment zones
export interface IZoneStyleType {
    bgColor: string;
    textColor: string;
    borderColor: string;
}

export type IZones = "HIGH" | "ACCEPTABLE" | "SUPER_GREEN" | "MODERATE";

export type AccountDetails = {
    dataField: string;
    applicationData: string | number;
    bankuityData: string | number;
    match?: boolean;
}

export type AccountData = {
    requestCode: string;
    accountType: string;
    accountGuid: string;
    accountNumber: string;
    details: AccountDetails[];
}

export type AllAccounts = {
    [requestId: string]: AccountData[];
}

export interface AccountDropdownOption {
    label: string;
    value: string;
    isPrimary: boolean;
    isConnected: boolean;
    ami: string;
    ending: string;
    balance: string;
}