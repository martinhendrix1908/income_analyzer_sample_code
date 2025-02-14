export const groupBy = <T, K extends keyof any>(
    array: T[],
    key: ((item: T) => K) | keyof T
) => {
    return array.reduce((result: any, currentValue) => {
        // Get the group key using the function or property name
        const groupKey = typeof key === 'function' ? key(currentValue) : currentValue[key];

        // If the group doesn't exist, create it
        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        // Push the current value to the group
        result[groupKey].push(currentValue);

        return result;
    }, {} as Record<K, T[]>);
};

export const generateUniqueId = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
}

export const splitValuesToAnArray = (value: any) => {
    return value.split(", ").map((item: any) => item.trim());
};

export const areObjectsEqual = (obj1: any, obj2: any, ignoreProperties?: string[]): boolean => {
    // If both are not objects or one is null, check for direct equality
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

    const ignoreSet = new Set(ignoreProperties || []);


    for (const key in obj1) {
        if (ignoreSet.has(key)) {
            continue;
        }
        if (!Object.hasOwn(obj2, key)) {
            return false;
        }
        if (!areObjectsEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export const debounce = (callback: Function, wait = 250) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), wait);
    };
};

export const deepClone = <T>(value: T): T => {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(item => deepClone(item)) as T;
    }
    const clonedObject: { [key: string]: any } = {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            clonedObject[key] = deepClone(value[key]);
        }
    }
    if (value instanceof Date) {
        return new Date(value.getTime()) as T;
    }
    return clonedObject as T;
};

export const formDataToJSONString = (formData: FormData) => {
    const jsonObject: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    return JSON.stringify(jsonObject);
}
export const formDataToQueryString = (formData: FormData | { [key: string]: any }) => {
    let queryString = '?';
    formData.forEach((value: any, key: string) => {
        queryString += `${key}=${value}&`
    });
    return queryString;
}
export const objectToQueryString = (obj: { [key: string]: any }) => {
    const queryString = Object.keys(obj).map(key => {
        if (obj[key] === null || obj[key] === undefined) return '';
        return `${key}=${obj[key]}`;
    }).join('&');
    return queryString;
}

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};