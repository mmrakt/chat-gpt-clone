"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Lock from "./Lock";
import Header from "./Header";
import SendMessage from "./SendMessage";
import PromptForm from "./components/PromptForm";
import Help from "./components/Help";
import { ASSIGNABLE_MODEL, StreamChatDTO } from "../constants";
import {
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
} from "openai";
import { useState } from "react";
import { useStreamChatCompletion } from "./hooks/useStreamChatCompletion";
import {
  CreateMessageRole,
  Message,
  useCreateMessage,
} from "./hooks/useCreateMessage";
import { v4 as uuidv4 } from "uuid";
import MessageList from "./components/MessageList";

const helpers = [
  {
    title: "Show me a code snippet",
    desc: "of a website's sticky header",
    message: "",
  },
  {
    title: "Compare business strategies",
    desc: "for transitioning from budget to luxury vs. luxury to budget",
    message: "",
  },
  {
    title: "Come up with concepts",
    desc: "for a retro-style arcade game",
    message: "",
  },
  {
    title: "Recommend activities",
    desc: "for a team-building day with remote employees",
    message: "",
  },
];

export default function Home() {
  const streamChatCompletionMutation = useStreamChatCompletion();
  const { messages, setMessages } = useCreateMessage();

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
      <div className="mx-auto max-w-3xl px-8">
        <div className="absolute bottom-6 left-8 right-8 mx-auto max-w-3xl">
          {messages.length !== 0 ? (
            <MessageList
              messages={messages}
              isGenerating={streamChatCompletionMutation.isLoading}
            />
          ) : (
            <>
              <div className="flex justify-center">
                <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-600">
                  ChatGPT
                </h1>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 px-3">
                {helpers.map((helper) => (
                  <button
                    key={helper.title}
                    className="group relative flex items-center justify-between rounded-xl border-[1px] border-[rgba(0,0,0,.1)] px-3 py-2 text-start text-sm hover:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-500"
                  >
                    <div className="flex w-full flex-col">
                      <span className="font-bold dark:text-gray-800">
                        {helper.title}
                      </span>
                      <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-gray-700">
                        {helper.desc}
                      </span>
                    </div>
                    <div className="absolute right-3 hidden group-hover:block">
                      <SendMessage className="text-gray-200 dark:text-gray-800" />
                    </div>
                  </button>
                ))}
              </div>
            </>
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
