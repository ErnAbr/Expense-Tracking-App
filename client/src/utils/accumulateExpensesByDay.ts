import { MontlyExpenseResponseDto } from "../interfaces/expense";

export const accumulateExpensesByDay = (
  expenses: MontlyExpenseResponseDto[]
) => {
  const sorted = [...expenses].sort(
    (a, b) =>
      new Date(a.amountDate).getTime() - new Date(b.amountDate).getTime()
  );

  const dailyTotals: Record<string, number> = {};
  sorted.forEach((exp) => {
    const dateKey = exp.amountDate.split("T")[0];
    dailyTotals[dateKey] = (dailyTotals[dateKey] ?? 0) + exp.amount;
  });

  let runningTotal = 0;
  return Object.entries(dailyTotals).map(([date, dailySum]) => {
    runningTotal += dailySum;
    return { date, total: runningTotal };
  });
};
