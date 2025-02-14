export const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value || "");
};
export type PhoneFormat = "000-000-0000" | "(000) 000-0000"

export const formatPhoneNumberAsYouType = (input: string, type = "(000) 000-0000") => {
    // Remove all non-digit characters
    input = input.replace(/\D/g, '');
    if (type === "000-000-0000") {
        // Format the phone number as XXX-XXX-XXXX
        if (input.length === 0) {
            input = ''; // Handle clear state
        } else if (input.length <= 3) {
            input = `${input}`;
        } else if (input.length <= 6) {
            input = `${input.slice(0, 3)}-${input.slice(3)}`;
        } else {
            input = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
        }
    } else if (input.length === 0) {
        input = ''; // Handle clear state
    } else if (input.length <= 3) {
        input = `(${input}`;
    } else if (input.length <= 6) {
        input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else {
        input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
    return input;
};

export const showValidationMessage = (element: HTMLInputElement) => {
    element.focus();
    element.blur();
    element.focus();
}

