export interface SettingsField {
    id: string;
    name: string;
    description: string;
    suggestedValues: string[];
    renderType: number;
    defaultValue: string;
    value: string;
}

export interface IBVConfigSetting {
    dataSourceName: string;
    dataProvided: string;
    dataParentId: number;
    isChecked: boolean;
    settingsFields: SettingsField[];
}

export interface IBVProviderList {
    providerName: string;
    accountType: string[];
}