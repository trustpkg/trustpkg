import { type BREAKPOINTS_KEYS } from "./responsive.constants";

type ResponsiveBreakpointKey = keyof typeof BREAKPOINTS_KEYS;
type CustomBreakpointKey = `${number}`;

type RecordWithDefault<T> = {
  default: T;
} & Partial<Record<ResponsiveBreakpointKey | CustomBreakpointKey, T>>;

type SSRSupportedBreakpointKeys = "sm" | "md" | "lg";

type SSRSupportedRecordWithDefault<T> = {
  default: T;
} & Partial<Record<SSRSupportedBreakpointKeys, T>>;

export type SSRSupportedResponsiveValue<T> =
  | T
  | SSRSupportedRecordWithDefault<T>;

export type ResponsiveValue<T> = T | RecordWithDefault<T>;

export type WithResponsiveValues<T extends object> = {
  [Key in keyof T]?: ResponsiveValue<NonNullable<T[Key]>>;
};
