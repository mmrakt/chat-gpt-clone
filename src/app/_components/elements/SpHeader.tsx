import { Suspense, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { SvgIcon } from "./SvgIcon";
import { IsOpenSideMenuContext } from "@app/_components/providers/IsOpenSideMenuProvider";
import useCreateChat from "@app/_hooks/chats/useCreateChat";
import { useFetchChats } from "@app/_hooks/chats/useFetchChats";
import { User } from "next-auth";

type Props = {
  hasMessageInCurrentChat: boolean;
  user: User;
};

const CreateChatButton = ({ hasMessageInCurrentChat, user }: Props) => {
  const createChatMutation = useCreateChat();
  const { data: chats } = useFetchChats(user.id);
  const useHandleCreateChat = async () => {
    if (hasMessageInCurrentChat && chats && chats.length <= 5) {
      await createChatMutation.mutate(user.id);
    }
  };

  return (
    <button className="" onClick={useHandleCreateChat}>
      <SvgIcon name="plus" className="" size={24} />
    </button>
  );
};

const SpHeader = ({ hasMessageInCurrentChat, user }: Props) => {
  const { setIsOpenSideMenu } = useContext(IsOpenSideMenuContext);

  return (
    <div
      id="onlySpHeader"
      className="sticky  top-0 z-10 flex items-center justify-between bg-gray-400 px-4 py-2 text-gray-800 dark:border-b-[1px] dark:border-gray-600 md:hidden"
    >
      <button
        className=""
        onClick={() => {
          setIsOpenSideMenu(true);
        }}
      >
        <SvgIcon name="hamburger" className="" size={24} />
      </button>
      <span className="text-base">New chat</span>
      <Suspense
        fallback={
          <LoadingSpinner className=" h-6 w-6 border-gray-800 border-t-transparent" />
        }
      >
        <CreateChatButton
          user={user}
          hasMessageInCurrentChat={hasMessageInCurrentChat}
        />
      </Suspense>
    </div>
  );
};

export default SpHeader;
