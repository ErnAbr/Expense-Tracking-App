import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { BUDGET_QUERY_KEY } from "./queryKeys";

const fetchBudget = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}) => {
  const [, year, month] = queryKey;
  return await api.Budget.GetAllUserBudget(year, month);
};

export const queryBudget = (
  year: number,
  month: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: [BUDGET_QUERY_KEY, year, month],
    queryFn: fetchBudget,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled,
  });
};
