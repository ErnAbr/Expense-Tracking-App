import styles from "./categoryCard.module.scss";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import * as FaIcons from "react-icons/fa";
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
}

const getIconComponent = (iconName: string) => {
  const prefix = iconName.slice(0, 2);
  switch (prefix) {
    case "Md":
      return MdIcons[iconName as keyof typeof MdIcons];
    case "Ci":
      return CiIcons[iconName as keyof typeof CiIcons];
    case "Fa":
      return FaIcons[iconName as keyof typeof FaIcons];
    default:
      return MdIcons.MdCategory;
  }
};

export const CategoryCard = ({ name, iconName }: CategoryCardProps) => {
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
              Total Spent: will be added later
            </Typography>
          </>
        ) : (
          <Icon style={{ fontSize: 64 }} />
        )}
      </CardContent>

      {name && (
        <CardActions>
          <Button size="small">Add Expense</Button>
        </CardActions>
      )}
    </Card>
  );
};
