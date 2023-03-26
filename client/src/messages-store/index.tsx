import * as React from "react";

type MessageStoreContext = {
  selectedChannel: string;
};

const MessageStoreContext = React.createContext<MessageStoreContext | null>(
  null
);

type MessageStoreProvider = {
  children: React.ReactNode;
};
export const MessageStoreProvider = ({ children }: MessageStoreProvider) => {
  const [selectedChannelId, setSelectedChannelID] = React.useState<
    string | undefined
  >();

  return (
    <MessageStoreContext.Provider value={{ selectedChannel: "" }}>
      {children}
    </MessageStoreContext.Provider>
  );
};
