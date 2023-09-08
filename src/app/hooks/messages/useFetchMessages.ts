import { useQuery, UseQueryResult } from "react-query";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import fetchMessages from "../../utils/fetchMessages";

const useFetchMessages = (): UseQueryResult<Message[]> => {
  const { data: session } = useSession();

  return useQuery<Message[]>({
    queryKey: ["messages", session?.user?.id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/messages`,
      );
      return res.json();
    },
    suspense: true,
  });
};

export { useFetchMessages };
