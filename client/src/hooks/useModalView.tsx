import { useState } from "react";

export type ModalView =
  | "listCategories"
  | "editCategory"
  | "addCategory"
  | "icons"
  | "addExpense"
  | "addSubcategoryToExistingCateogry";

export const modalTitleMap: Record<ModalView, string> = {
  addCategory: "Add Category",
  addSubcategoryToExistingCateogry: "Add Subcategory",
  addExpense: "Add Expense",
  listCategories: "Edit Your Categories",
  editCategory: "Edit Your Categories",
  icons: "Edit Your Categories",
};

export const useModalView = (initialView: ModalView = "listCategories") => {
  const [openModal, setOpen] = useState(false);
  const [modalView, setModalView] = useState<ModalView>(initialView);

  const handleOpenModal = (newView?: ModalView) => {
    if (newView) setModalView(newView);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setModalView("listCategories");
    setOpen(false);
  };

  return {
    openModal,
    modalView,
    setModalView,
    handleOpenModal,
    handleCloseModal,
  };
};
