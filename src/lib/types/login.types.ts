export interface ClientUIConfiguration {
    topPanelMode: string;
    ShowRefreshButton: boolean;
    ShowCreateRequest: boolean;
    ShowHistoricalReport: boolean;
    showPanel2: boolean;
    ShowRecords: number;
    ShowMenu: boolean;
    ShowActionTabs?: boolean;
    UsePostOnboardingService?:boolean; //Added this from the productOptions.Incomes.UsePostOnboardingService as needed to enable the post onboarding service
}

export interface PanelParams {
    param1: number;
    param2: boolean;
    parem3: string;
}

export interface ProductUIConfiguration {
    Incomes: {
        theme: string;
        showIncomes: boolean;
        panelParams: PanelParams;
    };
}

export interface RiskZoneScore {
    threshold1: number;
    threshold2: number;
}

export interface ExtZoneScore {
    threshold1: number;
    threshold2: number;
}

export interface LendingGuideThresholdPercentage {
    minLoanAmount: number;
    maxLoanAmount: number;
}

export interface ExtOptions {
    riskZoneScore: RiskZoneScore;
    extZoneScore: ExtZoneScore;
    averageIncomeThreshold: number;
    lendingGuideThresholdPercentage: LendingGuideThresholdPercentage;
}

export interface ProductOptions {
    Incomes: {
        IncomesPlanQty: number;
        UsePostOnboardingService: boolean;
        extOptions: ExtOptions;
    };
}

export interface LoginResponse {
    clientUIConfiguration: ClientUIConfiguration;
    productUIConfiguration: ProductUIConfiguration;
    productOptions: ProductOptions;
    token: string;
    availableProducts: string[];
    lastLogindate: string;
    errors: any[];
    userName: string;
    redirectLink: string;
}

export interface LoginCred {
    userId: string;
    password: string;
    remember: FormDataEntryValue | null;
}
export interface TimestampProp {
    expires: Date;
    sessionUpTime: Date;
    sessionStartTime: Date;
}