"use client";

import { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import SendMessage from "../SendMessage";
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
    <div className="bg-gray-500 rounded-xl w-full p-4 flex items-center shadow-xs">
      <textarea
        className="w-full bg-inherit placeholder-gray-700 resize-none align-middle focus-visible:outline-none focus:outline-none h-6 max-h-50 overflow-y-auto"
        placeholder="Send a message"
        onChange={handleChange}
        ref={textAreaRef}
        id="prompt"
        rows={1}
      ></textarea>
      <button
        onClick={handleSubmit}
        className={twMerge(
          "p-2 rounded-lg transition-colors duration-200 self-end",
          content !== "" ? "bg-green-500" : ""
        )}
      >
        <SendMessage enabled={!!content} />
      </button>
    </div>
  );
};

export default PromptForm;
