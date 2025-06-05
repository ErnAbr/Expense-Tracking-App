import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import countryList from "react-select-country-list";
import { toast } from "react-toastify";
import { api } from "../../../api/api";
import { routes } from "../../../navigation/routes/routes";
import { FormAutocompleteInput } from "../../FormComponents/FormAutocompleteInput/FormAutocompleteInput";
import { FormDatePicker } from "../../FormComponents/FormDatePicker/FormDatePicker";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import { FormRadioInput } from "../../FormComponents/FormRadioInput/FormRadioInput";
import styles from "./registerForm.module.scss"
import * as yup from "yup";

type FormValues = {
  email: string;
  password: string;
  repPassword: string;
  gender: string;
  country: string;
  birthDate: Date;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  repPassword: yup
    .string()
    .oneOf([yup.ref("password")])
    .required("Passwords must match"),
  gender: yup.string().required("Please Select Your Gender"),
  country: yup.string().required("Select Your Country"),
  birthDate: yup
    .date()
    .required("Birth Date Is Required")
    .max(
      new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000),
      "You must be at least 18 years old"
    ),
});

export const RegisterForm = () => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormValues) => {
    const { repPassword, birthDate, ...rest } = data;

    const payload = {
      ...rest,
      birthDate: birthDate.toISOString(),
    };

    try {
      const response = await api.User.register(payload);
      toast.success(response);
      navigate(routes.HOME);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const clearTheForm = () => {
    reset();
  };

  const options = countryList().getData();

  return (
    <Box className={styles.registerFormContainer}>
      <Paper
        component={"form"}
        className={styles.registerFormStyles}
        elevation={8}
        square={false}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Typography
          color="primary"
          variant="h5"
          mb={2}
          fontWeight="700 !important"
        >
          Please Register
        </Typography>
        <FormInputText
          name={"email"}
          control={control}
          label={"Your Email"}
          type="email"
        />
        <FormInputText
          name={"password"}
          control={control}
          label={"Your Password"}
          type="password"
        />
        <FormInputText
          name={"repPassword"}
          control={control}
          label={"Repeat Password"}
          type="password"
        />
        <FormAutocompleteInput
          name="country"
          label="Select a Country"
          control={control}
          options={options}
        />
        <FormDatePicker
          name="birthDate"
          control={control}
          label="Your Birth Date"
        />
        <FormRadioInput
          name="gender"
          control={control}
          label="Select Gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <Box className={styles.buttonContainer}>
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Button variant="outlined" onClick={clearTheForm}>
            Clear
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
