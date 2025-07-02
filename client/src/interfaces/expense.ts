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
  amountDate: string;
  amount: number;
  categoryId: number;
  subcategoryId: number;
}
