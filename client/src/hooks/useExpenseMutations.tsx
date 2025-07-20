import axios from "axios";
import { SelectedCategoryProps } from "../interfaces/expense";
import { ExpenseMutationTypes } from "../interfaces/expenseMutationTypes";
import { useConfirmationDialog } from "./useConfirmationDialog";
import { MODAL_VIEWS, ModalView } from "./useModalView";
import { toast } from "react-toastify";
import { api } from "../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { EXPENSE_QUERY_KEY } from "../api/queryKeys";

interface ExpenseMutationsProps {
  setSelectedCategory?: (category: SelectedCategoryProps | null) => void;
  setModalView?: (view: ModalView) => void;
  handleOpenModal?: () => void;
  confirm?: ReturnType<typeof useConfirmationDialog>["confirm"];
}

export const useExpenseMutations = ({
  setSelectedCategory,
  setModalView,
  handleOpenModal,
  confirm,
}: ExpenseMutationsProps) => {
  const queryClient = useQueryClient();

  const addExpense = (category: SelectedCategoryProps | null) => {
    setSelectedCategory?.(category);
    setModalView?.(MODAL_VIEWS.ADD_EXPENSE);
    handleOpenModal?.();
  };

  const deleteExpense = async ({ e, id }: ExpenseMutationTypes) => {
    e.stopPropagation();

    if (!confirm) return;

    const confirmed = await confirm({
      title: "Confirm Deletion",
      description: "Are Your Sure You Want To Delete This Expense?",
    });

    if (!confirmed) return;

    try {
      const response = await api.Expense.DeleteExpense(id);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: [EXPENSE_QUERY_KEY] });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  return { addExpense, deleteExpense };
};
