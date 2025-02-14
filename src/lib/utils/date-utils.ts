import { addOrdinalSuffix } from "./number-format";

export const convertDateTime = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return 'MM/DD/YYYY at 00:00 AM';
    // Split the given date string
    const dateTimeParts = dateTimeString?.split("T") ?? '';
    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1];

    // Split the date part into year, month, and day
    const [year, month, day] = datePart?.split("-") ?? '';

    // Split the time part into hours, minutes, and seconds
    let [hours, minutes] = timePart?.split(":") ?? '';

    // Determine the AM or PM period
    const period = +hours >= 12 ? "PM" : "AM";

    // Create the formatted string
    const formattedDate = `${month}/${day}/${year} at ${+hours % 12 || '00'}:${minutes || '00'} ${period || 'AM'}`;

    return formattedDate;

}

export const convertDate = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return 'MM/DD/YYYY';
    dateTimeString = dateTimeString?.replaceAll('T', ' ') ?? "";
    const datePart = dateTimeString?.split(' ')[0] ?? '';
    const [year, month, day] = datePart?.split("-") ?? '';
    return `${month}/${day}/${year}`;
}

export const convertDateToDay = (inputDate: string) => {
    if (!inputDate || inputDate === "") return 'N/A';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(inputDate);
    const index = date.getDay()
    const dayOfWeek = daysOfWeek[index];

    // Get the individual components of the date
    const dateParts = inputDate.split('T')[0].split(' ')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    if (dayOfWeek) {
        return `${dayOfWeek}, ${month}/${day}/${year}`;
    } else {
        return 'N/A'
    }
}
export const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
export const convertToDateMonth = (inputDate: string) => {
    if (!inputDate || inputDate === "") return 'N/A';
    // Extract date and time components
    const datePart = inputDate.split('T')[0];
    if (!datePart) return 'N/A';

    const [year, month, day] = datePart.split('-');
    if (!year || !month || !day) return 'N/A';

    // Convert month to its name

    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName: string = monthNames[parseInt(month, 10) - 1];

    // Format the time in 12-hour clock format

    let [hours, minutes] = inputDate.split('T')[1].split(':').map((num: any) => parseInt(num, 10));
    const ampm: string = hours < 12 ? 'AM' : 'PM';
    hours %= 12;
    hours = hours || 12; // Handle midnight (0:00) as 12:00 AM

    // Create the formatted date and time string
    const formattedDateTime: string = `${monthName} ${addOrdinalSuffix(+day)}, ${year} at ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formattedDateTime;
}

export const convertToFormatedDate = (inputDate: string) => {//Month Day, Year
    if (!inputDate || inputDate === "") return 'N/A';
    // Extract date and time components
    const datePart = inputDate.split('T')[0];
    if (!datePart) return 'N/A';

    const [year, month, day] = datePart.split('-');
    if (!year || !month || !day) return 'N/A';

    // Convert month to its name

    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName: string = monthNames[parseInt(month, 10) - 1];
    const formattedDateTime: string = `${monthName} ${day}, ${year}`;

    return formattedDateTime;
}

export const dateMonthDifference = (startDateStr: string | undefined, endDateStr: string | undefined) => {
    if (!startDateStr || !endDateStr || startDateStr === endDateStr || startDateStr === "" || endDateStr === "") {
        return "(0 Months, 0 Days)";
    }

    const parseDate = (dateString: any) => {
        const [datePart] = dateString.includes('T') ? dateString.split('T') : dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        return {
            year: parseInt(year, 10),
            month: parseInt(month, 10),
            day: parseInt(day, 10)
        };
    };

    const isLeapYear = (year: number): boolean => {
        // Function to check if the year is a leap year
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getLastMonthDays = (year: number, month: number): number => {
        // Calculate the days in the last month of the specified year without using new Date()
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Ensure the month is within the valid range (1 to 12)
        month = (month - 1 + 12) % 12 + 1; // Normalize month to a valid range

        return daysInMonth[month - 1];
    };

    const d1 = parseDate(startDateStr);
    const d2 = parseDate(endDateStr);

    let monthDiff = (d2.year - d1.year) * 12 + d2.month - d1.month;
    let dayDiff = d2.day - d1.day;

    // Adjust the difference if the day in the second date is less than or equal to the day in the first date
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff = getLastMonthDays(d2.year, d2.month - 1) + dayDiff;
    }
    return `(${monthDiff} Months, ${dayDiff} Days)`;
}


export const convertToMonthDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const month = date.toLocaleString('en-US', { month: 'short' });

    // Get day with leading zero if needed
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Get hours and minutes with leading zeros
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${month} ${day} ${hours}:${minutes}`;
}

export const getMonthDate = (dateString: string) => {
    const [month, date] = convertToMonthDateTime(dateString).split(" ");
    return `${month} ${date}`;
}

export const getTime = (dateString: string) => {
    const [, , time] = convertToMonthDateTime(dateString).split(" ");
    return time;
}