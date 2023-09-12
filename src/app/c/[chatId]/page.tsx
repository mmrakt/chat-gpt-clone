"use client";
import Header from "../../CommonHeader";
import PromptForm from "../../components/PromptForm";
import Help from "../../components/Help";
import {
  ASSIGNABLE_MODEL,
  CHAT_TITLE_PREFIX,
  CreateMessageRole,
  IMessage,
  StreamChatDTO,
} from "../../../constants";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
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
import useUpdateChat from "../../hooks/chats/useUpdateChat";
import { createChatTitle } from "../../utils/createChatTitle";
import { IsOpenSideMenuContext } from "../../components/providers/IsOpenSideMenuProvider";
import SpHeader from "../../components/SpHeader";
import CommonHeader from "../../CommonHeader";

export default function Page({ params }: { params: { chatId: string } }) {
  const streamChatCompletionMutation = useStreamChatCompletion();
  const { data: session } = useSession();
  const createMessageMutation = useCreateMessage();
  const updateChatMutation = useUpdateChat();
  const deleteMessageMutation = useDeleteMessage();
  const { data: messages } = useFetchMessages(params.chatId);
  const { isOpenSideMenu, setIsOpenSideMenu } = useContext(
    IsOpenSideMenuContext,
  );
  const generatingMessageRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    generatingMessageRef.current?.scrollIntoView();
  }, [streamChatCompletionMutation.content]);

  if (!session || !messages) return null;

  const handleSubmit = async (content: string) => {
    registerMessage("user", content);
    updateChatMutation.mutate({
      id: params.chatId,
      title: createChatTitle(content),
    });
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
      chatId: params.chatId,
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

  const hasMessage = () => {
    return messages.length !== 0;
  };

  return (
    <div className=" h-screen bg-white text-gray-200 dark:bg-gray-400 dark:text-white">
      <button
        onClick={() => setIsOpenSideMenu(true)}
        className={twMerge(
          "absolute left-5 top-5 hidden p-3 md:block",
          isOpenSideMenu ? "md:hidden" : "",
        )}
      >
        <SvgIcon name="sideMenu" className="" />
      </button>
      <Transition
        show={isOpenSideMenu}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-70"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-70"
        leaveTo="opacity-0"
        className={twMerge(
          "absolute z-30 h-screen w-screen dark:bg-[rgb(120,120,140)] md:hidden",
        )}
      ></Transition>
      <div className={twMerge("flex")}>
        <Transition
          show={isOpenSideMenu}
          enter="transition duration-200"
          enterFrom="-translate-x-64"
          enterTo="translate-x-0"
          leave="transition duration-200"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-64"
          className="fixed z-40 h-full overflow-y-auto"
        >
          <SideMenu
            isOpen={isOpenSideMenu}
            onClose={() => setIsOpenSideMenu(false)}
            currentChatId={params.chatId}
            hasMessageInCurrentChat={hasMessage()}
          />
        </Transition>
        {/* TODO: https://github.com/mmrakt/chat-gpt-clone/issues/3 */}
        <main className={twMerge("mx-auto w-screen dark:bg-gray-400")}>
          <SpHeader hasMessageInCurrentChat={hasMessage()} />
          <CommonHeader hasMessageInCurrentChat={hasMessage()} />
          <div
            className={twMerge(
              "relative mx-auto flex flex-col justify-between",
              !hasMessage()
                ? "min-h-[calc(100vh-88px)] "
                : `min-h-[calc(100vh-61px)] pb-48`,
            )}
          >
            {!hasMessage() && (
              <div className="mx-auto flex max-w-3xl justify-center ">
                <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-600">
                  ChatGPT
                </h1>
              </div>
            )}
            {hasMessage() && (
              <ul className=" dark:bg-gray-400">
                {messages.map((message) => (
                  <li key={message.id}>
                    <MessageItem message={message} />
                  </li>
                ))}
                {streamChatCompletionMutation.isLoading && (
                  <li ref={generatingMessageRef}>
                    <MessageItem
                      message={{
                        id: "newMessage",
                        chatId: params.chatId,
                        role: "assistant",
                        content: streamChatCompletionMutation.content ?? "",
                      }}
                    />
                  </li>
                )}
              </ul>
            )}
            {/* TODO: https://github.com/mmrakt/chat-gpt-clone/issues/1 */}
            {/* TODO: https://github.com/mmrakt/chat-gpt-clone/issues/4 */}
            <div className="w-full">
              <div className="mx-auto max-w-3xl">
                {!hasMessage() && <PromptHelpers />}
              </div>
              <div
                id="promptMenu"
                className={twMerge(
                  "w-full  py-4",
                  hasMessage()
                    ? "fixed bottom-0 border-t-[1px] border-gray-800 dark:border-gray-600 dark:bg-gray-400 md:border-none md:bg-gradient-to-t md:from-white md:dark:border-none md:dark:bg-transparent md:dark:from-gray-300"
                    : "",
                )}
              >
                <div className="mx-auto flex max-w-3xl flex-row items-center gap-3 px-2 md:mt-4 md:flex-col-reverse md:items-end md:px-0">
                  <PromptForm onSubmit={handleSubmit} />
                  {hasMessage() && (
                    <PromptingManageButton
                      isGenerating={streamChatCompletionMutation.isLoading}
                      onRegenerate={handleRegenerate}
                    />
                  )}
                </div>
                <div className="mt-4 ">
                  <Help />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
