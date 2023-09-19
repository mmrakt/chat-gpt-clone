"use client";

import Image from "next/image";
import { SvgIcon } from "@app/_components/elements/SvgIcon";

type Props = {
  hasMessageInCurrentChat: boolean;
};
const CommonHeader = ({ hasMessageInCurrentChat }: Props) => {
  return (
    <header className="">
      {!hasMessageInCurrentChat ? (
        <div className="flex justify-center px-2 py-5">
          <div className="flex rounded-lg bg-gray-900 p-1 dark:bg-gray-200">
            <button className="flex w-36 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-gray-700 dark:bg-gray-500 ">
              <Image src="/spark.svg" alt="" width={16} height={16} />
              <span className="text-sm font-bold text-gray-200 dark:text-white">
                GPT-3.5
              </span>
            </button>
            <button className="flex w-36 cursor-not-allowed items-center justify-center  gap-2 rounded py-2.5 text-gray-700">
              <SvgIcon name="star" />
              <span className="text-sm">GPT-4</span>
              <SvgIcon name="lock" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between border-b-[1px] border-gray-850 px-4 py-5 text-gray-800 dark:border-gray-200">
          <span className=""></span>
          <span className="text-sm text-gray-500 dark:text-gray-800">
            Default (GPT-3.5)
          </span>
          <button className="cursor-not-allowed">
            <SvgIcon
              name="upload"
              className="text-gray-500 dark:text-gray-800"
            />
          </button>
        </div>
      )}
    </header>
  );
};

export default CommonHeader;
