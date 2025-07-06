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
  const optionsWithUniqueKeys = options.map((opt, index) => ({
    ...opt,
    _uniqueKey: `${opt.value}-${index}`,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          options={optionsWithUniqueKeys}
          getOptionLabel={(option) => option.label}
          className={styles.inputStyle}
          value={
            optionsWithUniqueKeys.find((opt) => opt.value === value) || null
          }
          onChange={(_, selectedOption) =>
            onChange(selectedOption?.value ?? null)
          }
          renderOption={(props, option) => (
            <li {...props} key={option._uniqueKey}>
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField {...params} label={label} error={!!error} size="small" />
          )}
        />
      )}
    />
  );
};
