"use client";

import { useContext } from "react";
import { isOpenSideMenuAtom } from "../../_store/isOpenSideMenu";
import TransitionOverlay from "./TransitionOverlay";
import ChatContainer from "@app/_components/elements/ChatContainer";
import Dialog from "@app/_components/elements/Dialog";
import GithubCorner from "@app/_components/elements/GithubCorner";
import SideMenu from "@app/_components/elements/SideMenu";
import { SvgIcon } from "@app/_components/elements/SvgIcon";
import { isOpenDialogOfRemoveChatAtom } from "@app/_store/IsOpenDialogOfRemoveChat";
import { Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

type Props = {
  user: User;
  chatId: string;
};
const PageContainer = ({ chatId, user }: Props) => {
  const [isOpenSideMenu, setIsOpenSideMenu] = useAtom(isOpenSideMenuAtom);
  const [isOpenDialogOfRemoveChat] = useAtom(isOpenDialogOfRemoveChatAtom);

  return (
    <div className="h-full bg-white text-gray-200 dark:bg-gray-400 dark:text-white">
      <div className="hidden md:block">
        <GithubCorner />
      </div>
      {isOpenDialogOfRemoveChat && (
        <>
          <div
            className={twMerge(
              "absolute inset-0 z-40 hidden h-full w-screen bg-gray-800 bg-opacity-70 dark:bg-gray-600 dark:bg-opacity-70",
              isOpenDialogOfRemoveChat ? "block" : "",
            )}
          ></div>
          <Dialog isOpen={isOpenDialogOfRemoveChat} currentChatId={chatId} />
        </>
      )}

      <button
        onClick={() => setIsOpenSideMenu(true)}
        className={twMerge(
          "fixed left-5 top-5 z-30 hidden rounded-lg bg-white p-3 dark:bg-gray-400 md:block",
          isOpenSideMenu ? "md:hidden" : "",
        )}
      >
        <SvgIcon name="sideMenu" className="" />
      </button>
      <TransitionOverlay isOpenSideMenu={isOpenSideMenu} />
      <div className={twMerge("flex")}>
        <Transition
          show={isOpenSideMenu}
          enter="transition duration-200"
          enterFrom="-translate-x-64"
          enterTo="translate-x-0"
          leave="transition duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-64"
          className="fixed z-30 h-full overflow-y-auto"
        >
          <SideMenu user={user} currentChatId={chatId} />
        </Transition>
        <ChatContainer user={user} chatId={chatId} />
      </div>
    </div>
  );
};

export default PageContainer;
