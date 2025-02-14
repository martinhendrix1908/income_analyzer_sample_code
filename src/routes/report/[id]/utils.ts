import type { Account, AccountDetails, ApplicationData, IncomeAnalyzerData, IncomeSourceProp, ProductProcessingResult } from "$lib/types/report.types";
import { convertToUSD } from "$lib/utils/currency-utils";
import { addOrdinalSuffix, formatPhoneNumber } from "$lib/utils/number-format";

export const getApplicationDifferenceData = (responseData: IncomeAnalyzerData, selectedAccountGuid?: string) => {
    const currentRequestIdData: ApplicationData = { ...emptyApplication };

    const data = responseData?.processingResult?.productProcessingResult;
    let accounts = data?.accounts || [];
    let accountData: Account = accounts[0];
    if (selectedAccountGuid) {
        accountData = accounts.find((acc: Account) => acc.accountGuid === selectedAccountGuid) || accounts[0];
    } else if (accounts.length > 1) {
        const primaryAcc = accounts.find((acc: Account) => acc.primaryIncomeAccount);
        if (primaryAcc) {
            accountData = { ...primaryAcc };
        }
    }
    let accountDetails = data?.customerInfo.contact;
    let banking = accountData?.banking;

    currentRequestIdData.CustAcctNo = banking?.accountNumber || "";
    currentRequestIdData.CustFName = data?.customerInfo?.names?.[0]?.split(" ")[0] || "";
    currentRequestIdData.CustLName = data?.customerInfo?.names?.[0]?.split(" ")[1] || "";
    currentRequestIdData.CustMobilePhone = accountDetails?.phone || "";
    currentRequestIdData.CustEmail = accountDetails?.email || "";
    currentRequestIdData.CustAdd1 = accountDetails?.address || "";
    currentRequestIdData.CustBankName = banking?.bankName || "";
    currentRequestIdData.CustDebitCard = banking?.debitCard || "";
    currentRequestIdData.MonthlyIncome = accountData?.monthlyIncome?.activeMonthlyIncome || "";
    currentRequestIdData.EmpName = selectedAccountGuid ? data?.customerInfo?.employerValidation?.employerName || "" : "***";
    currentRequestIdData.BankTransit = banking?.routingNumber || "";

    return currentRequestIdData;
}

export const createDifferenceArray = (
    applicationData: ApplicationData | undefined,
    bankuityData: ApplicationData | undefined
): AccountDetails[] => {
    const fields = [
        { field: "CustFName", label: "First Name" },
        { field: "CustLName", label: "Last Name" },
        { field: "CustMobilePhone", label: "Phone Number" },
        { field: "CustEmail", label: "Email" },
        { field: "CustBankName", label: "Bank Name" },
        { field: "CustAcctNo", label: "Account Number" },
        { field: "BankTransit", label: "Routing Number" },
        { field: "CustDebitCard", label: "Debit Card Ending" },
        { field: "MonthlyIncome", label: "Monthly Income" },
        { field: "EmpType", label: "Employment Status" },
        { field: "EmpName", label: "Employer" },
        { field: "BenefitStartDate", label: "Employed Since" },
        { field: "NextPayDate", label: "Next 2 Paydays" },
        { field: "CustAdd1", label: "Address" },
        { field: "CustCity", label: "City" },
        { field: "CustState", label: "State" },
        { field: "CustZip", label: "Zip Code" }
    ];

    const comparisonArray: AccountDetails[] = fields.map(({ field, label }) => {
        const appData = applicationData?.[field as keyof typeof applicationData] !== undefined
            ? (() => {
                switch (field) {
                    case "MonthlyIncome":
                        return convertToUSD(applicationData[field as keyof typeof applicationData]);
                    case "CustAcctNo":
                        return applicationData[field as keyof typeof applicationData] ? "XX" + applicationData[field as keyof typeof applicationData] : "";
                    default:
                        return applicationData[field as keyof typeof applicationData];
                }
            })()
            : "";

        const bankData = bankuityData?.[field as keyof typeof bankuityData] !== undefined
            ? (() => {
                switch (field) {
                    case "MonthlyIncome":
                        return convertToUSD(bankuityData[field as keyof typeof bankuityData]);
                    case "CustAcctNo":
                        return bankuityData[field as keyof typeof bankuityData] ? "XX" + bankuityData[field as keyof typeof bankuityData] : "";
                    default:
                        return bankuityData[field as keyof typeof bankuityData];
                }
            })()
            : "";

        return {
            dataField: label,
            applicationData: appData,
            bankuityData: bankData,
            match: appData === bankData
        };
    });
    return comparisonArray;
};

export const getOrdinalSuffix = (day: string | number) => {
    if (typeof day === "number") {
        return addOrdinalSuffix(day);
    }

    if (typeof day === "string") {
        const dayArray = day.split(",").map((day) => day.trim());

        const result = dayArray.map((dayStr) => {
            const day = Number(dayStr.trim());
            return isNaN(day) ? dayStr.trim() : addOrdinalSuffix(day);
        });

        return result.join(", ");
    }
};

export const getMonth = (dateMonth: string) => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    return months[+dateMonth - 1];
};

export const getName = (date: string, frequency: string) => {
    //what to show on button hover
    if (frequency === "I") {
        const newDate = new Date(date).getDate();
        if (newDate.toString().length === 1) {
            return "0" + newDate;
        }
        return newDate;
    }
    if (frequency === "B" || frequency === "W") {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeekIndex = new Date(date).getDay();
        let dayOfWeek = daysOfWeek[dayOfWeekIndex];
        return dayOfWeek;
    }
    if (frequency === "M" || frequency === "S") {
        const newDate = new Date(date).getDate();
        if (newDate.toString().length === 1) {
            return "0" + newDate;
        }
        return newDate;
    }
};

export const getDayName = (date: string, frequency: string) => {
    if (frequency === "I" || frequency === "M" || frequency === "S") {
        const newDate = new Date(date).getDate();
        return newDate;
    }
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeekIndex = new Date(date).getDay();
    let dayOfWeek = daysOfWeek[dayOfWeekIndex];
    return dayOfWeek;
};

export const incomeTableHeaders = [
    {
        title: "Total Income",
        subtitle: "Total Transactions",
    },
    {
        title: "Monthly Income",
        subtitle: "",
    },
    {
        title: "Income Type",
        subtitle: "",
    },
    {
        title: "Income Source",
        subtitle: "Deposit Type",
    },
    {
        title: "Frequency &",
        subtitle: "Pattern",
    },
    {
        title: "Past Deposits (Oldest 🡸 Latest):",
        subtitle: "",
    },
];

export const loanTableHeaders = [
    {
        title: "Likely Installment Amount"
    },
    {
        title: "Likely Lender"
    },
    {
        title: "Loan Amount"
    },
    {
        title: "Frequency"
    },
    {
        title: "Latest Transaction",
    }
];

export const emptyApplication: ApplicationData = {
    PreAppID: 0,
    TransactionType: '',
    IPAddress: '',
    PreviousCust: '',
    PdLoanrcvdfrom: '',
    MktCodes: '',
    Universal_LeadiD: '',
    RateType: '',
    UserId: '',
    Password: '',
    CustSSN: '',
    CustFName: '',
    CustLName: '',
    CustDOB: '',
    CustAdd1: '',
    CustAdd2: '',
    CustState: '',
    CustCity: '',
    CustCountry: '',
    CustZip: '',
    CustDLState: '',
    CustDLNo: '',
    HomeStatus: '',
    IdType: '',
    PrefLang: '',
    YrsAtCurrAdd: '',
    MnthsAtCurrAdd: '',
    CustHomePhone: '',
    CustMobilePhone: '',
    CustWorkPhone: '',
    CustWorkPhoneExt: '',
    CustEmail: '',
    RefFName: '',
    RefLName: '',
    RefMobilePhone: '',
    RefRelation: '',
    RefFName2: '',
    RefLName2: '',
    RefMobilePhone2: '',
    RefRelation2: '',
    PayBankruptcy: '',
    TypeOfIncome: '',
    TypeOfPayroll: '',
    EmpType: '',
    EmpField: '',
    EmpName: '',
    EmpAdd1: '',
    EmpAdd2: '',
    EmpState: '',
    EmpCity: '',
    EmpZip: '',
    EmpPhone: '',
    EmpPhoneExt: '',
    ContactName: '',
    JobTitle: '',
    Periodicity: '',
    MonthlyIncome: '',
    AvgSalary: '',
    NextPayDate: '',
    SecondPayDate: '',
    BenefitStartDate: '',
    LoanType: '',
    BankTransit: '',
    InstitutionNumber: '',
    CustBankName: '',
    CustAcctNo: '',
    CustAcctType: '',
    CustDebitCard: '',
    CardExpDate: '',
    CardCVV: '',
    RequestedAmount: 0,
    IsMilitary: '',
    CustomField1: '',
    CustomField2: '',
    CustomField3: '',
    Price: '',
    AppGuid: '',
    Status: '',
    WinPrice: '',
    ConflictTier: '',
    AffiliateID: '',
    AccountNumber: 0,
    DateMovedAddr: '',
};

export const getSourceNameById = (sourceID: string | undefined, _incomeSources: IncomeSourceProp[]) => {
    if (sourceID === "All" || sourceID === "" || !sourceID) {
        return sourceID ?? "N/A";
    }
    const data = _incomeSources.find((item) => item.sourceID === sourceID);
    if (data) {
        return data.sourceName;
    } else {
        return sourceID;
    }
};

//convert the income type from number to name and vice versa
export const convertIncomeType = (type: any, toConvertBack: boolean = false) => {
    const conversionMap: { [key: string]: string } = {
        All: "All",
        "0": "Other",
        "1": "Payroll",
        "2": "Retirements & Benefits",
        "3": "Transfers/Deposits",
        // "4": "Transfers/Deposits",
        "5": "Self-Employment",
        "6": "Loan",
    };

    if (toConvertBack) {
        const reversedMap = Object.entries(conversionMap).reduce(
            (acc: any, [key, value]) => {
                acc[value] = key;
                return acc;
            },
            {}
        );

        return reversedMap[type] || type;
    }

    return conversionMap[type] || type;
};

export const transactionTotalClassName = (amount: number, allNames: {
    [key: string]: string;
}) => {
    const redClass = "font-semibold text-red";
    const greenClass = "font-semibold text-leafy";

    if (allNames.transactionTypeName == "All") {
        if (amount < 0) {
            return redClass;
        }
        return greenClass;
    }
    if (allNames.transactionTypeName == "CREDIT") {
        return greenClass;
    }
    if (allNames.transactionTypeName == "DEBIT") {
        return redClass;
    }
};

export const getMonthYear = (value: any) => {
    const date = new Date(value);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
    return `${month}-${year}`;
};

export const generateDetails = (accountData: Account, productProcessingResult: ProductProcessingResult) => {
    const contactInfo = productProcessingResult?.customerInfo?.contact;
    const personalDetails = {
        heading: "Personal Details",
        details: [
            {
                label: "Email Addresses",
                value: contactInfo?.email ?? "N/A",
                isVisible: true,
            },
            {
                label: "Phone Number",
                value: formatPhoneNumber(contactInfo?.phone) ?? "N/A",
                isVisible: true,
            },
            {
                label: "Home Address",
                value: contactInfo?.address ?? "N/A",
                isVisible: true,
            },
            {
                label: "Primary Income",
                value:
                    productProcessingResult?.customerInfo?.employerValidation?.employerName ?? "N/A",
                isVisible: true,
            },
        ],
    };

    // Banking Details
    const bankData = accountData?.banking;
    const routingNumberVisible = !!(
        bankData?.routingNumber && bankData?.routingNumber !== "NA"
    );
    const bankNameVisible = !!(
        bankData?.bankName && bankData?.bankName !== "NA"
    );
    const adjustedRoutingNumberVisible = routingNumberVisible || (!routingNumberVisible && !bankNameVisible);
    const bankingDetails = {
        heading: "Banking Details",
        details: [
            {
                label: "Account Type",
                value: bankData?.accountType?.replace(/_/g, " ") ?? "N/A",
                isVisible: true,
            },
            {
                label: "Account Number",
                value: bankData?.accountNumber ? "XX" + bankData?.accountNumber : "N/A",
                isVisible: true,
            },
            {
                label: "Routing Number",
                value:
                    routingNumberVisible || !bankNameVisible
                        ? bankData?.routingNumber ?? "N/A"
                        : "N/A",
                isVisible: adjustedRoutingNumberVisible,
            },
            {
                label: "Bank Name",
                value: bankNameVisible ? bankData?.bankName : "N/A",
                isVisible: bankNameVisible,
            },
            {
                label: "Debit Card Ending",
                value:
                    (bankData?.card?.length ?? 0) > 0
                        ? "XX" + bankData?.card
                        : bankData?.debitCard || "XX",
                isVisible: true,
            },
            {
                label: "IBV",
                value: bankData?.ibv ?? "N/A",
                isVisible: true,
            },
        ],
    };
    return { _personalDetails: personalDetails, _bankingDetails: bankingDetails };
}
