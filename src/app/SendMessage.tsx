import { twMerge } from "tailwind-merge";

type Props = {
  enabled?: boolean;
  className?: string;
};

const SendMessage: React.FC<Props> = ({ enabled, className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        className={twMerge(
          "m-1 h-4 w-4 text-gray-800 dark:text-gray-600 md:m-0",
          className,
        )}
        stroke-width="2"
      >
        {/* TODO: add transition */}
        <path
          d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
          fill={enabled ? "#fff" : "currentColor"}
        ></path>
      </svg>
    </>
  );
};

export default SendMessage;
