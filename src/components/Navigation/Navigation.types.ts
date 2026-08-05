export interface NavigationLinkItem {
  isExternal?: boolean;
  shouldOpenInNewTab?: boolean;
  label: string;
  href: string;
  StartIconSlot?: React.ReactNode;
  EndIconSlot?: React.ReactNode;
}

export interface NavigationLinkGroup {
  title: string;
  items: NavigationLinkItem[];
}

export type NavigationItem = NavigationLinkItem | NavigationLinkGroup;
