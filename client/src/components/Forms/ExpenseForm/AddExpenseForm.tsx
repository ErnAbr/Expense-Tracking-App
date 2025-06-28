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
  setOpenModal,
}: AddExpenseFormProps) => {
  const { data: storedCategories } = queryCategories();
  const { id, name, iconName } = category;
  const Icon = getIconComponent(iconName);

  const subCategories = storedCategories?.find(
    (cat) => cat.id === id
  )?.subcategories;

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data: FormValues) => {
    const { amountDate, ...rest } = data;
    const payload = {
      ...rest,
      amountDate: amountDate.toISOString(),
    };
    console.log(payload);
  };

  return (
    <Box className={styles.expenseFormContainer}>
      <Paper
        component={"form"}
        elevation={0}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={styles.expenseFormStyles}
      >
        <Typography variant="h6" gutterBottom mb={2}>
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenModal(false)}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
