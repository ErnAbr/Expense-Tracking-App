import styles from "./categoryExpensePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";
import { useEffect, useState } from "react";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { queryCategories } from "../../api/categories.query";
import { toast } from "react-toastify";
import { FullWidhtTab } from "../../components/Tabs/FullWidthTab";
import { Box, Button, Typography } from "@mui/material";
import { FormDatePicker } from "../../components/FormComponents/FormDatePicker/FormDatePicker";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

// add edit and delete to expenses
// CategoryExpensePage -> FullWidthTab -> ExpenseDisplayTable

export const CategoryExpensePage = () => {
  const [filterExpenseMonth, setFilterExpenseMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const { control, watch, setValue } = useForm();

  const selectedMonth = watch("filterMonth");

  const navigate = useNavigate();
  const { categoryId } = useParams();

  const { data: monthlyExpenses } = useMonthlyExpenses(
    filterExpenseMonth.year,
    filterExpenseMonth.month
  );

  const { data: storedCategories } = queryCategories();

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
      <Typography
        variant="h6"
        alignSelf="center"
        p={2}
      >{`Your ${expenseCategoryData?.name} Expenses`}</Typography>
      <Box className={styles.monthFilterBox}>
        <FormDatePicker
          label="Filter Expenses"
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
