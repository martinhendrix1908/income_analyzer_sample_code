// Convert To USD
export function convertToUSD(value: any) {
    if (!value) return "$0";
    let convertedAmount;
    try {
        convertedAmount = value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            // currencySign: 'accounting'
        });
    } catch (err) {
        console.log("Error in converting the value", err);
        convertedAmount = value;
    }
    return convertedAmount;
}
