import styles from "./formComponentStyles.module.scss";
import { TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { InputFormProps } from "../../../interfaces/formProps";

export const FormInputText = <T extends FieldValues>({
  name,
  control,
  label,
  type,
  inputSlotProps,
  placeholder,
  InputLabelProps,
  onValueChange,
}: InputFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          size="small"
          error={!!error}
          onChange={(e) => {
            onChange(e); 
            if (onValueChange) {
              onValueChange(e.target.value); 
            }
          }}
          value={value ?? ""}
          label={label}
          variant="outlined"
          type={type}
          className={styles.inputStyle}
          placeholder={placeholder}
          slotProps={{
            input: inputSlotProps,
            inputLabel: InputLabelProps,
          }}
        />
      )}
    />
  );
};
