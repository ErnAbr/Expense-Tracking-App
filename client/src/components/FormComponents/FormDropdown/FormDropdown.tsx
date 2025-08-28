import { Controller, FieldValues } from "react-hook-form";
import styles from "./formDropdown.module.scss";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectFormProps } from "../../../interfaces/formProps";

export const FormDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: SelectFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl className={styles.dropdownContainer}>
          <InputLabel id={`${name}-label`}>{label}</InputLabel>
          <Select
            labelId={`${name}-label`}
            onChange={onChange}
            value={value ?? ""}
            label={label}
          >
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <FormHelperText className={styles.errorHelperText}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
