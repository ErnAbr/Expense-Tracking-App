import styles from "./categoryCard.module.scss";
import * as MdIcons from "react-icons/md";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

interface CategoryCardProps {
  name: string;
  iconName: string;
}

export const CategoryCard = ({ name, iconName }: CategoryCardProps) => {
  const Icon = MdIcons[iconName as keyof typeof MdIcons] ?? MdIcons.MdCategory;

  return (
    <Card
      className={styles.categoryCard}
      sx={{
        height: "100%",
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Icon style={{ marginRight: 8, verticalAlign: "middle" }} />
          {name}
        </Typography>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }} gutterBottom>
          Total Spent: will be added later
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add Expense</Button>
      </CardActions>
    </Card>
  );
};
