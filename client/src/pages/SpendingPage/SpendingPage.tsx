import { Box } from "@mui/material";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";
import { CategoryAccordion } from "../../components/Accordion/CategoryAccordion";
import { EditCategoryForm } from "../../components/Forms/CategoryForm/EditCategoryForm";
import { AddCategoryForm } from "../../components/Forms/CategoryForm/AddCategoryForm";
import { queryCategories } from "../../api/categories.query";
import { AddExpenseForm } from "../../components/Forms/ExpenseForm/AddExpenseForm";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { getMonthlyCategoryTotal } from "../../utils/dateFilterFunction";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { modalTitleMap, useModalView } from "../../hooks/useModalView";
import { useCategoryMutations } from "../../hooks/useCategoryMutations";
import { EditTarget } from "../../interfaces/category";

const getGridSizeByBreakpoint = (count: number) => ({
  xs: 12,
  sm: count === 0 ? 12 : count === 1 ? 12 : 6,
  md: count === 0 ? 12 : count === 1 ? 6 : 4,
});

// refactor some logic from this component into custom hooks
// make check expenses page and pass setFilterExpenseMonth prop

export const SpendingPage = () => {
  const currentDate = new Date();
  const { data: storedCategories } = queryCategories();
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryProps | null>(null);
  const [filterExpenseMonth, setFilterExpenseMonth] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  const { data: monthlyExpenses, isLoading } = useMonthlyExpenses(
    filterExpenseMonth.year,
    filterExpenseMonth.month
  );

  const gridSize = getGridSizeByBreakpoint(storedCategories?.length || 0);

  const {
    openModal,
    modalView,
    setModalView,
    handleOpenModal,
    handleCloseModal,
  } = useModalView();

const { deleteCategory, editCategory, addCategory } = useCategoryMutations(
  setEditTarget,
  handleOpenModal,
);

  const addExpense = (category: SelectedCategoryProps | null) => {
    setSelectedCategory(category);
    setModalView("addExpense");
    handleOpenModal();
  };

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={1}
        sx={{
          width:
            storedCategories?.length === 0
              ? { xs: "70%", md: "40%", xl: "25%" }
              : undefined,
        }}
      >
        {storedCategories?.map((category) => {
          const expenseAmount = monthlyExpenses
            ? getMonthlyCategoryTotal(category, monthlyExpenses)
            : 0;

          return (
            <Grid size={gridSize} key={category.id}>
              <CategoryCard
                name={category.name}
                iconName={category.iconName}
                expenseAmount={expenseAmount}
                isLoadingExpenses={isLoading}
                onClick={() =>
                  addExpense({
                    id: category.id,
                    name: category.name,
                    iconName: category.iconName,
                  })
                }
              />
            </Grid>
          );
        })}
        <Grid onClick={() => handleOpenModal("listCategories")} size={gridSize}>
          <CategoryCard iconName="CiCirclePlus" />
        </Grid>
      </Grid>

      <BasicModal
        title={modalTitleMap[modalView]}
        open={openModal}
        onClose={handleCloseModal}
      >
        {modalView === "listCategories" && (
          <CategoryAccordion
            editCategory={editCategory}
            deleteCategory={deleteCategory}
            addCategory={addCategory}
          />
        )}
        {modalView === "editCategory" && (
          <EditCategoryForm
            setModalView={setModalView}
            editTarget={editTarget}
            deleteCategory={deleteCategory}
          />
        )}
        {modalView === "addCategory" && (
          <AddCategoryForm setModalView={setModalView} />
        )}
        {modalView === "addExpense" && selectedCategory && (
          <AddExpenseForm
            category={selectedCategory}
            setOpenModal={() => handleOpenModal("addExpense")}
            handleCloseModal={handleCloseModal}
          />
        )}
      </BasicModal>
    </Box>
  );
};
