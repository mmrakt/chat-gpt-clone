"use client";

import { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";
import ExternalLink from "../ExternalLink";
import KeyboardShortcuts from "../KeyboardShortcuts";
import { Menu, Transition } from "@headlessui/react";

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
    <p className="relative flex items-center justify-center text-xs text-gray-400 dark:text-gray-800">
      Free Research Preview. ChatGPT may produce inaccurate information about
      people, places, or facts.
      <a
        href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
        className="ml-1 underline"
        target="_blank"
      >
        ChatGPT August 3 Version
      </a>
      <Menu>
        <Menu.Button
          onClick={() => {
            setModalOpened(!modalOpened);
          }}
          className="absolute right-5 flex h-6 w-6 items-center justify-center rounded-full border-[1px] border-gray-800 bg-gray-900 p-2 dark:border-gray-600 dark:bg-gray-550"
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
              "absolute bottom-6 right-5 rounded-lg bg-gray-200 py-1 text-gray-800",
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
                    {item.icon === "externalLink" && <ExternalLink />}
                    {item.text}
                  </a>
                ) : (
                  <p className={twMerge(modalItemStyle)}>
                    {item.icon === "keyboardShortcuts" && <KeyboardShortcuts />}
                    {item.text}
                  </p>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      {/* <button
        onClick={() => {
          setModalOpened(!modalOpened);
        }}
        className="bg-gray-550 border-gray-600 border-[1px] p-2 rounded-full w-6 h-6 flex items-center justify-center absolute right-5"
      >
        <span className="text-base">?</span>
      </button> */}
      {/* <div
        className={twMerge(
          "absolute right-5 bottom-10 bg-gray-200 rounded-lg py-1",
          modalOpened
            ? "visible -translate-y-1 transition-all"
            : "invisible translate-y-1"
        )}
      >
        <ul className="">
          {modalItems.map((item) => (
            <li key={item.icon} className="hover:bg-gray-400">
              {item.href !== "" ? (
                <a href={item.href} className={twMerge(modalItemStyle)}>
                  {item.icon === "externalLink" && <ExternalLink />}
                  {item.text}
                </a>
              ) : (
                <p className={twMerge(modalItemStyle)}>
                  {item.icon === "keyboardShortcuts" && <KeyboardShortcuts />}
                  {item.text}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div> */}
    </p>
  );
};

export default Help;
