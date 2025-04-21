import { Control, Controller, FieldValues, Path } from "react-hook-form";
import styles from "./formDropdown.module.scss";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface FormDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { value: string; label: string }[];
}

export const FormDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: FormDropdownProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl className={styles.dropdownContainer}>
          <InputLabel>{label}</InputLabel>
          <Select label={label} onChange={onChange} value={value ?? ""}>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.label}>
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
