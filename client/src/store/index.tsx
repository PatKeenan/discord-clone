import { Channel, Topic } from "@/db";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Store = {
  activeChannel: Channel | undefined;
  setActiveChannel: (channel: Channel) => void;
  activeTopic: Topic | undefined;
  setActiveTopic: (topic: Topic | undefined) => void;
};

export const useGlobalStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        activeChannel: undefined,
        setActiveChannel: (channel) => set({ activeChannel: channel }),
        activeTopic: undefined,
        setActiveTopic: (topic) => set({ activeTopic: topic }),
      }),
      {
        name: "global-state",
      }
    )
  )
);
