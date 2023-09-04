import React from "react";
import { Message } from "../hooks/useCreateMessage";
import MessageItem from "./MessageItem";

type Props = {
  messages: Message[];
  isGenerating: boolean;
};

const MessageList = ({ messages, isGenerating }: Props) => {
  return (
    <ul className="">
      {messages.map((message) => (
        <MessageItem message={message} key={message.id} />
      ))}
      {isGenerating && <div className="">...Loading</div>}
    </ul>
  );
};

export default MessageList;
