import styles from "./categoryForm.module.scss";
import { Box, Button } from "@mui/material";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { IconPicker } from "../../IconPicker/IconPicker";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { AddCategoryFormValues } from "./AddCategoryForm";
import React from "react";

interface SubcategoryFormProps {
  control: Control<AddCategoryFormValues>;
  setValue: UseFormSetValue<AddCategoryFormValues>;
  error?: FieldErrors<AddCategoryFormValues>;
  clearErrors: UseFormClearErrors<AddCategoryFormValues>;
}

export const AddSubcategoryToCatgoryForm = ({
  control,
  setValue,
  clearErrors,
  error,
}: SubcategoryFormProps) => {
  const [subIcons, setSubIcons] = useState<Record<number, string>>({});
  const [iconPickerOpen, setIconPickerOpen] = useState<Record<number, boolean>>(
    {}
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategory",
  });

  const getIconComponent = (iconName: string) => {
    return (FaIcons as any)[iconName] || null;
  };

  return (
    <>
      {fields.map((field, index) => {
        const iconName = subIcons[index] || field.subcategoryIconName;
        const IconPreview = getIconComponent(iconName);

        return (
          <React.Fragment key={field.id}>
            <Box className={styles.formFieldWrapper}>
              <FormInputText
                name={`subcategory.${index}.subcategoryName`}
                control={control}
                label="Subcategory Name"
                type="text"
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              {IconPreview && <IconPreview size={24} />}
              <Button
                onClick={() =>
                  setIconPickerOpen((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }))
                }
              >
                {iconPickerOpen[index] ? "Close Icon Picker" : "Choose Icon"}
              </Button>
            </Box>

            {iconPickerOpen[index] && (
              <IconPicker
                setSelectedIcon={(iconName) => {
                  setSubIcons((prev) => ({
                    ...prev,
                    [index]: iconName,
                  }));
                  setValue(
                    `subcategory.${index}.subcategoryIconName`,
                    iconName
                  );
                  setIconPickerOpen((prev) => ({
                    ...prev,
                    [index]: false,
                  }));
                }}
              />
            )}
          </React.Fragment>
        );
      })}

      {error?.root?.message && (
        <Box sx={{ color: "red", mt: 1, textAlign: "center" }}>
          {error.root.message}
        </Box>
      )}

      <Box display="flex" justifyContent="space-around" mt={2}>
        <Button
          color="success"
          onClick={async () => {
            append({
              subcategoryName: "",
              subcategoryIconName: "FaRegQuestionCircle",
            });
            clearErrors("subcategory");
            clearErrors("category");
          }}
          className={styles.buttonWidth}
        >
          Add
        </Button>
        <Button
          color="error"
          disabled={fields.length === 0}
          onClick={async () => {
            remove(fields.length - 1);
            clearErrors("subcategory");
            clearErrors("category");
          }}
          className={styles.buttonWidth}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};
