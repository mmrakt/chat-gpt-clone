"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Lock from "./Lock";
import Header from "./Header";
import SendMessage from "./SendMessage";
import PromptForm from "./components/PromptForm";
import Help from "./components/Help";
import { ASSIGNABLE_MODEL, StreamChatDTO } from "../constants";
import { CreateChatCompletionRequest } from "openai";
import { useState } from "react";
import { useStreamChatCompletion } from "./hooks/useStreamChatCompletion";

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
  const [messages, setMessages] = useState<string[]>([]);

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

    await streamChatCompletionMutation.start({
      params,
      onSuccess: async (content) => {
        // await createMessageMutation.mutateAsync({
        //   chatId: chat.id,
        //   role: "assistant",
        //   content,
        // });
        // streamChatCompletionMutation.setContent(undefined);
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
  return (
    <>
      <Header />
      <div className="">
        <div className="flex justify-center">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-600">
            ChatGPT
          </h1>
        </div>
        {messages.length !== 0 ? (
          <div className=""></div>
        ) : (
          <div className="px-8">
            <div className="mt-60 grid grid-cols-2 gap-2">
              {helpers.map((helper) => (
                <button
                  key={helper.title}
                  className="group relative flex items-center justify-between rounded-xl border-[1px] border-[rgba(0,0,0,.1)] px-3 py-2 text-start text-sm hover:bg-gray-500 hover:bg-gray-900 dark:border-gray-600"
                >
                  <div className="flex w-full flex-col">
                    <span className="font-bold">{helper.title}</span>
                    <span className="overflow-x-hidden text-ellipsis whitespace-nowrap text-gray-700">
                      {helper.desc}
                    </span>
                  </div>
                  <div className="absolute right-3 hidden group-hover:block">
                    <SendMessage className="text-gray-200" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 px-7">
          <PromptForm onSubmit={handleSubmit} />
        </div>
        <div className="mt-4">
          <Help />
        </div>
      </div>
    </>
  );
}
