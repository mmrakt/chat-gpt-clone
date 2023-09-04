import Image from "next/image";
import Star from "./components/Icons/Star";
import Lock from "./components/Icons/Lock";
import { useReadLocalStorage } from "usehooks-ts";
import { useReadStorage } from "./hooks/useStorage";
import { Message } from "./hooks/useCreateMessage";
import Upload from "./components/Icons/Upload";

const Header = () => {
  const messages = useReadStorage<Message[]>("messages");

  return (
    <header className="">
      {!messages ? (
        <div className="flex justify-center px-2 py-5">
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
        </div>
      ) : (
        <div className="flex items-center justify-between border-b-[1px] border-gray-800 px-4 py-5 text-gray-800 dark:border-gray-200">
          <span className=""></span>
          <span className="text-sm">Default (GPT-3.5)</span>
          <span className="">
            <Upload />
          </span>
        </div>
      )}
    </header>
  );
};

export default Header;
