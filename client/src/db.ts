import Dexie , {type Table} from 'dexie';
import {faker} from '@faker-js/faker'
import {v4 as uuid} from "uuid"

type Channel = {
    id: string;
    avatarUrl: string;
    name: string;
}

type User = {
    id: string;
    name: string;
    avatarUrl: string;
}

type Message = {
    id: string
    channelId: string
    createdAt: string
    userId: string
    text: string
}

interface DB extends Dexie {
    channel: Table<Channel>;
    user: Table<User>;
    message: Table<Message>;
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
  
  const fakeMessages: Message[] = Array.from({length: 1000}, (_, i) => ({
    id: uuid(),
    channelId: fakeChannels[Math.floor(Math.random()*fakeChannels.length)].id,
    createdAt: faker.date.past().toISOString(),
    userId: fakePeople[Math.floor(Math.random()*fakePeople.length)].id,
    text: faker.lorem.sentence(),
  }))
  
 


const db = new Dexie('discordClone') as DB;
db.version(1).stores({
  channel: '++id, name, avatarUrl', 
  message: '++id, channelId, createdAt, text, userId',
  user: '++id, name, avatarUrl', 
});

db.on("populate", async () => {
  await Promise.all(fakePeople.map(async user => db.user.add(user)))
  await Promise.all(fakeChannels.map(async channel => db.channel.add(channel)))
  await Promise.all(fakeMessages.map(async message => db.message.add(message)))
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




