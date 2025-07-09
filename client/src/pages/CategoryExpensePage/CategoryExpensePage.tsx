import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";
import { useEffect, useState } from "react";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { queryCategories } from "../../api/categories.query";
import { toast } from "react-toastify";
import { FullWidhtTab } from "../../components/Tabs/FullWidthTab";
import { Box, Button, Typography } from "@mui/material";

// make an API to accept subcategoryAdd
// make information in your Tabs prettier
// add table to tabs where data can be represented and filtered

export const CategoryExpensePage = () => {
  const [filterExpenseMonth, setFilterExpenseMonth] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

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
