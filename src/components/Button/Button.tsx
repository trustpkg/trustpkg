"use client";

import { resolveProps } from "@/responsive/utils/resolveProps";
import clsx from "clsx";
import Link from "next/link";
import { Base } from "../Base/Base";
import { BUTTON_SIZES, BUTTON_VARIANTS } from "./Button.constants";
import styles from "./Button.module.scss";
import type {
  ButtonAsAnchorProps,
  ButtonAsButtonProps,
  ButtonAsNextLinkProps,
  IconButtonAsAnchorProps,
  IconButtonAsButtonProps,
  IconButtonAsNextLinkProps,
  LinkAsAnchorProps,
  LinkAsButtonProps,
  LinkAsNextLinkProps,
} from "./Button.types";
import ProgressIcon from "@/assets/loader.svg";

export function ButtonAsButtonComponent(props: ButtonAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    StartIconSlot,
    EndIconSlot,
    size = BUTTON_SIZES.MEDIUM,
    variant = BUTTON_VARIANTS.FILLED,
    disabled = false,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <button
        {...restOfRest}
        disabled={disabled || isPending}
        className={clsx(styles.button, {
          [styles.button__small]: size === BUTTON_SIZES.SMALL,
          [styles.button__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__disabled]: disabled || isPending,
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.button_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.button_icon, {
              [styles.button_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
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
    isPending = false,
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
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.button_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.button_icon, {
              [styles.button_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
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
    isPending = false,
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
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.button_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.button_icon, {
              [styles.button_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
        )}
      </Link>
    </Base>
  );
}

export function IconButtonAsButtonComponent(props: IconButtonAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    size = BUTTON_SIZES.SMALL,
    variant = BUTTON_VARIANTS.OUTLINED,
    disabled = false,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <button
        {...restOfRest}
        disabled={disabled || isPending}
        className={clsx(styles.iconButton, {
          [styles.iconButton__small]: size === BUTTON_SIZES.SMALL,
          [styles.iconButton__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__disabled]: disabled || isPending,
        })}
      >
        {isPending ? (
          <ProgressIcon
            className={clsx(styles.iconButton_icon, {
              [styles.iconButton_icon__pending]: isPending,
            })}
          />
        ) : (
          <Base asChild as="svg" className={styles.iconButton_icon}>
            {children}
          </Base>
        )}
      </button>
    </Base>
  );
}

export function IconButtonAsAnchorComponent(props: IconButtonAsAnchorProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    size = BUTTON_SIZES.SMALL,
    variant = BUTTON_VARIANTS.OUTLINED,
    disabled = false,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <a
        {...restOfRest}
        className={clsx(styles.iconButton, {
          [styles.iconButton__small]: size === BUTTON_SIZES.SMALL,
          [styles.iconButton__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__disabled]: disabled || isPending,
        })}
      >
        {isPending ? (
          <ProgressIcon
            className={clsx(styles.iconButton_icon, {
              [styles.iconButton_icon__pending]: isPending,
            })}
          />
        ) : (
          <Base asChild as="svg" className={styles.iconButton_icon}>
            {children}
          </Base>
        )}
      </a>
    </Base>
  );
}

export function IconButtonAsNextLinkComponent(
  props: IconButtonAsNextLinkProps,
) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    size = BUTTON_SIZES.SMALL,
    variant = BUTTON_VARIANTS.OUTLINED,
    disabled = false,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <Link
        {...restOfRest}
        className={clsx(styles.iconButton, {
          [styles.iconButton__small]: size === BUTTON_SIZES.SMALL,
          [styles.iconButton__large]: size === BUTTON_SIZES.LARGE,
          [styles.button__outlined]: variant === BUTTON_VARIANTS.OUTLINED,
          [styles.button__disabled]: disabled || isPending,
        })}
      >
        {isPending ? (
          <ProgressIcon
            className={clsx(styles.iconButton_icon, {
              [styles.iconButton_icon__pending]: isPending,
            })}
          />
        ) : (
          <Base asChild as="svg" className={styles.iconButton_icon}>
            {children}
          </Base>
        )}
      </Link>
    </Base>
  );
}

export function LinkAsButtonComponent(props: LinkAsButtonProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    isInherited,
    StartIconSlot,
    EndIconSlot,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <button
        {...restOfRest}
        className={clsx(styles.link, {
          [styles.link__inherited]: isInherited,
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.link_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.link_icon, {
              [styles.link_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
        )}
      </button>
    </Base>
  );
}

export function LinkAsAnchorComponent(props: LinkAsAnchorProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    isInherited,
    StartIconSlot,
    EndIconSlot,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <a
        {...restOfRest}
        className={clsx(styles.link, {
          [styles.link__inherited]: isInherited,
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.link_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.link_icon, {
              [styles.link_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
        )}
      </a>
    </Base>
  );
}

export function LinkAsNextLinkComponent(props: LinkAsNextLinkProps) {
  const { stylesProps, rest } = resolveProps(props);
  const {
    children,
    isInherited,
    StartIconSlot,
    EndIconSlot,
    isPending = false,
    ...restOfRest
  } = rest;

  return (
    <Base {...stylesProps} asChild>
      <Link
        {...restOfRest}
        className={clsx(styles.link, {
          [styles.link__inherited]: isInherited,
        })}
      >
        {!!StartIconSlot && (
          <Base asChild as="svg" className={styles.link_icon}>
            {StartIconSlot}
          </Base>
        )}
        {children}
        {(!!EndIconSlot || isPending) && (
          <Base
            asChild
            as="svg"
            className={clsx(styles.link_icon, {
              [styles.link_icon__pending]: isPending,
            })}
          >
            {isPending ? <ProgressIcon /> : EndIconSlot}
          </Base>
        )}
      </Link>
    </Base>
  );
}
