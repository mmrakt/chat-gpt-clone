import { useMutation, useQueryClient } from "react-query";

const useDeleteChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId: string) =>
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${chatId}`, {
        method: "DELETE",
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export default useDeleteChat;
