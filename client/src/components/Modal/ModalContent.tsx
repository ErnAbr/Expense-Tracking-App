import { Dispatch, SetStateAction } from "react";
import { CategoryObject, EditTarget } from "../../interfaces/category";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { CategoryAccordion } from "../Accordion/CategoryAccordion";
import { AddCategoryForm } from "../Forms/CategoryForm/AddCategoryForm";
import { EditCategoryForm } from "../Forms/CategoryForm/EditCategoryForm";
import { AddExpenseForm } from "../Forms/ExpenseForm/AddExpenseForm";
import { ModalView } from "../../hooks/useModalView";
import { AddSubcategoryToExistingCateogry } from "../Forms/CategoryForm/addSubcategoryToExistingCateogry";

interface ModalContentProps {
  modalView: string;
  editCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  addCategory: () => void;
  addSubcategoryToExistingCategory: (category: {
    id: number;
    name: string;
  }) => void;
  setModalView: Dispatch<SetStateAction<ModalView>>;
  editTarget: EditTarget | null;
  selectedCategory: SelectedCategoryProps | null;
  handleOpenModal: (newView?: ModalView) => void;
  handleCloseModal: () => void;
  storedCategories: CategoryObject[] | undefined;
}

export const ModalContent = ({
  modalView,
  editCategory,
  deleteCategory,
  addCategory,
  setModalView,
  editTarget,
  selectedCategory,
  handleOpenModal,
  handleCloseModal,
  addSubcategoryToExistingCategory,
  storedCategories,
}: ModalContentProps) => {
  switch (modalView) {
    case "listCategories":
      return (
        <CategoryAccordion
          editCategory={editCategory}
          deleteCategory={deleteCategory}
          addCategory={addCategory}
          addSubcategoryToExistingCategory={addSubcategoryToExistingCategory}
        />
      );

    case "editCategory":
      return (
        <EditCategoryForm
          setModalView={setModalView}
          editTarget={editTarget}
          deleteCategory={deleteCategory}
        />
      );

    case "addCategory":
      return <AddCategoryForm setModalView={setModalView} />;

    case "addExpense":
      return selectedCategory ? (
        <AddExpenseForm
          category={selectedCategory}
          setOpenModal={() => handleOpenModal("addExpense")}
          handleCloseModal={handleCloseModal}
        />
      ) : null;

    case "addSubcategoryToExistingCateogry":
      const fullCategory = storedCategories?.find(
        (cat) => cat.id === editTarget?.id
      );

      return fullCategory ? (
        <AddSubcategoryToExistingCateogry category={fullCategory} />
      ) : null;

    default:
      return null;
  }
};
