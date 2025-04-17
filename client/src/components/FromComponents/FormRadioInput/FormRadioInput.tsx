import {
  Box,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import styles from "./formRadioInput.module.scss";

interface FormRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { label: string; value: string }[];
}

export const FormRadioInput = <T extends FieldValues>({
  label,
  name,
  control,
  options,
}: FormRadioProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <FormLabel>{label}</FormLabel>
          <Box className={styles.radioGroupContainer}>
            <RadioGroup value={value ?? ""} onChange={onChange} row>
              {options.map((opt) => (
                <FormControlLabel
                  key={opt.value}
                  value={opt.value}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          </Box>
          {error && (
            <FormHelperText className={styles.errorHelperText}>
              {error.message}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
