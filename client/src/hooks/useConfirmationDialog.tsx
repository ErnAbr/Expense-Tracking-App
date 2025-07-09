import { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type ConfirmOptions = {
  title?: string;
  description?: string;
};

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const resolverRef = useRef<((confirmed: boolean) => void) | null>(null);

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleClose = (result: boolean) => {
    resolverRef.current?.(result);
    resolverRef.current = null;
    setIsOpen(false);
    setOptions({});
  };

  const ConfirmationModal = () => (
    <Dialog open={isOpen} onClose={() => handleClose(false)}>
      {options.title && <DialogTitle>{options.title}</DialogTitle>}
      {options.description && (
        <DialogContent>
          <Typography>{options.description}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleClose(true)}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { confirm, ConfirmationModal };
};
