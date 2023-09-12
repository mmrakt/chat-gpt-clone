import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { IMessage } from "../../../constants";

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
