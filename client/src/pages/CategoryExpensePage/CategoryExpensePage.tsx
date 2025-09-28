import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";
import { useEffect, useState } from "react";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { queryCategories } from "../../api/categories.query";
import { toast } from "react-toastify";
import { FullWidhtTab } from "../../components/Tabs/FullWidthTab";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { MonthFilter } from "../../components/FilterComponents/MonthFilter/MonthFilter";

export const CategoryExpensePage = () => {
  const [filterExpenseMonth, setFilterExpenseMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const { data: storedCategories } = queryCategories();
  const { control, watch, setValue } = useForm();

  const selectedMonth = watch("filterMonth");

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { data: monthlyExpenses } = useMonthlyExpenses(
    filterExpenseMonth.year,
    filterExpenseMonth.month
  );

  const expenseCategoryData = storedCategories?.find(
    (cat) => cat.id === Number(categoryId)
  );

  const categoryExpense = monthlyExpenses?.filter(
    (exp) => exp.categoryId === Number(categoryId)
  );

  useEffect(() => {
    if (selectedMonth) {
      const year = dayjs(selectedMonth).year();
      const month = dayjs(selectedMonth).month() + 1;
      setFilterExpenseMonth({ year, month });
    }
  }, [selectedMonth]);

  useEffect(() => {
    if (storedCategories && !expenseCategoryData) {
      toast.error("Category Not Found");
    }
  }, [storedCategories, expenseCategoryData]);

  return (
    <Box display="flex" flexDirection="column">
      <MonthFilter
        name={`Your ${expenseCategoryData?.name || ""} Expenses`}
        control={control}
        setValue={setValue}
      />
      <FullWidhtTab
        expenseCategoryData={expenseCategoryData}
        categoryExpense={categoryExpense}
      />
      <Button
        variant="contained"
        color="error"
        onClick={() => navigate(routes.SPENDING)}
        sx={{ alignSelf: "center" }}
      >
        go back to spending page
      </Button>
    </Box>
  );
};
