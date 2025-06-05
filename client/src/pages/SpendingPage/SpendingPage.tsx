// pages/SpendingPage.tsx
import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";
import { Box } from "@mui/material";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { BasicModal } from "../../components/Modal/BasicModal";

export const SpendingPage = () => {
  const { categories: storedCategories } = useStore(useAppContext);
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  //1. create a form so that you can add category and subcategory. when you open modal you get a list of your current cats and subs which you can delete or rename also ability to add new cats with subs

  //2. make a model that when you press a category it shows subcategories, with expenses to each subcategory and ability to add an expense

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid container spacing={1}>
        {storedCategories?.map((category) => (
          <Grid
            onClick={() => console.log(category.id)}
            size={{ xs: 12, sm: 6, md: 4 }}
            key={category.id}
          >
            <CategoryCard name={category.name} iconName={category.iconName} />
          </Grid>
        ))}
        <Grid onClick={handleOpen} size={{ xs: 12, sm: 6, md: 4 }}>
          <CategoryCard iconName="CiCirclePlus" />
        </Grid>
      </Grid>

      <BasicModal
        title="Edit Your Categories"
        open={openModal}
        onClose={handleClose}
      >
        <p>Form or inputs for new category here</p>
      </BasicModal>
    </Box>
  );
};
