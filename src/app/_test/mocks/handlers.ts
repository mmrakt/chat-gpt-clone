import { get as getChats, post as postChats } from "./api/chats";
import { get as getMessages, post as postMessages } from "./api/messages";
import { rest } from "msw";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const handlers = [
  rest.get(`${apiUrl}/chats`, getChats),
  rest.post(`${apiUrl}/chats`, postChats),
  rest.get(`${apiUrl}/messages`, getMessages),
  rest.post(`${apiUrl}/messages`, postMessages),
];
