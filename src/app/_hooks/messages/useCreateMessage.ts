import { IMessage } from "@app/_config";
import { UseMutationResult, useMutation, useQueryClient } from "react-query";

const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: IMessage) =>
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/messages`, {
        method: "POST",
        body: JSON.stringify({
          message,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });
};

export default useCreateMessage;
