import { useSession } from "next-auth/react";
import { useContext } from "react";
import useCreateChat from "../hooks/chats/useCreateChat";
import { SvgIcon } from "./SvgIcon";
import { IsOpenSideMenuContext } from "./providers/IsOpenSideMenuProvider";

type Props = {
  hasMessageInCurrentChat: boolean;
};

const SpHeader = ({ hasMessageInCurrentChat }: Props) => {
  const { setIsOpenSideMenu } = useContext(IsOpenSideMenuContext);
  const { data: session } = useSession();
  const createChatMutation = useCreateChat();
  const handleCreateChat = async () => {
    if (session?.user && !hasMessageInCurrentChat) {
      await createChatMutation.mutate(session.user.id);
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
