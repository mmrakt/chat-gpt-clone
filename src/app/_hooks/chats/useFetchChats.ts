import { useQuery, UseQueryResult } from "react-query";
import { Chat } from "@prisma/client";

const useFetchChats = (userId: string): UseQueryResult<Chat[]> => {
  return useQuery<Chat[]>({
    queryKey: ["chats", userId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/?userId=${userId}`,
      );
      return res.json();
    },
    suspense: true,
  });
};

export { useFetchChats };
