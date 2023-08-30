/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import { MouseEvent, useState } from "react";
import axios from "axios";

export default function EditMessages(props: any) {
  const [editMessage, setEditMessage] = useState("");
  const [open, setOpen] = useState(false);

  const id = props.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditChange = (e: any) => {
    setEditMessage(e.target.value);
  };

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/messages/${id}`, {message: editMessage});
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit Message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            value={editMessage}
            onChange={handleEditChange}
            autoFocus
            margin="dense"
            id="name"
            label="message"
            type="message"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
