export const formatPhoneNumber = (number: string | undefined): string => {
    if (!number) {
        return 'N/A';
    }
    const cleaned = ('' + number).replace(/\D/g, '');
    let formattedNumber = '';
    if (cleaned.length >= 3) {
        formattedNumber += `(${cleaned.substring(0, 3)})`;
    } else {
        formattedNumber += cleaned;
    }
    if (cleaned.length > 3) {
        formattedNumber += ` ${cleaned.substring(3, Math.min(6, cleaned.length))}`;
    }
    if (cleaned.length > 6) {
        formattedNumber += `-${cleaned.substring(6, 10)}`;
    }
    const extraPart = cleaned.substring(10);
    if (extraPart) {
        formattedNumber += ` ${extraPart}`;
    }

    return formattedNumber;
}

export const formatNumberOnly = (value: string) => {
    return value ? value.replace(/\D/g, '') : '';
}

export const addOrdinalSuffix = (day: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const parseNumericValue = (value: any): number => {
    return parseFloat(value?.toString().replace(/[^0-9.-]+/g, "") || "0");
}
