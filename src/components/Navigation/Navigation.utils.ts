import type { NavigationItem } from "./Navigation.types";

export const navigationDefaultConfig: NavigationItem[] = [
  {
    title: "Tools",
    items: [
      {
        label: "Trustpkg cli Forge",
        href: "/tools/trustpkg-cli-forge"
      },
      
    ]
  },
  {
    label: "Packages",
    href: '/packages'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
];
