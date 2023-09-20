"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { IsOpenDialogOfRemoveChatContext } from "@app/_components/providers/IsOpenDialogOfRemoveChatProvider";
import { useFetchChatList } from "@app/_hooks/chats/useFetchChatList";
import { twMerge } from "tailwind-merge";

type Props = {
  userId: string;
  currentChatId: string;
};

const ChatList = ({ userId, currentChatId }: Props) => {
  const { data: chatList } = useFetchChatList(userId);
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
              "side-menu-list-item group overflow-hidden overflow-ellipsis whitespace-nowrap",
              isCurrentChat(chat.id) && "bg-gray-400 hover:bg-gray-400",
            )}
          >
            <SvgIcon name="chat" className="" />
            <div className="relative flex w-full items-center overflow-hidden break-all">
              {chat.title}
              <span
                className={twMerge(
                  "absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-gray-200 to-[rgba(32,33,35,0)] group-hover:from-gray-300",
                  isCurrentChat(chat.id)
                    ? "from-gray-400 group-hover:from-gray-400"
                    : "",
                )}
              ></span>
            </div>

            {isCurrentChat(chat.id) && chatList.length !== 1 && (
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
