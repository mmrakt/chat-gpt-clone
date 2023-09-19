"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import ChatList from "./ChatList";
import Dropdown, { ModalItem } from "./Dropdown";
import { modalItems as helpModalItems } from "./Help";
import { SvgIcon } from "./SvgIcon";
import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
import useCreateChat from "@app/_hooks/chats/useCreateChat";
import { useFetchChatList } from "@app/_hooks/chats/useFetchChatList";
import { Menu } from "@headlessui/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User;
  onClose: () => void;
  currentChatId: string;
  hasMessageInCurrentChat: boolean;
};

const modalItems: ModalItem[] = [
  {
    id: "customInstruction",
    text: "Custom instructions",
    icon: "customInstruction",
    disabled: true,
  },
  helpModalItems[0],
  {
    id: "setting",
    text: "Settings",
    icon: "setting",
    disabled: true,
  },
  {
    id: "logout",
    text: "Log out",
    icon: "logout",
    onClick: () => {
      signOut({ callbackUrl: "/signin" });
    },
    disabled: false,
  },
];

const CreateChatButton = ({
  userId,
  hasMessageInCurrentChat,
}: {
  userId: string;
  hasMessageInCurrentChat: boolean;
}) => {
  const createChatMutation = useCreateChat();
  const { data: chats } = useFetchChatList(userId);
  const handleCreateChat = async () => {
    if (hasMessageInCurrentChat && chats && chats.length <= 5) {
      await createChatMutation.mutate(userId);
    }
  };

  return (
    <button
      className={twMerge("side-menu-button flex-grow")}
      onClick={handleCreateChat}
    >
      <SvgIcon name="plus" className="" />
      New chat
    </button>
  );
};

const SideMenu = ({
  user,
  onClose,
  currentChatId,
  hasMessageInCurrentChat,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <aside
      className={twMerge(
        "flex min-h-screen w-80 flex-col justify-between bg-gray-200 p-2 text-sm text-white md:w-64",
      )}
    >
      <div>
        <div className="flex w-full gap-2">
          <Suspense
            fallback={
              <div className="mx-auto flex items-center justify-center">
                <LoadingSpinner className="block h-6 w-6 border-gray-800 border-t-transparent" />
              </div>
            }
          >
            <CreateChatButton
              userId={user.id}
              hasMessageInCurrentChat={hasMessageInCurrentChat}
            />
          </Suspense>
          <button className={twMerge("side-menu-button")} onClick={onClose}>
            <SvgIcon name="sideMenu" className="" />
          </button>
        </div>
        <div className="mt-3">
          <p className="font-md mb-3 pl-3 text-xs text-gray-800">
            ※チャットの作成数は5つまでです
          </p>

          <Suspense
            fallback={
              <div className="flex justify-center">
                <LoadingSpinner className="block h-6 w-6 border-gray-800 border-t-transparent" />
              </div>
            }
          >
            <ChatList userId={user.id || ""} currentChatId={currentChatId} />
          </Suspense>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 z-10 mt-5 w-full border-t-[1px] border-gray-600 bg-gray-200 pt-2">
        <button className={twMerge("side-menu-list-item")}>
          <SvgIcon name="avatar" className="" />
          Renew Plus
        </button>
        <Menu>
          <Menu.Button
            onClick={() => {
              setIsOpenModal(!isOpenModal);
            }}
            className={twMerge("side-menu-list-item justify-between px-3")}
          >
            <span className="flex items-center gap-2">
              <Image
                src={user?.image || ""}
                alt=""
                width={36}
                height={36}
                className=""
              />
              {user?.name}
            </span>
            <span className="mr-2">
              <SvgIcon name="dots" className="" />
            </span>
            <Dropdown modalItems={modalItems} position="sideMenu" />
          </Menu.Button>
        </Menu>
      </div>
    </aside>
  );
};

export default SideMenu;
