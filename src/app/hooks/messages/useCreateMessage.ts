import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import createMessages from "../../utils/createMessage";
import { IMessage } from "../../../constants";

const useCreateMessage = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: IMessage) =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${session?.user?.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            message,
          }),
        },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", session?.user?.id]);
    },
  });
};

export default useCreateMessage;
