"use client";

import type React from "react";

interface PackageListRowProps extends React.PropsWithChildren {
  className?: string;
}

export function PackageListRow(props: PackageListRowProps) {
  const { children, className } = props;

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    const target = event.target;

    if (target instanceof Element && target.closest("a, button")) {
      return;
    }

    event.currentTarget.querySelector<HTMLAnchorElement>("a[href]")?.click();
  };

  return (
    <tr className={className} onClick={handleClick}>
      {children}
    </tr>
  );
}
