import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const LoadingSpinner = ({ className }: Props) => {
  return (
    <span
      className={twMerge(
        "h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent dark:border-gray-800",
        className,
      )}
    ></span>
  );
};

export default LoadingSpinner;
