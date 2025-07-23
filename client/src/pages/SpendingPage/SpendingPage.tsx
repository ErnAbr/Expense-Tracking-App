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
import { CategoryAccordion } from "../../components/Accordion/CategoryAccordion";
import { AddCategoryForm } from "../../components/Forms/CategoryForm/AddCategoryForm";
import { EditCategoryForm } from "../../components/Forms/CategoryForm/EditCategoryForm";
import { AddExpenseForm } from "../../components/Forms/ExpenseForm/AddExpenseForm";
import { AddSubcategoryToExistingCategory } from "../../components/Forms/CategoryForm/addSubcategoryToExistingCategory";

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
          modalComponents={{
            [MODAL_VIEWS.LIST_CATEGORIES]: {
              component: CategoryAccordion,
              props: {
                editCategory,
                deleteCategory,
                addCategory,
                addSubcategoryToExistingCategory,
              },
            },
            [MODAL_VIEWS.EDIT_CATEGORY]: {
              component: EditCategoryForm,
              props: {
                setModalView,
                editTarget,
                deleteCategory,
              },
            },
            [MODAL_VIEWS.ADD_CATEGORY]: {
              component: AddCategoryForm,
              props: {
                setModalView,
              },
            },
            [MODAL_VIEWS.ADD_EXPENSE]: {
              component: AddExpenseForm,
              props: {
                category: selectedCategory!,
                setOpenModal: () => handleOpenModal(MODAL_VIEWS.ADD_EXPENSE),
                handleCloseModal,
              },
            },
            [MODAL_VIEWS.ADD_SUBCATEGORY]: {
              component: AddSubcategoryToExistingCategory,
              props: {
                category: storedCategories?.find(
                  (cat) => cat.id === editTarget?.id
                )!,
                setModalView,
              },
            },
          }}
        />
      </BasicModal>
      <ConfirmationModal />
    </Box>
  );
};
