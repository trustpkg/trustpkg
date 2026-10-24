import React from "react";
import { type BaseAs, type BaseProps } from "./Base.types";
import { createStyleSheet } from "@/responsive/styles/createStylesHash";
import clsx from "clsx";
import { resolveProps } from "@/responsive/utils/resolveProps";

export function Base<T extends BaseAs = "div">(props: BaseProps<T>) {
  const { stylesProps, rest } = resolveProps(props);
  const { children, as: Component = "div" as T, className, asChild = false, ...restProps } = rest;

  const { hash: stylesHash, cssText } = createStyleSheet(stylesProps);
  const hasStyles = Boolean(cssText.length);

  const ComponentToRender = Component as unknown as React.ElementType;

  return (
    <React.Fragment>
      {hasStyles ? (
        <style href={stylesHash} precedence={stylesHash}>
          {cssText}
        </style>
      ) : null}

      {asChild ? (
        React.cloneElement(
          children as React.ReactElement<{
            className?: React.HTMLAttributes<HTMLElement>["className"];
          }>,
          {
            ...restProps,
            className: clsx(
              className,
              hasStyles ? stylesHash : undefined,
              (
                children as React.ReactElement<{
                  className?: React.HTMLAttributes<HTMLElement>["className"];
                }>
              ).props.className
            ),
          }
        )
      ) : (
        <ComponentToRender
          {...restProps}
          className={clsx(className, hasStyles ? stylesHash : undefined)}
        >
          {children}
        </ComponentToRender>
      )}
    </React.Fragment>
  );
}
