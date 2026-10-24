import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  PackagesApiSearchResponse,
  SearchPackagesData,
} from "@/api/generated";

type SearchParams = SearchPackagesData["query"];
type SearchResponse = PackagesApiSearchResponse;

export const searchQueryKey = (params: SearchParams) => ["search", params?.query, params?.limit]

export function useSearchMutation() {
    const queryClient = useQueryClient();

    return useMutation<SearchResponse, Error, SearchParams>({
        mutationFn: async (params) => {
            const searchParams = new URLSearchParams();

            if (params?.query) {
                searchParams.set("query", params.query);
            }

            if (params?.limit !== undefined) {
                searchParams.set("limit", String(params.limit));
            }

            const response = await fetch(
                `/api/packages/search?${searchParams.toString()}`,
            );

            if (!response.ok) {
                throw new Error(`Package search failed with status ${response.status}.`);
            }

            return response.json();
        },
        onSuccess: (data, params) => {
            queryClient.setQueryData(searchQueryKey(params), data, {
                updatedAt: Date.now()
            });
        }
    });
}