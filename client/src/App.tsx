import { useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

function App() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    const data = Object.fromEntries(formValues.entries());
    setMessages((prev) => [...prev, data.message as string]);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative">
      <aside className="fixed left-0 top-0 bottom-0 flex overflow-hidden">
        <div className="w-20 h-full bg-gray-900 overflow-auto"></div>
        <div className="h-full w-60 bg-gray-800 overflow-auto">
          <div className="border-opacity-30 shadow border-b border-b-gray-900 py-3 px-4 h-[48px]">
            <div className="text-gray-100 font-semibold">MakersHQ</div>
          </div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden ml-80 h-screen">
        <header>
          <div className="h-[48px] text-gray-200 items-center px-2 top-0 left-0 right-0  w-full flex border-opacity-30 shadow border-b border-b-gray-800 ">
            <div className="flex space-x-2">
              <h1 className="text-base font-semibold ">channel title</h1>
              <button className="rounded shadow text-sm leading-none py-1 px-2 text-gray-50 bg-gray-600 hover:bg-gray-500 transition-all duration-150 ease-in-out">
                Follow
              </button>
            </div>
          </div>
        </header>
        <main className="h-full overflow-auto relative flex flex-grow ">
          <ul className="p-4 space-y-4">
            {messages?.map((message) => (
              <li key={message} className="flex">
                <div className="p-2 bg-gray-400 rounded-md w-fit max-w-sm">
                  {message}
                </div>
              </li>
            ))}
          </ul>
        </main>
        <footer className="h-[68px] w-full px-4">
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
}

export default App;
