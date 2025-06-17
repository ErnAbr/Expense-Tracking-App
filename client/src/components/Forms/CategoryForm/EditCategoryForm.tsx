import styles from "./categoryForm.module.scss";
import { Box, Button, Paper } from "@mui/material";
import { useAppContext } from "../../../context/appContext";
import { useStore } from "zustand";
import { CategoryMutationTypes } from "../../../interfaces/categoryMutationType";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";

type FormValues = {
  name: string;
  iconName: string;
};

const schema = yup.object({
  name: yup.string().required(),
  iconName: yup.string().required(),
});

interface CategoryFormProps {
  setModalView: (view: "list") => void;
  editTarget: {
    id: number;
    type: "cat" | "sub";
  } | null;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
}

export const EditCategoryForm = ({
  setModalView,
  editTarget,
  deleteCategory,
}: CategoryFormProps) => {
  const { categories: storedCategories } = useStore(useAppContext);

  if (!editTarget) {
    return (
      <Box>
        <Button onClick={() => setModalView("list")}>Back</Button>
      </Box>
    );
  }
  const { id, type } = editTarget;

  const categoryToEdit =
    type === "cat" ? storedCategories?.find((cat) => cat.id === id) : null;

  const subcategoryToEdit =
    editTarget?.type === "sub"
      ? storedCategories
          ?.flatMap((cat) => cat.subcategories)
          .find((sub) => sub.id === editTarget.id)
      : null;

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: subcategoryToEdit?.name ?? categoryToEdit?.name,
      iconName:
        subcategoryToEdit?.iconName ?? categoryToEdit?.iconName ?? "FaBeer",
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    const payload = { id, type, data };
    console.log(payload);
    toast.success(type === "cat" ? "Category Updated" : "SubCategory Updated");
  };

  return (
    <Box className={styles.categoryFormContainer}>
      <Paper
        component={"form"}
        elevation={0}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Box className={styles.formFieldWrapper}>
          <FormInputText
            name="name"
            control={control}
            label={type === "cat" ? "Category Name" : "Subcategory Name"}
            type="text"
          />
        </Box>

        <IconPickerToggler<FormValues>
          setValue={setValue}
          initialIcon={
            subcategoryToEdit?.iconName ?? categoryToEdit?.iconName ?? "FaBeer"
          }
          name="iconName"
        />
        <Box display="flex" justifyContent="space-around" mt={2} gap={5}>
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
            onClick={(e) => deleteCategory({ e, id, type })}
            className={styles.buttonWidth}
          >
            Delete
          </Button>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setModalView("list")}
      >
        Back
      </Button>
    </Box>
  );
};
