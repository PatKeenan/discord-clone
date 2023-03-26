import { db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

export const ChannelList = () => {
  const channels = useLiveQuery(() => db.channels.toArray(), []);
  return (
    <div className="w-20 h-full bg-gray-900 overflow-auto py-6">
      <ul className="flex flex-col space-y-6 mx-auto w-full justify-center">
        {channels?.map((channel, idx) => (
          <button key={channel.id} className="mx-auto">
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <img
                    src={"https://picsum.photos/" + idx}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    sideOffset={18}
                    className=" bg-gray-900 shadow text-gray-50 p-2 border-gray-100/10 border rounded-md text-sm capitalize"
                  >
                    {channel.name}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </button>
        ))}
      </ul>
    </div>
  );
};
