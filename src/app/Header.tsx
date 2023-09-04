import Image from "next/image";
import Star from "./Star";
import Lock from "./Lock";
import { useReadLocalStorage } from "usehooks-ts";

const Header = () => {
  const messages = useReadLocalStorage("");
  return (
    <header className="flex justify-center px-2 py-6">
      <div className=""></div>
      <div className="flex rounded-lg bg-gray-900 p-1 dark:bg-gray-200">
        <button className="flex w-36 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-gray-700 dark:bg-gray-500 ">
          <Image src="/spark.svg" alt="" width={16} height={16} />
          <span className="text-sm font-bold text-gray-200 dark:text-white">
            GPT-3.5
          </span>
        </button>
        <button className="flex w-36 items-center justify-center gap-2  rounded py-2.5 text-gray-700">
          <Star />
          <span className="text-sm">GPT-4</span>
          <Lock />
        </button>
      </div>
    </header>
  );
};

export default Header;
