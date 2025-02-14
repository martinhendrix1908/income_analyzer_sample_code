import type { OrgUnit, Role } from "./types";

export interface IOrganizationDetails {
  organizationId: number;
  organizationName: string;
  ownerAccountId: number;
  clientId: string;
  secret: string;
  apiKey: string;
  bundleId: string;
  featureIds: string;
  settings: string;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  updated: string | null;
  created: string | null;
  orgStructure?: string;
};


export interface TableHeaderProps {
  key: string;
  label: string;
  width: string;
  sortable: boolean;
}

export interface IAdminDetails {
  updated: string | null;
  created: string | null;
  userId: string;
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
  roleNames: string;
  organizationId: number;
  clientType: string;
  passwordChangedDate: string | null;
  roleList: Role[];
  orgUnitList: OrgUnit[];
}

export interface Tier {
  tierId: number;
  minUnits: number;
  maxUnits: number | null; // null represents unlimited
  pricePerUnit: number;
  isDeleted: boolean;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Feature {
  featureId: number;
  featureName: string;
  basePrice: number;
  description: string;
  code: string;
  tiers: Tier[];
  platformFee: number;
  created?: string;
  updated?: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface Bundle {
  bundleId: number;
  bundleName: string;
  description: string;
  featuresList: string;
  bundlePrice: number;
  platformFee: number;
  tiers: Tier[];
  createdBy?: string;
  created?: string | null;
  updatedBy?: string;
  updated?: string | null;
  expanded?: boolean; // Not in the API response, added for UI purposes
}

export interface Contacts {
  userId: string;
  organizationId: number;
  isPrimary: boolean;
  name: string;
  emailId: string;
  phoneNumber: string;
  type: string;
}

export interface Ticket {
  id: string;
  subject: string;
  priority: number;
  status: number;
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
}

export interface ThirdPartyIntegration {
  id: string;
  name: string;
  isActive: boolean;
  type: string;
  api: string;
  created: string;
  createdBy: string;
  updated: string;
  updatedBy: string;
}

export interface Notes {
  noteId: string;
  organizationId: string;
  content: string;
  createdBy: string;
  created: string;
  flag: string;
}