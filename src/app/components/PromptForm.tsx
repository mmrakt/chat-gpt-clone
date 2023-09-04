"use client";

import { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import SendMessage from "./Icons/SendMessage";
import { twMerge } from "tailwind-merge";

type Props = {
  onSubmit: (content: string) => void;
};

const PromptForm = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, content);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setContent(val);
  };

  const handleSubmit = () => {
    onSubmit(content);
  };
  return (
    <div className="flex w-full items-center rounded-xl border-[1px] border-[rgba(0,0,0,.1)] bg-white p-4 shadow-sm dark:bg-gray-500">
      <textarea
        className="max-h-50 h-6 w-full resize-none overflow-y-auto bg-inherit align-middle placeholder-gray-700 focus:outline-none focus-visible:outline-none"
        placeholder="Send a message"
        onChange={handleChange}
        ref={textAreaRef}
        id="prompt"
        rows={1}
      ></textarea>
      <button
        onClick={handleSubmit}
        className={twMerge(
          "self-end rounded-lg p-2 transition-colors duration-200",
          content !== "" ? "bg-green-500" : "",
        )}
      >
        <SendMessage enabled={!!content} />
      </button>
    </div>
  );
};

export default PromptForm;
