import type { NavigationItem } from "./Navigation.types";

export const navigationDefaultConfig: NavigationItem[] = [
  {
    title: "Packages",
    items: [
      {
        label: "Trust Overview",
        href: "/#trust-overview",
      },
      {
        label: "Security Signals",
        href: "/#security-signals",
      },
      {
        label: "Vulnerability History",
        href: "/#vulnerability-history",
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
    title: "CLI",
    items: [
      {
        label: "npm Ecosystem",
        href: "https://www.npmjs.com/",
        isExternal: true,
        shouldOpenInNewTab: true,
      },
      {
        label: "Package Health Guide",
        href: "https://docs.npmjs.com/about-package-readme-files",
        isExternal: true,
        shouldOpenInNewTab: true,
      },
    ],
  },
  {
    label: "API",
    href: "/api",
  },
];
