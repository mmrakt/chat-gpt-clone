import { INPUT_TOKEN_LIMIT, Role } from "../_config";
import { CHAT_TITLE_PREFIX } from "@app/_config";
import { Message } from "@prisma/client";
import { isWithinTokenLimit } from "gpt-tokenizer/model/text-davinci-003";


export const createChatTitle = (message: string) => {
  const title = message.length >= 20 ? message.slice(20) + "..." : message;
  return CHAT_TITLE_PREFIX + title;
};

export const fetchApi = async (path: string) => {
  console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`);
};

export const isWithinLimitTokenCount = (text: string) => {
  return isWithinTokenLimit(text, INPUT_TOKEN_LIMIT);
};

export const convertMessageFromDbToOpenai = (message: Message) => {
  return {
    id: message.id,
    content: message.content,
    role: message.role as Role,
  };
};
