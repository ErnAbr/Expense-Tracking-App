import { MODAL_VIEWS, ModalView } from "../../hooks/useModalView";
import { AddExpenseFormProps } from "../../interfaces/expense";
import { CategoryAccordionProps } from "../Accordion/CategoryAccordion";
import { AddCategoryFormProps } from "../Forms/CategoryForm/AddCategoryForm";
import { AddSubcategoryToExistingCategoryProps } from "../Forms/CategoryForm/addSubcategoryToExistingCategory";
import { EditCategoryFormProps } from "../Forms/CategoryForm/EditCategoryForm";
import { EditExpenseFormProps } from "../Forms/ExpenseForm/EditExpenseForm";

export type ModalComponentMap = {
  [MODAL_VIEWS.LIST_CATEGORIES]: {
    component: React.ComponentType<CategoryAccordionProps>;
    props: CategoryAccordionProps;
  };
  [MODAL_VIEWS.ADD_CATEGORY]: {
    component: React.ComponentType<AddCategoryFormProps>;
    props: AddCategoryFormProps;
  };
  [MODAL_VIEWS.ADD_SUBCATEGORY]: {
    component: React.ComponentType<AddSubcategoryToExistingCategoryProps>;
    props: AddSubcategoryToExistingCategoryProps;
  };
  [MODAL_VIEWS.EDIT_CATEGORY]: {
    component: React.ComponentType<EditCategoryFormProps>;
    props: EditCategoryFormProps;
  };
  [MODAL_VIEWS.ADD_EXPENSE]: {
    component: React.ComponentType<AddExpenseFormProps>;
    props: AddExpenseFormProps;
  };
  [MODAL_VIEWS.EDIT_EXPENSE]: {
    component: React.ComponentType<EditExpenseFormProps>;
    props: EditExpenseFormProps;
  };
};

interface ModalContentProps {
  modalView: ModalView;
  modalComponents: Partial<ModalComponentMap>;
}

export const ModalContent = ({
  modalView,
  modalComponents,
}: ModalContentProps) => {
  const entry = modalComponents[modalView as keyof typeof modalComponents];

  if (!entry) return null;

  const { component: Component, props } = entry as {
    component: React.ComponentType<any>;
    props: Record<string, any>;
  };

  return <Component {...props} />;
};
