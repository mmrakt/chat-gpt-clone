"use client";

import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useState,
} from "react";

type IIsOpenDialogOfRemoveChatContext = {
  isOpenDialogOfRemoveChat: boolean;
  setIsOpenDialogOfRemoveChat: Dispatch<SetStateAction<boolean>>;
};

export const IsOpenDialogOfRemoveChatContext =
  createContext<IIsOpenDialogOfRemoveChatContext>({
    isOpenDialogOfRemoveChat: false,
    setIsOpenDialogOfRemoveChat: () => {},
  });

type IProps = {
  children: ReactElement;
};
const IsOpenDialogOfRemoveChatProvider: React.FC<IProps> = ({ children }) => {
  const [isOpenDialogOfRemoveChat, setIsOpenDialogOfRemoveChat] =
    useState(false);
  return (
    <IsOpenDialogOfRemoveChatContext.Provider
      value={{ isOpenDialogOfRemoveChat, setIsOpenDialogOfRemoveChat }}
    >
      {children}
    </IsOpenDialogOfRemoveChatContext.Provider>
  );
};

export default IsOpenDialogOfRemoveChatProvider;
