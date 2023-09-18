import { Chat } from "@prisma/client";
import { UseQueryResult, useQuery } from "react-query";

const useFetchChatList = (userId: string): UseQueryResult<Chat[]> => {
  return useQuery<Chat[]>({
    queryKey: ["chats", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/?userId=${userId}`,
      );
      return res.json();
    },
  });
};

export { useFetchChatList };
