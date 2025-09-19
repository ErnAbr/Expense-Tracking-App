import styles from "./dataPage.module.scss";
import { useState } from "react";
import { queryBudget } from "../../api/budget.query";
import { queryCategories } from "../../api/categories.query";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { Box } from "@mui/material";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { budgetAndExpenseMerger } from "../../utils/budgetAndExpenseMerger";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/FormComponents/FormDropdown/FormDropdown";
import { SubcategorySpendingBarChart } from "../../components/ChartComponents/SubcategorySpendingBarChart";
import { accumulateExpensesByDay } from "../../utils/accumulateExpensesByDay";
import { MonthlySpendingLineGraph } from "../../components/ChartComponents/MonthlySpendingLineGraph";

//add line graph of daily expenses use monthlyExpenses
//add monthly filtering for the data

export const DataPage = () => {
  const [filterBudgetMonth, setFilterBudgetMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { data: storedCategories, isLoading } = queryCategories();
  const { data: monthlyExpenses } = useMonthlyExpenses(
    filterBudgetMonth.year,
    filterBudgetMonth.month
  );
  const { data: userBudget } = queryBudget(
    filterBudgetMonth.year,
    filterBudgetMonth.month
  );

  const sumOfExpenses = accumulateExpensesByDay(monthlyExpenses ?? []);

  const budgetAndExpenseObject = budgetAndExpenseMerger(
    storedCategories ?? [],
    userBudget ?? [],
    monthlyExpenses ?? []
  );

  const { control, watch } = useForm({
    defaultValues: { selectedCategoryId: "" },
  });

  const selectedCategoryId = watch("selectedCategoryId");
  const selectedCategory =
    budgetAndExpenseObject.find(
      (cat) => cat.categoryId.toString() === selectedCategoryId
    ) || null;

  if (isLoading) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={3}
      className={styles.dataPageContainer}
    >
      {sumOfExpenses && (
        <MonthlySpendingLineGraph sumOfExpenses={sumOfExpenses} />
      )}
      <FormDropdown
        name="selectedCategoryId"
        control={control}
        label="Select Category"
        options={budgetAndExpenseObject.map((cat) => ({
          label: cat.categoryName,
          value: cat.categoryId.toString(),
        }))}
      />
      {selectedCategory && (
        <SubcategorySpendingBarChart selectedCategory={selectedCategory} />
      )}
    </Box>
  );
};
