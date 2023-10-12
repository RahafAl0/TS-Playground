/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { Button, Container, TextField } from "@mui/material";
import FormDialog from "./AddMessages.tsx";

interface Message {
  id: number;
  content: string;
}

export default function Search() {
  const [searchMessages, setSearchMessages] = useState("");

  const fetchMessageCount = async () => {
    const response = await axios.get('http://localhost:3000/messages');
    return response.data.count;
  };

  const fetchSearchResults = async () => {
    const response = await axios.get(
      `http://localhost:3000/messages/search?username=${searchMessages}&term=${searchMessages}`
    );
    return response.data.messages;
  };

  const { data: messageCount, isError: messageCountError } = useQuery(["messageCount"], fetchMessageCount);

  const { data: searchResults = [], isError: searchResultsError } = useQuery(
    ["searchMessages", searchMessages],
    fetchSearchResults,
    {
      enabled: !!searchMessages,
    }
  );

  return (
    <div>
      <p>Total Messages: {messageCountError ? "Error" : (messageCount || "Loading...")}</p>
      <Container maxWidth="md" sx={{ mt: 20 }} color="primary" background-color="primary">
        <TextField
          type="text"
          value={searchMessages}
          onChange={(e) => setSearchMessages(e.target.value)}
          id="search"
          label="Search"
          sx={{ width: 600 }}
        />
        <Button onClick={() => {}}>Search</Button>
        <FormDialog />
        <div>
          {searchResultsError ? (
            <p>Error searching for messages</p>
          ) : (
            searchResults.map((item: Message, idx: any) => (
              <Message key={idx} content={item.content} id={item.id} />
            ))
          )}
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
