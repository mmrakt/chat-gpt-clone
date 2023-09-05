import React from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";
import { Message } from "../../constants";

type Props = {
  message: Message;
};

const MessageItem = ({ message }: Props) => {
  return (
    <li
      className={twMerge(
        "group p-6",
        message.role === "assistant"
          ? "border-gray-850 border-b-[1px] border-t-[1px] bg-gray-950 dark:border-gray-400 dark:bg-gray-500"
          : "",
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-5 dark:text-gray-800">
        <div
          className={twMerge(
            "flex h-9 w-9 items-center justify-center rounded-sm p-1",
            message.role === "assistant" ? "bg-green-500" : "bg-gray-600",
          )}
        >
          {message.role === "assistant" ? (
            <SvgIcon name="chatGpt" size={24} className="text-white" />
          ) : (
            <SvgIcon name="avatar" className="text-gray-900" size={24} />
          )}
        </div>
        <div className="flex w-full flex-col gap-7 lg:flex-row lg:justify-between">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
          {message.role === "assistant" ? (
            <p className="flex justify-end gap-3">
              <button className="">
                <SvgIcon name="clipboard" className="text-gray-900" />
              </button>
              <button className="ml-1">
                <SvgIcon name="good" />
              </button>
              <button className="">
                <SvgIcon name="bad" />
              </button>
            </p>
          ) : (
            <p className="flex justify-end lg:hidden lg:group-hover:block">
              <button className="">
                <SvgIcon name="edit" />
              </button>
            </p>
          )}
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
