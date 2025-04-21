import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormAutocompleteInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: { value: string; label: string }[];
}

export const FormAutocompleteInput = <T extends FieldValues>({
  name,
  control,
  label,
  options,
}: FormAutocompleteInputProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            disablePortal
            options={options}
            getOptionLabel={(option) => option.label}
            sx={{ width: "50%" }}
            value={options.find((opt) => opt.label === value) || null}
            onChange={(_, selectedOption) =>
              onChange(selectedOption?.label || "")
            }
            renderInput={(params) => (
              <TextField {...params} label={label} error={!!error} />
            )}
          />
        )}
      />
    </>
  );
};
