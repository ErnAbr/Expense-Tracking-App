import { CategoryObject } from "../../interfaces/category";
import { MontlyExpenseResponseDto } from "../../interfaces/expense";

interface ExpenseDisplayTableProps {
  expenseCategoryData: CategoryObject | undefined;
  categoryExpense: MontlyExpenseResponseDto[] | undefined;
}

export const ExpenseDisplayTable = ({
  categoryExpense,
  expenseCategoryData,
}: ExpenseDisplayTableProps) => {
  console.log("cat exp", categoryExpense);
  console.log("cat data", expenseCategoryData);
  return <div>TEST</div>;
};
