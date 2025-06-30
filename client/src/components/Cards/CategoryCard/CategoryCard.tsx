import { getIconComponent } from "../../../utils/getIconComponent";
import styles from "./categoryCard.module.scss";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

interface CategoryCardProps {
  name?: string;
  iconName: string;
  expenseAmount?: number;
  onClick?: () => void;
}

export const CategoryCard = ({
  name,
  iconName,
  onClick,
  expenseAmount,
}: CategoryCardProps) => {
  const Icon = getIconComponent(iconName);

  return (
    <Card
      className={styles.categoryCard}
      sx={{
        minHeight: "15vh",
        height: "100%",
        minWidth: "25vw",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        cursor: !name ? "pointer" : "default",
      }}
    >
      <CardContent className={`${!name ? styles.iconAdd : ""}`}>
        {name ? (
          <>
            <Typography variant="h6" gutterBottom>
              <Icon style={{ marginRight: 8, verticalAlign: "middle" }} />
              {name}
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 14 }}
              gutterBottom
            >
              Total Spent: {expenseAmount}€
            </Typography>
          </>
        ) : (
          <Icon style={{ fontSize: 64 }} />
        )}
      </CardContent>

      {name && (
        <CardActions>
          <Button size="small" onClick={onClick}>
            Add Expense
          </Button>
          <Button size="small" color="error">
            Check Expenses
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
