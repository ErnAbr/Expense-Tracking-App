import styles from "./expenseForm.module.scss";
import { CategoryObject, Subcategory } from "../../../interfaces/category";
import { Box, Button, Paper } from "@mui/material";
import { FormAutocompleteInput } from "../../FormComponents/FormAutocompleteInput/FormAutocompleteInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { queryCategories } from "../../../api/categories.query";
import { useMemo } from "react";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { FormDatePicker } from "../../FormComponents/FormDatePicker/FormDatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { EXPENSE_QUERY_KEY } from "../../../api/queryKeys";

export interface EditExpenseFormProps {
  expenseId: number;
  expenseAmount: number;
  expenseDate: Date;
  category: CategoryObject;
  subcategory: Subcategory;
  handleCloseModal: () => void;
}

type FormValues = {
  categoryId: string;
  subcategoryId: string;
  expenseAmount: number;
  expenseDate: Date;
};

const schema = yup.object({
  categoryId: yup.string().required(),
  subcategoryId: yup.string().required(),
  expenseAmount: yup.number().required(),
  expenseDate: yup.date().required(),
});

export const EditExpenseForm = ({
  expenseId,
  expenseAmount,
  expenseDate,
  category,
  subcategory,
  handleCloseModal,
}: EditExpenseFormProps) => {
  const queryClient = useQueryClient();
  const { data: storedCategories } = queryCategories();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: category.id.toString(),
      subcategoryId: subcategory.id.toString(),
      expenseAmount,
      expenseDate: dayjs(expenseDate),
    } as any,
  });

  const selectedCategoryId = useWatch({
    control,
    name: "categoryId",
  });

  const categoryOptions = useMemo(() => {
    return (
      storedCategories?.map((cat) => ({
        label: cat.name,
        value: cat.id.toString(),
      })) || []
    );
  }, [storedCategories]);

  const subcategoryOptions = useMemo(() => {
    const selectedCategory = storedCategories?.find(
      (cat) => cat.id === Number(selectedCategoryId)
    );
    return (
      selectedCategory?.subcategories.map((sub) => ({
        label: sub.name,
        value: sub.id.toString(),
      })) || []
    );
  }, [storedCategories, selectedCategoryId]);

  const handleFormSubmit = async (data: FormValues) => {
    const payload = {
      ...data,
      expenseId: expenseId,
      expenseDate: data.expenseDate.toLocaleDateString("lt-LT"),
    };

    try {
      const response = await api.Expense.UpdateExpense(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: [EXPENSE_QUERY_KEY] });
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
        <FormAutocompleteInput
          name="categoryId"
          label="Change Category"
          control={control}
          options={categoryOptions}
        />
        <FormAutocompleteInput
          name="subcategoryId"
          label="Change Subcategory"
          control={control}
          options={subcategoryOptions}
        />
        <FormDatePicker
          name="expenseDate"
          control={control}
          label="Expense Date"
        />
        <FormInputText
          name="expenseAmount"
          control={control}
          label="Expense Amount"
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
        />
        <Box className={styles.buttonBox} mt={2} gap={1}>
          <Button variant="contained" color="primary" type="submit">
            Edit Expense
          </Button>
          <Button variant="contained" color="error" onClick={() => reset()}>
            Reset
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCloseModal}
          fullWidth
        >
          Back
        </Button>
      </Paper>
    </Box>
  );
};
