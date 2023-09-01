/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, TextField } from "@mui/material";
import FormDialog from "./AddMessages.tsx";



  interface Message {
    id: number;
    content: string;
  }
export default function Search() {
    
  const [searchMessages, setSearchMessages] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [messageCount, setMessageCount] = useState<number>(0);

  useEffect(() => {
    fetchMessageCount();
  }, []);

  const fetchMessageCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setMessageCount(response.data.count);
    } catch (error) {
      console.error('Error fetching message count:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/messages/search?username=${searchMessages}&term=${searchMessages}`
      );
      setSearchResults(response.data.messages);
    } catch (error) {
      console.error("Error searching for messages:", error);
    }
  };

  return (
    <div>
         <p>Total Messages: {messageCount}</p>
      <Container
        maxWidth="md"
        sx={{ mt: 20 }}
        color="primary"
        background-color="primary"
      >
        <TextField
          type="text"
          value={searchMessages}
          onChange={(e) => setSearchMessages(e.target.value)}
          id="search"
          label="Search"
          sx={{ width: 600 }}
        />
        <Button>
          <button onClick={handleSearch}>Search</button>

          <FormDialog />
        </Button>
        <div>
            {searchResults.map((item: any, idx: any) => (
              <Message key={idx} content={item.message} id={0} />
            ))}
      </div>
      </Container>
    </div>
  );
}

const Message: React.FC<Message> = ({ content }) => (
    <div>
      <p>{content}</p>
    </div>
  );
