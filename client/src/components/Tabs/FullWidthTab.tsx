import { AppBar, Box, IconButton, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CategoryObject } from "../../interfaces/category";
import { MontlyExpenseResponseDto } from "../../interfaces/expense";
import { TabPanel } from "./TabPanel";
import { getIconComponent } from "../../utils/getIconComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpenseDisplayTable } from "../Table/ExpenseDisplayTable";

interface FullWidthTabProps {
  expenseCategoryData: CategoryObject | undefined;
  categoryExpense: MontlyExpenseResponseDto[] | undefined;
}

export const FullWidhtTab = ({
  expenseCategoryData,
  categoryExpense,
}: FullWidthTabProps) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: "auto" }}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          centered
        >
          {expenseCategoryData?.subcategories.map((sub, index) => {
            return <Tab key={index} label={sub.name} id={`${sub.id}`} />;
          })}
        </Tabs>
      </AppBar>
      {expenseCategoryData?.subcategories.map((sub, index) => {
        const Icon = getIconComponent(sub.iconName);
        const expenses = categoryExpense?.filter(
          (exp) => exp.subcategoryId === sub.id
        );
        return (
          <TabPanel key={sub.id} value={tabValue} index={index}>
            <ExpenseDisplayTable
              categoryExpense={expenses}
              expenseCategoryData={expenseCategoryData}
            />

            {expenses?.length ? (
              expenses.map((exp) => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Icon
                    style={{
                      marginRight: 8,
                      verticalAlign: "middle",
                      fontSize: 24,
                    }}
                  />
                  <Box key={`${exp.amountDate}`}>
                    {exp.amountDate.split("T")[0]}
                  </Box>
                  <Box key={`${exp.amountDate}`}>{exp.amount}€</Box>
                  <IconButton size="small">
                    <EditIcon sx={{ color: "blue" }} />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </Box>
              ))
            ) : (
              <Box>No expenses</Box>
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
};
