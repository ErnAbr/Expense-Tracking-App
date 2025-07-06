import styles from "./formAutocompleteInput.module.scss";
import { Autocomplete, TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { SelectFormProps } from "../../../interfaces/formProps";

export const FormAutocompleteInput = <T extends FieldValues>({
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
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          getOptionKey={(option) => option.value}
          className={styles.inputStyle}
          value={options.find((opt) => opt.value === value) || null}
          onChange={(_, selectedOption) =>
            onChange(selectedOption?.value ?? null)
          }
          renderInput={(params) => (
            <TextField {...params} label={label} error={!!error} size="small" />
          )}
        />
      )}
    />
  );
};
