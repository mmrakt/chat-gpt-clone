"use client";
import Header from "../../Header";
import PromptForm from "../../components/PromptForm";
import Help from "../../components/Help";
import {
  ASSIGNABLE_MODEL,
  CreateMessageRole,
  IMessage,
  StreamChatDTO,
} from "../../../constants";
import React, { useState } from "react";
import { useStreamChatCompletion } from "../../hooks/useStreamChatCompletion";
import { v4 as uuidv4 } from "uuid";
import PromptHelpers from "../../components/PromptHelpers";
import { twMerge } from "tailwind-merge";
import MessageItem from "../../components/MessageItem";
import PromptingManageButton from "../../components/PromptingManageButton";
import { useSession } from "next-auth/react";
import useCreateMessage from "../../hooks/messages/useCreateMessage";
import { useFetchMessages } from "../../hooks/messages/useFetchMessages";
import useDeleteMessage from "../../hooks/messages/useDeleteMessage";
import { SvgIcon } from "../../components/SvgIcon";
import SideMenu from "../../components/SideMenu";
import { Transition } from "@headlessui/react";

export default function Page({ params }: { params: { chatId: string } }) {
  const streamChatCompletionMutation = useStreamChatCompletion();
  const { data: session } = useSession();
  const createMessageMutation = useCreateMessage();
  const deleteMessageMutation = useDeleteMessage();
  const { data: messages } = useFetchMessages(params.chatId);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  if (!session || !messages) return null;

  const handleSubmit = async (content: string) => {
    registerMessage("user", content);
    await startCompletion(createParams(content));
  };

  const createParams = (content: string): StreamChatDTO["params"] => {
    return {
      model: ASSIGNABLE_MODEL.THREE_TURBO,
      messages: [
        {
          role: "user",
          content,
        },
      ],
    };
  };

  const startCompletion = async (params: StreamChatDTO["params"]) => {
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
    const newMessage: IMessage = {
      id: uuidv4(),
      chatId: "hoge",
      role,
      userId: session.user.id,
      content,
    };

    createMessageMutation.mutate(newMessage);
  };

  const handleRegenerate = () => {
    const lastMessageId = messages.slice(-1)[0].id;
    // TODO: 一瞬AIの解答が二重に見えてしまう対処
    deleteMessageMutation.mutate(lastMessageId);
    const lastPromptMessage = messages.slice(-2, -1)[0];
    if (lastPromptMessage.role === "user") {
      const params = createParams(lastPromptMessage.content);
      startCompletion(params);
    }
  };

  // const createMetaTitle = () => {
  //   const defaultTitle = "ChatGPT";
  //   if (messages.length === 0) {
  //     return defaultTitle;
  //   }
  //   const previousMessages = messages.slice(-2);
  //   previousMessages.forEach((message) => {
  //     if (message.role === "user") {
  //       const title =
  //         message.content.length >= 20
  //           ? message.content.slice(20) + "..."
  //           : message.content;
  //       return `User request: ${title}`;
  //     }
  //   });
  //   return defaultTitle;
  // };

  return (
    <div className="relative h-screen bg-white text-gray-200 dark:bg-gray-400 dark:text-white">
      <button
        onClick={() => setIsOpenSideMenu(true)}
        className={twMerge(
          "absolute left-5 top-5 hidden p-3 md:block",
          isOpenSideMenu ? "md:hidden" : "",
        )}
      >
        <SvgIcon name="sideMenu" className="" />
      </button>
      <div className={twMerge("flex")}>
        <Transition
          show={isOpenSideMenu}
          enter="transition duration-200"
          enterFrom="-translate-x-64"
          enterTo="translate-x-0"
          leave="transition duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-64"
        >
          <SideMenu
            isOpen={isOpenSideMenu}
            onClose={() => setIsOpenSideMenu(false)}
          />
        </Transition>
        {/* TODO: mainもtransitionに追従させる */}
        <main className={twMerge("mx-auto w-screen")}>
          <Header hasMessage={!!messages.length} />
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
            <div className="bottom-6 left-8 right-8 z-10 z-10 mx-auto max-w-3xl">
              {messages.length === 0 && <PromptHelpers />}
              {messages.length !== 0 && (
                <PromptingManageButton
                  isGenerating={streamChatCompletionMutation.isLoading}
                  onRegenerate={handleRegenerate}
                />
              )}
              <div className="mt-4">
                <PromptForm onSubmit={handleSubmit} />
              </div>
              <div className="mt-4 ">
                <Help />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
