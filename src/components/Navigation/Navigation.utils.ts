import type { NavigationItem } from "./Navigation.types";

export const navigationDefaultConfig: NavigationItem[] = [
  {
    title: "Images / github actions",
    items: [
      {
        label: "Docker Images",
        href: "/images",
      },
      {
        label: "GitHub Actions",
        href: "/actions",
      },
    ],
  },
  {
    label: "Packages",
    href: '/packages'
  },
  {
    label: 'Blog',
    href: '/blog'
  },
  {
    label: "CLI",
    href: "/cli",
  },
  {
    label: "API",
    href: "/api",
  },
];
