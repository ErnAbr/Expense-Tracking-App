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
import { AddCategoryFormValues } from "./AddCategoryForm";
import React from "react";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subcategory",
  });

  return (
    <>
      {fields.map((field, index) => {
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

            <IconPickerToggler
              setValue={setValue}
              name={`subcategory.${index}.subcategoryIconName`}
              initialIcon={field.subcategoryIconName}
            />
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
