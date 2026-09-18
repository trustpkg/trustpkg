"use client";

import { SearchDialogView } from "./SearchDialogView.client";
import { useSearchDialogController } from "../../hooks/useSearchDialogController";

export function SearchDialog() {
  const controller = useSearchDialogController();

  return <SearchDialogView {...controller} />;
}
