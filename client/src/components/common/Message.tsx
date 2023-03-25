import React from "react";

export type MessageProps = {
  id: number;
  message: string;
  name: string;
  image: string;
};

export const Message = ({ message, name, image }: MessageProps) => {
  return (
    <div className="flex items-start space-x-4 pt-4 w-full">
      <img src={image} className="h-10 w-10 rounded-full object-cover" />
      <div>
        <div className="flex space-x-2 text-sm items-baseline">
          <h4 className="text-gray-100 text-sm font-medium">{name}</h4>
          <span className="text-xs text-gray-400">
            {new Date().toDateString()}
          </span>
        </div>

        <div className="text-gray-300 w-fit max-w-4xl text-sm leading-6">
          {message}
        </div>
      </div>
    </div>
  );
};
