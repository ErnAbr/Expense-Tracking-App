import { Grid } from "@mui/material";
import { getMonthlyCategoryTotal } from "../../utils/dateFilterFunction";
import { CategoryCard } from "../Cards/CategoryCard/CategoryCard";
import { CategoryObject } from "../../interfaces/category";
import {
  MontlyExpenseResponseDto,
  SelectedCategoryProps,
} from "../../interfaces/expense";
import { ModalView } from "../../hooks/useModalView";

interface CategoryCardGridProps {
  storedCategories: CategoryObject[] | undefined;
  monthlyExpenses: MontlyExpenseResponseDto[] | undefined;
  isLoading: boolean;
  addExpense: (category: SelectedCategoryProps | null) => void;
  handleOpenModal: (newView?: ModalView) => void;
}

const getGridSizeByBreakpoint = (count: number) => ({
  xs: 12,
  sm: count === 0 ? 12 : count === 1 ? 12 : 6,
  md: count === 0 ? 12 : count === 1 ? 6 : 4,
});

export const CategoryCardGrid = ({
  storedCategories,
  monthlyExpenses,
  isLoading,
  addExpense,
  handleOpenModal,
}: CategoryCardGridProps) => {
  const gridSize = getGridSizeByBreakpoint(storedCategories?.length || 0);

  return (
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
      {storedCategories?.map((category) => {
        const expenseAmount = monthlyExpenses
          ? getMonthlyCategoryTotal(category, monthlyExpenses)
          : 0;

        return (
          <Grid size={gridSize} key={category.id}>
            <CategoryCard
              name={category.name}
              iconName={category.iconName}
              categoryId={category.id}
              expenseAmount={expenseAmount}
              isLoadingExpenses={isLoading}
              onClick={() =>
                addExpense({
                  id: category.id,
                  name: category.name,
                  iconName: category.iconName,
                })
              }
            />
          </Grid>
        );
      })}
      <Grid onClick={() => handleOpenModal("listCategories")} size={gridSize}>
        <CategoryCard iconName="CiCirclePlus" />
      </Grid>
    </Grid>
  );
};
