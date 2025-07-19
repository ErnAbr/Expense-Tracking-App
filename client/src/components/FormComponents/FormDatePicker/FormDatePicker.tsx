import styles from "./formDatePicker.module.scss";
import { Controller, FieldValues } from "react-hook-form";
import { BaseFormProps } from "../../../interfaces/formProps";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateView } from "@mui/x-date-pickers/models";

interface ExtendedFormDatePickerProps<T extends FieldValues>
  extends BaseFormProps<T> {
  views?: DateView[];
  format?: string;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  label,
  control,
  views = ["year", "month", "day"],
  format = "DD/MM/YYYY",
}: ExtendedFormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            views={views}
            format={format}
            value={value ?? null}
            onChange={onChange}
            className={styles.datePickerContainer}
            slotProps={{
              textField: {
                error: !!error,
                size: "small",
                // helperText: error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
