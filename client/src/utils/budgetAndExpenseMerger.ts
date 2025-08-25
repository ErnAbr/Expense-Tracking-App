import { BudgetServerResponse } from "../interfaces/budget";
import { CategoryObject } from "../interfaces/category";
import { MergedObjects } from "../interfaces/datasetTypes";
import { MontlyExpenseResponseDto } from "../interfaces/expense";

export const budgetAndExpenseMerger = (
  categories: CategoryObject[],
  budgets: BudgetServerResponse[],
  monthlyExpenses: MontlyExpenseResponseDto[]
): MergedObjects[] => {
  return categories.map((category) => {
    let totalSpentByCategory = 0;

    const subcategory = category.subcategories.map((sub) => {
      const plannedExpenses = budgets
        .filter((b) => b.subcategoryId === sub.id)
        .reduce((sum, b) => sum + b.plannedExpense, 0);

      const totalSpentBySubcategory = monthlyExpenses
        .filter((e) => e.subcategoryId === sub.id)
        .reduce((sum, e) => sum + e.amount, 0);

      totalSpentByCategory += totalSpentBySubcategory;

      return {
        subcategoryId: sub.id,
        subcategoryName: sub.name,
        subcategoryIconName: sub.iconName,
        totalSpentBySubcategory,
        plannedExpenses,
      };
    });

    return {
      categoryId: category.id,
      categoryName: category.name,
      categoryIconName: category.iconName,
      totalSpentByCategory,
      subcategory,
    };
  });
};
