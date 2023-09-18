import React, { forwardRef } from "react";
import MessageItem from "./MessageItem";
import { Message } from "ai";

type Props = {
  messages: Message[];
  errorMsg?: string;
};

const MessageList = forwardRef(function MessageList(
  { messages, errorMsg }: Props,
  ref: React.ForwardedRef<HTMLLIElement>,
) {
  return (
    <ul className=" dark:bg-gray-400">
      {messages.map((message, index) => (
        <li
          key={message.id}
          ref={index === messages.length - 1 ? ref : undefined}
        >
          <MessageItem message={message} />
        </li>
      ))}
      {errorMsg && (
        <li>
          <MessageItem
            message={{
              id: "errorMessage",
              role: "assistant",
              content: errorMsg,
            }}
            isError
          />
        </li>
      )}
    </ul>
  );
});

export default MessageList;
