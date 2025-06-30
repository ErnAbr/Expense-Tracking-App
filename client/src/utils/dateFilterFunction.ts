import { CategoryObject } from "../interfaces/category";

export const getTotalCurrentMonthExpensesForCategory = (
  category: CategoryObject
) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return category.subcategories.reduce((total, sub) => {
    const currentMonthExpenses = sub.expenses.filter((exp) => {
      const expDate = new Date(exp.amountDate);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear
      );
    });

    const subTotal = currentMonthExpenses.reduce(
      (sum, exp) => sum + exp.amount,
      0
    );

    return total + subTotal;
  }, 0);
};
