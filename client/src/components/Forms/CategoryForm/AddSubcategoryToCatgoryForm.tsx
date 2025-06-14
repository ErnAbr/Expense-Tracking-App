import styles from "./categoryForm.module.scss";
import { Box, Button } from "@mui/material";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormSetValue,
  UseFormTrigger,
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
  trigger: UseFormTrigger<AddCategoryFormValues>;
}
// change add and remove buttons so that they don't appear together with every input
// refactor repeated icon picking into separate component IconPickerToggle which is used inside three components

export const AddSubcategoryToCatgoryForm = ({
  control,
  setValue,
  error,
  trigger,
}: SubcategoryFormProps) => {
  const [subIcon, setSubIcon] = useState("FaRegQuestionCircle");
  const [showIconPicker, setShowIconPicker] = useState(false);
  //   const [subIndex, setSubIndex] = useState(0);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategory",
  });

  const getIconComponent = (iconName: string) => {
    return (FaIcons as any)[iconName] || null;
  };

  const IconPreview = getIconComponent(subIcon);

  return (
    <React.Fragment>
      {fields.map((field, index) => (
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
              onClick={() => setShowIconPicker((prev) => !prev)}
              type="button"
            >
              {showIconPicker ? "Close Icon Picker" : "Choose Icon"}
            </Button>
          </Box>

          {showIconPicker && (
            <IconPicker
              setSelectedIcon={(subIconName) => {
                setSubIcon(subIconName);
                setShowIconPicker(false);
                setValue(
                  `subcategory.${index}.subcategoryIconName`,
                  subIconName
                );
              }}
            />
          )}
        </React.Fragment>
      ))}
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
            await trigger("subcategory");
          }}
        >
          Add
        </Button>
        <Button
          color="error"
          disabled={fields.length === 0}
          onClick={async () => {
            remove(fields.length - 1);
            await trigger("subcategory");
          }}
        >
          Delete
        </Button>
      </Box>
    </React.Fragment>
  );
};
