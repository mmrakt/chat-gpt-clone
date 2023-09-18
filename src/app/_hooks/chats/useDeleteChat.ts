import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (chatId: string) =>
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${chatId}`, {
        method: "DELETE",
      }),
    onSuccess: (data, variables) => {
      router.push("/");
      queryClient.invalidateQueries(["chats"]);
    },
  });
};

export default useDeleteChat;
