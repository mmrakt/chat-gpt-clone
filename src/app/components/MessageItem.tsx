import React from "react";
import { Message } from "../hooks/useCreateMessage";
import { MarkdownRenderer } from "./MarkdownRenderer";

type Props = {
  message: Message;
};

const MessageItem = ({ message }: Props) => {
  //   const isUser = useMemo(() => message.role === "user", [message]);

  return (
    <div className="">
      <div className="">
        <img src="" alt="" />
        <div className="">
          <MarkdownRenderer>{message.content}</MarkdownRenderer>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
