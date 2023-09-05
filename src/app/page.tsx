"use client";
import Header from "./Header";
import PromptForm from "./components/PromptForm";
import Help from "./components/Help";
import {
  ASSIGNABLE_MODEL,
  CreateMessageRole,
  Message,
  StreamChatDTO,
} from "../constants";
import React from "react";
import { useStreamChatCompletion } from "./hooks/useStreamChatCompletion";
import { v4 as uuidv4 } from "uuid";
import PromptHelpers from "./components/PromptHelpers";
import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./components/SvgIcon";
import MessageItem from "./components/MessageItem";
import { useReadStorage, useStorage } from "./hooks/useStorage";
import { useLocalStorage } from "usehooks-ts";

export default function Home() {
  const streamChatCompletionMutation = useStreamChatCompletion();
  const [messages, setMessages] = useLocalStorage("messages", [] as Message[]);

  const handleSubmit = async (content: string) => {
    const params: StreamChatDTO["params"] = {
      model: ASSIGNABLE_MODEL.THREE_TURBO,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    };

    registerMessage("user", content);

    await streamChatCompletionMutation.start({
      params,
      onSuccess: async (answer) => {
        registerMessage("assistant", answer);
        streamChatCompletionMutation.setContent(undefined);
      },
      onError: (errorCode) => {
        // const message =
        //   errorCode === "context_length_exceeded"
        //     : "エラーが発生しました";
        // notifyError({
        //   message,
        //   options: { autoClose: false },
        // });
      },
    });
  };
  const registerMessage = (role: CreateMessageRole, content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      chatId: "hoge",
      role,
      content,
    };
    setMessages((messages) => {
      return [...messages, newMessage];
    });
  };

  return (
    <>
      <Header />
      <div
        className={twMerge(
          messages.length === 0 ? "mx-auto max-w-3xl px-8" : "",
        )}
      >
        {messages.length === 0 && (
          <div className="flex justify-center">
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-600">
              ChatGPT
            </h1>
          </div>
        )}
        <ul className="pb-48 dark:bg-gray-400">
          {messages.length !== 0 &&
            messages.map((message) => (
              <MessageItem message={message} key={message.id} />
            ))}
          {streamChatCompletionMutation.isLoading && (
            <MessageItem
              message={{
                id: "newMessage",
                chatId: "hoge",
                role: "assistant",
                content: streamChatCompletionMutation.content ?? "",
              }}
            />
          )}
        </ul>
        <div className="absolute bottom-6 left-8 right-8 z-10 mx-auto max-w-3xl">
          {messages.length === 0 && <PromptHelpers />}
          {messages.length !== 0 && (
            <div className="flex justify-end">
              <button className="flex items-center gap-2 rounded border-[1px] border-gray-800 bg-white px-3 py-2 text-sm text-gray-400 dark:border-gray-600 dark:bg-gray-400 dark:text-gray-800">
                <SvgIcon
                  name="cycle"
                  className="text-gray-400 dark:text-gray-800"
                />
                Regenerate
              </button>
            </div>
          )}
          <div className="mt-4">
            <PromptForm onSubmit={handleSubmit} />
          </div>
          <div className="mt-4 ">
            <Help />
          </div>
        </div>
      </div>
    </>
  );
}
