export interface EditExpenseFormProps {
  expenseId: number;
  expenseAmount: number;
  expenseDate: string;
  handleCloseModal: () => void;
}


export const EditExpenseForm = ({
  expenseId,
  expenseAmount,
  expenseDate,
  handleCloseModal,
}: EditExpenseFormProps) => {
  console.log(expenseId);
  console.log(expenseAmount);
  console.log(expenseDate);

  return <div>test</div>;
};
