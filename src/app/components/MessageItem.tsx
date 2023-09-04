import React from "react";
import { Message } from "../hooks/useCreateMessage";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { twMerge } from "tailwind-merge";
import ChatGpt from "./Icons/ChatGpt";
import Avatar from "./Icons/Avatar";
import { Icon } from "./Icon";

type Props = {
  message: Message;
};

const MessageItem = ({ message }: Props) => {
  //   const isUser = useMemo(() => message.role === "user", [message]);

  return (
    <div
      className={twMerge(
        "p-6",
        message.role === "assistant" ? "bg-gray-500" : "",
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-5 dark:text-gray-800">
        <div
          className={twMerge(
            "flex h-9 w-9 items-center justify-center rounded-sm p-2",
            message.role === "assistant" ? "bg-green-500" : "bg-gray-600",
          )}
        >
          {message.role === "assistant" ? <ChatGpt /> : <Icon name="avatar" />}
        </div>
        <div className="">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
