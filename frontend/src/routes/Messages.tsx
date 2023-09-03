/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./search.tsx";
import DeleteMessages from "./DeleteMessage.tsx";
import EditMessages from "./EditMessages.tsx";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const reloadMessages = async () => {
    axios.get('http://localhost:3000/messages')
    .then((response) => {
      setMessages(response.data.messages);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    reloadMessages()
  },[]);

  
  return (
    <div>
      <Search />
      <h1>Messges!</h1>
      <ul>
        {messages.map((item: any, idx: any) => (
          <li key={idx}>
            {item.username}
            <p>{item.message}
              <DeleteMessages id={item.id}/>
              <EditMessages id={item.id}/>
           </p>
           
          </li>
        ))}
      </ul>
    </div>
  );
}
