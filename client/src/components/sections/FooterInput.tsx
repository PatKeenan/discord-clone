import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React from "react";

type FooterInputProps = {
  onSubmit: (messageText: string) => void;
};

export const FooterInput = ({ onSubmit }: FooterInputProps) => {
  const [input, setInput] = React.useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    const data = Object.fromEntries(formValues.entries());
    onSubmit(data.message as string);
    setInput("");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <footer className="h-[68px] w-full px-4 flex-shrink-0">
      <form
        className="bg-gray-600 py-2 pl-2 pr-4 rounded-md flex items-center flex-1 relative"
        onSubmit={handleSubmit}
      >
        <input
          value={input}
          onChange={handleChange}
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
  );
};
