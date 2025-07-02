import styles from "./appInitializer.module.scss";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingComponentProps {
  loadingMessage: string;
}

export const LoadingComponent = ({ loadingMessage }: LoadingComponentProps) => {
  return (
    <Box className={styles.loadingContainer}>
      <CircularProgress color="secondary" size={200} />
      <Typography variant="h4" mt={1}>
        {loadingMessage}
      </Typography>
    </Box>
  );
};
