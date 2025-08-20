import styles from "./budgetPage.module.scss";
import debounce from "lodash/debounce";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { queryCategories } from "../../api/categories.query";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useMonthlyExpenses } from "../../api/expenses.query";
import { getIconComponent } from "../../utils/getIconComponent";
import { FormInputText } from "../../components/FormComponents/FormInputText/FormInputText";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { queryBudget } from "../../api/budget.query";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import axios from "axios";
import { BUDGET_QUERY_KEY } from "../../api/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { CircularWithValueLabel } from "../../components/CircularProgress/CircularProgress";

const tableHeaderElements = [
  { id: "icon-id", fieldName: "Icon" },
  { id: "subcategory-id", fieldName: "Subcategory" },
  { id: "plannedAmount-id", fieldName: "Planned Amount (€)" },
  { id: "spendedAmount-id", fieldName: "Spended Amount (€)" },
  { id: "progress-id", fieldName: "Progress" },
];

//change budgeting model to accept date and add filtering by date ability for budget page
//refactor the page

export const BudgetPage = () => {
  const queryClient = useQueryClient();
  const { data: storedCategories, isLoading } = queryCategories();

  const { data: monthlyExpenses, isLoading: isLoadingExpenses } =
    useMonthlyExpenses(new Date().getFullYear(), new Date().getMonth() + 1);

  const { data: userBudget } = queryBudget();

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const iconSize = isMdUp ? 24 : 16;

  const { control } = useForm();

  const debouncedBudgetUpdate = useMemo(() => {
    return debounce(async (subcategoryId: number, plannedExpense: number) => {
      const payload = {
        subcategoryId: subcategoryId,
        plannedExpense: plannedExpense,
      };

      try {
        await api.Budget.AddSubcategoryBudget(payload);
        queryClient.invalidateQueries({ queryKey: [BUDGET_QUERY_KEY] });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data);
        }
      }
    }, 500);
  }, []);

  if (isLoading || isLoadingExpenses) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  return (
    <Box mb={2}>
      {storedCategories?.map((category) => (
        <Box
          key={category.id}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <Paper
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
            }}
            elevation={0}
          >
            <Typography
              color="info"
              textAlign="center"
              margin={1}
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                  md: "1.5rem",
                },
                fontWeight: 600,
              }}
            >
              {category.name}
            </Typography>

            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {tableHeaderElements.map((element) => (
                      <TableCell
                        key={element.id}
                        align="center"
                        style={{
                          backgroundColor: "#0288D1",
                          width: `${100 / tableHeaderElements.length}%`,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.55rem",
                              sm: "0.6rem",
                              md: "0.7rem",
                              lg: "0.8rem",
                            },
                            fontWeight: "bold",
                          }}
                        >
                          {element.fieldName}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.subcategories.map((sub) => {
                    const Icon = category
                      ? getIconComponent(sub.iconName)
                      : null;

                    const budgetedValue = userBudget?.find(
                      (b) => b.subcategoryId === sub.id
                    );

                    const categoryExpense = monthlyExpenses?.filter(
                      (e) => e.subcategoryId === sub.id
                    );

                    const subcategoryExpenseAmount = categoryExpense?.reduce(
                      (acc, item) => {
                        return acc + item.amount;
                      },
                      0
                    );

                    return (
                      <TableRow key={sub.id}>
                        <TableCell align="center">
                          {Icon && (
                            <Icon
                              size={iconSize}
                              style={{
                                verticalAlign: "middle",
                                marginTop: 3,
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.75rem",
                                md: "1rem",
                              },
                            }}
                          >
                            {sub.name}
                          </Typography>
                        </TableCell>
                        <TableCell className={styles.plannedInput}>
                          <FormInputText
                            name={`planned-expenses-${sub.id}`}
                            control={control}
                            type="number"
                            label="Planned"
                            InputLabelProps={{ shrink: true }}
                            placeholder={budgetedValue?.plannedExpense?.toString()}
                            onValueChange={(newValue) => {
                              debouncedBudgetUpdate(
                                sub.id,
                                parseFloat(newValue)
                              );
                            }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.75rem",
                                md: "1rem",
                              },
                            }}
                          >
                            {subcategoryExpenseAmount}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <CircularWithValueLabel
                            plannedValue={budgetedValue?.plannedExpense}
                            spendedAmount={subcategoryExpenseAmount}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};
