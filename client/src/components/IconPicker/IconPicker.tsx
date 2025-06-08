import * as FaIcons from "react-icons/fa";
import iconNames from "./fa-icons.json";
import { Box, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../LoadingComponent/LoadingComponent";

interface IconPickerProps {
  setSelectedIcon: (iconName: string) => void;
}

export const IconPicker = ({ setSelectedIcon }: IconPickerProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingComponent loadingMessage="Loading Icons..." />;
  }

  return (
    <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
      <Grid container spacing={1}>
        {iconNames.map((iconName) => {
          const IconComponent = (FaIcons as any)[iconName];
          if (!IconComponent) return null;

          return (
            <Grid size={{ xs: 4, sm: 3, md: 1 }} key={iconName}>
              <IconButton
                onClick={() => {
                  setSelectedIcon(iconName);
                }}
              >
                <IconComponent />
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
