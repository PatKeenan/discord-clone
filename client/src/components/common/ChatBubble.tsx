import React from "react";

type ChatBubbleProps = {
  message: string;
};

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className="p-2 bg-gray-400 rounded-md w-fit max-w-sm">{message}</div>
  );
};
