import '~/styles/preflight.css';
import '~/styles/globals.css';
import '@mantine/core/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import Navbar from '~/components/layouts/Navbar';
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
      <body className="flex min-h-[100svh] flex-col bg-m-night-10 p-4">
        <Providers sansFont={GeistSans.style.fontFamily} monoFont={GeistMono.style.fontFamily}>
          <Navbar />
          <div className="pt-[52px]">{children}</div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
