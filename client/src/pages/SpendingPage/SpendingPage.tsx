import { Box } from "@mui/material";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";
import { CategoryAccordion } from "../../components/Accordion/CategoryAccordion";
import { EditCategoryForm } from "../../components/Forms/CategoryForm/EditCategoryForm";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { AddCategoryForm } from "../../components/Forms/CategoryForm/AddCategoryForm";
import { api } from "../../api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { queryCategories } from "../../api/categories.query";
import { useQueryClient } from "@tanstack/react-query";

//fix the grid

export const SpendingPage = () => {
  const { data: storedCategories } = queryCategories();
  const [openModal, setOpenModal] = useState(false);
  const [modalView, setModalView] = useState<"list" | "edit" | "add" | "icons">(
    "list"
  );
  const [editTarget, setEditTarget] = useState<{
    id: number;
    type: "cat" | "sub";
  } | null>(null);

  const queryClient = useQueryClient();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const deleteCategory = async ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    const payload = { id, type };
    try {
      const response = await api.Category.deleteUserCatOrSub(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["category"] });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const editCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    setEditTarget({ id, type });
    setModalView("edit");
  };

  const addCategory = () => {
    setModalView("add");
  };

  const grindItemCount =
    storedCategories?.length === 0
      ? 12
      : storedCategories?.length === 1
      ? 6
      : 4;

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid container spacing={1}>
        {storedCategories?.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: grindItemCount }} key={category.id}>
            <CategoryCard name={category.name} iconName={category.iconName} />
          </Grid>
        ))}
        <Grid onClick={handleOpen} size={{ xs: 12, sm: 6, md: grindItemCount }}>
          <CategoryCard iconName="CiCirclePlus" />
        </Grid>
      </Grid>

      <BasicModal
        title={modalView === "add" ? "Add Category" : "Edit Your Categories"}
        open={openModal}
        onClose={handleClose}
      >
        {modalView === "list" && (
          <CategoryAccordion
            editCategory={editCategory}
            deleteCategory={deleteCategory}
            addCategory={addCategory}
          />
        )}
        {modalView === "edit" && (
          <EditCategoryForm
            setModalView={setModalView}
            editTarget={editTarget}
            deleteCategory={deleteCategory}
          />
        )}
        {modalView === "add" && <AddCategoryForm setModalView={setModalView} />}
      </BasicModal>
    </Box>
  );
};
