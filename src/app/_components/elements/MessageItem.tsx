"use client";

import React from "react";
import Image from "next/image";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { SvgIcon } from "./SvgIcon";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";

type Props = {
  message: Pick<Message, "id" | "role" | "content">;
  isError?: boolean;
};

const MessageItem = ({ message, isError }: Props) => {
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        "group p-6",
        message.role === "assistant"
          ? "border-b-[1px] border-t-[1px] border-gray-850 bg-gray-950 dark:border-gray-400 dark:bg-gray-500"
          : "",
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-5 dark:text-gray-800">
        <div
          className={twMerge(
            "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm",
            message.role === "assistant" ? "bg-green-500" : "bg-gray-600",
          )}
        >
          {message.role === "assistant" ? (
            <span className="relative">
              <SvgIcon name="chatGpt" size={24} className="text-white" />
              {isError && (
                <span className="absolute left-5 top-5 flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-white bg-red-500 text-white">
                  !
                </span>
              )}
            </span>
          ) : (
            <>
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image || ""}
                  alt=""
                  width={36}
                  height={36}
                />
              ) : (
                <SvgIcon name="avatar" className="text-gray-900" size={24} />
              )}
            </>
          )}
        </div>
        <div className="flex w-full flex-col gap-7 pr-4 md:p-0 lg:flex-row lg:items-start lg:justify-between">
          <MarkdownRenderer isError={isError}>
            {message.content}
          </MarkdownRenderer>
          {message.role === "assistant" ? (
            <p className="flex justify-end gap-3">
              <button className="cursor-not-allowed">
                <SvgIcon name="clipboard" className="text-gray-900" />
              </button>
              <button className="ml-1 cursor-not-allowed">
                <SvgIcon name="good" />
              </button>
              <button className="cursor-not-allowed">
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
    </div>
  );
};

export default MessageItem;
