import { Chat } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";

type UpdateChat = Pick<Chat, "id" | "title">;
const useUpdateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateChat: UpdateChat) =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${updateChat.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updateChat.title),
        },
      ),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["chats", variables.id]);
    },
  });
};

export default useUpdateChat;
