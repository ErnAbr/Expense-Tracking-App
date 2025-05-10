import styles from "./formDatePicker.module.scss";
import { Controller, FieldValues } from "react-hook-form";
import { BaseFormProps } from "../../../interfaces/formProps";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const FormDatePicker = <T extends FieldValues>({
  name,
  label,
  control,
}: BaseFormProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            format="DD/MM/YYYY"
            value={value ?? null}
            onChange={onChange}
            className={styles.datePickerContainer}
            slotProps={{
              textField: {
                error: !!error,
                size: "small",
                helperText: error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
