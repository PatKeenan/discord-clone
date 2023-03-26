import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import clsx from "clsx";

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChannelContent,
  ChannelHeader,
  ChannelList,
  FooterInput,
  MessageList,
} from "@/components/sections";
import { db } from "@/db";
import {
  ArrowLeftCircleIcon,
  BellIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import type { Message } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";
import { SubChannelList } from "../sections/SubChannelList";

export const ChatContainer = () => {
  const [messages, setMessages] = React.useState<Message[] | []>([]);
  const [scrolled, setScrolled] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState<number | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    const data = Object.fromEntries(formValues.entries());

    /*   setMessages((prev) => [...prev, newMessage]); */
  };

  const handleOnSubmit = (messageContent: string) => {
    const newMessage = {
      id: messages.length + 1,
      name: "Me",
      message: messageContent,
      image: "https://source.unsplash.com/random/person",
    };
    /*    setMessages((prev) => [...prev, newMessage]); */
  };

  return (
    <div className="relative">
      <aside className="fixed left-0 top-0 bottom-0 flex overflow-hidden">
        <ChannelList />
        <SubChannelList />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden ml-80 h-screen">
        <ChannelHeader />
        <ChannelContent />
        <FooterInput onSubmit={handleOnSubmit} />
      </div>
    </div>
  );
};
