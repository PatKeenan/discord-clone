import React from "react";
import { MessageList } from "./MessageList";
import { Message } from "@/db";

export const ChannelContent = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState<number | undefined>();
  const [messages, setMessages] = React.useState<Message[] | []>([]);

  React.useLayoutEffect(() => {
    if (!messagesRef.current) return;
    if (scrolled) {
      setNewMessages((prev) => (prev ? prev + 1 : 1));
      return;
    }
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  const messagesRef = React.useRef<HTMLUListElement>(null);

  const handleScrollToBottom = () => {
    if (!messagesRef.current) return;
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  };
  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    // check if user has scrolled to the bottom
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrolled(false);
      setNewMessages(undefined);
    } else {
      setScrolled(true);
    }
  };

  return (
    <main className="h-full w-full overflow-hidden relative flex flex-grow ">
      {scrolled && newMessages && (
        <button
          onClick={handleScrollToBottom}
          className="outline-none absolute top-0 right-0 left-0 py-1.5 text-center text-sm bg-indigo-600 shadow text-white"
        >
          <span className="font-bold mr-1 -ml-1">{newMessages}</span> new
          messages
        </button>
      )}
      <MessageList messages={messages} onScroll={handleScroll} />
    </main>
  );
};
