export type BudgetClientPayload = {
  subcategoryId: number;
  plannedExpense: number;
  plannedExpenseDate: string;
};

export type BudgetServerResponse = {
  id: number;
  userId: number;
  subcategoryId: number;
  plannedExpense: number;
  plannedExpenseDate: string;
};
