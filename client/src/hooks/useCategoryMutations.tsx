import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../api/api";
import {  EditTarget } from "../interfaces/category";
import { CategoryMutationTypes } from "../interfaces/categoryMutationType";
import { MODAL_VIEWS, ModalView } from "./useModalView";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CATEGORY_QUERY_KEY } from "../api/queryKeys";
import { useConfirmationDialog } from "./useConfirmationDialog";

export const useCategoryMutations = (
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget | null>>,
  handleOpenModal: (view?: ModalView) => void,
  confirm: ReturnType<typeof useConfirmationDialog>["confirm"]
) => {
  const queryClient = useQueryClient();

  const deleteCategory = async ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();

    const confirmed = await confirm({
      title: "Confirm Deletion",
      description: "Are you sure you want to delete this category?",
    });

    if (!confirmed) return;

    try {
      const response = await api.Category.deleteUserCatOrSub({ id, type });
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: [CATEGORY_QUERY_KEY] });
      handleOpenModal(MODAL_VIEWS.LIST_CATEGORIES);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const editCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    setEditTarget({ id, type });
    handleOpenModal(MODAL_VIEWS.EDIT_CATEGORY);
  };

  const addCategory = () => {
    handleOpenModal(MODAL_VIEWS.ADD_CATEGORY);
  };

  const addSubcategoryToExistingCategory = (category: {
    id: number;
    name: string;
  }) => {
    setEditTarget({ id: category.id, type: "cat" });
    handleOpenModal(MODAL_VIEWS.ADD_SUBCATEGORY);
  };

  return {
    deleteCategory,
    editCategory,
    addCategory,
    addSubcategoryToExistingCategory,
  };
};
