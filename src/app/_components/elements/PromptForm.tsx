"use client";

import { useRef, useState } from "react";
import { SvgIcon } from "./SvgIcon";
import useAutosizeTextArea from "@app/_hooks/useAutosizeTextArea";
import { twMerge } from "tailwind-merge";

type Props = {
  onSubmit: (content: string) => void;
  isGenerating: boolean;
};

const PromptForm = ({ onSubmit, isGenerating }: Props) => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, content);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setContent(val);
  };

  const handleSubmit = () => {
    onSubmit(content);
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };
  return (
    <div className="flex w-full items-center rounded-xl border-[1px] border-[rgba(0,0,0,.1)] bg-white px-3 py-[10px] shadow-sm dark:bg-gray-500 md:p-4">
      <textarea
        className="max-h-50 h-6 w-full resize-none overflow-y-auto bg-inherit align-middle placeholder-gray-700 focus:outline-none focus-visible:outline-none"
        placeholder="Send a message"
        onChange={handleChange}
        ref={textAreaRef}
        id="prompt"
        rows={1}
      ></textarea>
      {isGenerating ? (
        <span className="animate-spin h-4 w-4 border-2 dark:border-gray-800 border-gray-400 rounded-full border-t-transparent"></span>
      ) : (
        <button
          onClick={handleSubmit}
          className={twMerge(
            "self-end rounded-lg p-2 transition-colors duration-200",
            content !== "" ? "bg-green-500" : "",
          )}
        >
          <SvgIcon
            name="sendMessage"
            className={twMerge(
              !!content ? "text-white" : "text-gray-800 dark:text-gray-700",
            )}
            fillColor={!!content ? "#fff" : ""}
          />
        </button>
      )}
    </div>
  );
};

export default PromptForm;
