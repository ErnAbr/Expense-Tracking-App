import { useState, useCallback } from "react";
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
  confirmText?: string;
  cancelText?: string;
};

export const useConfirmationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});
  const [resolver, setResolver] = useState<
    ((confirmed: boolean) => void) | null
  >(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = useCallback(
    (confirmed: boolean) => {
      if (resolver) resolver(confirmed);
      setIsOpen(false);
      setOptions({});
      setResolver(null);
    },
    [resolver]
  );

  const ConfirmationModal = () => (
    <Dialog open={isOpen} onClose={() => handleClose(false)}>
      {options.title && <DialogTitle>{options.title}</DialogTitle>}
      {options.description && (
        <DialogContent>
          <Typography>{options.description}</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={() => handleClose(false)}>
          {options.cancelText || "Cancel"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleClose(true)}
        >
          {options.confirmText || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { confirm, ConfirmationModal };
};
