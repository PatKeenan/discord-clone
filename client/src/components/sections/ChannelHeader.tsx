import React from "react";

export const ChannelHeader = () => {
  return (
    <header>
      <div className="h-[48px] text-gray-300 items-center px-2 top-0 left-0 right-0 w-full flex border-opacity-30 shadow border-b border-b-gray-800 ">
        <div className="flex space-x-2 items-center">
          <span className="text-gray-500 text-2xl ml-1">#</span>
          <h1 className="text-base font-medium text-gray-50 ">channel title</h1>
          <button className="rounded shadow text-sm leading-none py-1 px-2 text-gray-50 bg-gray-600 hover:bg-gray-500 transition-all duration-150 ease-in-out">
            Follow
          </button>
        </div>
      </div>
    </header>
  );
};
