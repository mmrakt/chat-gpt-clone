"use client";

import { SvgIcon } from "@app/_components/elements/SvgIcon";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    <div className="mx-auto h-screen max-w-md px-4 pt-48">
      <h1 className="text-center text-3xl font-bold">
        Sign in to ChatGPT Clone
      </h1>
      <div className="mt-10 flex flex-col gap-5">
        <button
          className="flex items-center justify-center gap-4 rounded-lg bg-gray-200 px-5 py-4 text-white hover:bg-gray-400"
          onClick={() => signIn("github", { callbackUrl: "/" })}
        >
          <SvgIcon name="github" className="" size={20} />
          Continue with GitHub
        </button>
        <button
          className="flex items-center justify-center gap-4 rounded-lg bg-gray-200 px-5 py-4 text-white hover:bg-gray-400"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <SvgIcon name="google" className="" size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Page;
