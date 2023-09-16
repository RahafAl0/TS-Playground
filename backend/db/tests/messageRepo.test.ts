import { MessageRepo } from "../messageRepo";


describe('Test Message Repo', () => {
  beforeEach(() => {
    MessageRepo.reset()
  })

  it('should have 0 messages as initial state', () => {
    const messages = MessageRepo.getAll();
    expect(messages.length).toBe(0);
    expect(messages).toEqual([]);
  });

  it('should add a message', () => {
    const message: any = {
      username: 'test',
      message: 'test'
    };

    const id = MessageRepo.add(message);
      expect(id).not.toBe('');
      expect(MessageRepo.getAll().length).toBe(1);
      expect(MessageRepo.getAll()[0].id).toBe(id);
  });

  it('should truncate message when too long when add', () => {
    const id = MessageRepo.add({
      username: 'rashed',
      message: 'hey my name is Rahaf and I am learning testing'
    })
    expect(MessageRepo.find(id)?.message).toBe('hey my name is ...')
  })

  it('should return message index when existing', () => {
    const id = MessageRepo.add({
      username: 'Rahaf',
      message: 'test'
    })
    expect(MessageRepo.find(id)).toEqual({
      id,
      username: 'Rahaf',
      message: 'test'
    });  
  });

  it('should return -1 when message not existing', () => {
    expect(MessageRepo.find('uhguhgueirhgieui')).toBe(undefined);
  });

  it('should delete message', () => {
    const messageId = MessageRepo.add({
      username: 'Rahaf',
      message: 'test'
    }) 

    expect(MessageRepo.find(messageId)?.id).toBe(messageId)
    MessageRepo.delete(messageId)
    expect(MessageRepo.find(messageId)).toBe(undefined)
  })

  it('should reset db', () => {
    MessageRepo.add({
      username: 'Rahaf',
      message: 'Hey'
    })
    MessageRepo.reset()
    expect(MessageRepo.getAll()).toEqual([])
  })
});








// static getAll() {
//   return MessageRepo.#messagesDB;
// }

// static findIndex(id: string): number {
//   return MessageRepo.#messagesDB.findIndex(m => m.id === id);
// }

// static add(newMessage: Omit<Message, 'id'>): string {
//   const id = randomUUID();
//   MessageRepo.#messagesDB.push({
//       id,
//       ...newMessage
//   });
//   return id;
// }
