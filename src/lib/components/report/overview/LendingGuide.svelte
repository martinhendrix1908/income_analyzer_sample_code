<script lang="ts">
  import { convertToUSD } from "$lib/utils/currency-utils";
  import { addOrdinalSuffix } from "$lib/utils/number-format";

  let {
    bgColor,
    textColor,
    titleTextColor,
    minLoanAmount,
    maxLoanAmount,
    minDebitAmount,
    maxDebitAmount,
    debitFrequency,
    debitDate,
    repeatOpportunity,
    paymentNearHoliday,
  }: {
    bgColor: string;
    textColor: string;
    titleTextColor: string;
    minLoanAmount: string | number;
    maxLoanAmount: string | number;
    minDebitAmount: string | number;
    maxDebitAmount: string | number;
    debitFrequency: string;
    debitDate: string;
    repeatOpportunity: string;
    paymentNearHoliday: string;
  } = $props();

  const getDebitFrequency = $derived.by(() => {
    if (debitFrequency) {
      if (debitFrequency === "I") {
        return "Inconsistent";
      } else if (debitFrequency === "W") {
        return "Weekly";
      } else if (debitFrequency === "B") {
        return "Bi-Weekly";
      } else if (debitFrequency === "M") {
        return "Monthly";
      } else if (debitFrequency === "S") {
        return "Semi-Monthly";
      }
    }
    return "None";
  });

  const formatDebitInfo = $derived.by(() => {
    let paymentNearHolidays = paymentNearHoliday || "None";
    if (!paymentNearHolidays || paymentNearHolidays === "None") {
      paymentNearHolidays = "";
    }else{
      paymentNearHolidays = `(${paymentNearHolidays})`;
    }
    if (!debitDate || debitDate === "None") {
      return paymentNearHolidays && paymentNearHolidays !== "None"
        ? `None (${paymentNearHolidays})`
        : "None";
    }
    const dayArray = debitDate.split(",").map((day) => day.trim());
    const formattedDays = dayArray.map((day) => {
      const dayNumber = parseInt(day, 10);
      if (!isNaN(dayNumber)) {
        return addOrdinalSuffix(dayNumber);
      }
      return day.charAt(0).toUpperCase() + day.slice(1);
    });
    return `${formattedDays.join(", ")} ${paymentNearHolidays}`.trim();
  });
  const minMaxLoanAmount = $derived.by(() => {
    if ((minLoanAmount as number) > 0 && (maxLoanAmount as number) > 0) {
      return `${convertToUSD(minLoanAmount).split(".")[0]}-${convertToUSD(maxLoanAmount).split(".")[0]}`;
    }
    return "$0";
  });
  const minMaxDebitAmount = $derived.by(() => {
    if ((minDebitAmount as number) > 0 && (maxDebitAmount as number) > 0) {
      return `${convertToUSD(minDebitAmount).split(".")[0]}-${convertToUSD(maxDebitAmount).split(".")[0]}`;
    }
    return "$0";
  });
</script>

<div
  class="{bgColor} {textColor} shadow-4xl p-6 2xl:p-6 pb-4 2xl:pb-4 rounded-md min-h-full flex flex-col gap-1"
>
  <span class="{titleTextColor} text-sm font-normal">Lending Guide</span>
  <div class="flex pt-2 text-sm justify-between">
    Min-Max Loan Amount:<span class="font-normal ml-1">
      {minMaxLoanAmount}
    </span>
  </div>
  <div class="flex pt-2 text-sm justify-between">
    Min-Max Payment Amount:<span class="font-normal ml-1">
      {minMaxDebitAmount}
    </span>
  </div>
  <div class="flex pt-2 text-sm justify-between">
    Best Debit Frequency:<span class="font-normal ml-1">
      {getDebitFrequency}
    </span>
  </div>
  <div class="flex pt-2 text-sm justify-between">
    Best Debit Day/Date:<span class="font-normal ml-1">
      {formatDebitInfo}
    </span>
  </div>
  <div class="flex pt-2 text-sm justify-between">
    Repeat Opportunity:<span class="font-normal ml-1">
      {repeatOpportunity || "N/A"}
    </span>
  </div>
</div>
