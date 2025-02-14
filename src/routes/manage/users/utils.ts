import type { OrgUnit, RoleCheck } from "$lib/types/types";

export const checkAllChildGroupUnits = (
    orgUnit: OrgUnit,
    roleId: string,
    checked: boolean,
): void => {

    const processRoles = (roles: RoleCheck[]): void => {
        roles?.forEach((role) => {
            if (role.RoleId === roleId) {
                role.IsChecked = checked;
            }
        });
    };

    const processEntity = (entity: OrgUnit): void => {
        processRoles(entity.Roles);
        if (entity.orgUnitList && entity.orgUnitList.length > 0) {
            entity.orgUnitList?.forEach((unit) => processEntity(unit));
        }
    };

    orgUnit.orgUnitList?.forEach((unit) => processEntity(unit));
};
export const transformOrgUnits = (orgUnits: OrgUnit[]) => {
    // Map for quick lookup
    const map = new Map();
    orgUnits.forEach((item) => {
        map.set(item.OrgUnitId, { ...item, orgUnitList: [], isOpen: true });
    });

    const result: OrgUnit[] = [];

    // Iterate over the array to build the hierarchy
    orgUnits.forEach((item) => {
        const parent = map.get(item.ParentOrgUnitId);
        if (parent) {
            parent.orgUnitList.push(map.get(item.OrgUnitId));
        } else {
            result.push(map.get(item.OrgUnitId));
        }
    });

    return result;
};
export const flattenOrgUnits = (orgUnits: OrgUnit[]) => {
    let result: OrgUnit[] = [];

    function recurse(units: OrgUnit[]) {
        units.forEach((unit) => {
            // Add the current unit to the result
            result.push({
                OrgUnitId: unit.OrgUnitId,
                Name: unit.Name,
                ParentOrgUnitId: unit.ParentOrgUnitId,
                Roles: unit.Roles,
            } as OrgUnit);

            // If there are nested units, recursively process them
            if (unit.orgUnitList && unit.orgUnitList.length > 0) {
                recurse(unit.orgUnitList);
            }
        });
    }

    recurse(orgUnits);
    return result.toSorted((a, b) => a.OrgUnitId - b.OrgUnitId);
};

const compareOrgUnits = (
    originalArray: OrgUnit[],
    updatedArray: OrgUnit[]
): OrgUnit[] => {
    // A map of original objects for efficient lookup
    const originalMap = new Map(
        originalArray.map(orgUnit => [orgUnit.OrgUnitId, orgUnit])
    );

    const modifiedOrgUnits: OrgUnit[] = [];

    for (const updatedOrgUnit of updatedArray) {
        const originalOrgUnit = originalMap.get(updatedOrgUnit.OrgUnitId);

        // If org unit doesn't exist in original array
        if (!originalOrgUnit) {
            modifiedOrgUnits.push(updatedOrgUnit);
            continue;
        }

        // Check if roles have changed
        const hasRoleChanges = updatedOrgUnit.Roles.some((updatedRole, index) => {
            const originalRole = originalOrgUnit.Roles[index];
            return (
                originalRole.RoleId !== updatedRole.RoleId ||
                originalRole.IsChecked !== updatedRole.IsChecked
            );
        });

        // If roles have changed, add to modified units
        if (hasRoleChanges) {
            modifiedOrgUnits.push(updatedOrgUnit);
        }
    }

    return modifiedOrgUnits;
}

export const findModifiedUnits = (originalData: OrgUnit[], updatedData: OrgUnit[]) => {
    // A deep copy to avoid mutating original data
    const safeOriginalData = JSON.parse(JSON.stringify(originalData));
    const safeUpdatedData = JSON.parse(JSON.stringify(updatedData));

    return compareOrgUnits(safeOriginalData, safeUpdatedData);
}
