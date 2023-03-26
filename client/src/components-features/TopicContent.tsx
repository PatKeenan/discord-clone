import React from "react";
import { MessageList } from "./MessageList";
import { useGlobalStore } from "@/store";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db";

export const TopicContent = () => {
  const activeTopic = useGlobalStore((state) => state.activeTopic);
  return (
    <main className="h-full w-full overflow-hidden relative flex flex-grow  flex-col">
      {activeTopic?.id ? <MessageList topicId={activeTopic?.id} /> : null}
    </main>
  );
};
