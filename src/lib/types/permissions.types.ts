export interface PermissionRole {
  RoleId: string;
  IsChecked: boolean;
}

export interface Permission {
  claimId: number;
  claimType: string;
  claimName: string;
  parentId: number;
  roles: PermissionRole[];
}

export interface NestedPermission extends Permission {
  isParent: boolean;
  isExpanded: boolean;
  children: NestedPermission[];
}