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
          <div>
            <div className="block md:flex">
              <Sidebar className="hidden w-[250px] border-r-2 dark:border-zinc-900 md:block" />
              <div className="flex-1">
                <Navbar className="flex w-full justify-center md:hidden" />
                {children}
              </div>
            </div>
            <Footer className="" />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
