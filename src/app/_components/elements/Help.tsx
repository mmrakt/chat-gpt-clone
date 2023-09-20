"use client";

import { Fragment, useState } from "react";
import Dropdown, { ModalItem } from "./Dropdown";
import { SvgIcon } from "./SvgIcon";
import { Menu, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export const modalItems: ModalItem[] = [
  {
    id: "help",
    text: "Help & FAQ",
    icon: "externalLink",
    href: "https://help.openai.com/en/collections/3742473-chatgpt",
    disabled: false,
  },
  {
    id: "keyboard",
    text: "Keyboard shortcuts",
    icon: "keyboardShortcuts",
    disabled: true,
  },
];
const Help = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <p className="flex justify-center px-2 text-xs text-gray-400 dark:text-gray-800 md:items-center md:px-0">
      ※The maximum number of input tokens is 1000.
      <Menu>
        <Menu.Button
          onClick={() => {
            setModalOpened(!modalOpened);
          }}
          className="absolute right-5 hidden h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-800 bg-gray-900 p-2 dark:border-gray-600 dark:bg-gray-550 md:flex"
        >
          <span className="text-base">?</span>
        </Menu.Button>
        <Dropdown modalItems={modalItems} position="main" />
      </Menu>
    </p>
  );
};

export default Help;
