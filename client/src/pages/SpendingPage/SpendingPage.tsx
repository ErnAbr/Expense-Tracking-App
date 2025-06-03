// pages/SpendingPage.tsx
import { useStore } from "zustand";
import { useAppContext } from "../../context/appContext";
import { Box } from "@mui/material";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";
import Grid from "@mui/material/Grid";

export const SpendingPage = () => {
  const { categories: storedCategories } = useStore(useAppContext);

  // ADD AN EMPTY CARD LIKE A BUTTON FOR ADDING MORE CATEGORIES

  return (
    <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
      <Grid container spacing={1}>
        {storedCategories?.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CategoryCard
              name={category.name}
              iconName={category.iconName}
              key={category.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
