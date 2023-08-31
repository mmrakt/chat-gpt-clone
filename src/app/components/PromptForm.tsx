"use client";

import { useRef, useState } from "react";
import useAutosizeTextArea from "../hooks/useAutosizeTextArea";
import SendMessage from "../SendMessage";
import { twMerge } from "tailwind-merge";

const PromptForm = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, text);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setText(val);
  };
  const handleSubmit = () => {};
  return (
    <div className="bg-gray-500 rounded-xl w-full p-4 flex items-center shadow-sm">
      <textarea
        className="w-full bg-inherit placeholder-gray-700 resize-none leading-none align-middle focus-visible:outline-none focus:outline-none h-5 max-h-50 overflow-y-auto"
        placeholder="Send a message"
        onChange={handleChange}
        ref={textAreaRef}
        id="prompt"
      ></textarea>
      <button
        onClick={handleSubmit}
        className={twMerge(
          "p-1 rounded-lg transition-colors duration-200",
          text !== "" ? "bg-green-500" : ""
        )}
      >
        <SendMessage enabled={!!text} />
      </button>
    </div>
  );
};

export default PromptForm;
