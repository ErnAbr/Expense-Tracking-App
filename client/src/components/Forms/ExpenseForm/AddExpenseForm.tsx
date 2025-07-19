import styles from "./expenseForm.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { AddExpenseFormProps } from "../../../interfaces/expense";
import { queryCategories } from "../../../api/categories.query";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getIconComponent } from "../../../utils/getIconComponent";
import { FormAutocompleteInput } from "../../FormComponents/FormAutocompleteInput/FormAutocompleteInput";
import { FormDatePicker } from "../../FormComponents/FormDatePicker/FormDatePicker";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import { EXPENSE_QUERY_KEY } from "../../../api/queryKeys";

type FormValues = {
  subcategoryId: number;
  amountDate: Date;
  amount: number;
};

const schema = yup.object({
  subcategoryId: yup.number().required(),
  amountDate: yup.date().required(),
  amount: yup.number().required(),
});

export const AddExpenseForm = ({
  category,
  handleCloseModal,
}: AddExpenseFormProps) => {
  const queryClient = useQueryClient();
  const { data: storedCategories } = queryCategories();
  const { id, name, iconName } = category;
  const Icon = getIconComponent(iconName);

  const subCategories = storedCategories?.find(
    (cat) => cat.id === id
  )?.subcategories;

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: FormValues) => {
    const { amountDate, ...rest } = data;

    console.log(amountDate);

    const payload = {
      ...rest,
      amountDate: amountDate.toLocaleDateString("lt-LT"),
    };
    console.log(payload);

    try {
      const response = await api.Expense.AddUserExpense(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: [EXPENSE_QUERY_KEY] });
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  return (
    <Box className={styles.expenseFormContainer}>
      <Paper
        component={"form"}
        elevation={0}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.expenseFormStyles}
      >
        <Typography
          variant="h6"
          gutterBottom
          mb={2}
          sx={{ alignSelf: "flex-start" }}
        >
          <Icon style={{ marginRight: 8, verticalAlign: "middle" }} />
          {name}
        </Typography>
        <FormAutocompleteInput
          name="subcategoryId"
          label="select a subcategory"
          control={control}
          options={
            subCategories?.map((sub) => ({
              label: sub.name,
              value: sub.id.toString(),
            })) || []
          }
        />
        <FormDatePicker
          name="amountDate"
          control={control}
          label="Expense Date"
        />
        <FormInputText
          name="amount"
          control={control}
          label="Expense Amount"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
        />
        <Box className={styles.buttonBox} mt={2} gap={1}>
          <Button variant="contained" color="primary" type="submit">
            Add Expense
          </Button>
          <Button variant="contained" color="error" onClick={handleCloseModal}>
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
