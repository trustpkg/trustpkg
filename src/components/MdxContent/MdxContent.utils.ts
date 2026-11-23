import { Children, isValidElement, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

export function getNextPageLink(children: ReactNode, linkComponent: ElementType) {
  const parts = Children.toArray(children).filter(
    (child) => typeof child !== "string" || child.trim().length > 0,
  );

  if (parts.length !== 2) {
    return null;
  }

  const [label, link] = parts;

  if (!isValidElement<{ children?: ReactNode }>(label) || label.type !== "strong") {
    return null;
  }

  if (label.props.children !== "Next:") {
    return null;
  }

  if (!isValidElement<ComponentPropsWithoutRef<"a">>(link) || link.type !== linkComponent) {
    return null;
  }

  const { href, children: title } = link.props;
  
  if (typeof href !== "string" || !href || title == null) {
    return null;
  }

  return link.props;
}
