import { Box } from "@mui/material";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";
import { queryCategories } from "../../api/categories.query";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { useMonthlyExpenses } from "../../api/expenses.query";
import {
  MODAL_VIEWS,
  modalTitleMap,
  useModalView,
} from "../../hooks/useModalView";
import { useCategoryMutations } from "../../hooks/useCategoryMutations";
import { EditTargetCategory } from "../../interfaces/category";
import { ModalContent } from "../../components/Modal/ModalContent";
import { CategoryCardGrid } from "../../components/Grid/CategoryCardGrid";
import { useConfirmationDialog } from "../../hooks/useConfirmationDialog";
import { useExpenseMutations } from "../../hooks/useExpenseMutations";

export const SpendingPage = () => {
  const { data: storedCategories } = queryCategories();
  const [editTarget, setEditTarget] = useState<EditTargetCategory | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryProps | null>(null);

  const { data: monthlyExpenses, isLoading } = useMonthlyExpenses(
    new Date().getFullYear(),
    new Date().getMonth() + 1
  );

  const {
    openModal,
    modalView,
    setModalView,
    handleOpenModal,
    handleCloseModal,
  } = useModalView(MODAL_VIEWS.LIST_CATEGORIES);

  const { confirm, ConfirmationModal } = useConfirmationDialog();

  const {
    deleteCategory,
    editCategory,
    addCategory,
    addSubcategoryToExistingCategory,
  } = useCategoryMutations(setEditTarget, handleOpenModal, confirm);

  const { addExpense } = useExpenseMutations({
    setSelectedCategory,
    setModalView,
    handleOpenModal,
  });

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
          addSubcategoryToExistingCategory={addSubcategoryToExistingCategory}
          setModalView={setModalView}
          editTarget={editTarget}
          selectedCategory={selectedCategory}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          storedCategories={storedCategories}
        />
      </BasicModal>
      <ConfirmationModal />
    </Box>
  );
};
