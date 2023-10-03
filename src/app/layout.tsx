import './globals.css';
import '@mantine/core/styles.css';
import { Inter } from 'next/font/google';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import clsx from 'clsx';

import Analytics from '@/components/Analytics';
import { HeaderMenu } from '@/components/HeaderMenu';
import { Footer } from '@/components/Footer';
import { theme } from '@/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Monopolo11's Website",
  description: "Monopolo11's website",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={clsx(inter.className)}>
        <Analytics />
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <HeaderMenu />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
