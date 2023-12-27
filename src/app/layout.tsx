import '~/styles/preflight.css';
import '~/styles/globals.css';

import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';

import { ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import Footer from '~/components/layouts/Footer';
import Navbar from '~/components/layouts/Navbar';
import Sidebar from '~/components/layouts/Sidebar';
import Providers from '~/components/providers/Providers';

export const metadata: Metadata = {
  title: 'Next Weather',
  description: 'Canberra Weather App',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body className="">
        <Providers sansFont={GeistSans.style.fontFamily} monoFont={GeistMono.style.fontFamily}>
          <div className="flex flex-col md:grid md:h-screen md:grid-cols-[250px_1fr] md:grid-rows-[1fr_50px]">
            <Sidebar className="hidden w-[250px] border-r-2 dark:border-zinc-900 md:col-span-1 md:row-span-2 md:block" />
            <div className="flex-1 md:col-start-2 md:row-span-1">
              <Navbar className="flex w-full justify-center md:hidden" />
              {children}
            </div>
            <Footer className="border-t-2 dark:border-zinc-900 md:col-start-2 md:row-span-2" />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
