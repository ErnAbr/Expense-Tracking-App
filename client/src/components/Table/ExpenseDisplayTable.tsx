import { useState } from "react";
import { CategoryObject } from "../../interfaces/category";
import { MontlyExpenseResponseDto } from "../../interfaces/expense";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getIconComponent } from "../../utils/getIconComponent";
import { useConfirmationDialog } from "../../hooks/useConfirmationDialog";
import { useExpenseMutations } from "../../hooks/useExpenseMutations";
import {
  useModalView,
  MODAL_VIEWS,
  modalTitleMap,
} from "../../hooks/useModalView";
import { BasicModal } from "../Modal/BasicModal";
import { ModalContent } from "../Modal/ModalContent";
import {
  EditExpenseForm,
  EditExpenseFormProps,
} from "../Forms/ExpenseForm/EditExpenseForm";

interface ExpenseDisplayTableProps {
  expenseCategoryData: CategoryObject | undefined;
  categoryExpense: MontlyExpenseResponseDto[] | undefined;
}

const tableHeaderElements = [
  { id: "icon-id", fieldName: "Icon" },
  { id: "date-id", fieldName: "Expense Date" },
  { id: "amount-id", fieldName: "Expense Amount (€)" },
  { id: "editExpense-id", fieldName: "Edit Expense" },
  { id: "deleteExpense-id", fieldName: "Delete Expense" },
];

export const ExpenseDisplayTable = ({
  categoryExpense,
  expenseCategoryData,
}: ExpenseDisplayTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const iconSize = isMdUp ? 24 : 16;

  const { confirm, ConfirmationModal } = useConfirmationDialog();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { deleteExpense } = useExpenseMutations({ confirm });

  const {
    openModal,
    modalView,
    modalProps,
    handleOpenModal,
    handleCloseModal,
  } = useModalView(MODAL_VIEWS.LIST_CATEGORIES);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
        }}
      >
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
            {categoryExpense?.length ? (
              <TableBody>
                {categoryExpense
                  ?.sort(
                    (a, b) =>
                      new Date(b.amountDate).getTime() -
                      new Date(a.amountDate).getTime()
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((exp, index) => {
                    const subcategory = expenseCategoryData?.subcategories.find(
                      (sub) => sub.id === exp.subcategoryId
                    );
                    const Icon = subcategory
                      ? getIconComponent(subcategory.iconName)
                      : null;
                    return (
                      <TableRow hover key={index}>
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
                            {exp.amountDate.split("T")[0]}
                          </Typography>
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
                            {exp.amount}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <EditIcon
                              sx={{ color: "blue" }}
                              onClick={() =>
                                handleOpenModal(MODAL_VIEWS.EDIT_EXPENSE, {
                                  expenseId: exp.id,
                                  expenseAmount: exp.amount,
                                  expenseDate: exp.amountDate,
                                  category: expenseCategoryData,
                                  subcategory: subcategory,
                                })
                              }
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="small">
                            <DeleteIcon
                              sx={{ color: "red" }}
                              onClick={(e) => deleteExpense({ e, id: exp.id })}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={tableHeaderElements.length}>
                    <Box display="flex" justifyContent="center" width="100%">
                      No expenses
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={categoryExpense?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <BasicModal
        title={modalTitleMap[modalView]}
        open={openModal}
        onClose={handleCloseModal}
      >
        <ModalContent
          modalView={modalView}
          modalComponents={{
            [MODAL_VIEWS.EDIT_EXPENSE]: {
              component: EditExpenseForm,
              props: {
                ...(modalProps as EditExpenseFormProps),
                handleCloseModal,
              },
            },
          }}
        />
      </BasicModal>
      <ConfirmationModal />
    </Box>
  );
};
