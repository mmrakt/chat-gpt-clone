import { Suspense, useContext } from "react";
import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
import useDeleteChat from "@app/_hooks/chats/useDeleteChat";
import { useFetchChat } from "@app/_hooks/chats/useFetchChat";
import { isOpenDialogOfRemoveChatAtom } from "@app/_store/IsOpenDialogOfRemoveChat";
import { Dialog as DialogEl } from "@headlessui/react";
import { useAtom } from "jotai";
import { twMerge } from "tailwind-merge";

type Props = {
  isOpen: boolean;
  currentChatId: string;
};
const Dialog = ({ isOpen, currentChatId }: Props) => {
  const [, setIsOpenDialogOfRemoveChat] = useAtom(isOpenDialogOfRemoveChatAtom);
  const deleteChatMutation = useDeleteChat();

  const handleCancel = () => {
    setIsOpenDialogOfRemoveChat(false);
  };
  const handleDelete = async () => {
    await deleteChatMutation.mutate(currentChatId);
    setIsOpenDialogOfRemoveChat(false);
  };
  return (
    <DialogEl
      open={isOpen}
      onClose={handleCancel}
      className="absolute left-1/2 top-1/2 z-50 w-[90%] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-gray-200 dark:text-white"
    >
      <DialogEl.Panel>
        <DialogEl.Title
          as="h3"
          className="border-b-[1px] border-gray-900 p-4 text-lg dark:border-gray-400 sm:p-6"
        >
          Delete chat?
        </DialogEl.Title>
        <div className="p-4 sm:p-6">
          <Suspense
            fallback={
              <div className="flex w-full items-center justify-center">
                <LoadingSpinner />
              </div>
            }
          >
            <ChatName chatId={currentChatId} />
          </Suspense>
          <div className="mt-5 flex  flex-col-reverse justify-end gap-3 sm:mt-3 sm:flex-row sm:gap-2">
            <DialogButton
              text="Cancel"
              onClick={handleCancel}
              className="border-[1px] border-gray-800 text-gray-300 hover:bg-gray-900 dark:border-gray-500 dark:bg-gray-300 hover:dark:bg-gray-400 "
            />
            <DialogButton
              text="Delete"
              onClick={handleDelete}
              className="bg-red-700 text-white hover:bg-red-800"
            />
          </div>
        </div>
      </DialogEl.Panel>
    </DialogEl>
  );
};

const ChatName = ({ chatId }: { chatId: string }) => {
  const { data: chat } = useFetchChat(chatId);

  return (
    <DialogEl.Description className="max-w-[400px]">
      <span className="">This will delete</span>
      <span className="ml-1 font-bold">{chat?.title}</span>
    </DialogEl.Description>
  );
};

type DialogButton = {
  text: string;
  onClick: () => void;
  className?: string;
};
const DialogButton = ({ text, onClick, className }: DialogButton) => {
  return (
    <button
      className={twMerge(
        "rounded-md px-3 py-2 text-sm dark:text-gray-800",
        className,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Dialog;
