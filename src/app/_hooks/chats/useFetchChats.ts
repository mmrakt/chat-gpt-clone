import { Chat } from "@prisma/client";
import { UseQueryResult, useQuery } from "react-query";

const useFetchChats = (userId: string): UseQueryResult<Chat[]> => {
  return useQuery<Chat[]>({
    queryKey: ["chats", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/?userId=${userId}`,
      );
      await new Promise((s) => setTimeout(s, 3000));

      return res.json();
    },
  });
};

export { useFetchChats };
