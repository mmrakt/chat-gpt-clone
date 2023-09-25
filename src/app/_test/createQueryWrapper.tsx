import React, { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        suspense: true,
      },
    },
  });
  const queryWrapper = ({ children }: { children: ReactElement }) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
  return { queryClient, queryWrapper };
};
