import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => {
  return (
    <span
      className={twMerge(
        "animate-spin h-4 w-4 border-2 dark:border-gray-800 border-gray-400 rounded-full border-t-transparent",
        className,
      )}
    ></span>
  );
};

export default LoadingSpinner;
