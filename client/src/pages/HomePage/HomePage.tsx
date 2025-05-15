import styles from "./homepage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/FormComponents/FormInputText/FormInputText";
import { api } from "../../api/api";
import axios from "axios";

type FormValues = {
  userEmail: string;
  userPassword: string;
};

const schema = yup.object({
  userEmail: yup.string().email().required(),
  userPassword: yup.string().required(),
});

export const HomePage = () => {
  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { userEmail: "", userPassword: "" },
  });

  const handleFormSubmit = async (data: FormValues) => {
    const payload = {
      email: data.userEmail,
      password: data.userPassword,
    };

    try {
      const response = await api.User.login(payload);
      console.log(response);
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("err:", error.response?.data);
      }
      reset();
    }
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
