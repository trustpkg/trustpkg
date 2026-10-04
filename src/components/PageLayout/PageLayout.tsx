import React from "react";
import { PageLayoutListRoot as PageLayoutListMarker } from "./PageLayoutList/PageLayoutList";
import { PageLayoutListRoot } from "./PageLayoutListRoot";
import { PageLayoutRootComponent, PageLayoutComponentProps } from "./PageLayoutBase";
import Navigation from "../Navigation";

export function PageLayoutRoot(props: PageLayoutComponentProps) {
  const { children, NavigationSlot } = props;

  const isListVariant = React.Children
    .toArray(children)
    .some(
      (child) =>
        React.isValidElement(child) && child.type === PageLayoutListMarker
    );

  if (isListVariant) {
    return (
      <PageLayoutListRoot>
        {children}
      </PageLayoutListRoot>
    );
  }

  return (
    <PageLayoutRootComponent {...props} NavigationSlot={NavigationSlot || <Navigation />}>
      {children}
    </PageLayoutRootComponent>
  );
}

export function PageLayoutHero() { }
