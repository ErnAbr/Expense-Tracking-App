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
import { CategoryAddData } from "./AddCategoryForm";
import React from "react";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";

export interface SubcategoryFormProps {
  control: Control<CategoryAddData>;
  setValue: UseFormSetValue<CategoryAddData>;
  error?: FieldErrors<CategoryAddData>;
  clearErrors: UseFormClearErrors<CategoryAddData>;
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
                name={`subcategory.${index}.name`}
                control={control}
                label="Subcategory Name"
                type="text"
              />
            </Box>

            <IconPickerToggler
              setValue={setValue}
              name={`subcategory.${index}.iconName`}
              initialIcon={field.iconName}
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
              name: "",
              iconName: "FaRegQuestionCircle",
            });
            clearErrors("subcategory");
            clearErrors("name");
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
            clearErrors("name");
          }}
          className={styles.buttonWidth}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};
