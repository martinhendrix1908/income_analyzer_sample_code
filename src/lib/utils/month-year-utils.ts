import type { MonthlyBreakdown } from "$lib/types/report.types";
import type { MonthYearProp } from "$lib/types/types";

export const findEndMonthAndYear = (
  monthlyBreakdown: MonthlyBreakdown[]
): MonthYearProp => {
  let maxMonth = 0;
  let maxYear = 0;

  if (!monthlyBreakdown?.length) return { month: 0, year: 0 };
  for (const entry of monthlyBreakdown) {
    if (
      entry?.year > maxYear ||
      (entry?.year === maxYear && entry?.month > maxMonth)
    ) {
      maxYear = entry?.year;
      maxMonth = entry?.month;
    }
  }

  return { month: maxMonth - 1, year: maxYear };
};
export const findStartMonthAndYear = (
  monthlyBreakdown: MonthlyBreakdown[]
): MonthYearProp => {
  let minMonth = Infinity;
  let minYear = Infinity;

  for (const entry of monthlyBreakdown) {
    if (
      entry.year < minYear ||
      (entry.year === minYear && entry.month < minMonth)
    ) {
      minYear = entry.year;
      minMonth = entry.month;
    }
  }

  return { month: minMonth - 1, year: minYear };
};