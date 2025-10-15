"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";

export default function Provider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: false,
      },
    },
    mutationCache: new MutationCache({
      onError: (e: Error) => {
      },
      onSuccess: () => {
      },
    }),
    queryCache: new QueryCache({
      onError: (e: Error) => {
      },
      onSuccess: () => {
      },
    }),
  });


  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
