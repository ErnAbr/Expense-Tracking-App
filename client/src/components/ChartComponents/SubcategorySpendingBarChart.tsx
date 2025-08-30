import { Box, Typography } from "@mui/material";
import { BarChart, XAxis, YAxis, Bar, LabelList } from "recharts";
import { MergedObjects } from "../../interfaces/datasetTypes";
import { CustomAxisTick } from "./CustomAxisTick";

interface SubcategorySpendingBarChartProps {
  selectedCategory: MergedObjects;
}

export const SubcategorySpendingBarChart = ({
  selectedCategory,
}: SubcategorySpendingBarChartProps) => {
  return (
    <Box key={selectedCategory.categoryId} m={3}>
      <Typography variant="h4" textAlign="center" p={2}>
        {selectedCategory.categoryName}
      </Typography>

      <BarChart
        width={600}
        height={300}
        data={selectedCategory.subcategory.map((sub) => ({
          name: sub.subcategoryName,
          iconName: sub.subcategoryIconName,
          spent: sub.totalSpentBySubcategory,
          planned: sub.plannedExpenses,
        }))}
      >
        <XAxis
          dataKey="name"
          tick={(props) => {
            const sub = selectedCategory.subcategory.find(
              (s) => s.subcategoryName === props.payload.value
            );
            console.log("props", sub);
            return (
              <CustomAxisTick {...props} iconName={sub?.subcategoryIconName} />
            );
          }}
        />
        <YAxis type="number" domain={[0, "dataMax + 20"]} />
        <Bar dataKey="spent" fill="#8884d8">
          <LabelList
            dataKey="spent"
            position="insideBottom"
            style={{ fill: "white" }}
            formatter={(value) => `${value}€`}
          />
        </Bar>

        <Bar dataKey="planned" fill="#82ca9d">
          <LabelList
            dataKey="planned"
            position="insideBottom"
            style={{ fill: "white" }}
            formatter={(value) => `${value}€`}
          />
        </Bar>
      </BarChart>
    </Box>
  );
};
