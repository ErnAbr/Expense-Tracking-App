import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../navigation/routes/routes";
import { useEffect, useState } from "react";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { queryCategories } from "../../api/categories.query";
import { toast } from "react-toastify";

// make not found page
// start working on displaying monthly subcategory data using tabs from material ui

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

  const categoryExpense = monthlyExpenses?.find(
    (exp) => exp.categoryId === Number(categoryId)
  );

  useEffect(() => {
    if (storedCategories && !expenseCategoryData) {
      toast.error("Category Not Found");
    }
  }, [storedCategories, expenseCategoryData]);

  return (
    <div>
      <h2>Hello This Is CategoryExpensePage</h2>
      <button onClick={() => navigate(routes.SPENDING)}>
        go back to spending page
      </button>
    </div>
  );
};
