import styles from "./homepage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/FromComponents/FormInputText/FormInputText";
// import { FormRadioInput } from "../../components/FromComponents/FormRadioInput/FormRadioInput";

type FormValues = {
  userEmail: string;
  userPassword: string;
  userGender: string;
};

const schema = yup.object({
  userEmail: yup.string().email().required(),
  userPassword: yup.string().required(),
  userGender: yup.string().required("Role is required"),
});

export const HomePage = () => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: FormValues) => {
    console.log(data);
    reset();
  };

  const clearTheForm = () => {
    reset();
  };

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
