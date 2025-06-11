import { Box, Button } from "@mui/material";
import styles from "./categoryForm.module.scss";

interface CategoryFormProps {
  setModalView: (view: "list") => void;
}

export const AddCategoryForm = ({ setModalView }: CategoryFormProps) => {
  return (
    <Box>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => setModalView("list")}
      >
        BACK
      </Button>
    </Box>
  );
};
