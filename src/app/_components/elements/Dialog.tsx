import { useContext } from "react";
import { IsOpenDialogOfRemoveChatContext } from "@app/_components/providers/IsOpenDialogOfRemoveChatProvider";
import useDeleteChat from "@app/_hooks/chats/useDeleteChat";
import { Dialog as DialogEl } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type Props = {
  isOpen: boolean;
  currentChatId: string;
};
const Dialog = ({ isOpen, currentChatId }: Props) => {
  const { setIsOpenDialogOfRemoveChat } = useContext(
    IsOpenDialogOfRemoveChatContext,
  );
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-200 rounded-lg z-50 dark:text-white"
    >
      <DialogEl.Panel>
        <DialogEl.Title
          as="h3"
          className="p-6 border-b-[1px] border-gray-900 dark:border-gray-400 text-lg"
        >
          Delete chat?
        </DialogEl.Title>
        <div className="p-6">
          <DialogEl.Description className="max-w-[400px]">
            <span className="">This will delete</span>
            <span className="font-bold">
              User Request: Summarize the conversation Title: Summarize
              conversation.
            </span>
          </DialogEl.Description>
          <div className="flex gap-2 justify-end mt-3">
            <DialogButton
              text="Cancel"
              onClick={handleCancel}
              className="text-gray-300 border-[1px] border-gray-800 hover:bg-gray-900 dark:bg-gray-300 hover:dark:bg-gray-400 dark:border-gray-500 "
            />
            <DialogButton
              text="Delete"
              onClick={handleDelete}
              className="text-white bg-red-700 hover:bg-red-800"
            />
          </div>
        </div>
      </DialogEl.Panel>
    </DialogEl>
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
