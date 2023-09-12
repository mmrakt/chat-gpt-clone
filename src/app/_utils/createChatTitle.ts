import { CHAT_TITLE_PREFIX } from "@app/_config";

export const createChatTitle = (message: string) => {
  const title = message.length >= 20 ? message.slice(20) + "..." : message;
  return CHAT_TITLE_PREFIX + title;
};
