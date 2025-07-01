import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { EXPENSE_QUERY_KEY } from "./queryKeys";

export const useMonthlyExpenses = (
  year: number,
  month: number,
  enabled: boolean = true
) => {
  const fetchMonthlyExpenses = async () => {
    return await api.Expense.GetMontlyUserExpense(year, month);
  };

  return useQuery({
    queryKey: [EXPENSE_QUERY_KEY, year, month],
    queryFn: fetchMonthlyExpenses,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled,
  });
};
