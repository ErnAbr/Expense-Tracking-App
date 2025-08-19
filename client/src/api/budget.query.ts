import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { BUDGET_QUERY_KEY } from "./queryKeys";

const fetchBudget = async () => {
  return await api.Budget.GetAllUserBudget();
};

export const queryBudget = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [BUDGET_QUERY_KEY],
    queryFn: fetchBudget,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled,
  });
};
