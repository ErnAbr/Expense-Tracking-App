import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { CategoryDeleteData, EditTarget } from "../interfaces/category";
import { CategoryMutationTypes } from "../interfaces/categoryMutationType";
import { ModalView } from "./useModalView";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const useCategoryMutations = (
  setEditTarget: React.Dispatch<React.SetStateAction<EditTarget | null>>,
  handleOpenModal: (view?: ModalView) => void
) => {
  const queryClient = useQueryClient();

  const deleteCategory = async ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    const payload: CategoryDeleteData = { id, type };
    try {
      const response = await api.Category.deleteUserCatOrSub(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      handleOpenModal("listCategories");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const editCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    setEditTarget({ id, type });
    handleOpenModal("editCategory");
  };

  const addCategory = () => {
    handleOpenModal("addCategory");
  };

  const addSubcategoryToExistingCategory = (category: { id: number; name: string }) => {
    setEditTarget({ id: category.id, type: "cat" });
    handleOpenModal("addSubcategoryToExistingCateogry");
  };

  return {
    deleteCategory,
    editCategory,
    addCategory,
    addSubcategoryToExistingCategory,
  };
};
