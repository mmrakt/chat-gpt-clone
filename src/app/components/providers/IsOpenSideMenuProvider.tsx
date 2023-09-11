"use client";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

type IIsOpenSideMenuContext = {
  isOpenSideMenu: boolean;
  setIsOpenSideMenu: Dispatch<SetStateAction<boolean>>;
};

export const IsOpenSideMenuContext = createContext<IIsOpenSideMenuContext>({
  isOpenSideMenu: false,
  setIsOpenSideMenu: () => {},
});

type IProps = {
  children: ReactElement;
};
const IsOpenSideMenuProvider: React.FC<IProps> = ({ children }) => {
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  return (
    <IsOpenSideMenuContext.Provider
      value={{ isOpenSideMenu, setIsOpenSideMenu }}
    >
      {children}
    </IsOpenSideMenuContext.Provider>
  );
};

export default IsOpenSideMenuProvider;
