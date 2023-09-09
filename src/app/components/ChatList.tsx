import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import { Chat } from "@prisma/client";
import { listItemStyle } from "./SideMenu";
import { useFetchChats } from "../hooks/chats/useFetchChats";

type Props = {
  userId: string;
  currentChatId: string;
};

const ChatList = ({ userId, currentChatId }: Props) => {
  const { data: chatList } = useFetchChats(userId);

  return (
    <ul className="flex flex-col">
      {chatList?.map((chat) => (
        <li className="" key={chat.id}>
          <Link
            href={chat.id}
            className={twMerge(
              listItemStyle,
              currentChatId === chat.id && "bg-gray-400 hover:bg-gray-400",
            )}
          >
            <SvgIcon name="chat" className="" />
            {chat.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
