import { InputLabelProps } from "@mui/material";
import { Control, FieldValues, Path } from "react-hook-form";

export interface BaseFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export interface InputFormProps<T extends FieldValues>
  extends BaseFormProps<T> {
  type: string;
  inputSlotProps?: any;
  InputLabelProps?: Partial<InputLabelProps> | undefined;
  placeholder?: string;
}

export interface SelectFormProps<T extends FieldValues>
  extends BaseFormProps<T> {
  options: { label: string; value: string }[];
}
