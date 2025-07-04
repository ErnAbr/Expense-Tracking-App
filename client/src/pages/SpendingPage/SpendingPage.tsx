import { Box } from "@mui/material";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";
import { queryCategories } from "../../api/categories.query";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { modalTitleMap, useModalView } from "../../hooks/useModalView";
import { useCategoryMutations } from "../../hooks/useCategoryMutations";
import { EditTarget } from "../../interfaces/category";
import { ModalContent } from "../../components/Modal/ModalContent";
import { CategoryCardGrid } from "../../components/Grid/CategoryCardGrid";

export const SpendingPage = () => {
  const { data: storedCategories } = queryCategories();
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryProps | null>(null);

  const filterExpenseMonth = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  };

  const { data: monthlyExpenses, isLoading } = useMonthlyExpenses(
    filterExpenseMonth.year,
    filterExpenseMonth.month
  );

  const {
    openModal,
    modalView,
    setModalView,
    handleOpenModal,
    handleCloseModal,
  } = useModalView();

  const { deleteCategory, editCategory, addCategory } = useCategoryMutations(
    setEditTarget,
    handleOpenModal
  );

  const addExpense = (category: SelectedCategoryProps | null) => {
    setSelectedCategory(category);
    setModalView("addExpense");
    handleOpenModal();
  };

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <CategoryCardGrid
        storedCategories={storedCategories}
        monthlyExpenses={monthlyExpenses}
        isLoading={isLoading}
        addExpense={addExpense}
        handleOpenModal={handleOpenModal}
      />
      <BasicModal
        title={modalTitleMap[modalView]}
        open={openModal}
        onClose={handleCloseModal}
      >
        <ModalContent
          modalView={modalView}
          editCategory={editCategory}
          deleteCategory={deleteCategory}
          addCategory={addCategory}
          setModalView={setModalView}
          editTarget={editTarget}
          selectedCategory={selectedCategory}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </BasicModal>
    </Box>
  );
};
