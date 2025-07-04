import { useNavigate } from "react-router-dom";
import { routes } from "../../../navigation/routes/routes";
import { getIconComponent } from "../../../utils/getIconComponent";
import styles from "./categoryCard.module.scss";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

interface CategoryCardProps {
  name?: string;
  iconName: string;
  categoryId?: number;
  expenseAmount?: number;
  onClick?: () => void;
  isLoadingExpenses?: boolean;
}

export const CategoryCard = ({
  name,
  iconName,
  categoryId,
  onClick,
  expenseAmount,
  isLoadingExpenses,
}: CategoryCardProps) => {
  const navigate = useNavigate();
  const Icon = getIconComponent(iconName);

  return (
    <Card className={styles.categoryCard}>
      <CardContent className={`${!name ? styles.iconAdd : ""}`}>
        {name ? (
          <>
            <Typography variant="h6" gutterBottom>
              <Icon style={{ marginRight: 8, verticalAlign: "middle" }} />
              {name}
            </Typography>
            {isLoadingExpenses ? (
              <CircularProgress size={20} />
            ) : (
              <Typography
                sx={{ color: "text.secondary", fontSize: 14 }}
                gutterBottom
              >
                Total Spent: {expenseAmount}€
              </Typography>
            )}
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
          <Button
            onClick={() =>
              navigate(`${routes.CATEGORY_SPENDING_PAGE}/${categoryId}`)
            }
            size="small"
            color="error"
          >
            Check Expenses
          </Button>
        </CardActions>
      )}
    </Card>
  );
};
