"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Lock from "./components/Icons/Lock";
import Header from "./Header";
import SendMessage from "./components/Icons/SendMessage";
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
import PromptHelpers from "./components/PromptHelpers";
import { twMerge } from "tailwind-merge";

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
        {messages.length !== 0 && (
          <MessageList
            messages={messages}
            isGenerating={streamChatCompletionMutation.isLoading}
          />
        )}
        <div className="absolute bottom-6 left-8 right-8 mx-auto max-w-3xl">
          {messages.length !== 0 && <PromptHelpers />}
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
