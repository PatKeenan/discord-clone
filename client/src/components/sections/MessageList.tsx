import React from "react";

import { Message } from "@/components/common";

import type { MessageTypeList } from "@/types";

type MessageListProps = {
  messages: MessageTypeList | [];
  onScroll: (e: React.UIEvent<HTMLUListElement, UIEvent>) => void;
};

export const MessageList = React.forwardRef<HTMLUListElement, MessageListProps>(
  ({ onScroll, messages }, forwardedRef) => {
    return (
      <ul
        className={
          "px-4 pb-4 pt-2 space-y-4 w-full divide-y divide-gray-100/10 overflow-auto"
        }
        onScroll={onScroll}
        ref={forwardedRef}
      >
        {messages?.map((message) => (
          <li key={message.id} className="flex w-full">
            <Message message={message} />
          </li>
        ))}
      </ul>
    );
  }
);
