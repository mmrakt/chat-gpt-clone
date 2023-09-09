"use client";
import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ChatList from "./ChatList";
import CreateChatButton from "./createChatButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentChatId: string;
};

export const buttonStyle =
  "flex items-center gap-3 rounded-md border-[1px] border-gray-600 px-4 py-3 hover:bg-gray-300";
export const listItemStyle =
  "flex w-full flex-row items-center gap-2 rounded-md py-3 pl-3 hover:bg-gray-300";

const SideMenu = ({ isOpen, onClose, currentChatId }: Props) => {
  const { data: session } = useSession();

  return (
    <aside
      className={twMerge(
        "flex h-screen w-64 flex-col justify-between bg-gray-200 p-2 text-white",
      )}
    >
      <div>
        <div className="flex w-full gap-2">
          <CreateChatButton userId={session?.user.id || ""} />
          <button className={twMerge(buttonStyle)} onClick={onClose}>
            <SvgIcon name="sideMenu" className="" />
          </button>
        </div>
        <div className="mt-5">
          <Suspense>
            <ChatList
              userId={session?.user.id || ""}
              currentChatId={currentChatId}
            />
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
