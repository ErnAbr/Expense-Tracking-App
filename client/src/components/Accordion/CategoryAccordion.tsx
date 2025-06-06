import { useStore } from "zustand";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Typography,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppContext } from "../../context/appContext";

export const CategoryAccordion = () => {
  const { categories: storedCategories } = useStore(useAppContext);

  return (
    <Box component={Paper} sx={{ p: 2 }}>
      {storedCategories?.map((cat) => (
        <Accordion key={cat.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1 }}>{cat.name}</Typography>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <EditIcon sx={{ color: "blue" }} />
            </IconButton>
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails sx={{ pl: 2 }}>
            {cat.subcategories.map((sub) => (
              <Box
                key={sub.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography>{sub.name}</Typography>
                <Box>
                  <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={(e) => e.stopPropagation()}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
