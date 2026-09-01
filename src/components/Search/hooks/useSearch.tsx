import { SearchPackagesParametersSchema } from "@/api/parameters";
import { debounce } from "@/utils/debounce";
import React from "react";
import { useSearchMutation } from "../api/useSearchMutation";

const DEBOUNCE_DELAY = 400;
const LOADING_HIDE_DELAY = 100;

export function useSearch() {
  const mutation = useSearchMutation();
  const mutateSearch = mutation.mutate;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const searchVersion = React.useRef(0);
  const [isDefaultView, setIsDefaultView] = React.useState(true)
  const [loadingState, setLoadingState] = React.useState({
    isLoading: false,
    version: 0,
  });

  const documents = mutation.data?.documents ?? []

  const stopLoadingAfterDelay = React.useCallback((version: number) => {
    setTimeout(() => {
      setLoadingState((currentState) =>
        currentState.version === version
          ? { ...currentState, isLoading: false }
          : currentState,
      );
    }, LOADING_HIDE_DELAY);
  }, []);

  const debouncedSearch = React.useMemo(
    () =>
      debounce((query: string, version: number) => {
        try {
          const validated = SearchPackagesParametersSchema.parse({
            query,
            limit: 12,
          });

          mutateSearch(validated, {
            onSettled: () => {
              stopLoadingAfterDelay(version)
              setIsDefaultView(false)
            },
          });
        } catch {
          stopLoadingAfterDelay(version);
        }
      }, DEBOUNCE_DELAY),
    [mutateSearch, stopLoadingAfterDelay],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const version = ++searchVersion.current;

    setLoadingState({ isLoading: true, version });
    debouncedSearch(event.currentTarget.value.toLowerCase(), version);

    if (event.currentTarget.value === "") {
      setIsDefaultView(true)
    }
  };

  const handleClearSearch = () => {
    const version = ++searchVersion.current;
    setLoadingState({ isLoading: false, version });
    setIsDefaultView(true)

    if (!!inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return {
    inputRef,
    isPending: loadingState.isLoading,
    handleClearSearch: handleClearSearch,
    handleInputChange,
    error: mutation.error,
    documents: documents,
    isDefaultView,
    isNotFound: documents.length == 0 && !loadingState.isLoading
  };
}
