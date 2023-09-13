"use client";

import { useContext, useLayoutEffect, useRef, useState } from "react";
import CommonHeader from "@app/_components/elements/CommonHeader";
import Dialog from "@app/_components/elements/Dialog";
import Help from "@app/_components/elements/Help";
import MessageItem from "@app/_components/elements/MessageItem";
import PromptForm from "@app/_components/elements/PromptForm";
import PromptHelpers from "@app/_components/elements/PromptHelpers";
import PromptingManageButton from "@app/_components/elements/PromptingManageButton";
import SideMenu from "@app/_components/elements/SideMenu";
import SpHeader from "@app/_components/elements/SpHeader";
import { SvgIcon } from "@app/_components/elements/SvgIcon";
import { IsOpenDialogOfRemoveChatContext } from "@app/_components/providers/IsOpenDialogOfRemoveChatProvider";
import { IsOpenSideMenuContext } from "@app/_components/providers/IsOpenSideMenuProvider";
import {
  ASSIGNABLE_MODEL,
  CreateMessageRole,
  IMessage,
  StreamChatDTO,
} from "@app/_config";
import useUpdateChat from "@app/_hooks/chats/useUpdateChat";
import useCreateMessage from "@app/_hooks/messages/useCreateMessage";
import useDeleteMessage from "@app/_hooks/messages/useDeleteMessage";
import { useFetchMessages } from "@app/_hooks/messages/useFetchMessages";
import { useStreamChatCompletion } from "@app/_hooks/useStreamChatCompletion";
import { createChatTitle } from "@app/_utils/createChatTitle";
import { isWithinLimitTokenCount } from "@app/_utils/tokenizer";
import { Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

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
  const { isOpenDialogOfRemoveChat } = useContext(
    IsOpenDialogOfRemoveChatContext,
  );
  const [errorMsg, setErrorMsg] = useState("");

  useLayoutEffect(() => {
    generatingMessageRef.current?.scrollIntoView();
  }, [streamChatCompletionMutation.content]);

  if (!session || !messages) return null;

  const handleSubmit = async (content: string) => {
    if (!isWithinLimitTokenCount(content)) {
      setErrorMsg("入力トークン数が1000を超えています");
      return;
    }

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
    if (errorMsg) {
      setErrorMsg("");
    }

    await streamChatCompletionMutation.start({
      params,
      onSuccess: async (answer) => {
        registerMessage("assistant", answer);
        streamChatCompletionMutation.setContent(undefined);
      },
      onError: (errorCode) => {
        console.log(errorCode);
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
    <div className="h-full bg-white text-gray-200 dark:bg-gray-400 dark:text-white">
      {isOpenDialogOfRemoveChat && (
        <>
          <div
            className={twMerge(
              "absolute hidden inset-0 w-screen h-full bg-gray-800 bg-opacity-70 dark:bg-gray-600 dark:bg-opacity-70 z-50",
              isOpenDialogOfRemoveChat ? "block" : "",
            )}
          ></div>
          <Dialog
            isOpen={isOpenDialogOfRemoveChat}
            currentChatId={params.chatId}
          />
        </>
      )}

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
          "absolute z-30 h-screen w-screen bg-gray-700 dark:bg-[rgb(120,120,140)] md:hidden",
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
            user={session.user}
            onClose={() => setIsOpenSideMenu(false)}
            currentChatId={params.chatId}
            hasMessageInCurrentChat={hasMessage()}
          />
        </Transition>
        {/* TODO: https://github.com/mmrakt/chat-gpt-clone/issues/3 */}
        <main className={twMerge("mx-auto w-screen dark:bg-gray-400")}>
          <SpHeader
            hasMessageInCurrentChat={hasMessage()}
            user={session.user}
          />
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
                {errorMsg && (
                  <li>
                    <MessageItem
                      message={{
                        id: "errorMessage",
                        chatId: params.chatId,
                        role: "assistant",
                        content: errorMsg,
                      }}
                      isError
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
                    ? "fixed bottom-0 border-t-[1px] border-gray-900 dark:border-gray-600 bg-white dark:bg-gray-400 md:border-none md:bg-gradient-to-t md:from-white md:dark:border-none md:bg-transparent md:dark:bg-transparent md:dark:from-gray-300"
                    : "",
                )}
              >
                <div className="mx-auto flex max-w-3xl flex-row items-center gap-3 px-2 md:mt-4 md:flex-col-reverse md:items-end md:px-0">
                  <PromptForm
                    onSubmit={handleSubmit}
                    isGenerating={streamChatCompletionMutation.isLoading}
                  />
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
