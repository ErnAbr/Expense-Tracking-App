import styles from "./homepage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/FormComponents/FormInputText/FormInputText";
// import countryList from "react-select-country-list";
// import { FormAutocompleteInput } from "../../components/FormComponents/FormAutocompleteInput/FormAutocompleteInput";
// import { FormDatePicker } from "../../components/FormComponents/FormDatePicker/FormDatePicker";

type FormValues = {
  userEmail: string;
  userPassword: string;
  // userGender: string;
  // selectCountry: string;
  // birthDate: Date;
};

const schema = yup.object({
  userEmail: yup.string().email().required(),
  userPassword: yup.string().required(),
  // userGender: yup.string().required("Role is required"),
  // selectCountry: yup.string().required("Country is required"),
  // birthDate: yup.date().required("birth date required"),
});

export const HomePage = () => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { userEmail: "", userPassword: "" },
  });

  const handleFormSubmit = async (data: FormValues) => {
    console.log(data);
    setTimeout(() => {
      reset();
    }, 100);
  };

  const clearTheForm = () => {
    reset();
  };

  // const options = countryList().getData();

  return (
    <Box className={styles.loginFormContainer}>
      <Paper
        component={"form"}
        className={styles.loginFormStyles}
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
          Please Log In
        </Typography>
        <FormInputText
          name={"userEmail"}
          control={control}
          label={"Your Email"}
          type="email"
        />
        <FormInputText
          name={"userPassword"}
          control={control}
          label={"Your Password"}
          type="password"
        />
        {/* <FormRadioInput
          name="userGender"
          control={control}
          label="Select Gender"
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        /> */}
        {/* <FormDropdown
          name="selectCountry"
          control={control}
          label="Select Your Country"
          options={options}
        /> */}
        {/* <FormAutocompleteInput
          name="selectCountry"
          label="Select a Country"
          control={control}
          options={options}
        />
        <FormDatePicker
          name="birthDate"
          control={control}
          label="Enter Your Date of Birth"
        /> */}
        <Box className={styles.buttonContainer}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button variant="outlined" onClick={clearTheForm}>
            Clear
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
