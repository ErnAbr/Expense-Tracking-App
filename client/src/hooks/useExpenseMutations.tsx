import { SelectedCategoryProps } from "../interfaces/expense";
import { MODAL_VIEWS, ModalView } from "./useModalView";

interface ExpenseMutationsProps {
  setSelectedCategory?: (category: SelectedCategoryProps | null) => void;
  setModalView?: (view: ModalView) => void;
  handleOpenModal?: () => void;
}

export const useExpenseMutations = ({
  setSelectedCategory,
  setModalView,
  handleOpenModal,
}: ExpenseMutationsProps) => {
const addExpense = (category: SelectedCategoryProps | null) => {
  setSelectedCategory?.(category);
  setModalView?.(MODAL_VIEWS.ADD_EXPENSE);
  handleOpenModal?.();
};

  return { addExpense };
};
