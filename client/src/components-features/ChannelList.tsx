import { Channel, db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";
import { useGlobalStore } from "@/store";
import clsx from "clsx";

export const ChannelList = () => {
  const channels = useLiveQuery(() => db.channels.toArray(), []);

  const { activeChannel, setActiveChannel } = useGlobalStore((state) => ({
    activeChannel: state.activeChannel,
    setActiveChannel: state.setActiveChannel,
  }));

  const handelSelectChannel = (channel: Channel) => {
    setActiveChannel(channel);
  };

  return (
    <div className="w-20 h-full bg-gray-900 overflow-auto py-6">
      <ul className="flex flex-col space-y-6 mx-auto w-full justify-center">
        {channels?.map((channel, idx) => (
          <button
            key={channel.id}
            className="w-full flex justify-center relative"
            onClick={() => handelSelectChannel(channel)}
          >
            <div
              className={clsx(
                activeChannel?.id == channel.id
                  ? "h-3/4 top-1.5"
                  : "h-2 top-[40%]",
                "absolute bg-white rounded-md w-2 -left-1"
              )}
            />
            <Tooltip.Provider delayDuration={0}>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <img
                    src={"https://picsum.photos/" + idx}
                    className={clsx(
                      channel.id == activeChannel?.id
                        ? " ring-offset-indigo-600"
                        : " ring-offset-transparent",
                      "h-12 w-12 rounded-full object-cover ring-2 ring-offset-4 ring-transparent"
                    )}
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
