import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { CategoryObject } from "../../interfaces/category";
import { BudgetServerResponse } from "../../interfaces/budget";
import { MontlyExpenseResponseDto } from "../../interfaces/expense";
import { Control } from "react-hook-form";
import { useCallback, useMemo } from "react";
import { SubcategoryRow } from "./SubcategoryRow/SubcategoryRowComponent";

const tableHeaderElements = [
  { id: "icon-id", fieldName: "Icon" },
  { id: "subcategory-id", fieldName: "Subcategory" },
  { id: "plannedAmount-id", fieldName: "Planned Amount (€)" },
  { id: "spendedAmount-id", fieldName: "Spended Amount (€)" },
  { id: "progress-id", fieldName: "Progress" },
];

interface BudgetingDisplayTableProps {
  storedCategories: CategoryObject[] | undefined;
  userBudget: BudgetServerResponse[] | undefined;
  monthlyExpenses: MontlyExpenseResponseDto[] | undefined;
  control: Control;
  debouncedBudgetUpdate: (
    subcategoryId: number,
    plannedExpense: number
  ) => void;
  isLoadingBudget: boolean;
  isLoadingExpenses: boolean;
}

export const BudgetingDisplayTable = ({
  storedCategories,
  userBudget,
  monthlyExpenses,
  control,
  debouncedBudgetUpdate,
  isLoadingBudget,
  isLoadingExpenses,
}: BudgetingDisplayTableProps) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const iconSize = isMdUp ? 24 : 16;

  const budgetMap = useMemo(() => {
    const map: Record<number, number> = {};
    userBudget?.forEach((b) => {
      map[b.subcategoryId] = b.plannedExpense;
    });
    return map;
  }, [userBudget]);

  const expenseMap = useMemo(() => {
    const map: Record<number, number> = {};
    monthlyExpenses?.forEach((e) => {
      map[e.subcategoryId] = (map[e.subcategoryId] || 0) + e.amount;
    });
    return map;
  }, [monthlyExpenses]);

  const handleBudgetUpdate = useCallback(
    (subcategoryId: number, plannedExpense: number) => {
      debouncedBudgetUpdate(subcategoryId, plannedExpense);
    },
    [debouncedBudgetUpdate]
  );

  return (
    <>
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
                  {category.subcategories.map((sub) => (
                    <SubcategoryRow
                      key={sub.id}
                      sub={sub}
                      planned={budgetMap[sub.id] || 0}
                      spent={expenseMap[sub.id] || 0}
                      control={control}
                      debouncedBudgetUpdate={handleBudgetUpdate}
                      isLoadingBudget={isLoadingBudget}
                      isLoadingExpenses={isLoadingExpenses}
                      iconSize={iconSize}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ))}
    </>
  );
};
