import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { CATEGORY_QUERY_KEY } from "./queryKeys";

const fetchCategories = async () => {
  return await api.Category.getAllUserCategories();
};

export const queryCategories = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [CATEGORY_QUERY_KEY],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled,
  });
};
