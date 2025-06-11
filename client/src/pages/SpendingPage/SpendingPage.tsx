// pages/SpendingPage.tsx
import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";
import { Box } from "@mui/material";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";
import { CategoryAccordion } from "../../components/Accordion/CategoryAccordion";
import { EditCategoryForm } from "../../components/Forms/CategoryForm/EditCategoryForm";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { AddCategoryForm } from "../../components/Forms/CategoryForm/AddCategoryForm";

// TASK: create a form for adding categories and subcategories

export const SpendingPage = () => {
  const { categories: storedCategories } = useStore(useAppContext);
  const [openModal, setOpenModal] = useState(false);
  const [modalView, setModalView] = useState<"list" | "edit" | "add" | "icons">(
    "list"
  );
  const [editTarget, setEditTarget] = useState<{
    id: number;
    type: "cat" | "sub";
  } | null>(null);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const deleteCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    console.log(id);
    console.log(type);
  };

  const editCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    setEditTarget({ id, type });
    setModalView("edit");
  };

  const addCategory = () => {
    setModalView("add");
  };

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid container spacing={1}>
        {storedCategories?.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
            <CategoryCard name={category.name} iconName={category.iconName} />
          </Grid>
        ))}
        <Grid onClick={handleOpen} size={{ xs: 12, sm: 6, md: 4 }}>
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
