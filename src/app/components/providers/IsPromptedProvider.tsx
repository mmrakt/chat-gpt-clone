"use client";
import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

type IsPromptedContext = {
  isPrompted: boolean;
  setIsPrompted: Dispatch<SetStateAction<boolean>>;
};

export const IsPromptedContext = createContext<IsPromptedContext>({
  isPrompted: false,
  setIsPrompted: () => {},
});

type IProps = {
  children: ReactElement;
};
const IsPromptedProvider: React.FC<IProps> = ({ children }) => {
  const [isPrompted, setIsPrompted] = useState(false);

  return (
    <IsPromptedContext.Provider value={{ isPrompted, setIsPrompted }}>
      {children}
    </IsPromptedContext.Provider>
  );
};

export default IsPromptedProvider;
