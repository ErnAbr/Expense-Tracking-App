import { useNavigate } from "react-router-dom";
import styles from "./notFoundPage.module.scss";
import { Box, Button, Paper, Typography } from "@mui/material";
import { routes } from "../../navigation/routes/routes";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box className={styles.notFoundPageContainer}>
      <Paper
        className={styles.notFoundPageContent}
        elevation={8}
        square={false}
      >
        <Typography sx={{ typography: { xs: "body1", sm: "subtitle1", md: "h5" } }} mb={2}>
          Page Does Not Exist
        </Typography>
        <Button
          onClick={() => navigate(routes.SPENDING)}
          variant="contained"
          color="info"
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
};
