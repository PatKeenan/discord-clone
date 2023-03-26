import {
  ArrowLeftCircleIcon,
  BellIcon,
  ChevronDownIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import React from "react";

export const SubChannelList = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
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
  );
};
