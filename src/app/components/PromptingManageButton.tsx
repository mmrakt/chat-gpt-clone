import { twMerge } from "tailwind-merge";
import { SvgIcon } from "./SvgIcon";

type Props = {
  isGenerating: boolean;
  onRegenerate: () => void;
};

const buttonStyle =
  "flex items-center gap-2 rounded border-[1px] border-gray-800 bg-white px-3 py-2 text-sm text-gray-400 dark:border-gray-600 dark:bg-gray-400 dark:text-gray-800 hover:dark:bg-gray-500 hover:bg-gray-900";
const PromptingManageButton = ({ isGenerating, onRegenerate }: Props) => {
  return (
    <div className="flex justify-end">
      {isGenerating ? (
        <button className={twMerge(buttonStyle)}>
          <SvgIcon name="square" className="text-gray-400 dark:text-gray-800" />
          Stop generating
        </button>
      ) : (
        <button onClick={onRegenerate} className={twMerge(buttonStyle)}>
          <SvgIcon name="cycle" className="text-gray-400 dark:text-gray-800" />
          Regenerate
        </button>
      )}
    </div>
  );
};

export default PromptingManageButton;
