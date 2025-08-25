import styles from "./budgetPage.module.scss";
import debounce from "lodash/debounce";
import { Box, Button, Typography } from "@mui/material";
import { queryCategories } from "../../api/categories.query";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { queryBudget } from "../../api/budget.query";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import axios from "axios";
import { BUDGET_QUERY_KEY } from "../../api/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { FormDatePicker } from "../../components/FormComponents/FormDatePicker/FormDatePicker";
import dayjs from "dayjs";
import { BudgetingDisplayTable } from "../../components/Table/BudgetingDisplayTable";

export const BudgetPage = () => {
  const [filterBudgetMonth, setFilterBudgetMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const queryClient = useQueryClient();
  const { data: storedCategories, isLoading } = queryCategories();
  const { data: monthlyExpenses, isLoading: isLoadingExpenses } =
    useMonthlyExpenses(filterBudgetMonth.year, filterBudgetMonth.month);
  const { data: userBudget, isLoading: isLoadingBudget } = queryBudget(
    filterBudgetMonth.year,
    filterBudgetMonth.month
  );

  const { control, watch, setValue, reset } = useForm();
  const selectedMonth = watch("filterMonth");

  useEffect(() => {
    if (selectedMonth) {
      const year = dayjs(selectedMonth).year();
      const month = dayjs(selectedMonth).month() + 1;
      setFilterBudgetMonth({ year, month });
      reset((formValues) => ({
        filterMonth: formValues.filterMonth,
      }));
    }
  }, [selectedMonth]);

  const debouncedBudgetUpdate = useMemo(() => {
    return debounce(async (subcategoryId: number, plannedExpense: number) => {
      const payload = {
        subcategoryId: subcategoryId,
        plannedExpense: plannedExpense,
        plannedExpenseDate: dayjs()
          .year(filterBudgetMonth.year)
          .month(filterBudgetMonth.month)
          .startOf("month")
          .toISOString(),
      };

      try {
        await api.Budget.AddSubcategoryBudget(payload);
        queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY_KEY] });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data);
        }
      }
    }, 500);
  }, [filterBudgetMonth, queryClient]);

  if (isLoading) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  return (
    <Box mb={2}>
      <Box className={styles.monthFilterBox} marginTop={2}>
        <Typography
          variant="h6"
          textAlign="center"
          p={1}
        >{`Your Budget Plan`}</Typography>
        <FormDatePicker
          label="Budget Month"
          name="filterMonth"
          control={control}
          views={["year", "month"]}
          format="MM/YYYY"
        />
        <Button
          size="small"
          color="info"
          variant="contained"
          onClick={() => setValue("filterMonth", dayjs())}
        >
          This Month
        </Button>
      </Box>
      <BudgetingDisplayTable
        storedCategories={storedCategories}
        userBudget={userBudget}
        monthlyExpenses={monthlyExpenses}
        control={control}
        debouncedBudgetUpdate={debouncedBudgetUpdate}
        isLoadingBudget={isLoadingBudget}
        isLoadingExpenses={isLoadingExpenses}
      />
    </Box>
  );
};
