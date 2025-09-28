import { Box, Typography } from "@mui/material";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAllDaysOfMonth,
  getMonthName,
  mergeExpensesWithDays,
} from "./helpers/MonthlySpendingHelperFunctions";

interface MonthlySpendingLineGraphProps {
  sumOfExpenses: { date: string; total: number }[];
}

export const MonthlySpendingLineGraph = ({
  sumOfExpenses,
}: MonthlySpendingLineGraphProps) => {
  if (!sumOfExpenses.length) {
    return (
      <Typography variant="h2" margin={5}>
        No expenses found
      </Typography>
    );
  }
  const [year, month] = sumOfExpenses[0].date.split("-").map(Number);
  const monthName = getMonthName(month);

  const allDays = getAllDaysOfMonth(year, month);
  const merged = mergeExpensesWithDays(allDays, sumOfExpenses);

  return (
    <Box m={3} marginTop={0} marginLeft={0}>
      <Typography variant="h4" textAlign="center" p={2}>
        {monthName}
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={merged}>
          <CartesianGrid />
          <XAxis dataKey="date" label={{ value: "Days", position: "bottom" }} />
          <YAxis tickFormatter={(v) => `${v}€`}></YAxis>
          <Legend align="right" />
          <Tooltip />
          <Line
            dataKey="total"
            stroke=" #990000
"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
