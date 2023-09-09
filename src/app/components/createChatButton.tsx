import React from "react";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import { buttonStyle } from "./SideMenu";
import useCreateChat from "../hooks/chats/useCreateChat";

type Props = {
  userId: string;
};

const CreateChatButton = ({ userId }: Props) => {
  const createChatMutation = useCreateChat();

  const handleCreateChat = async () => {
    await createChatMutation.mutate(userId);
  };

  return (
    <button
      className={twMerge(buttonStyle, "flex-grow")}
      onClick={handleCreateChat}
    >
      <SvgIcon name="plus" className="" />
      New chat
    </button>
  );
};

export default CreateChatButton;
