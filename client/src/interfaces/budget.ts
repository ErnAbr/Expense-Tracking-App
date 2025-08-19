export type BudgetClientPayload = {
  subcategoryId: number;
  plannedExpense: number;
};

export type BudgetServerResponse = {
  id: number;
  userId: number;
  subcategoryId: number;
  plannedExpense: number;
};
