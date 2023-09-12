"use client";
import React, { Suspense, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ChatList from "./ChatList";
import { IsOpenSideMenuContext } from "./providers/IsOpenSideMenuProvider";
import useCreateChat from "../hooks/chats/useCreateChat";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentChatId: string;
  hasMessageInCurrentChat: boolean;
};

export const buttonStyle =
  "flex items-center gap-3 rounded-md border-[1px] border-gray-600 px-4 py-3 hover:bg-gray-300";
export const listItemStyle =
  "flex w-full flex-row items-center gap-2 rounded-md py-3 pl-3 hover:bg-gray-300";

const SideMenu = ({
  isOpen,
  onClose,
  currentChatId,
  hasMessageInCurrentChat,
}: Props) => {
  const { data: session } = useSession();
  const { setIsOpenSideMenu } = useContext(IsOpenSideMenuContext);
  const createChatMutation = useCreateChat();

  const handleCreateChat = async () => {
    if (session?.user && !hasMessageInCurrentChat) {
      await createChatMutation.mutate(session.user.id);
    }
  };

  return (
    <aside
      className={twMerge(
        " flex min-h-screen w-80 flex-col justify-between bg-gray-200 p-2 text-white md:w-64",
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
          <button className={twMerge(buttonStyle, "")} onClick={onClose}>
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
      <div className="sticky bottom-0 left-0 z-10 mt-5 w-full border-t-[1px] border-gray-600 bg-gray-200 pt-2">
        <button className={twMerge(listItemStyle)}>
          <SvgIcon name="avatar" className="" />
          Renew Plus
        </button>
        <button className={twMerge(listItemStyle, "justify-between px-3")}>
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
