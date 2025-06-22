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
import { CategoryDeleteData } from "../../interfaces/category";

export const SpendingPage = () => {
  const queryClient = useQueryClient();
  const { data: storedCategories } = queryCategories();
  const [openModal, setOpenModal] = useState(false);
  const [modalView, setModalView] = useState<"list" | "edit" | "add" | "icons">(
    "list"
  );

  console.log("object", storedCategories);

  const [editTarget, setEditTarget] = useState<{
    id: number;
    type: "cat" | "sub";
  } | null>(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setModalView("list");
  };

  const deleteCategory = async ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    const payload: CategoryDeleteData = { id, type };
    try {
      const response = await api.Category.deleteUserCatOrSub(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setModalView("list");
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

  const getGridSizeByBreakpoint = (count: number) => ({
    xs: 12,
    sm: count === 0 ? 12 : count === 1 ? 12 : 6,
    md: count === 0 ? 12 : count === 1 ? 6 : 4,
  });

  const gridSize = getGridSizeByBreakpoint(storedCategories?.length || 0);

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid
        container
        spacing={1}
        sx={{
          width:
            storedCategories?.length === 0
              ? { xs: "70%", md: "40%", xl: "25%" }
              : undefined,
        }}
      >
        {storedCategories?.map((category) => (
          <Grid size={gridSize} key={category.id}>
            <CategoryCard name={category.name} iconName={category.iconName} />
          </Grid>
        ))}
        <Grid onClick={handleOpen} size={gridSize}>
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
