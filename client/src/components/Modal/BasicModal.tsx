import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const BasicModal = ({ title, children, open, onClose }: ModalProps) => {
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { md: "auto", lg: "40vw" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
