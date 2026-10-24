import type { SearchDocument } from "../../hooks/useSearchDialogController";
import styles from "../../Search.module.scss";

export interface SearchResultRenderContext {
  id: string;
  isActive: boolean;
  onActive: () => void;
}

interface SearchResultsProps {
  documents: SearchDocument[];
  activeResultIndex: number;
  onActiveResultChange: (index: number) => void;
  children: (
    document: SearchDocument,
    index: number,
    context: SearchResultRenderContext,
  ) => React.ReactNode;
}

export function SearchResults(props: SearchResultsProps) {
  const {
    documents,
    activeResultIndex,
    onActiveResultChange,
    children,
  } = props;

  return (
    <ul id="search-results" className={styles.search_resultsList}>
      {documents.map((document, index) => {
        const id = `search-result-${index}`;

        return (
          <li key={document.name}>
            {children(document, index, {
              id,
              isActive: activeResultIndex === index,
              onActive: () => onActiveResultChange(index),
            })}
          </li>
        );
      })}
    </ul>
  );
}
