import { Dispatch, SetStateAction } from "react";
import { EditTarget } from "../../interfaces/category";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { CategoryAccordion } from "../Accordion/CategoryAccordion";
import { AddCategoryForm } from "../Forms/CategoryForm/AddCategoryForm";
import { EditCategoryForm } from "../Forms/CategoryForm/EditCategoryForm";
import { AddExpenseForm } from "../Forms/ExpenseForm/AddExpenseForm";
import { ModalView } from "../../hooks/useModalView";

interface ModalContentProps {
  modalView: string;
  editCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  addCategory: () => void;
  setModalView: Dispatch<SetStateAction<ModalView>>;
  editTarget: EditTarget | null;
  selectedCategory: SelectedCategoryProps | null;
  handleOpenModal: (newView?: ModalView) => void;
  handleCloseModal: () => void;
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
}: ModalContentProps) => {
  switch (modalView) {
    case "listCategories":
      return (
        <CategoryAccordion
          editCategory={editCategory}
          deleteCategory={deleteCategory}
          addCategory={addCategory}
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

    default:
      return null;
  }
};
