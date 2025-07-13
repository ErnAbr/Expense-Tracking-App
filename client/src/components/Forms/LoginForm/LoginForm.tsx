import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStore } from "zustand";
import { api } from "../../../api/api";
import { useAppContext } from "../../../context/appContext";
import { routes } from "../../../navigation/routes/routes";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";
import styles from "./loginForm.module.scss";
import * as yup from "yup";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginForm = () => {
  const { setUser } = useStore(useAppContext);

  const { handleSubmit, reset, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormValues) => {
    try {
      const response = await api.User.login(data);
      const userResponse = await api.User.getCurrentUser();
      setUser(userResponse);
      toast.success(response);
      navigate(routes.SPENDING);
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
          mb={2}
          fontWeight="700 !important"
          sx={{ typography: { xs: "body1", sm: "subtitle1", md: "h5" } }}
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
