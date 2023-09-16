import express from "express";
import { MessageRepo } from "../db/messageRepo";

let messagesDB: MessagesDB = [];

type Message = {
  id: string;
  username: string;
  message: string;
};

type MessagesDB = Message[];

const messagesRouter = express.Router();

messagesRouter.get("/search", (req, res) => {
  const { username, term } = req.query;

  if (!username && !term) {
    return res
      .status(400)
      .json({ error: "At least one of username and term is required." });
  }

  let filteredMessages: Message[] = [];

  if (username) {
    filteredMessages = messagesDB.filter((msg) => msg.username === username);
  }

  if (term) {
    filteredMessages = filteredMessages.concat(
      messagesDB.filter((msg) => msg.message.includes(term as string))
    );
  }

  res.json({ messages: filteredMessages });
});

messagesRouter.get("/", (req, res) => {
  const messages = MessageRepo.getAll()
  res.json({ messages, count: messages.length });
});

messagesRouter.get("/:id", (req, res) => {
  const urlID = req.params.id;
  const message = MessageRepo.find(urlID);

  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

messagesRouter.post("/", (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: "Username and message are required" });
  }

  const id = MessageRepo.add({
    username,
    message
  })

  const newMessage = MessageRepo.find(id)

  res.status(201).json(newMessage);
});

messagesRouter.delete("/:id", (req, res) => {
  const message = req.params.id;
  const length = MessageRepo.getAll().length;

  MessageRepo.delete(message);

  if (messagesDB.length < length) {
    res.json({ message: "Message deleted successfully" });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

messagesRouter.put("/:id", (req, res) => {
  const message = req.params.id;
  const messageToUpdate = messagesDB.find((msg) => msg.id === message);

  const truncatedMessage = req.body.message.length > 15 ? req.body.message.slice(0, 15) + "..." : req.body.message;


  if (messageToUpdate) {
    messageToUpdate.message = truncatedMessage;
    res.json(messageToUpdate);
  } else {
    res.status(404).json({ error: "Message not found" });
  }

});
export default messagesRouter;
