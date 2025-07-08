import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CategoryMutationTypes } from "../../interfaces/categoryMutationType";
import { queryCategories } from "../../api/categories.query";

interface CategoryAccordionProps {
  editCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  deleteCategory: ({ e, id, type }: CategoryMutationTypes) => void;
  addCategory: () => void;
  addSubcategoryToExistingCategory: (category: { id: number; name: string }) => void;
}

export const CategoryAccordion = ({
  editCategory,
  deleteCategory,
  addCategory,
  addSubcategoryToExistingCategory,
}: CategoryAccordionProps) => {
  const { data: storedCategories } = queryCategories();

  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "50vh",
          pr: 0.1,
        }}
      >
        {storedCategories?.map((cat) => (
          <Accordion key={cat.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} component="div">
              <Typography sx={{ flexGrow: 1 }}>{cat.name}</Typography>
              <IconButton
                size="small"
                onClick={(e) => editCategory({ e, id: cat.id, type: "cat" })}
              >
                <EditIcon sx={{ color: "blue" }} />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => deleteCategory({ e, id: cat.id, type: "cat" })}
              >
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
                    <IconButton
                      size="small"
                      onClick={(e) =>
                        editCategory({ e, id: sub.id, type: "sub" })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) =>
                        deleteCategory({ e, id: sub.id, type: "sub" })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ))}
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  onClick={() => addSubcategoryToExistingCategory({ id: cat.id, name: cat.name })}
                  color="secondary"
                  variant="outlined"
                  startIcon={<AddIcon />}
                >
                  Add Subcategory
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button
          onClick={addCategory}
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
        >
          Add Category
        </Button>
      </Box>
    </Box>
  );
};
