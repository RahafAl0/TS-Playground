/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, TextField } from "@mui/material";
import FormDialog from "./AddMessages.tsx";
import DeleteMessages from "./DeleteMessage.tsx";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/messages")
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div>
      <div>
        <Container
          maxWidth="md"
          sx={{ mt: 20 }}
          color="primary"
          background-color="primary"
        >
          <TextField
            type="search"
            id="search"
            label="Search"
            sx={{ width: 600 }}
          />
          <Button>
            <FormDialog />
          </Button>
        </Container>
      </div>
      <h1>Messges!</h1>
      <ul>
        {messages.map((item: any, idx: any) => (
          <li key={idx}>
            {item.username}
            <p>{item.message}
              <DeleteMessages id={item.id}/>
            
           </p>
           
          </li>
        ))}
      </ul>
    </div>
  );
}
