"use client";
import { signIn, useSession } from "next-auth/react";
import { SvgIcon } from "../components/SvgIcon";

const Page = () => {
  return (
    <div className="mx-auto h-screen max-w-sm pt-48">
      <h1 className="text-center text-3xl font-bold">
        Sign in to ChatGPT Clone
      </h1>
      <div className="mt-10 flex flex-col">
        <button
          className="flex items-center justify-center gap-4 rounded-lg bg-gray-200 px-5 py-4 text-white hover:bg-gray-300"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <SvgIcon name="github" className="" size={20} />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

export default Page;
