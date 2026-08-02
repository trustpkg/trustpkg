"use client";

import { Base } from "../Base/Base";
import Link from "next/link";
import type {
  ButtonAsButtonProps,
  ButtonAsAnchorProps,
  ButtonAsNextLinkProps,
  IconButtonAsButtonProps,
  IconButtonAsAnchorProps,
  IconButtonAsNextLinkProps,
  LinkAsAnchorProps,
  LinkAsNextLinkProps,
  LinkAsButtonProps,
} from "./Button.types";
import { resolveProps } from "@/responsive/utils/resolveProps";
import styles from "./Button.module.scss";
import clsx from "clsx";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.constants";

export function ButtonAsButtonComponent(props: ButtonAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    StartIconSlot,
    EndIconSlot,
    size = BUTTON_SIZES.MEDIUM,
    variant = BUTTON_VARIANTS.FILLED,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <button
        {...restOfRest}
        className={clsx(styles.button, {
          [styles.button__small]: size === BUTTON_SIZES.SMALL,
          [styles.button__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__soft]: variant === BUTTON_VARIANTS.SOFT,
        })}
      >
        {!!StartIconSlot && (
          <span className={styles.button_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.button_iconWrapper}>{EndIconSlot}</span>
        )}
      </button>
    </Base>
  );
}

export function ButtonAsAnchorComponent(props: ButtonAsAnchorProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    StartIconSlot,
    EndIconSlot,
    size = BUTTON_SIZES.MEDIUM,
    variant = BUTTON_VARIANTS.FILLED,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <a
        {...restOfRest}
        className={clsx(styles.button, {
          [styles.button__small]: size === BUTTON_SIZES.SMALL,
          [styles.button__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__soft]: variant === BUTTON_VARIANTS.SOFT,
        })}
      >
        {!!StartIconSlot && (
          <span className={styles.button_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.button_iconWrapper}>{EndIconSlot}</span>
        )}
      </a>
    </Base>
  );
}

export function ButtonAsNextLinkComponent(props: ButtonAsNextLinkProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    StartIconSlot,
    EndIconSlot,
    size = BUTTON_SIZES.MEDIUM,
    variant = BUTTON_VARIANTS.FILLED,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <Link
        {...restOfRest}
        className={clsx(styles.button, {
          [styles.button__small]: size === BUTTON_SIZES.SMALL,
          [styles.button__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__soft]: variant === BUTTON_VARIANTS.SOFT,
        })}
      >
        {!!StartIconSlot && (
          <span className={styles.button_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.button_iconWrapper}>{EndIconSlot}</span>
        )}
      </Link>
    </Base>
  );
}

export function IconButtonAsButtonComponent(props: IconButtonAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, ...restOfRest } = rest;

  return (
    <Base {...stylesProps} asChild>
      <button {...restOfRest} className={styles.iconButton}>
        {children}
      </button>
    </Base>
  );
}

export function IconButtonAsAnchorComponent(props: IconButtonAsAnchorProps) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, ...restOfRest } = rest;

  return (
    <Base {...stylesProps} asChild>
      <a {...restOfRest} className={styles.iconButton}>
        {children}
      </a>
    </Base>
  );
}

export function IconButtonAsNextLinkComponent(
  props: IconButtonAsNextLinkProps,
) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, ...restOfRest } = rest;

  return (
    <Base {...stylesProps} asChild>
      <Link {...restOfRest} className={styles.iconButton}>
        {children}
      </Link>
    </Base>
  );
}

export function LinkAsButtonComponent(props: LinkAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, isInherited, StartIconSlot, EndIconSlot, ...restOfRest } =
    rest;

  return (
    <Base {...stylesProps} asChild>
      <button {...restOfRest} className={styles.link}>
        {!!StartIconSlot && (
          <span className={styles.link_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.link_iconWrapper}>{EndIconSlot}</span>
        )}
      </button>
    </Base>
  );
}

export function LinkAsAnchorComponent(props: LinkAsAnchorProps) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, isInherited, StartIconSlot, EndIconSlot, ...restOfRest } =
    rest;

  return (
    <Base {...stylesProps} asChild>
      <a {...restOfRest} className={styles.link}>
        {!!StartIconSlot && (
          <span className={styles.link_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.link_iconWrapper}>{EndIconSlot}</span>
        )}
      </a>
    </Base>
  );
}

export function LinkAsNextLinkComponent(props: LinkAsNextLinkProps) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, isInherited, StartIconSlot, EndIconSlot, ...restOfRest } =
    rest;

  return (
    <Base {...stylesProps} asChild>
      <Link {...restOfRest} className={styles.link}>
        {!!StartIconSlot && (
          <span className={styles.link_iconWrapper}>{StartIconSlot}</span>
        )}
        {children}
        {!!EndIconSlot && (
          <span className={styles.link_iconWrapper}>{EndIconSlot}</span>
        )}
      </Link>
    </Base>
  );
}
