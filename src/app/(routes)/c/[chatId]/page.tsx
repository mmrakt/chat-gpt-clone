"use client";

import {
  FormEvent,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CommonHeader from "@app/_components/elements/CommonHeader";
import Dialog from "@app/_components/elements/Dialog";
import Help from "@app/_components/elements/Help";
import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
import MessageItem from "@app/_components/elements/MessageItem";
// import PromptForm from "@app/_components/elements/PromptForm";
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
  Role,
  StreamChatDTO,
} from "@app/_config";
import useUpdateChat from "@app/_hooks/chats/useUpdateChat";
import useCreateMessage from "@app/_hooks/messages/useCreateMessage";
import useDeleteMessage from "@app/_hooks/messages/useDeleteMessage";
import { useFetchMessages } from "@app/_hooks/messages/useFetchMessages";
import useAutosizeTextArea from "@app/_hooks/useAutosizeTextArea";
import { useStreamChatCompletion } from "@app/_hooks/useStreamChatCompletion";
import { createChatTitle } from "@app/_utils/createChatTitle";
import { isWithinLimitTokenCount } from "@app/_utils/tokenizer";
import { Transition } from "@headlessui/react";
import { Message } from "@prisma/client";
import { useChat } from "ai/react";
import { useSession } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export default function Page({ params }: { params: { chatId: string } }) {
  const { data: dbMessages, isLoading: isFetching } = useFetchMessages(
    params.chatId,
  );
  const convertMessageFromDbToOpenai = (message: Message) => {
    return {
      id: message.id,
      content: message.content,
      role: message.role as Role,
    };
  };
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload,
  } = useChat({
    api: "/api/completion",
    initialMessages: dbMessages?.map((message) =>
      convertMessageFromDbToOpenai(message),
    ),
    onFinish: (message) => {
      registerMessage("assistant", message.content);
    },
  });
  const { data: session } = useSession();
  const createMessageMutation = useCreateMessage();
  const updateChatMutation = useUpdateChat();
  const deleteMessageMutation = useDeleteMessage();
  const { isOpenSideMenu, setIsOpenSideMenu } = useContext(
    IsOpenSideMenuContext,
  );
  const generatingMessageRef = useRef<HTMLLIElement>(null);
  const { isOpenDialogOfRemoveChat } = useContext(
    IsOpenDialogOfRemoveChatContext,
  );
  const [errorMsg, setErrorMsg] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, input);

  useLayoutEffect(() => {
    generatingMessageRef.current?.scrollIntoView();
  }, [messages]);

  if (!session || isFetching) return null;

  const onSubmit = (e: any) => {
    if (!isWithinLimitTokenCount(input)) {
      setErrorMsg("入力トークン数が1000を超えています");
      return;
    }
    registerMessage("user", input);
    updateChatMutation.mutate({
      id: params.chatId,
      title: createChatTitle(input),
    });
    startCompletion(e);
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

  const startCompletion = async (e: any) => {
    if (errorMsg) {
      setErrorMsg("");
    }

    handleSubmit(e);
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

  const handleRegenerate = (e: any) => {
    const lastMessageId = dbMessages?.slice(-1)[0].id;
    // TODO: 一瞬AIの解答が二重に見えてしまう対処
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
    <div className="h-full bg-white text-gray-200 dark:bg-gray-400 dark:text-white">
      {isOpenDialogOfRemoveChat && (
        <>
          <div
            className={twMerge(
              "absolute inset-0 z-50 hidden h-full w-screen bg-gray-800 bg-opacity-70 dark:bg-gray-600 dark:bg-opacity-70",
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
                {messages.map((message, index) => (
                  <li
                    key={message.id}
                    ref={
                      index === messages.length
                        ? generatingMessageRef
                        : undefined
                    }
                  >
                    <MessageItem message={message} />
                  </li>
                ))}
                {/* {isLoading && (
                  <li ref={generatingMessageRef}>
                    <MessageItem
                      message={{
                        id: "newMessage",
                        // chatId: params.chatId,
                        role: "assistant",
                        content: messages[messages.length - 1].content ?? "",
                      }}
                    />
                  </li>
                )} */}
                {errorMsg && (
                  <li>
                    <MessageItem
                      message={{
                        id: "errorMessage",
                        // chatId: params.chatId,
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
                    ? "fixed bottom-0 border-t-[1px] border-gray-900 bg-white dark:border-gray-600 dark:bg-gray-400 md:border-none md:bg-transparent md:bg-gradient-to-t md:from-white md:dark:border-none md:dark:bg-transparent md:dark:from-gray-300"
                    : "",
                )}
              >
                <div className="mx-auto flex max-w-3xl flex-row items-center gap-3 px-2 md:mt-4 md:flex-col-reverse md:items-end md:px-0">
                  {/* <PromptForm
                    input={input}
                    onChange={onchange}
                    onSubmit={handlePrompt}
                    isGenerating={isLoading}
                  /> */}
                  <form onSubmit={onSubmit}>
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
                          // type="submit"
                          // onClick={handleSubmit}
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
                  </form>
                  {hasMessage() && (
                    <PromptingManageButton
                      isGenerating={isLoading}
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
