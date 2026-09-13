import { getTheme } from "@/api/getTheme";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { ResponsiveProvider } from "@/responsive/Responsive.Provider";
import { parseUABreakpoint } from "@/responsive/utils/parseUABreakpoint";
import { ThemeProvider } from "@/theme/providers/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import React from "react";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const ssrBreakpoint = parseUABreakpoint(userAgent);
  const theme = await getTheme();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-theme={theme}
      data-scroll-behavior="smooth"
    >
      <body>
        <QueryClientProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveProvider ssrBreakpoint={ssrBreakpoint}>
              <main>{children}</main>
            </ResponsiveProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
