import React, { useContext } from "react";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { IsOpenDialogOfRemoveChatContext } from "@app/_components/providers/IsOpenDialogOfRemoveChatProvider";
import { useFetchChats } from "@app/_hooks/chats/useFetchChats";
import { twMerge } from "tailwind-merge";

type Props = {
  userId: string;
  currentChatId: string;
};

const ChatList = ({ userId, currentChatId }: Props) => {
  const { data: chatList } = useFetchChats(userId);
  const { setIsOpenDialogOfRemoveChat } = useContext(
    IsOpenDialogOfRemoveChatContext,
  );

  const isCurrentChat = (chatId: string) => {
    return currentChatId === chatId;
  };
  const handleRemoveChat = () => {
    setIsOpenDialogOfRemoveChat(true);
  };
  return (
    <ul className="flex flex-col">
      {chatList?.map((chat) => (
        <li className="" key={chat.id}>
          <Link
            href={chat.id}
            className={twMerge(
              "side-menu-list-item overflow-ellipsis overflow-hidden whitespace-nowrap",
              isCurrentChat(chat.id) && "bg-gray-400 hovser:bg-gray-400",
            )}
          >
            <SvgIcon name="chat" className="" />
            <div className="w-full relative flex items-center break-all overflow-hidden">
              {chat.title}
              <span
                className={twMerge(
                  "absolute h-full right-0 w-8 z-10 bg-gradient-to-l from-gray-200",
                  isCurrentChat(chat.id) ? "from-gray-400" : "",
                )}
              ></span>
            </div>

            {isCurrentChat(chat.id) && (
              <button className="pr-2" onClick={handleRemoveChat}>
                <SvgIcon name="remove" className="" />
              </button>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
