"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { HeaderMenu } from "@/components/HeaderMenu";
import { Footer } from "@/components/Footer";
import clsx from "clsx";
import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const MATOMO_URL = "https://analytics.monopolo11.com";
const MATOMO_SITE_ID = "4";

// export const metadata: Metadata = {
//   title: "Monopolo11's Website",
//   description: "Monopolo11's website",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID }));

  return (
    <html lang="en">
      <head>
        <title>{"Monopolo11's Website"}</title>
        <ColorSchemeScript />
      </head>
      <body className={clsx("h-full", inter.className)}>
        <MantineProvider defaultColorScheme="dark">
          <HeaderMenu />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
