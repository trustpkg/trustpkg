"use client";

import React from "react";

interface SearchContextValue {
  isDialogWithSearchOpen: boolean;
  setIsDialogWithSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchContext = React.createContext<SearchContextValue>({
  isDialogWithSearchOpen: false,
  setIsDialogWithSearchOpen: undefined,
});

export function SearchContextProvider(props: React.PropsWithChildren) {
  const { children } = props;

  const [isDialogWithSearchOpen, setIsDialogWithSearchOpen] =
    React.useState(false);

  const contextValue: SearchContextValue = {
    isDialogWithSearchOpen,
    setIsDialogWithSearchOpen,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}
