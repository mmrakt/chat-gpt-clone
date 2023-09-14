"use client";

import { FormEvent, useRef, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import LoadingSpinner from "@app/_components/elements/LoadingSpinner";
import useAutosizeTextArea from "@app/_hooks/useAutosizeTextArea";
import { twMerge } from "tailwind-merge";

type Props = {
  input: string;
  onChange: () => void;
  onSubmit: () => void;
  isGenerating: boolean;
};

const PromptForm = ({ input, onChange, onSubmit, isGenerating }: Props) => {
  // const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, input);

  // const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const val = evt.target?.value;

  //   setContent(val);
  // };

  const handleSubmit = () => {
    // onSubmit(input);
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };
  return (
    <form onSubmit={handleSubmit} action="" className="">
      <div className="flex w-full items-center rounded-xl border-[1px] border-[rgba(0,0,0,.1)] bg-white px-3 py-[10px] shadow-sm dark:bg-gray-500 md:p-4">
        <textarea
          className="max-h-50 h-6 w-full resize-none overflow-y-auto bg-inherit align-middle placeholder-gray-700 focus:outline-none focus-visible:outline-none"
          placeholder="Send a message"
          onChange={onChange}
          ref={textAreaRef}
          id="prompt"
          value={input}
          rows={1}
        ></textarea>
        {isGenerating ? (
          <LoadingSpinner className="" />
        ) : (
          <button
            type="submit"
            // onClick={handleSubmit}
            className={twMerge(
              "self-end rounded-lg p-2 transition-colors duration-200",
              input !== "" ? "bg-green-500" : "",
            )}
          >
            <SvgIcon
              name="sendMessage"
              className={twMerge(
                !!input ? "text-white" : "text-gray-800 dark:text-gray-700",
              )}
              fillColor={!!input ? "#fff" : ""}
            />
          </button>
        )}
      </div>
    </form>
  );
};

export default PromptForm;
