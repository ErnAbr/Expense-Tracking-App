import styles from "./dataPage.module.scss";
import { useState } from "react";
import { queryBudget } from "../../api/budget.query";
import { queryCategories } from "../../api/categories.query";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { Box, Typography } from "@mui/material";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { budgetAndExpenseMerger } from "../../utils/budgetAndExpenseMerger";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useForm } from "react-hook-form";
import { FormDropdown } from "../../components/FormComponents/FormDropdown/FormDropdown";

//add labels to graphs, add total spending graph
//make graphs responsive
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

  const merged = budgetAndExpenseMerger(
    storedCategories ?? [],
    userBudget ?? [],
    monthlyExpenses ?? []
  );

  const { control, watch } = useForm({
    defaultValues: { selectedCategoryId: "" },
  });

  const selectedCategoryId = watch("selectedCategoryId");
  const selectedCategory =
    merged.find((cat) => cat.categoryId.toString() === selectedCategoryId) ||
    null;

  if (isLoading) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  console.log(selectedCategoryId);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={3}
      className={styles.dataPageContainer}
    >
      <FormDropdown
        name="selectedCategoryId"
        control={control}
        label="Select Category"
        options={merged.map((cat) => ({
          label: cat.categoryName,
          value: cat.categoryId.toString(),
        }))}
      />

      {selectedCategory && (
        <Box key={selectedCategory.categoryId} m={3}>
          <Typography variant="h4" textAlign="center" p={2}>
            {selectedCategory.categoryName}
          </Typography>

          <BarChart
            width={600}
            height={300}
            data={selectedCategory.subcategory.map((sub) => ({
              name: sub.subcategoryName,
              spent: sub.totalSpentBySubcategory,
              planned: sub.plannedExpenses,
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="spent" fill="#8884d8" />
            <Bar dataKey="planned" fill="#82ca9d" />
          </BarChart>
        </Box>
      )}
    </Box>
  );
};
