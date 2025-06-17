import { Box, Button, Paper } from "@mui/material";
import styles from "./categoryForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { AddSubcategoryToCatgoryForm } from "./AddSubcategoryToCatgoryForm";
import { toast } from "react-toastify";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";

export type AddCategoryFormValues = {
  category: string;
  iconName: string;
  subcategory: {
    subcategoryName: string;
    subcategoryIconName: string;
  }[];
};

interface CategoryFormProps {
  setModalView: (view: "list") => void;
}

const schema = yup.object({
  category: yup.string().required(),
  iconName: yup.string().required(),
  subcategory: yup
    .array()
    .of(
      yup.object({
        subcategoryName: yup.string().required(),
        subcategoryIconName: yup.string().required(),
      })
    )
    .min(1, "At least one subcategory is required")
    .required("At least one subcategory is required"),
});

export const AddCategoryForm = ({ setModalView }: CategoryFormProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<AddCategoryFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      iconName: "FaRegQuestionCircle",
      subcategory: [
        {
          subcategoryName: "",
          subcategoryIconName: "FaRegQuestionCircle",
        },
      ],
    },
  });

  const handleFormSubmit = (data: AddCategoryFormValues) => {
    console.log(data);
    toast.success("Category Added");
  };

  return (
    <Box className={styles.categoryFormContainer}>
      <Paper
        component={"form"}
        elevation={0}
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          overflowY: "auto",
          maxHeight: "50vh",
          pr: 0.5,
        }}
      >
        <Box className={styles.formFieldWrapper} sx={{ marginTop: "1.5vh" }}>
          <FormInputText
            name="category"
            control={control}
            label="Category Name"
            type="text"
          />
        </Box>
        <IconPickerToggler<AddCategoryFormValues>
          setValue={setValue}
          name="iconName"
        />
        <AddSubcategoryToCatgoryForm
          control={control}
          setValue={setValue}
          error={errors.subcategory}
          clearErrors={clearErrors}
        />
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button
            variant="contained"
            type="submit"
            className={styles.buttonWidth}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setModalView("list")}
            className={styles.buttonWidth}
          >
            BACK
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
