import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "react-query";

const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (userId: string) => {
      console.log("useCreateChat: ");
      return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chats`, {
        method: "POST",
        body: JSON.stringify({
          userId,
        }),
      });
    },
    onSuccess: async (data) => {
      console.log("onSucess:");
      console.log(data.status);
      queryClient.resetQueries(["chats"]);
      const newChat = await data.json();
      router.push(`/c/${newChat.id}`);
    },
  });
};

export default useCreateChat;
