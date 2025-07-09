import styles from "./categoryForm.module.scss";
import { Box, Paper, Button } from "@mui/material";
import { CategoryObject } from "../../../interfaces/category";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { IconPickerToggler } from "../../IconPicker/IconPickerToggler";
import { useFieldArray, useForm } from "react-hook-form";
import { MODAL_VIEWS } from "../../../hooks/useModalView";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";

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
    const payload = {
      categoryId: category?.id,
      ...data,
    };

    console.log(payload);
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
        {fields.map((field, index) => {
          return (
            <React.Fragment key={field.id}>
              <Box
                key={field.id}
                className={styles.formFieldWrapper}
                sx={{ marginTop: "1.5vh" }}
              >
                <FormInputText
                  name={`subcategory.${index}.name`}
                  control={control}
                  label="Subcategory Name"
                  type="text"
                />
              </Box>
              <IconPickerToggler<SubcategoryAddData>
                setValue={setValue}
                name={`subcategory.${index}.iconName`}
                initialIcon={field.iconName}
              />
            </React.Fragment>
          );
        })}
        {errors?.subcategory?.root?.message && (
          <Box sx={{ color: "red", mt: 1, textAlign: "center" }}>
            {errors.subcategory.root.message}
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
            }}
            className={styles.buttonWidth}
          >
            Delete
          </Button>
        </Box>
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
