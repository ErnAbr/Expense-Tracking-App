import { Button } from "@mui/material";
import { AddExpenseFormProps } from "../../../interfaces/expense";


export const AddExpenseForm = ({
  category,
  setOpenModal,
}: AddExpenseFormProps) => {
  const { id, name, iconName } = category;

  console.log("id", id);
  console.log("name", name);
  console.log("iconName", iconName);

  return (
    <div>
      <h3>Adding Expense for: {name}</h3>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(false)}
      >
        Close Form
      </Button>
    </div>
  );
};
