"use client";

import { QueryClient, QueryClientProvider as ReactQueryProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const SIX_HOURS = 1000 * 60 * 60 * 6

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: SIX_HOURS,
            gcTime: SIX_HOURS,
        },
    },
});

interface Props {
    children: ReactNode;
}

export function QueryClientProvider({ children }: Props) {
    return (
        <ReactQueryProvider client={queryClient}>
            {children}
        </ReactQueryProvider>
    );
}
