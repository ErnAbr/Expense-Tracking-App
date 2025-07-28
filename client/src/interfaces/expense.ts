export interface SelectedCategoryProps {
  id: number;
  name: string;
  iconName: string;
}

export interface AddExpenseFormProps {
  category: SelectedCategoryProps;
  setOpenModal: (open: boolean) => void;
  handleCloseModal: () => void;
}

export type ExpenseAddData = {
  subcategoryId: number;
  amountDate: string;
  amount: number;
};

export interface MontlyExpenseResponseDto {
  id: number;
  amountDate: string;
  amount: number;
  categoryId: number;
  subcategoryId: number;
}

export type ExpenseUpdateData = {
  expenseId: number;
  categoryId: string;
  subcategoryId: string;
  expenseAmount: number;
  expenseDate: string;
};
