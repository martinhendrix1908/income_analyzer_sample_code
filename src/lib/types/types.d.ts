import type { IBVConfigSetting } from "./Ibv.types";
import type { TimestampProp } from "./login.types";

export type Admin = {
  Id: string;
  Psw: string;
  Email: string;
  Name: string;
  ClientId: string;
  Secret: string;
  sbClientId: string;
  sbSecret: string;
};

export type Agent = {
  id: string;
};

export type Client = {
  id: string;
  email: string;
  name: string;
  roles: string;
  clientId: string;
  secret: string;
  sbClientId: string;
  sbSecret: string;
  passwordExpiredDate: string;
  emailConfirmed: boolean;
  locked: boolean;
};

export interface RequestId {
  userId: string;
  unitName: string;
  requestId: string;
  status: number;
  rcStatus: string;
  ibvStatus: string;
  created: string;
  updated: string;
  requestCode: string;
  customerName: string;
  subscribedOn: string;
  unsubscribed: string;
  snapshotDate: string;
  lastUpdated: string;
  lastViewed: string;
  asOfDate: string;
  productId: number;
  additionalInfo: HistoricalReport['additionalInfo']
}

export interface GetRequestIdsResponse {
  user: {
    authToken: string;
    name: string;
    email: string;
    id: string;
    role: string;
    last_login: string;
    topPanelMode: string;
    timeStamps: TimestampProp;
  };
  totalPages: number;
  totalRequests: number;
  pageNumber: number;
  pageSize: number;
  orderByDescending: boolean;
  requestIds: RequestId[];
}

export type UploadStatus = {
  [key: number]: string;
};

export type DropDownsProp = {
  accountDropdown: boolean;
  providerDropdown: boolean;
};
export type Provider = {
  providerName: string;
  accountType: string[];
}
export type ProviderInfo = {
  providerInfo: Provider[];
}

export type FilterOption = {
  filter: {
    filterEl: {
      fieldName: string;
      fieldValue: string;
      mode: string;
    };
    filterExp?: {
      operation: string;
      elements: {
        fieldName: string;
        fieldValue: string;
        mode: string;
      }[];
    }
    filterBExp: {
      operation: string;
      expressions: {
        operation: string;
        elements: {
          fieldName: string;
          fieldValue: string;
          mode: string;
        }[];
      }[];
    };
  };
  pageNumber: number;
  pageSize: number;
  orderByDescending: boolean;
}


export interface MonthYearProp {
  month: number;
  year: number;
}

export type FilterProp = {
  filterExp?: {
    operation: string;
    elements: Array<{
      fieldName: string;
      fieldValue: string;
      mode: string;
    }>;
  };
  filterBExp?: {
    operation: string;
    expressions: Array<{
      operation: string;
      elements: Array<{
        fieldName: string;
        fieldValue: string;
        mode: string;
      }>;
    }>;
  };
};

export type InputError = {
  cusFirstName: string;
  cusLastName: string;
  cusEmail: string;
  cusAccNumber: string;
  cusAbaNumber: string;
  cusAccType: string;
  cusPhone: string;
  IBVProvider: string;
  middleName: string;
  externalID: string;
}

export interface UserData {
  userId: string;
  organizationId: number;
  username: string;
  firstname: string;
  lastname: string;
  emailId: string;
  mobile: string;
  createdBy: string;
  updatedBy: string;
  imageData: string;
  lastActivityDate: string | null;
  isActive: boolean;
  isVerified: boolean;
  roleList: Role[];
  roleNames: string;
  passwordChangedDate: string | undefined;
  orgUnitList: OrganizationUnit[];
  updated: string | null;
  created: string | null;
  clientType: string;
}

export interface Role {
  Id: string;
  Name: string;
}

export interface RoleCheck {
  RoleId: string;
  IsChecked: boolean;
}

export interface OrgUnit {
  OrgUnitId: number;
  ParentOrgUnitId: number;
  Name: string;
  Roles: RoleCheck[]
  orgUnitList: OrgUnit[]; //added for recursive structure
}

export interface OrganizationGroup {
  orgUnitId: number;
  name: string;
  phone: string;
  address: string;
  thresholdAlerts: string;
  loanProductSettings: string;
  parentOrgUnitId: number;
  createdBy: string;
  updatedBy: string;
  ouPath: string;
  ouType: string;
  isActive?: boolean;
  updated: string;
  created: string;
  orgGroupList: OrganizationGroup[];
  usersCount: number;
};

export interface IOrganizationUnit {
  unitId: number;
  parentGroupId: number;
  name: string;
  totalUsers: number;
  parentGroupName: string;
  updated: string;
  created: string;
}
export interface IOrganizationGroup {
  groupId: number;
  parentGroupId: number;
  name: string;
  totalUsers: number;
  totalUnits: number;
  updated: string;
  created: string;
  groupList: IOrganizationGroup[]
}

export interface GroupUnit {
  id: string,
  name: string,
  type: string,
  groupUnitList: GroupUnit[]
}
export interface OrganizationDetails {
  name: string,
  totalUsers: number;
  activeUsers: number;
  totalGroups: number;
  activeGroups: number;
  totalUnits: number;
  activeUnits: number;
  orgStructure: string;
}

export interface IUnit {
  orgUnitId: number;
  name: string;
  ouType: string;
}
export interface ApiResponse<T> {
  succeeded: boolean;
  message: string;
  data: T
};

export interface TimeZone {
  Id: string;
  Name: string;
}

export interface Currency {
  Id: string;
  Name: string;
}

export interface DetailsConfiguration {
  name: string;
  timeZone: string;
  currency: string;
  timeZoneList: TimeZone[];
  currencyList: Currency[];
  reportShared: boolean;
  lockedUnits?: string;
}

export interface IncomeItem {
  isChecked: boolean;
  name: string;
  text: string;
}

export interface IncomeConfiguration {
  text: string;
  incomeList: IncomeItem[];
  lockedUnits?: string;
}

export interface LendingGuideConfiguration {
  minLoanAmountPercentage: number;
  maxLoanAmountPercentage: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  bankuitySuggestionsDisabled: boolean;
  lockedUnits?: string;
}

export interface IBVConfiguration {
  ibvList: IBVConfigSetting[];
  lockedUnits?: string;
  bankuityOptimizationDisabled: boolean,
}

export interface AssessmentZone {
  id: string;
  name: string;
  color: string;
  description: string;
  position: number;
  editing?: boolean;
}
export interface AssessmentZoneConfiguration {
  zoneList: AssessmentZone[];
  lockedUnits?: string;
}

export interface ApiSettingsConfiguration {
  organizationId: number;
  apiKey: string;
  clientId: string;
  secret: string;
  lockedUnits?: string;
}

export interface SubscriptionDetailsConfiguration {
  bundleId: string;
  featureIds: string;
  lockedUnits?: string;
}

export type ClaimConfiguration =
  | DetailsConfiguration
  | IncomeConfiguration
  | LendingGuideConfiguration
  | IBVConfiguration
  | AssessmentZoneConfiguration
  | ApiSettingsConfiguration
  | SubscriptionDetailsConfiguration;

export interface Claim {
  claimType: string;
  claimValue: string;
  configuration: ClaimConfiguration;
  selectedUnits: string;
}

export interface ClaimsData {
  claims: Claim[];
}

export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: string
}


export interface IMenuItems {
  name: string;
  link: string;
  icon: string;
  text: string;
  isSubMenuActive?: boolean;
  subMenuItems: IMenuItems[];
  isDevider: boolean;
  hasSubMenu: boolean
}

export interface DynamicSearchField {
  key: string;
  label: string;
}

export interface Option {
  value: string | number;
  label: string;
  icon?: string;
}