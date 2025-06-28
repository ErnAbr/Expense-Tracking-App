export interface SelectedCategoryProps {
  id: number;
  name: string;
  iconName: string;
}

export interface AddExpenseFormProps {
  category: SelectedCategoryProps;
  setOpenModal: (open: boolean) => void;
}
