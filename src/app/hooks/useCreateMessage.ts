import { useLocalStorage } from "usehooks-ts";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

export type Message = {
  chatId: string;
  role: "user" | "assistant";
  content: string;
};

export type CreateMessageRole = Extract<
  ChatCompletionRequestMessageRoleEnum,
  "user" | "assistant"
>;

export const useCreateMessage = () => {
  const [messages, setMessages] = useLocalStorage("messages", [] as Message[]);

  return {
    messages,
    setMessages,
  };
};
