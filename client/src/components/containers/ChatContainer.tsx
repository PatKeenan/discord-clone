import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import clsx from "clsx";

import {
  ChevronDownIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ArrowLeftCircleIcon,
  BellIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import { Message } from "@/components/common";

import type { MessageProps } from "@/components/common";

const randomMessages: MessageProps[] = [
  {
    id: 1,
    name: "Tina Turner",
    message: "What a wonderful world",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
  },
  {
    id: 2,
    name: "Bob Dillon",
    message: "Yes it is!!",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
  },
];

export const ChatContainer = () => {
  const [messages, setMessages] = React.useState<MessageProps[]>(
    () => randomMessages
  );
  const [scrolled, setScrolled] = React.useState(false);
  const [newMessages, setNewMessages] = React.useState<number | undefined>();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    const data = Object.fromEntries(formValues.entries());

    const newMessage = {
      id: messages.length + 1,
      name: "Me",
      message: data.message as string,
      image: "https://source.unsplash.com/random/person",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

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

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <aside className="fixed left-0 top-0 bottom-0 flex overflow-hidden">
        <div className="w-20 h-full bg-gray-900 overflow-auto"></div>
        <div className="h-full w-60 bg-gray-800 overflow-auto">
          <div
            className={clsx(
              isOpen && "bg-gray-600/40",
              "active:bg-gray-600/40 border-opacity-30 cursor-pointer shadow border-b border-b-gray-900  h-[48px] hover:bg-gray-600/40"
            )}
          >
            <DropdownMenu.Root onOpenChange={(val) => setIsOpen(val)}>
              <DropdownMenu.Trigger asChild>
                <button className="py-3 px-4 flex w-full justify-between text-gray-100 font-semibold items-center outline-none">
                  MakersHQ
                  {isOpen ? (
                    <XMarkIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="bg-gray-900 shadow-md rounded-md w-56 py-1 px-2 mt-2 text-gray-400">
                  <div className="divide-y-[.1px] divide-gray-100/20">
                    <div className="py-1">
                      <DropdownMenu.Item className="px-2 py-1.5 text-sm hover:bg-indigo-700 hover:text-gray-50 outline-none rounded cursor-pointer  ">
                        Server Boost
                      </DropdownMenu.Item>
                    </div>
                    <div className="py-1">
                      <DropdownMenu.Item className="px-2 py-1.5 items-center text-sm hover:bg-indigo-700 cursor-pointer hover:text-white outline-none rounded text-indigo-400 flex justify-between">
                        <span>Invite People</span>{" "}
                        <UserPlusIcon className="h-4 w-4" />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-2 py-1.5 items-center text-sm hover:bg-indigo-700 cursor-pointer hover:text-white outline-none rounded flex justify-between">
                        <span>Notification Settings</span>{" "}
                        <BellIcon className="h-4 w-4" />
                      </DropdownMenu.Item>
                    </div>
                    <div className="py-1">
                      <DropdownMenu.Item className="px-2 py-1.5 items-center text-sm hover:bg-red-700 cursor-pointer hover:text-white outline-none rounded text-red-500 flex justify-between">
                        <span>Leave Server</span>{" "}
                        <ArrowLeftCircleIcon className="h-4 w-4" />
                      </DropdownMenu.Item>
                    </div>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden ml-80 h-screen">
        <header>
          <div className="h-[48px] text-gray-300 items-center px-2 top-0 left-0 right-0 w-full flex border-opacity-30 shadow border-b border-b-gray-800 ">
            <div className="flex space-x-2 items-center">
              <span className="text-gray-500 text-2xl ml-1">#</span>
              <h1 className="text-base font-medium text-gray-50 ">
                channel title
              </h1>
              <button className="rounded shadow text-sm leading-none py-1 px-2 text-gray-50 bg-gray-600 hover:bg-gray-500 transition-all duration-150 ease-in-out">
                Follow
              </button>
            </div>
          </div>
        </header>
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
          <ul
            className={
              "px-4 pb-4 pt-2 space-y-4 w-full divide-y divide-gray-100/10 overflow-auto"
            }
            onScroll={handleScroll}
            ref={messagesRef}
          >
            {messages.concat(messages)?.map(({ message, image, id, name }) => (
              <li key={id} className="flex w-full">
                <Message message={message} image={image} name={name} id={id} />
              </li>
            ))}
          </ul>
        </main>
        <footer className="h-[68px] w-full px-4 flex-shrink-0">
          <form
            className="bg-gray-600 py-2 pl-2 pr-4 rounded-md flex items-center flex-1 relative"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              name="message"
              autoComplete="off"
              aria-multiline="true"
              aria-label="Message #general"
              placeholder="Message #general"
              className="w-full peer flex  bg-transparent flex-auto py-1 outline-none focus:caret-gray-300 text-gray-300 z-10"
            />
            <button type="submit">
              <PaperAirplaneIcon className="h-6 w-6 text-gray-400" />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};
