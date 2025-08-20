import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";

interface CircularWithValueLabelProps {
  plannedValue: number | undefined;
  spendedAmount: number | undefined;
}

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; rawProgress: number }
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary" }}
        >{`${Math.round(props.rawProgress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export const CircularWithValueLabel = ({
  plannedValue,
  spendedAmount,
}: CircularWithValueLabelProps) => {
  const rawProgress =
    plannedValue && plannedValue > 0
      ? ((spendedAmount ?? 0) / plannedValue) * 100
      : 0;

  const progress = Math.min(rawProgress, 100);

  return (
    <CircularProgressWithLabel rawProgress={rawProgress} value={progress} />
  );
};
