"use client";
import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ChatList from "./ChatList";
import useCreateChat from "../hooks/chats/useCreateChat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const buttonStyle =
  "flex items-center gap-3 rounded-md border-[1px] border-gray-600 px-4 py-3";
export const listItemStyle =
  "flex w-full flex-row items-center gap-2 rounded-md py-3 pl-3 hover:bg-gray-300";

const SideMenu = ({ isOpen, onClose }: Props) => {
  const { data: session } = useSession();
  const createChatMutation = useCreateChat();

  const handleCreateChat = async () => {
    if (session?.user.id) {
      createChatMutation.mutate(session.user.id);
    }
  };

  return (
    <aside
      className={twMerge(
        "flex h-screen w-64 flex-col justify-between bg-gray-200 p-2",
      )}
    >
      <div>
        <div className="flex w-full gap-2">
          <button
            className={twMerge(buttonStyle, "flex-grow")}
            onClick={handleCreateChat}
          >
            <SvgIcon name="plus" className="" />
            New chat
          </button>
          <button className={twMerge(buttonStyle)} onClick={onClose}>
            <SvgIcon name="sideMenu" className="" />
          </button>
        </div>
        <div className="mt-5">
          <Suspense>
            <ChatList userId={session?.user.id || ""} />
          </Suspense>
        </div>
      </div>
      <div className="mt-5 border-t-[1px] border-gray-600 pt-2">
        <button className={twMerge(listItemStyle)}>
          <SvgIcon name="avatar" className="" />
          Renew Plus
        </button>
        <button className={twMerge(listItemStyle, "justify-between")}>
          <span className="flex items-center gap-2">
            <Image
              src={session?.user?.image || ""}
              alt=""
              width={36}
              height={36}
              className=""
            />
            {session?.user?.name}
          </span>
          <span className="mr-2">
            <SvgIcon name="dots" className="" />
          </span>
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
