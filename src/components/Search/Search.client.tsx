"use client";

import GlassIcon from "@/assets/glass.svg";
import CloseIcon from "@/assets/x.svg";
import { Dialog, Portal, Progress } from "@ark-ui/react";
import React from "react";
import { Base } from "../Base/Base";
import { IconButton } from "../Button";
import Hidden from "../Hidden";
import { SearchContext } from "./Search.context";
import styles from "./Search.module.scss";
import Image from "next/image";
import { colors } from "@/theme/generated/colors.generated";
import { pxToRem } from "@/utils/pxToRem";

const DEBOUNCE_DELAY = 400;

export function SearchTrigger() {
  const { setIsDialogWithSearchOpen } = React.useContext(SearchContext);

  React.useEffect(
    function handleKeyboard() {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          (event.key === "k" && (event.metaKey || event.ctrlKey)) ||
          event.key === "/"
        ) {
          event.preventDefault();

          setIsDialogWithSearchOpen?.(true);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [setIsDialogWithSearchOpen],
  );

  return (
    <Base as="div" className={styles.search_trigger}>
      <Base
        as="button"
        type="button"
        className={styles.search_triggerButton}
        onClick={() => setIsDialogWithSearchOpen?.(true)}
      >
        <GlassIcon className={styles.search_triggerIcon} />
        Search...
      </Base>
      <div className={styles.search_triggerShortcutsContainer}>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> Ctrl + K
        </Base>{" "}
        <Hidden>or</Hidden>
        <Base as="span" className={styles.search_triggerShortcut}>
          <Hidden>type</Hidden> /
        </Base>
        <Hidden>to open search</Hidden>
      </div>
    </Base>
  );
}

export function SearchDialog() {
  const { isDialogWithSearchOpen, setIsDialogWithSearchOpen } =
    React.useContext(SearchContext);

  const [isLoading, setIsLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
    }, DEBOUNCE_DELAY);
  };

  return (
    <Dialog.Root
      open={isDialogWithSearchOpen}
      onOpenChange={({ open }) => {
        if (!open && !!inputRef.current) {
          inputRef.current.value = "";
        }

        setIsDialogWithSearchOpen?.(open);
      }}
    >
      <Portal>
        <Dialog.Positioner>
          <Dialog.Backdrop className={styles.search_backdrop} />
          <Dialog.Content className={styles.search_dialog}>
            <div className={styles.search_dialogActions}>
              <div className={styles.search_dialogActionsSearch}>
                {isLoading ? (
                  <Progress.Root
                    className={styles.search_spinner}
                    defaultValue={null}
                  >
                    <div className={styles.search_spinnerCircleContainer}>
                      <Progress.Circle
                        className={styles.search_spinnerCircle}
                        style={
                          {
                            "--size": "24px",
                            "--thickness": "4px",
                          } as React.CSSProperties
                        }
                      >
                        <Progress.CircleTrack
                          className={styles.search_spinnerCircleTrack}
                        />
                        <Progress.CircleRange
                          className={styles.search_spinnerCircleRange}
                        />
                      </Progress.Circle>
                      <Progress.ValueText
                        className={styles.search_spinnerValueText}
                      />
                    </div>
                  </Progress.Root>
                ) : (
                  <GlassIcon
                    className={styles.search_dialogSearchIcon}
                    onClick={() => inputRef.current?.focus()}
                  />
                )}

                <input
                  className={styles.search_dialogSearchInput}
                  ref={inputRef}
                  id="search"
                  autoComplete="off"
                  autoCorrect="off"
                  onChange={handleInputChange}
                  spellCheck="false"
                />

                <Hidden>
                  <label htmlFor="search">Search packages</label>
                </Hidden>
              </div>

              <div className={styles.search_dialogActionsEscape}>
                <Base as="p" className={styles.search_dialogActionsEsc}>
                  <Hidden>Press</Hidden> Esc <Hidden>to close</Hidden>
                </Base>

                <Dialog.CloseTrigger asChild>
                  <IconButton.AsButton
                    type="button"
                    label={`Close search dialog`}
                  >
                    <CloseIcon />
                  </IconButton.AsButton>
                </Dialog.CloseTrigger>
              </div>
            </div>
            <div className={styles.search_dialogContent}>
              <Base
                as="p"
                alignSelf="center"
                color={colors.text.accent}
                fontSize={pxToRem(24)}
                fontWeight={600}
              >
                No results found.
              </Base>

              <Image
                className={styles.search_dialogContentImage}
                src="/no-result.png"
                alt="Not found"
                width={1536}
                height={1024}
              />
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
