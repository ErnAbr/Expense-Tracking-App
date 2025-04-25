import styles from "./formComponentStyles.module.scss";
import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { InputFormProps } from "../../../interfaces/formProps";

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
}: InputFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          size="small"
          error={!!error}
          onChange={onChange}
          value={value ?? ""}
          label={label}
          variant="outlined"
          type={type}
          className={styles.inputStyle}
        />
      )}
    />
  );
};
