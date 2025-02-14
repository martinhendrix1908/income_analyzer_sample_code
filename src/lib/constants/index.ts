import type { IZones, IZoneStyleType } from "$lib/types/report.types";

//Colors based on event types
export const Colors: { [key: string]: string } = {
    "0": "#FF3B30",
    "1": "#007AFF",
    "2": "#87D0FD",
    "3": "#FFCC00",
    "4": "#FFCC00",
    "5": "#FF8400",
    "6": "#FF3B30",
}

export const ChartLegendColors = {
    "Payroll": "#007AFF",
    "Retirement & Benefits": "#87D0FD",
    "Self-Employment": "#FF8400",
    "Transfers/Deposits": "#FFCC00",
    "Other": "#FF3B30"
}
//Chart component constants
export const Days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
export const Months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const SeriesTypeToIndex: { [key: string]: number } = {
    "6": 3,
    "5": 2,
    "4": 3,
    "3": 3,
    "2": 1,
    "1": 0,
    "0": 4,
};
export const IncomeTypes: { [key: string]: string } = {
    "Other": "0",
    "Payroll": "1",
    "Retirement & Benefits": "2",
    "Transfers/Deposits": "3",
    "Self-Employment": "5",
    "null": "100",
};

export const ZoneTypes: { [key in IZones]: IZoneStyleType } = {
    HIGH: { bgColor: "#FBF2F4", textColor: "#BE0027", borderColor: "#BE0027" },
    ACCEPTABLE: { bgColor: "#F7FFF9", textColor: "#2C9F45", borderColor: "#2C9F45" },
    SUPER_GREEN: { bgColor: "#E0F8E0", textColor: "#007F00", borderColor: "#007F00" },
    MODERATE: { bgColor: "#FFFCF7", textColor: "#CF8D2E", borderColor: "#CF8D2E" },
};


//Validation constants  
export const ValiationMessage: { [key: string]: string } = {
    required: 'This field is required.',
    email: 'Invalid email address.',
    phone: 'Phone number must be 10 digits long.',
    phone2: 'Phone number must be 10 digits long.',
    accountNumber: 'Account number must be greater than or equal to 10 digits long.',
    minLength: 'Name can not be less than 2 characters.',
    maxLength: 'Name can not be greater than 25 characters.'
}
export const ValidationRegex: { [key: string]: RegExp } = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    accountNumber: /^\d{10,}$/,
    phone: /^\(\d{3}\) \d{3}-\d{4}$/,
    phone2: /^\d{3}-\d{3}-\d{4}$/
}

export const OrganizationClaims = [
    {
        claimName: "Details",
        claimType: "Details",
    },
    {
        claimName: "Income",
        claimType: "Income",
    },
    {
        claimName: "Lending Guide",
        claimType: "LendingGuide",
    },
    {
        claimName: "Bank Connectivity Providers",
        claimType: "IBVSettings",
    },
    {
        claimName: "Assessment Zones",
        claimType: "AssessmentZones",
    },
    {
        claimName: "API Settings",
        claimType: "APISettings",
    },
    {
        claimName: "Subscription Details",
        claimType: "SubscriptionDetails"
    }
]

export const HelpTexts = {
    TimezoneAndCurrency: "Set the timezone and currency to be used.",
    AcceptedIncomeTypes: "List of accepted income types.",
    ShareCustomerReports: "Share customer reports.",
    OverrideLock: "This setting is enforced by the group and cannot be changed by your unit.",
    BankuitySuggestedLoanAmounts: "Use Bankuity's suggested loan amounts.",
    AbsoluteLendingLimits: `Company Lending Limits (Absolute Minimum and Maximum): Define the absolute minimum and maximum loan amounts your company offers. These limits override AMI-based suggestions to ensure loans fall within your company’s policies. For example, if the company’s minimum is $400 and maximum is $2,000, suggested amounts will not fall below $400 or exceed $2,000`,
    ActiveMonthlyIncome: `AMI-Based Loan Suggestions (% of Active Monthly Income): Set the minimum and maximum loan amounts as a percentage of the Active Monthly Income (AMI). For example, if AMI is 3,000, a 20% minimum suggests $600, and a 30% maximum suggests $900.`,
    UseBankuitysConnectivityProvider: "Select the provider for bank connectivity. If you have multiple providers, choose the one you prefer to use or select the default option as Bankuity’s Connectivity Provider.",
}

export const PermissionsActions: string[] = ["view", "add", "edit", "review", "share"];

export const Status = {
    0: "Open",
    1: "In Progress",
    2: "Closed",
    3: "Resolved",
};
export const Priority = {
    0: "Low",
    1: "Medium",
    2: "High",
    3: "Critical",
};