import styles from "./categoryForm.module.scss";
import { Box, Paper, Button } from "@mui/material";
import { CategoryObject } from "../../../interfaces/category";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";
import { useFieldArray, useForm } from "react-hook-form";
import { MODAL_VIEWS } from "../../../hooks/useModalView";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SubcategoryAddData = {
  subcategory: {
    name: string;
    iconName: string;
  }[];
};

interface AddSubcategoryToExistingCategoryProps {
  category: CategoryObject;
  setModalView: (view: typeof MODAL_VIEWS.LIST_CATEGORIES) => void;
}

const schema = yup.object({
  subcategory: yup
    .array()
    .of(
      yup.object({
        name: yup.string().trim().required("Subcategory name is required"),
        iconName: yup.string().required("Icon is required"),
      })
    )
    .min(1, "At least one subcategory is required")
    .required("Subcategory is required"),
});

export const AddSubcategoryToExistingCategory = ({
  category,
  setModalView,
}: AddSubcategoryToExistingCategoryProps) => {
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<SubcategoryAddData>({
    resolver: yupResolver(schema),
    defaultValues: {
      subcategory: [{ name: "", iconName: "FaRegQuestionCircle" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
      control,
      name: "subcategory",
    });

  const handleFormSubmit = async (data: SubcategoryAddData) => {
    console.log(data);
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
            name="subcategory.0.name"
            control={control}
            label="Category Name"
            type="text"
          />
        </Box>
        <IconPickerToggler<SubcategoryAddData>
          setValue={setValue}
          name="subcategory.0.iconName"
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
            onClick={() => setModalView(MODAL_VIEWS.LIST_CATEGORIES)}
            className={styles.buttonWidth}
          >
            BACK
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
