import { useState } from "react";

export const MODAL_VIEWS = {
  ADD_CATEGORY: "addCategory",
  ADD_SUBCATEGORY: "addSubcategoryToExistingCategory",
  ADD_EXPENSE: "addExpense",
  LIST_CATEGORIES: "listCategories",
  EDIT_CATEGORY: "editCategory",
  EDIT_EXPENSE: "editExpense",
  ICONS: "icons",
} as const;

export type ModalView = (typeof MODAL_VIEWS)[keyof typeof MODAL_VIEWS];

export const modalTitleMap: Record<ModalView, string> = {
  [MODAL_VIEWS.ADD_CATEGORY]: "Add Category",
  [MODAL_VIEWS.ADD_SUBCATEGORY]: "Add Subcategory",
  [MODAL_VIEWS.ADD_EXPENSE]: "Add Expense",
  [MODAL_VIEWS.LIST_CATEGORIES]: "Edit Your Categories",
  [MODAL_VIEWS.EDIT_CATEGORY]: "Edit Your Categories",
  [MODAL_VIEWS.EDIT_EXPENSE]: "Edit You Expense",
  [MODAL_VIEWS.ICONS]: "Edit Your Icons",
};

export const useModalView = (
  initialView: typeof MODAL_VIEWS.LIST_CATEGORIES
) => {
  const [openModal, setOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>(initialView);
  const [modalProps, setModalProps] = useState<Record<string, any>>({});

  const handleOpenModal = (
    newView?: ModalView,
    props: Record<string, any> = {}
  ) => {
    if (newView) setModalView(newView);
    setModalProps(props);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setModalView(MODAL_VIEWS.LIST_CATEGORIES);
    setOpen(false);
  };

  return {
    openModal,
    modalView,
    setModalView,
    handleOpenModal,
    handleCloseModal,
    modalProps,
  };
};
