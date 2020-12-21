import React from "react";
import { Dialog, DialogTitle, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

export const EnhancedDialog = ({ title, open, onClose, children }) => {
  const closeModal = () => {
    if (onClose) {
      onClose(false, "escapeKeyDown");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {title ? (
        <DialogTitle>
          <div className="flex align-items-center mt-16">
            <Typography variant="h4" className="ml-auto">
              {title}
            </Typography>
            <IconButton
              className="ml-auto"
              color="primary"
              aria-label="close modal"
              onClick={closeModal}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
      ) : null}
      {children}
    </Dialog>
  );
};
