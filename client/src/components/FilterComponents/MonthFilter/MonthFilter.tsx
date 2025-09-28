import styles from "./monthFilter.module.scss";
import { Typography, Box, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { FormDatePicker } from "../../FormComponents/FormDatePicker/FormDatePicker";
import { Control } from "react-hook-form";

interface MonthFilterProps {
  name: string;
  control: Control;
  setValue: (name: string, date: Dayjs) => void;
}

export const MonthFilter = ({ name, control, setValue }: MonthFilterProps) => {
  return (
    <>
      <Typography variant="h6" alignSelf="center" p={2}>
        {name}
      </Typography>
      <Box className={styles.monthFilterBox}>
        <FormDatePicker
          label="Filter Expenses"
          name="filterMonth"
          control={control}
          views={["year", "month"]}
          format="MM/YYYY"
        />
        <Button
          size="small"
          color="info"
          variant="contained"
          onClick={() => setValue("filterMonth", dayjs())}
        >
          This Month
        </Button>
      </Box>
    </>
  );
};
