import React from "react";
import { Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type Props = {
  isOpenSideMenu: boolean;
};

const Overlay = ({ isOpenSideMenu }: Props) => {
  return (
    <Transition
      show={isOpenSideMenu}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-70"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-70"
      leaveTo="opacity-0"
      className={twMerge(
        "absolute z-30 h-screen w-screen bg-gray-700 dark:bg-[rgb(120,120,140)] md:hidden",
      )}
    ></Transition>
  );
};

export default Overlay;
