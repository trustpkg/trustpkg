import {
  BasePaddingProps,
  BaseSizeProps,
  BaseMarginProps,
} from "@/responsive/responsiveStyleProps.types";
import type { ValueOf } from "@/types/valueOf";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  ICON_BUTTON_SIZES,
} from "./Button.constants";
import type { ICON_BUTTON_VARIANTS } from "./Button.constants";
import React from "react";
import Link from "next/link";

type NextLinkOmittedProps = Omit<
  React.ComponentProps<typeof Link>,
  "style" | "className"
>;

type ButtonOmittedProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "style" | "className"
>;

type AnchorOmittedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "style" | "className"
>;

type ButtonStylesProps = Pick<BaseSizeProps, "width"> &
  BasePaddingProps &
  BaseMarginProps;

interface ButtonCommonProps {
  StartIconSlot?: React.ReactNode;
  EndIconSlot?: React.ReactNode;
  size?: ValueOf<typeof BUTTON_SIZES>;
  variant?: ValueOf<typeof BUTTON_VARIANTS>;
  disabled?: boolean;
  isPending?: boolean;
}

interface ButtonProps
  extends ButtonCommonProps, ButtonStylesProps, React.PropsWithChildren {}

interface IconButtonCommonProps {
  label: string;
  size?: ValueOf<typeof ICON_BUTTON_SIZES>;
  variant?: ValueOf<typeof ICON_BUTTON_VARIANTS>;
  disabled?: boolean;
  isPending?: boolean;
}

interface IconButtonProps
  extends IconButtonCommonProps, ButtonStylesProps, React.PropsWithChildren {}

interface LinkCommonProps {
  StartIconSlot?: React.ReactNode;
  EndIconSlot?: React.ReactNode;
  isInherited?: boolean;
  disabled?: boolean;
  isPending?: boolean;
}

export interface ButtonAsButtonProps extends ButtonProps, ButtonOmittedProps {}

export interface ButtonAsAnchorProps extends ButtonProps, AnchorOmittedProps {}

export interface ButtonAsNextLinkProps
  extends ButtonProps, NextLinkOmittedProps {}

export interface IconButtonAsButtonProps
  extends IconButtonProps, ButtonOmittedProps {}

export interface IconButtonAsAnchorProps
  extends IconButtonProps, AnchorOmittedProps {}

export interface IconButtonAsNextLinkProps
  extends IconButtonProps, NextLinkOmittedProps {}

export interface LinkAsAnchorProps
  extends LinkCommonProps, AnchorOmittedProps {}

export interface LinkAsNextLinkProps
  extends LinkCommonProps, NextLinkOmittedProps {}

export interface LinkAsButtonProps
  extends LinkCommonProps, ButtonOmittedProps {}
