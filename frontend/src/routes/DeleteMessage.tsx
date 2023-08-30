/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MouseEvent, useState } from "react";
import axios from "axios";

export default function DeleteMessages(props: any) {
  const [open, setOpen] = useState(false);

  const id = props.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (event: MouseEvent) => {
    event.preventDefault();
    axios.delete(`http://localhost:3000/messages/${id}`);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            
        </DialogTitle>
        <DialogContent>
          <h1>Are You Sure You Want To Delete A meesage!?</h1>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        </Stack>


    </div>
  );
}
