import { Chat } from "@prisma/client";

const fetchChats = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/?userId=${userId}`,
  );
  const chats = res.json();
  return chats;
};

export default fetchChats;
