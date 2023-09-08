"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import Link from "next/link";
import Avatar from "./Avatar";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const buttonStyle =
  "flex items-center gap-3 rounded-md border-[1px] border-gray-600 px-4 py-3";
const listItemStyle =
  "flex w-full flex-row items-center gap-2 rounded-md py-3 pl-3 hover:bg-gray-300";
const chatList = [
  {
    id: "001",
    title: "chat001",
  },
  {
    id: "002",
    title: "chat002",
  },
  {
    id: "003",
    title: "chat003",
  },
  {
    id: "004",
    title: "chat004",
  },
  {
    id: "005",
    title: "chat005",
  },
];
const SideMenu = ({ isOpen, onClose }: Props) => {
  const { data: session } = useSession();
  return (
    <aside
      className={twMerge(
        "h-screen w-[260px] bg-gray-200 p-2",
        isOpen ? "" : "hidden",
      )}
    >
      <div className="flex w-full gap-2">
        <button className={twMerge(buttonStyle, "flex-grow")}>
          <SvgIcon name="plus" className="" />
          New chat
        </button>
        <button className={twMerge(buttonStyle)} onClick={onClose}>
          <SvgIcon name="sideMenu" className="" />
        </button>
      </div>
      <ul className="mt-5 flex flex-col">
        {chatList.map((chat) => (
          <li className="" key={chat.id}>
            <Link href={chat.id} className={twMerge(listItemStyle)}>
              <SvgIcon name="chat" className="" />
              {chat.title}
            </Link>
          </li>
        ))}
      </ul>
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
