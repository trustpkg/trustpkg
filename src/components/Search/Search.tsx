import React from "react";

import styles from "./Search.module.scss";
import { SearchContextProvider } from "./Search.context";

interface SearchRootProps extends React.PropsWithChildren {}

export function SearchRoot(props: SearchRootProps) {
  return (
    <div className={styles.search}>
      <SearchContextProvider>{props.children}</SearchContextProvider>
    </div>
  );
}
