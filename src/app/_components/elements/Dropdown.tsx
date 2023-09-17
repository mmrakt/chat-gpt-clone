import React, { Fragment } from "react";
import { IconName, SvgIcon } from "./SvgIcon";
import { Menu, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

export type ModalItem = {
  id: string;
  text: string;
  icon: IconName;
  href?: string;
  onClick?: () => void;
};

type Props = {
  modalItems: ModalItem[];
  position: "sideMenu" | "main";
};

const Dropdown = ({ modalItems, position }: Props) => {
  const modalItemStyle = "w-full flex items-center gap-2 p-4";
  return (
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
          "absolute rounded-lg bg-gray-100 py-1 text-gray-900",
          position === "sideMenu"
            ? "bottom-16 right-0 z-50 w-full"
            : "bottom-10 right-5",
        )}
        as="ul"
      >
        {modalItems.map((item) => (
          <Menu.Item
            className={twMerge(
              "hover:bg-gray-400",
              item.id === "help" && position === "sideMenu" && "md:hidden",
              item.id === "logout" && "border-t-[1px] border-gray-500",
            )}
            key={item.icon}
            as="li"
          >
            {item.href ? (
              <a
                href={item.href}
                className={twMerge(modalItemStyle)}
                target="_blank"
              >
                <SvgIcon name={item.icon} size={16} />
                {item.text}
              </a>
            ) : item.onClick ? (
              <button
                onClick={item.onClick}
                className={twMerge(modalItemStyle)}
              >
                <SvgIcon name={item.icon} size={16} />
                {item.text}
              </button>
            ) : (
              <p className={twMerge(modalItemStyle)}>
                <SvgIcon name={item.icon} size={16} />
                {item.text}
              </p>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  );
};

export default Dropdown;
