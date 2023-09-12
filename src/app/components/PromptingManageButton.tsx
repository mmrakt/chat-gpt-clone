import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";

type Props = {
  isGenerating: boolean;
  onRegenerate: () => void;
};

const buttonStyle =
  "md:flex md:items-center md:gap-2 md:rounded md:border-[1px] md:border-gray-800 md:bg-white md:px-3 md:py-2 p-2 md:text-sm md:text-gray-400 md:dark:border-gray-600 md:dark:bg-gray-400 md:dark:text-gray-800 md:hover:dark:bg-gray-500 md:hover:bg-gray-900";
const PromptingManageButton = ({ isGenerating, onRegenerate }: Props) => {
  return (
    <div className="md:flex md:justify-end">
      {isGenerating ? (
        // TODO: https://github.com/mmrakt/chat-gpt-clone/issues/5
        <button className={twMerge(buttonStyle)}>
          <SvgIcon name="square" className="text-gray-400 dark:text-gray-800" />
          <span className="hidden md:inline-block">Stop generating</span>
        </button>
      ) : (
        <button onClick={onRegenerate} className={twMerge(buttonStyle)}>
          <SvgIcon name="cycle" className="text-gray-400 dark:text-gray-800" />
          <span className="hidden md:inline-block">Regenerate</span>
        </button>
      )}
    </div>
  );
};

export default PromptingManageButton;
