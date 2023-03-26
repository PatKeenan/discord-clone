import { ChannelType, MessageType, MessageTypeList } from '@/types'
import {faker} from '@faker-js/faker'
import {v4 as uuid} from "uuid"


export function generateFakeMessages(channelId: string): MessageTypeList{
  const fakePeople: MessageType['user'][] = Array.from({length: 30}, (_, i) => ({
    id: String(i),
    name: faker.name.firstName(),
    avatarUrl: faker.image.avatar(),
  }))

  return Array.from({length: 100}, (_, i) => ({
    id: String(i),
    channelId: channelId,
    createdAt: faker.date.past().toISOString(),
    text: faker.lorem.sentence(),
    user: fakePeople[Math.floor(Math.random()*fakePeople.length)],
  }))
}

export function generateFakeChannel(): ChannelType {
  const id = uuid()
  return ({
    id: id,
    name: faker.lorem.word(),
  })
}

export const seedLocalDB = () => {

  const channels = Array.from({length: 10}, (_, i) => generateFakeChannel())
  const messages = channels.reduce((acc: MessageTypeList, channel) => {
    return [...acc, ...generateFakeMessages(channel.id)]
  }, [])

  console.log(messages)

}