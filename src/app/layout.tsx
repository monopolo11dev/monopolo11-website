import "./globals.css";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { HeaderMenu } from "@/components/HeaderMenu";
import { Footer } from "@/components/Footer";
import clsx from "clsx";

import { ReactNode } from "react";
import { Metadata } from "next";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monopolo11's Website",
  description: "Monopolo11's website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={clsx("h-full", inter.className)}>
        <Analytics />
        <MantineProvider defaultColorScheme="dark">
          <HeaderMenu />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
