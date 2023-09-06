import { ReactNode, FC } from "react";

type WrapperProps = {
  children?: ReactNode;
};
const DisableSsrWrapper: FC<WrapperProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default DisableSsrWrapper
