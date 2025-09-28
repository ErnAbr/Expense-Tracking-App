import styles from "./dataPage.module.scss";
import { useEffect, useState } from "react";
import { queryBudget } from "../../api/budget.query";
import { queryCategories } from "../../api/categories.query";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { Box, Typography } from "@mui/material";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { budgetAndExpenseMerger } from "../../utils/budgetAndExpenseMerger";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/FormComponents/FormDropdown/FormDropdown";
import { SubcategorySpendingBarChart } from "../../components/ChartComponents/SubcategorySpendingBarChart";
import { accumulateExpensesByDay } from "../../utils/accumulateExpensesByDay";
import { MonthlySpendingLineGraph } from "../../components/ChartComponents/MonthlySpendingLineGraph";
import { MonthFilter } from "../../components/FilterComponents/MonthFilter/MonthFilter";
import dayjs from "dayjs";

export const DataPage = () => {
  const [filterDataMonth, setFilterDataMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { data: storedCategories, isLoading } = queryCategories();
  const { data: monthlyExpenses } = useMonthlyExpenses(
    filterDataMonth.year,
    filterDataMonth.month
  );
  const { data: userBudget } = queryBudget(
    filterDataMonth.year,
    filterDataMonth.month
  );

  const sumOfExpenses = accumulateExpensesByDay(monthlyExpenses ?? []);

  const budgetAndExpenseObject = budgetAndExpenseMerger(
    storedCategories ?? [],
    userBudget ?? [],
    monthlyExpenses ?? []
  );

  const { control: categoryControl, watch: watchCategory } = useForm({
    defaultValues: { selectedCategoryId: "" },
  });

  const { control: monthControl, watch: watchMonth, setValue } = useForm();

  const selectedMonth = watchMonth("filterMonth");
  const selectedCategoryId = watchCategory("selectedCategoryId");

  useEffect(() => {
    if (selectedMonth) {
      const year = dayjs(selectedMonth).year();
      const month = dayjs(selectedMonth).month() + 1;
      setFilterDataMonth({ year, month });
    }
  }, [selectedMonth]);

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
      className={styles.dataPageContainer}
    >
      <MonthFilter
        name="Your Spending Data"
        control={monthControl}
        setValue={setValue}
      />
      {sumOfExpenses ? (
        <MonthlySpendingLineGraph sumOfExpenses={sumOfExpenses} />
      ) : (
        <Typography variant="h2" margin={5}>
          No expenses found
        </Typography>
      )}
      <FormDropdown
        name="selectedCategoryId"
        control={categoryControl}
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
