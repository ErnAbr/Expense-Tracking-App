import styles from "./appInitializer.module.scss";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingComponentProps {
  loadingMessage: string;
}

export const LoadingComponent = ({ loadingMessage }: LoadingComponentProps) => {
  return (
    <Box className={styles.loadingContainer}>
      <CircularProgress color="secondary" size={200} />
      <Typography sx={{ fontSize: { xs: 14, sm: 16, md: 20, lg: 24 } }} mt={1}>
        {loadingMessage}
      </Typography>
    </Box>
  );
};
