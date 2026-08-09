import type { NavigationItem } from "./Navigation.types";

export const navigationDefaultConfig: NavigationItem[] = [
  {
    title: "Packages",
    items: [
      {
        label: "All packages",
        href: "/packages",
      },
      {
        label: "Understanding package security",
        href: "/#understanding-package-security",
      },
    ],
  },
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
    label: "CLI",
    href: "/cli",
  },
  {
    label: "API",
    href: "/api",
  },
];
