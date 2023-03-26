

// Messages
export type MessageType = {
    id: string;
    text: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        avatarUrl: string;
    };
}
export type MessageTypeList = MessageType[];

export type ChannelType = {
    id: string
    name: string
  }
  
  export type ChannelTypeList = ChannelType[]