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
  return (
    <div
      className={twMerge(
        "group p-6",
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
          {message.role === "assistant" ? (
            <ChatGpt />
          ) : (
            <Icon name="avatar" className="text-gray-900" size={24} />
          )}
        </div>
        <div className="flex w-full flex-col gap-7 lg:flex-row lg:justify-between">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
          {message.role === "assistant" ? (
            <p className="flex justify-end gap-3">
              <button className="">
                <Icon name="clipboard" className="text-gray-900" />
              </button>
              <button className="ml-1">
                <Icon name="good" />
              </button>
              <button className="">
                <Icon name="bad" />
              </button>
            </p>
          ) : (
            <p className="flex justify-end lg:hidden lg:group-hover:block">
              <button className="">
                <Icon name="edit" />
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
