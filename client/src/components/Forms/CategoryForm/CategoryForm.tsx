import styles from "./categoryForm.module.scss";
import { Box, Button, Paper } from "@mui/material";
import { useAppContext } from "../../../context/appContext";
import { useStore } from "zustand";
import { CategoryMutationTypes } from "../../../interfaces/categoryMutationType";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import { IconPicker } from "../../IconPicker/IconPicker";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  name: string;
  iconName: string;
};

const schema = yup.object({
  name: yup.string().required(),
  iconName: yup.string().required(),
});

interface CategoryFormProps {
  setModalView: (view: "list" | "edit") => void;
  editTarget: {
    id: number;
    type: "cat" | "sub";
  } | null;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
}

export const CategoryForm = ({
  setModalView,
  editTarget,
  deleteCategory,
}: CategoryFormProps) => {
  const { categories: storedCategories } = useStore(useAppContext);
  const [showIconPicker, setShowIconPicker] = useState(false);

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

  const [icon, setIcon] = useState(subcategoryToEdit?.iconName || "FaBeer");
  const { handleSubmit, control, setValue } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: subcategoryToEdit?.name ?? categoryToEdit?.name,
      iconName:
        subcategoryToEdit?.iconName ?? categoryToEdit?.iconName ?? "FaBeer",
    },
  });

  const getIconComponent = (iconName: string) => {
    return (
      (FaIcons as any)[iconName] ||
      (MdIcons as any)[iconName] ||
      (CiIcons as any)[iconName] ||
      null
    );
  };

  const IconPreview = getIconComponent(icon);

  const handleFormSubmit = (data: FormValues) => {
    const payload = { id, data };
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
            label="Subcategory Name"
            type="text"
          />
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          {IconPreview && <IconPreview size={24} />}
          <Button
            onClick={() => setShowIconPicker((prev) => !prev)}
            type="button"
          >
            {showIconPicker ? "Close Icon Picker" : "Change Icon"}
          </Button>
        </Box>

        {showIconPicker && (
          <IconPicker
            setSelectedIcon={(iconName) => {
              setIcon(iconName);
              setValue("iconName", iconName);
              setShowIconPicker(false);
            }}
          />
        )}
        <Box display="flex" justifyContent="space-around" mt={2}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => deleteCategory({ e, id, type })}
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
