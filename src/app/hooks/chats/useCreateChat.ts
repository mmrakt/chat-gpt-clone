import { useMutation, useQueryClient } from "react-query";

const useCreateChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) =>
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`, {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export default useCreateChat;
