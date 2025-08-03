import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { queryCategories } from "../../api/categories.query";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";
import { useMonthlyExpenses } from "../../api/expenses.query";

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

  if (isLoading || isLoadingExpenses) {
    return (
      <Box sx={{ pt: 10 }}>
        <LoadingComponent loadingMessage={"Loading..."} />;
      </Box>
    );
  }

  console.log("categories", storedCategories);
  console.log("expenses", monthlyExpenses);

  return storedCategories?.map((category) => {
    return (
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
              {/* You can add <TableBody> here later */}
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  });
};
