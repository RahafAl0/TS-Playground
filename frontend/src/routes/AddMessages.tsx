/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  };

  const handleNewMessageChange = (e: any) => {
    setMessage(e.target.value)
  }

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    axios.post('http://localhost:3000/messages',{username, message})
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
       Add Messages
      </Button>
      <Dialog open={open} onClose={handleClose}>
        
        <DialogContent>
          
          <TextField
            value={username}
            onChange={handleUsernameChange}
            autoFocus
            margin="dense"
            id="name"
            label="username"
            type="username"
            fullWidth
            variant="standard"
          />
          <TextField
            value={message}
            onChange={handleNewMessageChange}
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
          <Button onClick={handleClick}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}