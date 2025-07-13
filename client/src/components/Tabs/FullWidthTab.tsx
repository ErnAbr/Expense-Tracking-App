import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { CategoryObject } from "../../interfaces/category";
import { MontlyExpenseResponseDto } from "../../interfaces/expense";
import { TabPanel } from "./TabPanel";
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
        const expenses = categoryExpense?.filter(
          (exp) => exp.subcategoryId === sub.id
        );
        return (
          <TabPanel key={sub.id} value={tabValue} index={index}>
            <ExpenseDisplayTable
              categoryExpense={expenses}
              expenseCategoryData={expenseCategoryData}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
};
