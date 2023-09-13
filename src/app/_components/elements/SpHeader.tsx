import { useContext } from "react";
import { SvgIcon } from "./SvgIcon";
import { IsOpenSideMenuContext } from "@app/_components/providers/IsOpenSideMenuProvider";
import useCreateChat from "@app/_hooks/chats/useCreateChat";
import { useFetchChats } from "@app/_hooks/chats/useFetchChats";
import { User } from "next-auth";

type Props = {
  hasMessageInCurrentChat: boolean;
  user: User;
};

const SpHeader = ({ hasMessageInCurrentChat, user }: Props) => {
  const { setIsOpenSideMenu } = useContext(IsOpenSideMenuContext);
  const { data: chats } = useFetchChats(user.id);
  const createChatMutation = useCreateChat();
  const handleCreateChat = async () => {
    if (hasMessageInCurrentChat && chats && chats.length <= 5) {
      await createChatMutation.mutate(user.id);
    }
  };
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
      <button className="" onClick={handleCreateChat}>
        <SvgIcon name="plus" className="" size={24} />
      </button>
    </div>
  );
};

export default SpHeader;
