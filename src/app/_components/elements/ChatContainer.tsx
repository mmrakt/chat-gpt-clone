"use client";

import { useLayoutEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import CommonHeader from "@app/_components/elements/CommonHeader";
import Help from "@app/_components/elements/Help";
import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
import PromptHelpers from "@app/_components/elements/PromptHelpers";
import PromptingManageButton from "@app/_components/elements/PromptingManageButton";
import SpHeader from "@app/_components/elements/SpHeader";
import { SvgIcon } from "@app/_components/elements/SvgIcon";
import { CreateMessageRole, IMessage, INPUT_TOKEN_LIMIT } from "@app/_config";
import useUpdateChat from "@app/_hooks/chats/useUpdateChat";
import useCreateMessage from "@app/_hooks/messages/useCreateMessage";
import useDeleteMessage from "@app/_hooks/messages/useDeleteMessage";
import { useFetchMessages } from "@app/_hooks/messages/useFetchMessages";
import useAutosizeTextArea from "@app/_hooks/useAutosizeTextArea";
import {
  convertMessageFromDbToOpenai,
  createChatTitle,
  isWithinLimitTokenCount,
} from "@app/_utils";
import { User } from "@prisma/client";
import { useChat } from "ai/react";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

type Props = {
  user: User;
  chatId: string;
};
const ChatContainer = ({ chatId, user }: Props) => {
  const { data: dbMessages } = useFetchMessages(chatId);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
    stop,
  } = useChat({
    api: "/api/completion",
    initialMessages: dbMessages?.map((message) =>
      convertMessageFromDbToOpenai(message),
    ),
    onFinish: (message) => {
      registerMessage("assistant", message.content);
    },
  });
  const createMessageMutation = useCreateMessage();
  const updateChatMutation = useUpdateChat();
  const deleteMessageMutation = useDeleteMessage();
  const generatingMessageRef = useRef<HTMLLIElement>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, input);

  useLayoutEffect(() => {
    if (isLoading) {
      generatingMessageRef.current?.scrollIntoView();
    }
  });

  const onSubmit = (e: any) => {
    if (!isWithinLimitTokenCount(input)) {
      setErrorMsg(`入力トークン数が${INPUT_TOKEN_LIMIT}を超えています`);
      e.preventDefault();
      return;
    }
    registerMessage("user", input);
    updateChatMutation.mutate({
      id: chatId,
      title: createChatTitle(input),
    });
    startCompletion(e);
  };

  const startCompletion = async (e: any) => {
    if (errorMsg) {
      setErrorMsg("");
    }

    handleSubmit(e);
  };

  const registerMessage = (role: CreateMessageRole, content: string) => {
    const newMessage: IMessage = {
      id: uuidv4(),
      chatId: chatId,
      role,
      userId: user.id,
      content,
    };

    createMessageMutation.mutate(newMessage);
  };

  const handleRegenerate = (e: any) => {
    const lastMessageId = dbMessages?.slice(-1)[0].id;
    deleteMessageMutation.mutate(lastMessageId || "");
    const lastPromptMessage = dbMessages?.slice(-2, -1)[0];
    if (lastPromptMessage?.role === "user") {
      if (textAreaRef.current) {
        // NOTE: regenerate用のAPIが無いためreload()で対応
        // issue: https://github.com/vercel/ai/issues/167
        textAreaRef.current.value = lastPromptMessage.content;
        handleInputChange(e);
        reload();
        startCompletion(e);
      }
    }
  };

  const hasMessage = () => {
    return messages.length !== 0;
  };

  return (
    <main className={twMerge("mx-auto w-screen dark:bg-gray-400")}>
      <SpHeader hasMessageInCurrentChat={hasMessage()} user={user} />
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
          <MessageList
            messages={messages}
            errorMsg={errorMsg}
            ref={generatingMessageRef}
          />
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
                ? "fixed bottom-0 border-t-[1px] border-gray-900 bg-white dark:border-gray-600 dark:bg-gray-400 md:border-none md:bg-transparent md:bg-gradient-to-t md:from-white md:dark:border-none md:dark:bg-transparent md:dark:from-gray-300"
                : "",
            )}
          >
            <form onSubmit={onSubmit}>
              <div className="mx-auto flex max-w-3xl flex-row items-center gap-3 px-2 md:mt-4 md:flex-col-reverse md:items-end md:px-0">
                <div className="flex w-full items-center rounded-xl border-[1px] border-[rgba(0,0,0,.1)] bg-white px-3 py-[10px] shadow-sm dark:bg-gray-500 md:p-4">
                  <textarea
                    name="prompt"
                    className="max-h-50 h-6 w-full resize-none overflow-y-auto bg-inherit align-middle placeholder-gray-700 focus:outline-none focus-visible:outline-none"
                    placeholder="Send a message"
                    onChange={handleInputChange}
                    ref={textAreaRef}
                    id="prompt"
                    value={input}
                    rows={1}
                  ></textarea>
                  {isLoading ? (
                    <LoadingSpinner className="" />
                  ) : (
                    <button
                      data-testid="submitButton"
                      className={twMerge(
                        "self-end rounded-lg p-2 transition-colors duration-200",
                        input !== "" ? "bg-green-500" : "",
                      )}
                    >
                      <SvgIcon
                        name="sendMessage"
                        className={twMerge(
                          !!input
                            ? "text-white"
                            : "text-gray-800 dark:text-gray-700",
                        )}
                        fillColor={!!input ? "#fff" : ""}
                      />
                    </button>
                  )}
                </div>

                {hasMessage() && (
                  <PromptingManageButton
                    isGenerating={isLoading}
                    onRegenerate={handleRegenerate}
                    onStop={stop}
                  />
                )}
              </div>
            </form>
            <div className="mt-4 ">
              <Help />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatContainer;
