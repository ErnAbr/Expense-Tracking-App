import styles from "./homepage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputText } from "../../components/FormComponents/FormInputText/FormInputText";
import { api } from "../../api/api";
import axios from "axios";
import { useAppContext } from "../../context/appContext";
import { useStore } from "zustand";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const HomePage = () => {
  const { setUser } = useStore(useAppContext);

  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const handleFormSubmit = async (data: FormValues) => {
    try {
      const response = await api.User.login(data);
      const userResponse = await api.User.getCurrentUser();
      setUser(userResponse);

      //TASKS:
      //1 Add Toasts for server responses
      //2 Add a logout options which clears the cookies and user
      //3 Change navigation depending if user is logged in or no
      //4 add a check when page is refreshed route /me gets called to see if the jwt is still valid if no logout user
      //5 see why some buttons don't change with dark theme and write some tests

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
