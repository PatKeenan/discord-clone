import { Message as MessageType, db } from "@/db";
import { useLiveQuery } from "dexie-react-hooks";

export const Message = ({ message }: { message: MessageType }) => {
  const user = useLiveQuery(() => db.users.get(message.userId));

  const { text } = message;

  return user ? (
    <div className="flex items-start space-x-4 pt-4 w-full">
      <img
        src={user.avatarUrl}
        className="h-10 w-10 rounded-full object-cover"
      />
      <div>
        <div className="flex space-x-2 text-sm items-baseline">
          <h4 className="text-gray-100 text-sm font-medium">{user.name}</h4>
          <span className="text-xs text-gray-400">
            {new Date().toDateString()}
          </span>
        </div>

        <div className="text-gray-300 w-fit max-w-4xl text-sm leading-6">
          {text}
        </div>
      </div>
    </div>
  ) : null;
};
