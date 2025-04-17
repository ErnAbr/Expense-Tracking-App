import styles from "./formComponentStyles.module.scss";
import { TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  type: string;
  control: Control<T>;
  label: string;
}

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
}: FormInputProps<T>) => {
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
