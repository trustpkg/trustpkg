import { useMutation, useQueryClient } from "@tanstack/react-query";
import { components, operations } from "@/api/api.types";

type SearchParams = operations["searchPackages"]["parameters"]["query"];
type SearchResponse = components["schemas"]["packagesApi.SearchResponse"];

export const searchQueryKey = (params: SearchParams) => ["search", params?.query, params?.limit]

export function useSearchMutation() {
    const queryClient = useQueryClient();

    return useMutation<SearchResponse, Error, SearchParams>({
        mutationFn: async (params) => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/api/packages/search?query=${params?.query}${params?.limit ? `&limit=${params.limit}` : ""}`
            );
            return response.json();
        },
        onSuccess: (data, params) => {
            queryClient.setQueryData(searchQueryKey(params), data, {
                updatedAt: Date.now()
            });
        }
    });
}