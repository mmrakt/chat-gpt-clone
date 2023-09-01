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
          <h1 className="text-gray-600 text-4xl font-semibold">ChatGPT</h1>
        </div>
        {messages.length !== 0 ? (
          <div className=""></div>
        ) : (
          <div className="px-8">
            <div className="grid grid-cols-2 gap-2 mt-60">
              {helpers.map((helper) => (
                <button
                  key={helper.title}
                  className="relative group hover:bg-gray-500 flex justify-between items-center border-[1px] border-gray-600 rounded-xl text-start px-3 py-2 text-sm"
                >
                  <div className="flex flex-col w-full">
                    <span className="">{helper.title}</span>
                    <span className="text-gray-700 text-ellipsis whitespace-nowrap overflow-x-hidden">
                      {helper.desc}
                    </span>
                  </div>
                  <div className="hidden group-hover:block absolute right-3">
                    <SendMessage enabled />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="px-7 mt-4">
          <PromptForm onSubmit={handleSubmit} />
        </div>
        <div className="mt-4">
          <Help />
        </div>
      </div>
    </>
  );
}
