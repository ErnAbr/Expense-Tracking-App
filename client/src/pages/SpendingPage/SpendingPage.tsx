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
import { CategoryDeleteData, EditTarget } from "../../interfaces/category";
import { AddExpenseForm } from "../../components/Forms/ExpenseForm/AddExpenseForm";
import { SelectedCategoryProps } from "../../interfaces/expense";
import { getMonthlyCategoryTotal } from "../../utils/dateFilterFunction";
import { useMonthlyExpenses } from "../../api/expenses.query";

type ModalView =
  | "listCategories"
  | "editCategory"
  | "addCategory"
  | "icons"
  | "addExpense";

const modalTitleMap: Record<ModalView, string> = {
  addCategory: "Add Category",
  addExpense: "Add Expense",
  listCategories: "Edit Your Categories",
  editCategory: "Edit Your Categories",
  icons: "Edit Your Categories",
};

const getGridSizeByBreakpoint = (count: number) => ({
  xs: 12,
  sm: count === 0 ? 12 : count === 1 ? 12 : 6,
  md: count === 0 ? 12 : count === 1 ? 6 : 4,
});

// make check expenses page and pass setFilterExpenseMonth prop

export const SpendingPage = () => {
  const queryClient = useQueryClient();
  const currentDate = new Date();
  const { data: storedCategories } = queryCategories();

  const [openModal, setOpenModal] = useState(false);
  const [modalView, setModalView] = useState<ModalView>("listCategories");
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryProps | null>(null);
  const [filterExpenseMonth, setFilterExpenseMonth] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });

  const { data: monthlyExpenses, isLoading } = useMonthlyExpenses(
    filterExpenseMonth.year,
    filterExpenseMonth.month
  );

  const gridSize = getGridSizeByBreakpoint(storedCategories?.length || 0);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setModalView("listCategories");
  };

  const deleteCategory = async ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    const payload: CategoryDeleteData = { id, type };
    try {
      const response = await api.Category.deleteUserCatOrSub(payload);
      toast.success(response);
      queryClient.invalidateQueries({ queryKey: ["category"] });
      setModalView("listCategories");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data);
      }
    }
  };

  const editCategory = ({ e, id, type }: CategoryMutationTypes) => {
    e.stopPropagation();
    setEditTarget({ id, type });
    setModalView("editCategory");
  };

  const addCategory = () => {
    setModalView("addCategory");
  };

  const addExpense = (category: SelectedCategoryProps | null) => {
    setSelectedCategory(category);
    setModalView("addExpense");
    setOpenModal(true);
  };

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
        {storedCategories?.map((category) => {
          const expenseAmount = monthlyExpenses
            ? getMonthlyCategoryTotal(category, monthlyExpenses)
            : 0;

          return (
            <Grid size={gridSize} key={category.id}>
              <CategoryCard
                name={category.name}
                iconName={category.iconName}
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
        <Grid onClick={handleOpen} size={gridSize}>
          <CategoryCard iconName="CiCirclePlus" />
        </Grid>
      </Grid>

      <BasicModal
        title={modalTitleMap[modalView]}
        open={openModal}
        onClose={handleClose}
      >
        {modalView === "listCategories" && (
          <CategoryAccordion
            editCategory={editCategory}
            deleteCategory={deleteCategory}
            addCategory={addCategory}
          />
        )}
        {modalView === "editCategory" && (
          <EditCategoryForm
            setModalView={setModalView}
            editTarget={editTarget}
            deleteCategory={deleteCategory}
          />
        )}
        {modalView === "addCategory" && (
          <AddCategoryForm setModalView={setModalView} />
        )}
        {modalView === "addExpense" && selectedCategory && (
          <AddExpenseForm
            category={selectedCategory}
            setOpenModal={setOpenModal}
          />
        )}
      </BasicModal>
    </Box>
  );
};
