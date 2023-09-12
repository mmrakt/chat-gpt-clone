import { useQuery, UseQueryResult } from "react-query";
import { Message } from "@prisma/client";

const useFetchMessages = (chatId: string): UseQueryResult<Message[]> => {
  return useQuery<Message[]>({
    queryKey: ["messages", chatId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/messages/?chatId=${chatId}`,
      );
      return res.json();
    },
    suspense: true,
  });
};

export { useFetchMessages };
