import { Box, Typography } from "@mui/material";
import { LineChart, ResponsiveContainer } from "recharts";

interface MonthlySpendingLineGraphProps {
  sumOfExpenses: { date: string; total: number }[];
}

function getMonthName(monthName: number) {
  const date = new Date();
  date.setMonth(monthName - 1);

  return date.toLocaleString("en-US", { month: "long" });
}

function getAllDaysOfMonth(year: number, month: number) {
  const date = new Date(year, month - 1, 1);
  const days: { date: string; total: number | null }[] = [];

  while (date.getMonth() === month - 1) {
    const dd = String(date.getDate()).padStart(2, "0");
    days.push({ date: `${dd}`, total: null });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export const MonthlySpendingLineGraph = ({
  sumOfExpenses,
}: MonthlySpendingLineGraphProps) => {
  console.log("sumOfExpensess", sumOfExpenses);
  const monthNameNumber = sumOfExpenses[0].date.split("-")[1];
  const monthName = getMonthName(Number(monthNameNumber));

  return (
    <Box m={3} marginTop={0} marginLeft={0}>
      <Typography variant="h4" textAlign="center" p={2}>
        {monthName}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart></LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
