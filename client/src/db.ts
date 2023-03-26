import Dexie , {type Table} from 'dexie';
import {faker} from '@faker-js/faker'
import {v4 as uuid} from "uuid"

type Channel = {
    id: string;
    avatarUrl: string;
    name: string;
}

type Topic = {
    id: string;
    channelId: string;
    name: string;
}

type User = {
    id: string;
    name: string;
    avatarUrl: string;
}

type Message = {
    id: string
    topicId: string
    userId: string
    createdAt: string
    text: string
}

interface DB extends Dexie {
    channels: Table<Channel>;
    topics: Table<Topic>;
    users: Table<User>;
    messages: Table<Message>;
}

const fakePeople: User[] = Array.from({length: 10}, (_, i) => ({
    id: String(i),
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
  }))
  
const fakeChannels: Channel[] = Array.from({length: 10}, (_, i) => ({
  id: uuid(),
  avatarUrl: faker.image.animals(),
  name: faker.lorem.word(),
}))

const fakeTopics: Topic[] = Array.from({length: 100}, (_, i) => ({
  id: uuid(),
  channelId: fakeChannels[Math.floor(Math.random()*fakeChannels.length)].id,
  name: faker.lorem.word(),
}))
  
  const fakeMessages: Message[] = Array.from({length: 1000}, (_, i) => ({
    id: uuid(),
    topicId: fakeTopics[Math.floor(Math.random()*fakeTopics.length)].id,
    userId: fakePeople[Math.floor(Math.random()*fakePeople.length)].id,
    createdAt: faker.date.past().toISOString(),
    text: faker.lorem.sentence(),
  }))
  
 

const db = new Dexie('discordClone') as DB;
db.version(1).stores({
  channels: '++id, name, avatarUrl', 
  topics: '++id, name, channelId', 
  messages: '++id, channelId, createdAt, text, userId',
  users: '++id, name, avatarUrl', 
});

db.on("populate", async () => {
  await Promise.all([
    fakePeople.map(async user => db.users.add(user)), 
    fakeChannels.map(async channel => db.channels.add(channel)),
    fakeTopics.map(async topic => db.topics.add(topic)),
    fakeMessages.map(async message => db.messages.add(message)) 
  ])
  
});

db.open().catch(function (err) {
    console.error (err.stack || err);
});

export { 
    db, 
    type Channel, 
    type User, 
    type Message
}




