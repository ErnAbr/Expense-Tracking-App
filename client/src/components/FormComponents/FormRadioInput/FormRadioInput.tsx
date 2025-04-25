import {
  Box,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import styles from "./formRadioInput.module.scss";
import { SelectFormProps } from "../../../interfaces/formProps";

export const FormRadioInput = <T extends FieldValues>({
  label,
  name,
  control,
  options,
}: SelectFormProps<T>) => {
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
