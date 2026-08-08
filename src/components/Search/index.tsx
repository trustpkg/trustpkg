import { SearchRoot } from "./Search";
import { SearchTrigger, SearchDialog } from "./Search.client";

interface SearchComponent {
  Trigger: typeof SearchTrigger;
  Dialog: typeof SearchDialog;
}

const Search = SearchRoot as typeof SearchRoot & SearchComponent;
Search.Trigger = SearchTrigger;
Search.Dialog = SearchDialog;

export default Search;
