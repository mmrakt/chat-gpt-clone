import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { IMessage } from "../../../constants";

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
