import express from "express";
import { v4 as uuidv4 } from "uuid";

let messagesDB: MessagesDB = [{
  id: "1",
  "username": "Rashed",
  "message": "Rashed Message"
},
{
  id : "2",
  "username": "Rahaf",
  "message": "Rahaf Message"
},
{
  id : "3",
  "username": "Rahaf",
  "message": "This is a Message"
},
{
  id : "4",
  "username": "Rahaf",
  "message": "Another Message"
},
{
  id : "5",
  "username": "userx",
  "message": "xxxxxxx"
},];

type Message = {
  id: string;
  username: string;
  message: string;
};

type MessagesDB = Message[];

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
  const messagesCount = messagesDB.length;
  res.json({ messages: messagesDB, count: messagesCount });
});

messagesRouter.get("/:id", (req, res) => {
  const urlID = req.params.id;
  const message = messagesDB.find((msg) => msg.id === urlID);

  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  } 
});

messagesRouter.get("/search/:query", (req, res) => {  
  const query = req.params.query;
  const filteredMessages = messagesDB.filter((msg) => msg.message.includes(query));

  if (filteredMessages.length > 0) {
    res.json(filteredMessages);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

messagesRouter.post("/", (req, res) => {
  const newMessage: Message = req.body;
  newMessage.id = uuidv4();
  messagesDB.push(newMessage);
  res.json(newMessage);
});

messagesRouter.delete("/:id", (req, res) => {
  const message = req.params.id;
  const Length = messagesDB.length;

  messagesDB = messagesDB.filter((msg) => msg.id !== message);

  if (messagesDB.length < Length) {
    res.json({ message: "Message deleted successfully" });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});


messagesRouter.put("/:id", (req, res) => {
  const message = req.params.id;
  const messageToUpdate = messagesDB.find((msg) => msg.id === message);

  if (messageToUpdate) {
    const updatedMessage: Message = req.body;
    messageToUpdate.message = updatedMessage.message;
    res.json(messageToUpdate);
  }else {
    res.status(404).json({ error: "Message not found" });
  }
});
export default messagesRouter;
