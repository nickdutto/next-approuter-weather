import './globals.css';

import { Analytics } from '@vercel/analytics/react';

import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from '~/components/layouts/Footer';
import Navbar from '~/components/layouts/Navbar';
import Sidebar from '~/components/layouts/Sidebar';
import { ThemeProvider } from '~/components/ThemeProvider';
import { cn } from '~/lib/utils';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-black')}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="flex flex-col md:grid md:h-screen md:grid-cols-[250px_1fr] md:grid-rows-[1fr_50px]">
            <Sidebar className="hidden w-[250px] border-r-2 dark:border-zinc-900 md:col-span-1 md:row-span-2 md:block" />
            <div className="flex-1 md:col-start-2 md:row-span-1">
              <Navbar className="flex w-full justify-center md:hidden" />
              {children}
            </div>
            <Footer className="border-t-2 dark:border-zinc-900 md:col-start-2 md:row-span-2" />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
