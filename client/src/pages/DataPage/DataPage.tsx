import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryBudget } from "../../api/budget.query";
import { queryCategories } from "../../api/categories.query";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { Box } from "@mui/material";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { budgetAndExpenseMerger } from "../../utils/budgetAndExpenseMerger";

export const DataPage = () => {
  const [filterBudgetMonth, setFilterBudgetMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const queryClient = useQueryClient();
  const { data: storedCategories, isLoading } = queryCategories();
  const { data: monthlyExpenses } = useMonthlyExpenses(
    filterBudgetMonth.year,
    filterBudgetMonth.month
  );
  const { data: userBudget } = queryBudget(
    filterBudgetMonth.year,
    filterBudgetMonth.month
  );

  const merged = budgetAndExpenseMerger(
    storedCategories ?? [],
    userBudget ?? [],
    monthlyExpenses ?? []
  );

  console.log("merged", merged);

  if (isLoading) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  return <h1>This is Data Page</h1>;
};
