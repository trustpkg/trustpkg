import { SearchRoot } from "./Search";
import { SearchDialog } from "./components/Dialog/SearchDialog.client";
import { SearchTrigger } from "./components/Trigger/SearchTrigger.client";

interface SearchComponent {
  Trigger: typeof SearchTrigger;
  Dialog: typeof SearchDialog;
}

const Search = SearchRoot as typeof SearchRoot & SearchComponent;
Search.Trigger = SearchTrigger;
Search.Dialog = SearchDialog;

export default Search;
