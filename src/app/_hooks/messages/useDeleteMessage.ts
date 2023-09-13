import { IMessage } from "@app/_config";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (messageId: string) =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/messages/${messageId}`,
        {
          method: "DELETE",
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
};

export default useDeleteMessage;
