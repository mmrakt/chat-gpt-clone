"use client";

import { Fragment, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import { Menu, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const Help = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const modalItems = [
    {
      text: "Help & FAQ",
      icon: "externalLink",
      href: "https://help.openai.com/en/collections/3742473-chatgpt",
      onClick: "",
    },
    {
      text: "Keyboard shortcuts",
      icon: "keyboardShortcuts",
      href: "",
      onClick: "",
    },
  ];
  const modalItemStyle = "w-full flex items-center gap-2 p-4";
  return (
    <p className="px-2 text-xs text-gray-400 dark:text-gray-800 md:flex md:items-center md:justify-center md:px-0">
      ※入力トークンの最大数は1000までです。
      <Menu>
        <Menu.Button
          onClick={() => {
            setModalOpened(!modalOpened);
          }}
          className="absolute right-5 hidden h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-800 bg-gray-900 p-2 dark:border-gray-600 dark:bg-gray-550 md:flex"
        >
          <span className="text-base">?</span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 translate-y-0"
          enterTo="transform opacity-100 -translate-y-1"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 -translate-y-1"
          leaveTo="transform opacity-0 translate-y-0"
        >
          <Menu.Items
            className={twMerge(
              "absolute bottom-6 right-5 hidden rounded-lg bg-gray-200 py-1 text-gray-800 md:block",
            )}
            as="ul"
          >
            {modalItems.map((item) => (
              <Menu.Item className="hover:bg-gray-400" key={item.icon} as="li">
                {item.href !== "" ? (
                  <a
                    href={item.href}
                    className={twMerge(modalItemStyle)}
                    target="_blank"
                  >
                    {item.icon === "externalLink" && (
                      <SvgIcon name="externalLink" />
                    )}
                    {item.text}
                  </a>
                ) : (
                  <p className={twMerge(modalItemStyle)}>
                    {item.icon === "keyboardShortcuts" && (
                      <SvgIcon name="keyboardShortcuts" />
                    )}
                    {item.text}
                  </p>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </p>
  );
};

export default Help;
