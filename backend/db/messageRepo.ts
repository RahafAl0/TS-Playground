import {randomUUID} from 'crypto';
import {Message} from './db';

export class MessageRepo {
  static #messagesDB: Message[] = []

  static getAll() {
    return MessageRepo.#messagesDB;
  }

  static find(id: string): Message | undefined {
    return MessageRepo.#messagesDB.find(m => m.id === id);
  }

  
  static add({username, message}: Omit<Message, 'id'>): string {
    const id = randomUUID();
    const truncatedMessage = message.length > 15 ? message.slice(0, 15) + "..." : message;

    MessageRepo.#messagesDB.push({
      id,
      username, 
      message: truncatedMessage
    });
      return id;
  }

  static delete(id: string) {
    const newMessagesDB = MessageRepo.#messagesDB.filter((msg) => msg.id !== id);
    MessageRepo.#messagesDB = newMessagesDB
  }

  static reset() {
    MessageRepo.#messagesDB = []
  }
		
		// ......
}