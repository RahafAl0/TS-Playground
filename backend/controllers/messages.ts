import express from "express";
import { v4 as uuidv4 } from "uuid";

const messagesDB: MessagesDB = [];

type Message = {
  id: string;
  username: string;
  message: string;
};

type MessagesDB = Message[];

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
  res.json({ messages: messagesDB });
});

messagesRouter.get('/:id', (req, res) => {
  const urlID = req.params.id;
  const message = messagesDB.find(msg => msg.id === urlID);

  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: 'Message not found' });
  }
});


messagesRouter.post("/", (req, res) => {
  const newMessage: Message = req.body;
  newMessage.id = uuidv4();
  messagesDB.push(newMessage);
  res.json(newMessage);
});

export default messagesRouter;
