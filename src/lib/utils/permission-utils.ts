import type { NestedPermission, Permission } from "$lib/types/permissions.types";

export function transformToNestedPermissions(permissions: Permission[]) {
    // First pass: Create a map of all items and add isParent/isExpanded to top level
    const itemMap = new Map();
    permissions.forEach(item => {
        itemMap.set(item.claimId, {
            ...item,
            isParent: true,
            isExpanded: false,
            children: []
        });
    });

    // Second pass: Build the tree structure
    const result: NestedPermission[] = [];
    permissions.forEach(item => {
        const currentItem = itemMap.get(item.claimId);

        if (item.parentId === 0 || item.parentId === -1) {
            // This is a root level item
            result.push(currentItem);
        } else {
            // Find the parent item by ParentId
            const parent = itemMap.get(item.parentId);
            if (parent) {
                // Mark the parent as having children
                parent.children.push({ ...currentItem, isParent: false });
            }
        }
    });

    return result;
}

// Function to restore nested array back to flat structure
export function restoreNestedPermissions(nestedPermissions: NestedPermission[]) {
    const flatArray: Permission[] = [];

    // Helper function to process each item and its children
    function processItem(item: NestedPermission) {
        // Create a clean copy without the additional fields
        const cleanItem = {
            claimId: item.claimId,
            claimType: item.claimType,
            claimName: item.claimName,
            parentId: item.parentId,
            roles: [...item.roles] // Create a new array with the same role objects
        };

        flatArray.push(cleanItem);

        // Process children if they exist
        if (item.children && item.children.length > 0) {
            item.children.forEach(child => {
                processItem(child);
            });
        }
    }

    // Process all top-level items
    nestedPermissions.forEach(item => {
        processItem(item);
    });

    return flatArray;
}