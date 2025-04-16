import styles from "./homepage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../../components/FromComponents/FormInputText";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
