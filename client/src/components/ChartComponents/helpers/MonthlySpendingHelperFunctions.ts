export function getMonthName(monthName: number) {
  const date = new Date();
  date.setMonth(monthName - 1);

  return date.toLocaleString("en-US", { month: "long" });
}

export function getAllDaysOfMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const days: { date: string; total: number | null }[] = [];

  while (date.getMonth() === month - 1) {
    const dd = String(date.getDate()).padStart(2, "0");
    days.push({ date: `${dd}`, total: null });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export function mergeExpensesWithDays(
  allDays: { date: string; total: number | null }[],
  expenses: { date: string; total: number }[]
) {
  const expenseObj = Object.fromEntries(
    expenses.map((e) => [e.date.split("-")[2], e.total])
  );

  let runningTotal = 0;

  return allDays.map((day) => {
    const dayExpense = expenseObj[day.date];
    if (dayExpense !== undefined) {
      runningTotal += dayExpense;
    }
    return {
      date: day.date,
      total: runningTotal,
    };
  });
}