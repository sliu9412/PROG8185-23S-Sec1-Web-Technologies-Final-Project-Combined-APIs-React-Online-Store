import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

export class AlertDialog {
  openDialog = () => {};
  closeDialog = () => {};
  setTitle: Dispatch<SetStateAction<string>> = () => {};
  setContent: Dispatch<SetStateAction<string>> = () => {};
  setActions!: React.Dispatch<React.SetStateAction<(() => void)[]>>;

  generateJSX = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [actions, setActions] = useState([() => {}]);

    this.openDialog = () => {
      setOpen(true);
    };

    this.closeDialog = () => {
      setOpen(false);
    };

    this.setTitle = setTitle;
    this.setContent = setContent;
    this.setActions = setActions;

    return (
      <div>
        <Dialog open={open} onClose={this.closeDialog}>
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.closeDialog();
              }}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                this.closeDialog();
                actions.forEach((action) => {
                  action();
                });
              }}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
}
