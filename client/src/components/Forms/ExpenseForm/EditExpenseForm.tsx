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
import dayjs, { Dayjs } from "dayjs";

export interface EditExpenseFormProps {
  expenseId: number;
  expenseAmount: number;
  expenseDate: string;
  category: CategoryObject;
  subcategory: Subcategory;
  handleCloseModal: () => void;
}

type FormValues = {
  categoryId: string;
  subcategoryId: string;
  expenseAmount: number;
  expenseDate: Dayjs;
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
  const { data: storedCategories } = queryCategories();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      categoryId: category.id.toString(),
      subcategoryId: subcategory.id.toString(),
      expenseAmount,
      expenseDate: dayjs(expenseDate),
    },
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

  const handleFormSubmit = (data: FormValues) => {
    const payload = { expenseId: expenseId, ...data };
    console.log("payload", payload);
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
          <Button variant="contained" color="error" onClick={handleCloseModal}>
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
