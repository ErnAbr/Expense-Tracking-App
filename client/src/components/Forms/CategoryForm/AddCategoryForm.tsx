import { Box, Button, Paper } from "@mui/material";
import styles from "./categoryForm.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { AddSubcategoryToCatgoryForm } from "./AddSubcategoryToCatgoryForm";
import { toast } from "react-toastify";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";
import axios from "axios";
import { api } from "../../../api/api";
import { useQueryClient } from "@tanstack/react-query";

export type CategoryAddData = {
  name: string;
  iconName: string;
  subcategory: {
    name: string;
    iconName: string;
  }[];
};

interface CategoryFormProps {
  setModalView: (view: "listCategories") => void;
}

const schema = yup.object({
  name: yup.string().required().max(18),
  iconName: yup.string().required(),
  subcategory: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required()
          .max(18),
        iconName: yup.string().required(),
      })
    )
    .min(1, "At least one subcategory is required")
    .required("At least one subcategory is required"),
});

export const AddCategoryForm = ({ setModalView }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<CategoryAddData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      iconName: "FaRegQuestionCircle",
      subcategory: [
        {
          name: "",
          iconName: "FaRegQuestionCircle",
        },
      ],
    },
  });

  const handleFormSubmit = async (data: CategoryAddData) => {
    try {
      const response = await api.Category.AddUserCatOrSub(data);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
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
            name="name"
            control={control}
            label="Category Name"
            type="text"
          />
        </Box>
        <IconPickerToggler<CategoryAddData>
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
            onClick={() => setModalView("listCategories")}
            className={styles.buttonWidth}
          >
            BACK
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
