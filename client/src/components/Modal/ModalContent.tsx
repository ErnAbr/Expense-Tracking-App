import { Dispatch, SetStateAction } from "react";
import { CategoryObject, EditTargetCategory } from "../../interfaces/category";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { CategoryAccordion } from "../Accordion/CategoryAccordion";
import { AddCategoryForm } from "../Forms/CategoryForm/AddCategoryForm";
import { EditCategoryForm } from "../Forms/CategoryForm/EditCategoryForm";
import { AddExpenseForm } from "../Forms/ExpenseForm/AddExpenseForm";
import { MODAL_VIEWS, ModalView } from "../../hooks/useModalView";
import { AddSubcategoryToExistingCategory } from "../Forms/CategoryForm/addSubcategoryToExistingCateogry";


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
  editTarget: EditTargetCategory | null;
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
    case MODAL_VIEWS.LIST_CATEGORIES:
      return (
        <CategoryAccordion
          editCategory={editCategory}
          deleteCategory={deleteCategory}
          addCategory={addCategory}
          addSubcategoryToExistingCategory={addSubcategoryToExistingCategory}
        />
      );

    case MODAL_VIEWS.EDIT_CATEGORY:
      return (
        <EditCategoryForm
          setModalView={setModalView}
          editTarget={editTarget}
          deleteCategory={deleteCategory}
        />
      );

    case MODAL_VIEWS.ADD_CATEGORY:
      return <AddCategoryForm setModalView={setModalView} />;

    case MODAL_VIEWS.ADD_EXPENSE:
      return selectedCategory ? (
        <AddExpenseForm
          category={selectedCategory}
          setOpenModal={() => handleOpenModal(MODAL_VIEWS.ADD_EXPENSE)}
          handleCloseModal={handleCloseModal}
        />
      ) : null;

    case MODAL_VIEWS.ADD_SUBCATEGORY:
      const fullCategory = storedCategories?.find(
        (cat) => cat.id === editTarget?.id
      );

      return fullCategory ? (
        <AddSubcategoryToExistingCategory category={fullCategory} setModalView={setModalView} />
      ) : null;
    

    default:
      return null;
  }
};
