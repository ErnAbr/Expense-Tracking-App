import styles from "./categoryForm.module.scss";
import { Box, Button, Paper } from "@mui/material";
import { CategoryMutationTypes } from "../../../interfaces/categoryMutationType";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";
import { queryCategories } from "../../../api/categories.query";
import { api } from "../../../api/api";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import {
  CategoryPutData,
  EditTargetCategory,
} from "../../../interfaces/category";
import { MODAL_VIEWS } from "../../../hooks/useModalView";
import { CATEGORY_QUERY_KEY } from "../../../api/queryKeys";

type FormValues = {
  name: string;
  iconName: string;
};

const schema = yup.object({
  name: yup.string().required().max(18),
  iconName: yup.string().required(),
});

export interface EditCategoryFormProps {
  setModalView: (view: typeof MODAL_VIEWS.LIST_CATEGORIES) => void;
  editTarget: EditTargetCategory | null;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
}

export const EditCategoryForm = ({
  setModalView,
  editTarget,
  deleteCategory,
}: EditCategoryFormProps) => {
  const queryClient = useQueryClient();
  const { data: storedCategories } = queryCategories();

  if (!editTarget) {
    return (
      <Box>
        <Button onClick={() => setModalView(MODAL_VIEWS.LIST_CATEGORIES)}>
          Back
        </Button>
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

  const handleFormSubmit = async (data: FormValues) => {
    const payload: CategoryPutData = { id, type, data };
    try {
      const response = await api.Category.updateUserCatOrSub(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: [CATEGORY_QUERY_KEY] });
      setModalView(MODAL_VIEWS.LIST_CATEGORIES);
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
        <Box className={styles.buttonBox} mt={2} gap={1}>
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
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => setModalView(MODAL_VIEWS.LIST_CATEGORIES)}
        >
          Back
        </Button>
      </Paper>
    </Box>
  );
};
