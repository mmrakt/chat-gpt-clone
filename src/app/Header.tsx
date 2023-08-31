import Image from "next/image";
import Star from "./star";
import Lock from "./Lock";

const Header = () => {
  return (
    <header className="py-6 px-2 flex justify-center">
      <div className=""></div>
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button className="text-gray-700 flex justify-center items-center gap-2 py-2.5 bg-gray-500 w-36 rounded-lg ">
          <Image src="/spark.svg" alt="" width={16} height={16} />
          <span className="text-white text-sm">GPT-3.5</span>
        </button>
        <button className="text-gray-700 flex items-center gap-2 py-2.5  w-36 rounded justify-center">
          <Star />
          <span className="text-sm">GPT-4</span>
          <Lock />
        </button>
      </div>
    </header>
  );
};

export default Header;
