import { Box, Button } from "@mui/material";
import { useAppContext } from "../../../context/appContext";
import { useStore } from "zustand";
import { CategoryMutationTypes } from "../../../interfaces/categoryMutationType";

interface CategoryFormProps {
  setModalView: (view: "list" | "edit") => void;
  editTarget: {
    id: number;
    type: "cat" | "sub";
  } | null;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
}

export const CategoryForm = ({
  setModalView,
  editTarget,
  deleteCategory,
}: CategoryFormProps) => {
  const { categories: storedCategories } = useStore(useAppContext);

  if (!editTarget) {
    return (
      <Box>
        <Button onClick={() => setModalView("list")}>Back</Button>
      </Box>
    );
  }
  const { id, type } = editTarget;

  const categoryToEdit =
    type === "cat" ? storedCategories?.find((cat) => cat.id === id) : null;

  const subcategoryToEdit =
    editTarget?.type === "sub"
      ? storedCategories
          ?.flatMap((cat) => cat.subcategories)
          .find((sub) => sub.id === editTarget.id)
      : null;

  console.log("cat to edit", categoryToEdit);
  console.log("sub to edit", subcategoryToEdit);

  return (
    <Box>
      <Button onClick={() => setModalView("list")}>Back</Button>
    </Box>
  );
};
