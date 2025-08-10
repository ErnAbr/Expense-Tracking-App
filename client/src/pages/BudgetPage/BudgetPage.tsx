import styles from "./budgetPage.module.scss";
import debounce from "lodash/debounce";
import {
  Box,
  CircularProgress,
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
import { useEffect, useMemo } from "react";

const tableHeaderElements = [
  { id: "icon-id", fieldName: "Icon" },
  { id: "subcategory-id", fieldName: "Subcategory" },
  { id: "plannedAmount-id", fieldName: "Planned Amount (€)" },
  { id: "spendedAmount-id", fieldName: "Spended Amount (€)" },
  { id: "progress-id", fieldName: "Progress" },
];

export const BudgetPage = () => {
  const { data: storedCategories, isLoading } = queryCategories();

  const { data: monthlyExpenses, isLoading: isLoadingExpenses } =
    useMonthlyExpenses(new Date().getFullYear(), new Date().getMonth() + 1);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const iconSize = isMdUp ? 24 : 16;

  const { control } = useForm();

  const debouncedBudgetUpdate = useMemo(() => {
    return debounce((subcategoryId: number, plannedExpense: number) => {
      //api call
      console.log(subcategoryId, plannedExpense);
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
                            placeholder="1000"
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
                          <CircularProgress variant="determinate" value={150} />
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
