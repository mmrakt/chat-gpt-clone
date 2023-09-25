import chats from "./api/chats";
import messages from "./api/messages";
import { rest } from "msw";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const handlers = [
  rest.get(`${apiUrl}/chats`, chats.get),
  rest.post(`${apiUrl}/chats`, chats.post),
  rest.get(`${apiUrl}/messages`, messages.get),
  rest.post(`${apiUrl}/messages`, messages.post),
];
