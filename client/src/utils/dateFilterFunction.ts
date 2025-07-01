import { CategoryObject } from "../interfaces/category";
import { MontlyExpenseResponseDto } from "../interfaces/expense";

export const getMonthlyCategoryTotal = (
  category: CategoryObject,
  expenses: MontlyExpenseResponseDto[]
): number => {
  const subcategoryIds = category.subcategories.map((sub) => sub.id);

  return expenses
    .filter((exp) => subcategoryIds.includes(exp.subcategoryId))
    .reduce((total, exp) => total + exp.amount, 0);
};
