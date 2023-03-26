import React from "react";

import { useLiveQuery } from "dexie-react-hooks";
import { motion } from "framer-motion";

import { Message } from "@/common-common";
import { db } from "@/db";

export const MessageList = ({ topicId }: { topicId: string }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [newMessageCount, setNewMessagesCount] = React.useState<
    number | undefined
  >();
  const messagesRef = React.useRef<HTMLUListElement>(null);

  const messages = useLiveQuery(
    () => db.messages.where("topicId").equals(topicId).sortBy("createdAt"),
    [topicId]
  );

  const handleScrollToBottom = () => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
    setScrolled(false);
    setNewMessagesCount(undefined);
  };

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    //Check if the user is at the bottom
    if (scrollTop + clientHeight == scrollHeight) {
      setScrolled(false);
      setNewMessagesCount(undefined);
    }
    // If user is not at the bottom, set scrolled to true
    if (scrollTop + clientHeight !== scrollHeight) {
      setScrolled(true);
    }
  };

  React.useEffect(() => {
    if (scrolled && messages) {
      setNewMessagesCount((prev) => (prev ? prev + 1 : 1));
    }
    if (!scrolled) {
      setScrolled(false);
      setNewMessagesCount(undefined);

      // Wait for the messages to render - this is a hacky solution meant to be replaced in the future
      setTimeout(() => {
        handleScrollToBottom();
      }, 50);
    }
  }, [messages]);

  React.useEffect(() => {
    setScrolled(false);
    setNewMessagesCount(undefined);
  }, [topicId]);

  return (
    <>
      {scrolled && newMessageCount ? (
        <button
          onClick={handleScrollToBottom}
          className="outline-none absolute top-0 right-0 left-0 py-1.5 text-center text-sm bg-indigo-600 shadow text-white"
        >
          <span className="font-bold mr-1 -ml-1">{newMessageCount}</span> new
          messages
        </button>
      ) : null}
      <ul
        className={
          "px-4 pb-4 pt-2 h-full space-y-4 w-full divide-y divide-gray-100/10 overflow-auto"
        }
        onScroll={(e) => handleScroll(e)}
        ref={messagesRef}
      >
        {messages?.map((message, idx) => (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, delay: 0.05, ease: "easeOut" },
            }}
            key={message.id}
            className="flex w-full"
            id={`message-${idx}`}
          >
            <Message message={message} />
          </motion.li>
        ))}
      </ul>
    </>
  );
};
