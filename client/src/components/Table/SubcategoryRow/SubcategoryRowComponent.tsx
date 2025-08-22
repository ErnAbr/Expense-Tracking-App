import styles from "../tableStyles.module.scss"
import {
  TableRow,
  TableCell,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import { getIconComponent } from "../../../utils/getIconComponent";
import { CircularWithValueLabel } from "../../CircularProgress/CircularProgress";
import { FormInputText } from "../../FormComponents/FormInputText/FormInputText";

interface SubcategoryRowProps {
  sub: { id: number; name: string; iconName: string };
  planned: number;
  spent: number;
  control: Control;
  debouncedBudgetUpdate: (
    subcategoryId: number,
    plannedExpense: number
  ) => void;
  isLoadingBudget: boolean;
  isLoadingExpenses: boolean;
  iconSize: number;
}

const SubcategoryRowComponent = ({
  sub,
  planned,
  spent,
  control,
  debouncedBudgetUpdate,
  isLoadingBudget,
  isLoadingExpenses,
  iconSize,
}: SubcategoryRowProps) => {
  const Icon = getIconComponent(sub.iconName);

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
        {isLoadingBudget ? (
          <Box textAlign="center">
            <CircularProgress size={16} />
          </Box>
        ) : (
          <FormInputText
            name={`planned-expenses-${sub.id}`}
            control={control}
            type="number"
            label="Planned"
            InputLabelProps={{ shrink: true }}
            placeholder={planned.toString()}
            onValueChange={(newValue) => {
              debouncedBudgetUpdate(sub.id, parseFloat(newValue));
            }}
          />
        )}
      </TableCell>
      <TableCell align="center">
        {isLoadingExpenses ? (
          <CircularProgress size={16} />
        ) : (
          <Typography
            sx={{
              fontSize: {
                xs: "0.75rem",
                md: "1rem",
              },
            }}
          >
            {spent}
          </Typography>
        )}
      </TableCell>
      <TableCell align="center">
        <CircularWithValueLabel
          plannedValue={planned || 0}
          spendedAmount={spent}
        />
      </TableCell>
    </TableRow>
  );
};

export const SubcategoryRow = React.memo(SubcategoryRowComponent);
