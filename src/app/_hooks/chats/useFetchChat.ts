import { Chat } from "@prisma/client";
import { UseQueryResult, useQuery } from "react-query";

const useFetchChat = (chatId: string): UseQueryResult<Chat> => {
  return useQuery<Chat>({
    queryKey: ["chats", chatId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${chatId}`,
      );
      return res.json();
    },
  });
};

export { useFetchChat };
