import React from "react";

interface PageLayoutProps extends React.PropsWithChildren {}

export function PageLayoutRoot(props: PageLayoutProps) {
  const { children } = props;

  return <>{children}</>;
}
